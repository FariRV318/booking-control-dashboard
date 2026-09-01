Private Hire Booking Control Dashboard V3.3.9

Private Hire Booking Control Dashboard V3.3.4

Key fixes in this build:
- Main Upcoming / In Process table fits large desktop screens without a horizontal scrollbar.
- Complaint rows keep readable white route text and clear Complaint / Driver Paid controls.
- Dashboard remains compact while preserving all operational columns.
- Reports now have three outputs: CSV, direct PDF download, and professional print view.
- PDF uses A4 landscape with booking totals and a fitted data table.
- Print Report opens a dedicated report layout instead of printing the dashboard UI.

Google Maps remains optional and uses config.js when an API key is added later.


V3.3.5: Fixed booking navigation/table rendering; restored complete booking form logic and report PDF/print functions.

V3.3.9: fixed complaint-row route readability; added complaint resolution on All Bookings; added booking penalties; added Driver Statements with cash settlement, complaint holds and professional PDF/print output.

V3.3.7 updates:
- Persistent local demo login across refreshes.
- Driver Statements include Completed, Pax No Show, Driver No Show and penalty jobs with clear Job Status.
- Unresolved complaints remain ON HOLD; resolved complaints release normally.
- Driver No Show can produce a negative penalty settlement.
- Already paid driver jobs remain visible but are excluded from outstanding payable.
- Unique Driver ID field (e.g. BN0075) and display under assigned driver.
- All Bookings driver payment filter: Paid / Pending.

V3.3.9 presentation fixes:
- Driver Statement Job Status now shows only Completed / Pax No Show / Driver No Show.
- Statement Settlement now uses only Released or On Hold.
- Unresolved complaint rows use a light-red highlight instead of dark red.
- Resolved complaint rows/reports use light green and show Resolved.
