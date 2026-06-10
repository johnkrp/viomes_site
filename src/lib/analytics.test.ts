import { describe, expect, it } from "vitest";
import { buildPageViewPayload } from "./analytics";

describe("buildPageViewPayload", () => {
  it("normalizes trailing slashes and includes request metadata", () => {
    Object.defineProperty(window, "location", {
      value: {
        href: "https://example.com/products/kouzina",
      },
      configurable: true,
    });

    Object.defineProperty(document, "referrer", {
      value: "https://google.com/",
      configurable: true,
    });

    const payload = buildPageViewPayload("/products/kouzina/", "Products");

    expect(payload.path).toBe("/products/kouzina");
    expect(payload.title).toBe("Products");
    expect(payload.url).toBe("https://example.com/products/kouzina");
    expect(payload.referrer).toBe("https://google.com/");
    expect(payload.session_id).toMatch(/^[0-9a-f-]{36}$/i);
    expect(payload.timestamp).toContain("T");
  });
});
