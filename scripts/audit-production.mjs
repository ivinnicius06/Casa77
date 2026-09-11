import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import net from "node:net";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { chromium } from "@playwright/test";

const port = await new Promise((resolve, reject) => {
  const probe = net.createServer();
  probe.on("error", reject);
  probe.listen(0, "127.0.0.1", () => {
    const selected = probe.address().port;
    probe.close(() => resolve(selected));
  });
});
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    String(port),
  ],
  { windowsHide: true, stdio: "pipe" },
);
let browser;
try {
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error("Production server did not start.")),
      20000,
    );
    server.stdout.on("data", (data) => {
      if (data.toString().includes("Ready")) {
        clearTimeout(timeout);
        resolve();
      }
    });
    server.on("error", reject);
    server.on("exit", (code) => {
      if (code) reject(new Error(`Server exited with ${code}`));
    });
  });
  browser = await chromeLauncher.launch({
    chromePath: chromium.executablePath(),
    chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"],
  });
  await mkdir("reports", { recursive: true });
  for (const mobile of [true, false]) {
    const name = mobile ? "mobile" : "desktop";
    const result = await lighthouse(`http://127.0.0.1:${port}`, {
      port: browser.port,
      output: ["html", "json"],
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      ...(mobile ? {} : { preset: "desktop" }),
    });
    await writeFile(`reports/lighthouse-${name}.html`, result.report[0]);
    await writeFile(`reports/lighthouse-${name}.json`, result.report[1]);
    console.log(
      name,
      JSON.stringify(
        Object.fromEntries(
          Object.entries(result.lhr.categories).map(([key, category]) => [
            key,
            Math.round(category.score * 100),
          ]),
        ),
      ),
    );
    console.log(
      "Metrics",
      JSON.stringify(
        Object.fromEntries(
          [
            "first-contentful-paint",
            "largest-contentful-paint",
            "total-blocking-time",
            "cumulative-layout-shift",
          ].map((key) => [key, result.lhr.audits[key].displayValue]),
        ),
      ),
    );
  }
} finally {
  if (browser) await browser.kill();
  server.kill();
}
