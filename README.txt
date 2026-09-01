TAXI BOOKING CONTROL DASHBOARD V1.1

Open index.html in a browser. Demo login accepts any email/password.

NEW BOOKING FEATURES
- Pickup and Drop-off fields are ready for Google Places address autocomplete.
- Unlimited Via / additional stops.
- Journey types: One Way, Wait & Return, Return Later.
- Wait duration and return date/time are saved with the booking.
- CSV export now includes Via, journey type, wait and return details.

GOOGLE ADDRESS AUTOCOMPLETE SETUP
1. Open config.js.
2. Paste your Google Maps JavaScript API key into googleMapsApiKey.
3. In Google Cloud, enable Maps JavaScript API and Places API for the project.
4. Restrict the key to your website/domain before production use.
5. Google Maps/Places may require a billing account and usage above free allowances can cost money.

IMPORTANT
This test version stores booking data in browser localStorage. Firebase login/database comes in a later version, so data is not yet shared between computers.
