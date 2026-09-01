TAXI BOOKING CONTROL DASHBOARD — V2

WHAT CHANGED
- Clean main Dashboard. Add New Booking is NOT embedded in the Dashboard.
- Clicking Add New Booking opens a full dedicated booking page.
- Upcoming Journeys table on Dashboard.
- Driver assignment is optional when creating a booking.
- On Dashboard, choose a Driver from a dropdown; their assigned Vehicle fills automatically.
- Dispatch status is controlled separately and manually:
  Assigned / Dispatched / On the Way / POB / Completed / Cancelled.
- Booking Account (Source) + separate External Reference.
- Passenger count, hand carry and suitcase counts.
- Flight number, airline, terminal and arrival time.
- Multiple Via points.
- Wait & Return / return date & time.
- Special requirements: car seat, booster, wheelchair, medical assistance, etc.
- Driver Notes + Office Comments only (Passenger Notes removed).
- Drivers / Vehicles / Companies sections with add buttons.
- Driver licence, MOT and insurance expiry reminders (manual dates for now).
- CSV export and Print / Save PDF.
- Browser localStorage persistence for prototype testing.

GOOGLE MAPS
Open config.js and add the company's Google Maps JavaScript API key.
Enable Maps JavaScript API and Places API in Google Cloud.
When configured, the booking page provides:
- UK address autocomplete
- live route map
- via stops
- mileage calculation
- estimated driving time

IMPORTANT
This V2 is still a local prototype. Before real company use, connect Firebase Authentication + Firestore and proper user roles/backups.
