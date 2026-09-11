import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import ffmpeg from "ffmpeg-static";
import sharp from "sharp";

const root = process.cwd();
const output = path.join(root, "public", "images");
const media = path.join(root, "public", "media");
await mkdir(output, { recursive: true });
await mkdir(media, { recursive: true });
await mkdir(path.join(root, "public", "fonts"), { recursive: true });
const ref = (time) =>
  path.join(
    root,
    "referenciasBarbearia",
    `Captura de tela 2026-09-11 ${time}.png`,
  );
const crops = [
  ["001804", "logo", 159, 127, 191, 191],
  ["001649", "ambiente", 3, 28, 343, 429],
  ["001937", "atendimento", 1075, 58, 345, 429],
  ["001937", "fachada", 723, 156, 345, 197],
  ["001937", "interior", 724, 356, 345, 133],
  ["001937", "detalhes", 372, 540, 345, 180],
  ["001722", "editorial-01", 0, 34, 348, 420],
  ["001722", "editorial-02", 352, 34, 348, 420],
  ["001722", "editorial-03", 704, 34, 348, 420],
];
for (const [time, name, left, top, width, height] of crops) {
  await sharp(ref(time))
    .extract({ left, top, width, height })
    .webp({ quality: 90 })
    .toFile(path.join(output, `${name}.webp`));
}
await sharp(ref("001804"))
  .extract({ left: 159, top: 127, width: 191, height: 191 })
  .resize(64, 64)
  .png()
  .toFile(path.join(root, "src", "app", "icon.png"));
const input =
  process.env.HERO_SOURCE || "C:/Users/Ivdia/Downloads/modeloHero.mp4";
const run = (args) =>
  execFileSync(
    ffmpeg,
    ["-hide_banner", "-loglevel", "warning", "-y", ...args],
    { stdio: "inherit" },
  );
run(["-i", input, "-frames:v", "1", path.join(output, "hero-poster.png")]);
run([
  "-i",
  input,
  "-vf",
  "fps=1,scale=240:-1,tile=4x2",
  "-frames:v",
  "1",
  path.join(output, "video-contact-sheet.jpg"),
]);
for (const [name, size, crf] of [
  ["hero-desktop", 1080, 21],
  ["hero-mobile", 640, 24],
]) {
  run([
    "-i",
    input,
    "-vf",
    `scale=${size}:-2`,
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "fast",
    "-crf",
    String(crf),
    "-g",
    "6",
    "-keyint_min",
    "6",
    "-sc_threshold",
    "0",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    path.join(media, `${name}.mp4`),
  ]);
}
await sharp(path.join(output, "hero-poster.png"))
  .resize({ width: 1080, withoutEnlargement: true })
  .webp({ quality: 88 })
  .toFile(path.join(output, "hero-poster.webp"));
await copyFile(
  path.join(
    root,
    "node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  ),
  path.join(root, "public/fonts/inter.woff2"),
);
await copyFile(
  path.join(
    root,
    "node_modules/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2",
  ),
  path.join(root, "public/fonts/bebas-neue.woff2"),
);
console.log(
  "Local reference crops, optimized video, poster, favicon and fonts ready.",
);
