Taxi Booking Control Dashboard V3.3.3
===================================

V3.3.3 major operational update:
- Professional dashboard with From/To date + journey search.
- Working View All navigation from KPI cards and dashboard panels.
- Today's Revenue = total fare of today's non-cancelled bookings.
- Dashboard staff comment field on each journey.
- Color-coded operational columns on Dashboard and All Bookings.
- Company/account-specific colors and dispatch-status colors.
- Interactive 6-month Revenue Overview chart (hover to see month revenue).
- Full Companies / Accounts profile: registered name/number, VAT, address,
  website, accounts email, two contacts, payment terms and notes.
- Functional Calendar View.
- Functional Booking Quotes with Convert to Booking.
- Functional Dispatch Board.
- Functional Customers page built from booking history.
- Functional Earnings page with From/To and company filter.
- Functional Expenses page with add/delete and From/To filtering.
- Functional Reports page with From/To, search, company filter, weekly/monthly
  presets, summary totals, CSV export and Print / Save PDF.
- Existing V3 booking, driver & vehicle, fare, Google Maps-ready structure retained.

Data storage:
This development version still uses browser localStorage. This means each browser/device
has its own data until Firebase is connected. Do not use it as the final shared live
production database yet.

Google Maps:
Add your own restricted Google Maps API key to config.js when ready.

V3.3.3 additions:
- Driver No Show and Pax No Show dispatch statuses.
- Complaint checkbox; complaint rows turn dark red across Dashboard, All Bookings and Reports.
- Driver Paid checkbox; Paid is green and Pending is amber.
- Complaint and driver-payment state included in reports and CSV.
- No-show jobs are treated as closed outcomes and leave the active/upcoming queue.


V3.3.3 FIX:
Professional demo records now seed automatically when browser data is missing or empty.
No Reset / Load Demo Data button is required, and automatic seeding does not log the user out.


V3.3.3: complete working dashboard logic restored; current-date demo data is automatically merged on first load and across test upgrades.
