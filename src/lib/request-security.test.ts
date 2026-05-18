import { describe, expect, it } from "vitest";
import { readLimitedJson } from "./request-security";

describe("readLimitedJson", () => {
  it("parses valid JSON within the byte limit", async () => {
    const req = new Request("https://example.test", {
      method: "POST",
      body: JSON.stringify({ ok: true }),
    });

    await expect(readLimitedJson<{ ok: boolean }>(req, 100)).resolves.toEqual({
      ok: true,
    });
  });

  it("returns null for oversized JSON bodies", async () => {
    const req = new Request("https://example.test", {
      method: "POST",
      body: JSON.stringify({ value: "x".repeat(50) }),
    });

    await expect(readLimitedJson(req, 10)).resolves.toBeNull();
  });
});
