PRIVATE HIRE BOOKING CONTROL DASHBOARD V3.6.0

This build adds shared staff accounts, role-based navigation and a permanent Firestore audit trail on top of the working V3.5.1 Firebase cloud-sync build.

NEW IN V3.6.0
- Separate staff logins using Firebase Email/Password Authentication
- One shared company workspace: staff do NOT need the owner's password
- Roles: Administrator, Dispatcher, Accounts, Read Only
- Administrator-only Staff Accounts page
- Invite staff by name, email and role
- Staff creates their own password with the invited email using Create Account
- Staff role/status management (change role, disable/enable)
- Dedicated Logs / Audit Trail page
- Audit entries contain date/time, staff name/email, role, action, affected record and change summary
- Logs are append-only in Firestore (normal users cannot edit/delete audit records)
- Existing bookings, drivers, vehicles, companies, penalties, reports and statements remain in the same synced workspace

IMPORTANT FIRESTORE RULE UPDATE
Before using Staff Accounts, replace the current Firestore Rules with the contents of firestore.rules in this package and Publish them.

OWNER MIGRATION
The first time the existing owner signs into V3.6.0, the app creates the owner's workspace membership automatically. Existing cloud data remains at the same workspace ID and is not moved or deleted.

STAFF JOIN FLOW
1. Administrator opens Staff Accounts and clicks Invite Staff.
2. Enter staff name, email and role.
3. Staff opens the same dashboard URL.
4. Staff enters the invited email, chooses Create Account, and sets a password.
5. The app automatically joins that login to the owner's shared workspace.

SECURITY NOTE
Read Only cannot write synced workspace state. Administrator, Dispatcher and Accounts are write-enabled roles. The UI exposes role-appropriate navigation; because the current dashboard stores operational state in one shared Firestore state document, finer field-level server enforcement can be added later if you want very granular permissions per booking field.


V3.7.1 CLEAN RESPONSIVE TABLE UPDATE
- Sidebar hidden by default on desktop/tablet/mobile; hamburger opens overlay drawer.
- Add Booking button on Dashboard.
- Analytics moved above Upcoming / In Process Journeys.
- Dashboard keeps From Date, To Date, Search, Filter, Clear and Hide/Show controls.
- Expiring Documents moved to its own page; Quick Reports removed from Dashboard.
- Dashboard removes Complaint and Driver Paid only; All Bookings keeps both.
- Added Pax & Lugg, Vehicle Requested + mileage, Flight No., compact £ fare, Driver, Driver Vehicle and Dispatch columns.
- Dashboard and All Bookings columns are user-customisable with Hide / Show.
- Larger/darker typography and responsive layouts.
- Booking page has action buttons under the map and corrected penalty field alignment.
- Send SMS modal builds journey details and opens the device SMS composer.
- Existing Firebase sync, staff roles and audit logs preserved.


V3.7.1 CLEAN RESPONSIVE TABLE UPDATE
- Dashboard Add Booking button aligned to the upper-right.
- Dashboard and All Bookings tables use natural column sizing with horizontal scroll instead of overlapping/squeezing.
- Dark, high-contrast table headers on Dashboard and All Bookings.
- Soft operational column colours restored.
- Dashboard Hide / Show now includes Complaint, Complaint Resolved and Driver Paid as optional columns.
- Rebuilt Hide / Show panel with aligned checkbox + label layout and viewport-safe scrolling.
- Booking Pricing & Payment layout hardened for large displays; penalty fields stay inside the card.
- Existing Firebase sync, staff roles, audit logs, reports, statements, SMS UI and permissions preserved.

V3.7.2 final fixes:
- All Bookings driver column is editable/searchable like Dashboard.
- Booking Driver & Vehicle dropdown is no longer clipped by its card.
- SMS template updated to requested asterisk format and removed Driver Fare Only text.
- Send To recipient panel redesigned for clearer selection.


V3.7.5 updates:
- Special Requirements column on Dashboard and All Bookings (requirements + Other Requirement).
- Passenger cells open the booking directly.
- Journey Type return options now reveal/save return date/time/pickup/drop-off correctly.
- Premium dark gradient page header.

V3.7.7 updates:
- Return Same Day / Return Different Day now create a second linked booking record for the return leg, so both legs appear on Dashboard and All Bookings.
- Separate Journey 1 and Return fare / driver fare fields for return bookings.
- Vehicle suitability validation blocks bookings that exceed configured passenger/luggage guidelines and recommends a suitable vehicle class.


V3.7.7 updates:
- Passenger-capacity validation only; luggage no longer blocks booking saves.
- Return bookings have a separate Return Driver & Vehicle assignment section.
- Return leg stores its own driver and auto-assigned vehicle.
