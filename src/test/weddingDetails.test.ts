import { describe, expect, it } from "vitest";
import { coupleMonogram, coupleNames, wedding } from "@/data/weddingDetails";

describe("couple presentation order", () => {
  it("puts Manoj before Jenchi in combined names and initials", () => {
    expect(coupleNames).toBe("V. Manoj & L. Jenchi");
    expect(coupleMonogram).toBe("M & J");
    expect(wedding.invitation[0].indexOf("V. Manoj")).toBeLessThan(wedding.invitation[0].indexOf("L. Jenchi"));
  });
});