import { describe, expect, it } from "vitest";
import { parseRoutineProductsJson } from "./routine";

describe("parseRoutineProductsJson", () => {
  it("accepts legacy routine exports without optional status fields", () => {
    const parsed = parseRoutineProductsJson(
      JSON.stringify([
        {
          id: "legacy-1",
          name: "Hydrating Cleanser",
          brand: "CeraVe",
          notes: "Gentle cleanser",
          slot: "am",
        },
      ])
    );

    expect(parsed).toEqual([
      {
        id: "legacy-1",
        name: "Hydrating Cleanser",
        brand: "CeraVe",
        notes: "Gentle cleanser",
        slot: "am",
      },
    ]);
  });

  it("keeps valid status and last-used metadata", () => {
    const parsed = parseRoutineProductsJson(
      JSON.stringify([
        {
          id: "routine-1",
          name: "Barrier Cream",
          brand: "Test Brand",
          notes: "Ceramides",
          slot: "pm",
          status: "love",
          lastUsedDate: "2026-05-17",
        },
      ])
    );

    expect(parsed?.[0]).toMatchObject({
      status: "love",
      lastUsedDate: "2026-05-17",
    });
  });

  it("filters invalid routine rows and returns null when none remain", () => {
    expect(
      parseRoutineProductsJson(
        JSON.stringify([
          {
            id: "bad-status",
            name: "Too Much",
            brand: "Test Brand",
            notes: "Invalid status",
            slot: "pm",
            status: "paused",
          },
        ])
      )
    ).toBeNull();
  });
});
