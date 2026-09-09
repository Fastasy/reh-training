// Google Business Profile data for REH Safety Training's three branches.
// Place IDs resolved from live Google Maps lookups (2026-09-09, Googlebot-rendered
// search results + place-page verification):
//   - Midrand: already in use on the site (resolved 2026-08-27).
//   - Durban: profile "REH Safety Training Durban", 62 Lilian Ngoyi Rd, Windermere.
//   - Mthatha: profile "REH Safety Training", 1st Floor Old Mutual Building,
//     Cnr Leeds/York Rd, Mthatha.
// Keep in sync if the client renames or merges any profile.

export type GoogleLocationId = "midrand" | "durban" | "mthatha";

export type GoogleLocation = {
  id: GoogleLocationId;
  /** Button label. */
  label: string;
  /** Name as it appears on the Google Business Profile. */
  profileName: string;
  /** Short human address, shown under the card heading. */
  address: string;
  /** Human-readable query for the keyless maps embed (URL-encoded at render). */
  embedQuery: string;
  /** Google Place ID. */
  placeId: string;
  /** Deep link to the profile on Google Maps. */
  mapsUrl: string;
  /** Deep link to the write-a-review form for this profile. */
  reviewUrl: string;
};

export const GOOGLE_LOCATIONS: GoogleLocation[] = [
  {
    id: "mthatha",
    label: "Mthatha",
    profileName: "REH Safety Training",
    address: "1st Floor, Old Mutual Building, Cnr York Rd & Leeds Rd, Mthatha",
    embedQuery: "REH Safety Training, Old Mutual Building, Cnr York Rd & Leeds Rd, Mthatha",
    placeId: "0x1e5fd1f4e729861d:0xc07226e938aa5226",
    mapsUrl:
      "https://www.google.com/maps/place/?q=place_id:0x1e5fd1f4e729861d:0xc07226e938aa5226",
    reviewUrl:
      "https://search.google.com/local/writereview?placeid=0x1e5fd1f4e729861d:0xc07226e938aa5226",
  },
  {
    id: "durban",
    label: "Durban",
    profileName: "REH Safety Training Durban",
    address: "62 Lilian Ngoyi Street, Windermere, Durban",
    embedQuery: "REH Safety Training Durban, 62 Lilian Ngoyi Street, Windermere, Durban",
    placeId: "0x1ef7070979cb840f:0xfcb0dbffd17302eb",
    mapsUrl:
      "https://www.google.com/maps/place/?q=place_id:0x1ef7070979cb840f:0xfcb0dbffd17302eb",
    reviewUrl:
      "https://search.google.com/local/writereview?placeid=0x1ef7070979cb840f:0xfcb0dbffd17302eb",
  },
  {
    id: "midrand",
    label: "Midrand",
    profileName: "REH Safety Training",
    address: "14 Douglas Road, Glen Austin, Midrand",
    embedQuery: "REH Safety Training, 14 Douglas Rd, Glen Austin AH, Midrand",
    placeId: "ChIJ7ctwo2ZvlR4RfvD4cUs5rV4",
    mapsUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJ7ctwo2ZvlR4RfvD4cUs5rV4",
    reviewUrl:
      "https://search.google.com/local/writereview?placeid=ChIJ7ctwo2ZvlR4RfvD4cUs5rV4",
  },
];

export function getGoogleLocation(id: string): GoogleLocation {
  return GOOGLE_LOCATIONS.find((l) => l.id === id) ?? GOOGLE_LOCATIONS[0];
}
