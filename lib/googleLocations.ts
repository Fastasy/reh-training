// Google Business Profile data for RSTL Centre's three branches.
// Place IDs resolved from live Google Maps lookups (2026-09-09, Googlebot-rendered
// search results + place-page verification):
//   - Midrand: already in use on the site (resolved 2026-08-27).
//   - Durban: profile "RSTL Centre Durban", 62 Lilian Ngoyi Rd, Windermere.
//   - Mthatha: profile "RSTL Centre", 1st Floor Old Mutual Building,
//     Cnr Leeds/York Rd, Mthatha.
// Place IDs are stable across a name change, but `profileName` is quoted to visitors
// ("Rating and reviews shown are from ...'s Google Business Profile"), so it must be
// updated here the moment the client renames the profiles in Google Business Profile.

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
    profileName: "RSTL Centre",
    address: "1st Floor, Old Mutual Building, Cnr York Rd & Leeds Rd, Mthatha",
    // Address-only query: the keyless maps embed resolves the place by address, so it
    // keeps working before AND after the client renames the Google Business Profile.
    embedQuery: "Old Mutual Building, Cnr York Rd & Leeds Rd, Mthatha",
    placeId: "0x1e5fd1f4e729861d:0xc07226e938aa5226",
    mapsUrl:
      "https://www.google.com/maps/place/?q=place_id:0x1e5fd1f4e729861d:0xc07226e938aa5226",
    reviewUrl:
      "https://search.google.com/local/writereview?placeid=0x1e5fd1f4e729861d:0xc07226e938aa5226",
  },
  {
    id: "durban",
    label: "Durban",
    profileName: "RSTL Centre Durban",
    address: "62 Lilian Ngoyi Street, Windermere, Durban",
    embedQuery: "62 Lilian Ngoyi Street, Windermere, Durban",
    placeId: "0x1ef7070979cb840f:0xfcb0dbffd17302eb",
    mapsUrl:
      "https://www.google.com/maps/place/?q=place_id:0x1ef7070979cb840f:0xfcb0dbffd17302eb",
    reviewUrl:
      "https://search.google.com/local/writereview?placeid=0x1ef7070979cb840f:0xfcb0dbffd17302eb",
  },
  {
    id: "midrand",
    label: "Midrand",
    profileName: "RSTL Centre",
    address: "14 Douglas Road, Glen Austin, Midrand",
    embedQuery: "14 Douglas Rd, Glen Austin AH, Midrand",
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
