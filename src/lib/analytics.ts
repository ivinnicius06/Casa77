export type EventName =
  | "whatsapp_click"
  | "app_click"
  | "plan_interest"
  | "unit_map_click"
  | "booking_click";
export function track(
  event: EventName,
  properties: Record<string, string> = {},
) {
  window.dispatchEvent(
    new CustomEvent("casa77:analytics", { detail: { event, ...properties } }),
  );
}
