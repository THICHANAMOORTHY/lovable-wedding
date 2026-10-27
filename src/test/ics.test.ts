import { describe, it, expect } from "vitest";
import { buildIcs } from "@/lib/ics";

describe("save the date calendar file", () => {
  const ics = buildIcs(new Date("2026-01-01T00:00:00Z"));

  it("includes the reception on 14 Nov 2026 10:30–11:30 AM Asia/Kolkata", () => {
    expect(ics).toContain("SUMMARY:Wedding Reception — V. Manoj & L. Jenchi");
    expect(ics).toContain("DTSTART;TZID=Asia/Kolkata:20261114T103000");
    expect(ics).toContain("DTEND;TZID=Asia/Kolkata:20261114T113000");
    expect(ics).toContain("LOCATION:M.D.J. Mahal\\, Purathakudi");
  });

  it("starts the matrimony 15 Nov 2026 8:30 AM Asia/Kolkata", () => {
    expect(ics).toContain("SUMMARY:Holy Matrimony — V. Manoj & L. Jenchi");
    expect(ics).toContain("DTSTART;TZID=Asia/Kolkata:20261115T083000");
  });

  it("ends the matrimony 15 Nov 2026 10:30 AM Asia/Kolkata", () => {
    expect(ics).toContain("DTEND;TZID=Asia/Kolkata:20261115T103000");
  });

  it("has the matrimony venue", () => {
    expect(ics).toContain("LOCATION:Punitha Thomaiyar Aalayam\\, South Irungalur, Trichy District, Tamil Nadu");
  });
});
