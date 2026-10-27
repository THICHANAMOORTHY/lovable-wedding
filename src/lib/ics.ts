import { wedding, coupleNames } from "@/data/weddingDetails";

const p = (n: number) => String(n).padStart(2, "0");
type T = { y: number; m: number; d: number; hh: number; mm: number };
export const localStamp = (t: T) => `${t.y}${p(t.m)}${p(t.d)}T${p(t.hh)}${p(t.mm)}00`;

const UIDS = ["jenchi-manoj-reception-20261114", "holy-matrimony-jenchi-manoj-20261115"];

export function buildIcs(now = new Date()): string {
  const dtstamp = now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const events = wedding.events.map((ev, i) => [
    "BEGIN:VEVENT",
    `UID:${UIDS[i]}@invite`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=${wedding.timeZone}:${localStamp(ev.start)}`,
    `DTEND;TZID=${wedding.timeZone}:${localStamp(ev.end)}`,
    `SUMMARY:${ev.name} — ${coupleNames}`,
    `LOCATION:${ev.venue}\\, ${ev.location}`,
    `DESCRIPTION:${ev.name} of ${coupleNames}.`,
    "END:VEVENT",
  ]);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Manoj Jenchi Wedding//Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VTIMEZONE",
    "TZID:Asia/Kolkata",
    "BEGIN:STANDARD",
    "DTSTART:19700101T000000",
    "TZOFFSETFROM:+0530",
    "TZOFFSETTO:+0530",
    "TZNAME:IST",
    "END:STANDARD",
    "END:VTIMEZONE",
    ...events.flat(),
    "END:VCALENDAR",
  ];
  return lines.join("\r\n") + "\r\n";
}

export function downloadIcs() {
  const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Manoj-Jenchi-Wedding.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}
