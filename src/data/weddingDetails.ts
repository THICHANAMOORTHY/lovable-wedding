export const wedding = {
  bride: "L. Jenchi",
  groom: "V. Manoj",
  event: "Holy Matrimony",
  mainHeading: "The Sacrament of Holy Matrimony",
  heroHeading: "We're Getting Married",
  dayName: "Sunday",
  dateLabel: "15 November 2026",
  fullDateLabel: "Sunday, 15 November 2026",
  timeLabel: "8:30 AM – 10:30 AM",
  venue: "Punitha Thomaiyar Aalayam",
  location: "South Irungalur, Trichy District, Tamil Nadu",
  timeZone: "Asia/Kolkata",
  // Local wall-clock times (Asia/Kolkata)
  start: { y: 2026, m: 11, d: 15, hh: 8, mm: 30 },
  end: { y: 2026, m: 11, d: 15, hh: 10, mm: 30 },
  // Every event of the celebration, in chronological order
  events: [
    {
      name: "Wedding Reception",
      dayName: "Saturday",
      dateLabel: "14 November 2026",
      fullDateLabel: "Saturday, 14 November 2026",
      timeLabel: "10:30 AM – 11:30 AM",
      venue: "M.D.J. Mahal",
      location: "Purathakudi",
      start: { y: 2026, m: 11, d: 14, hh: 10, mm: 30 },
      end: { y: 2026, m: 11, d: 14, hh: 11, mm: 30 },
    },
    {
      name: "Holy Matrimony",
      dayName: "Sunday",
      dateLabel: "15 November 2026",
      fullDateLabel: "Sunday, 15 November 2026",
      timeLabel: "8:30 AM – 10:30 AM",
      venue: "Punitha Thomaiyar Aalayam",
      location: "South Irungalur, Trichy District, Tamil Nadu",
      start: { y: 2026, m: 11, d: 15, hh: 8, mm: 30 },
      end: { y: 2026, m: 11, d: 15, hh: 10, mm: 30 },
    },
  ],
  invitation: [
    "With the blessings of God and the love of our families, we joyfully invite you to celebrate the Holy Matrimony of V. Manoj and L. Jenchi.",
    "Your presence and blessings will make this special occasion even more memorable.",
  ],
  closing: "Two Hearts. One Beautiful Journey. Forever Begins.",
  // Optional: place an mp3 at public/music.mp3 to enable background music.
  musicSrc: "/music.mp3",
} as const;

const mapsFor = (venue: string, location: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue}, ${location}`)}`;

export const mapsUrl = mapsFor(wedding.venue, wedding.location);
export const receptionMapsUrl = mapsFor(wedding.events[0].venue, wedding.events[0].location);

export const coupleNames = `${wedding.groom} & ${wedding.bride}`;
export const coupleMonogram = `${wedding.groom.split(" ").at(-1)?.[0] ?? ""} & ${wedding.bride.split(" ").at(-1)?.[0] ?? ""}`;
