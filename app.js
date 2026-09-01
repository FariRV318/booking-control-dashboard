const $=id=>document.getElementById(id);
const todayISO=()=>new Date().toISOString().slice(0,10);
const money=v=>`£${Number(v||0).toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const store=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const load=(k,fallback)=>{try{return JSON.parse(localStorage.getItem(k))??fallback}catch{return fallback}};
const addDays=(n)=>{const d=new Date();d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)};
const dateInRange=(date,from,to)=>(!from||date>=from)&&(!to||date<=to);

const defaultAccounts=[
{id:'ACC-OWN',name:'Own Company',regName:'London Executive Cars Ltd',regNumber:'11223344',phone:'+44 20 7946 0100',email:'bookings@owncompany.test',accountsEmail:'accounts@owncompany.test',contact1Name:'Operations Desk',contact1Phone:'+44 7700 900001',contact2Name:'Accounts Team',contact2Phone:'+44 7700 900002',notes:'Direct website and telephone bookings.',color:'#dbeafe'},
{id:'ACC-HOTEL',name:'Hotel ABC',regName:'ABC Hospitality Group Ltd',regNumber:'22334455',phone:'+44 20 7946 0200',email:'concierge@hotelabc.test',accountsEmail:'finance@hotelabc.test',contact1Name:'Emma Carter',contact1Phone:'+44 7700 910101',contact2Name:'Daniel Reed',contact2Phone:'+44 7700 910102',notes:'Priority hotel account. Monthly invoicing.',color:'#fef3c7'},
{id:'ACC-UBER',name:'Uber Account',regName:'Demo Platform Account',regNumber:'',phone:'+44 20 7946 0300',email:'ops@platform.test',accountsEmail:'',contact1Name:'Partner Desk',contact1Phone:'+44 7700 920101',contact2Name:'',contact2Phone:'',notes:'Example subcontract/platform work.',color:'#ede9fe'},
{id:'ACC-XYZ',name:'Company XYZ',regName:'XYZ Travel Services Ltd',regNumber:'33445566',phone:'+44 20 7946 0400',email:'bookings@xyztravel.test',accountsEmail:'accounts@xyztravel.test',contact1Name:'James Wilson',contact1Phone:'+44 7700 930101',contact2Name:'Maya Singh',contact2Phone:'+44 7700 930102',notes:'Corporate airport transfer account.',color:'#dcfce7'},
{id:'ACC-PARTNER',name:'Partner Company',regName:'Partner Chauffeurs Ltd',regNumber:'44556677',phone:'+44 20 7946 0500',email:'jobs@partner.test',accountsEmail:'billing@partner.test',contact1Name:'Sophie Brown',contact1Phone:'+44 7700 940101',contact2Name:'Adam Khan',contact2Phone:'+44 7700 940102',notes:'Overflow and long-distance work.',color:'#fee2e2'}
];
const defaultVehicles=[
{id:'VEH-1',reg:'LN68 XYZ',make:'Toyota',model:'Prius',year:'2018',color:'Black',vehicleClass:'Saloon',seats:'4',motExpiry:addDays(120),insuranceProvider:'Demo Insurance',insurancePolicy:'POL-1001',insuranceExpiry:addDays(75),phvLicence:'PHV-1001',phvExpiry:addDays(95),roadTaxExpiry:addDays(200)},
{id:'VEH-2',reg:'KP19 ABC',make:'Mercedes-Benz',model:'Vito',year:'2019',color:'Silver',vehicleClass:'Executive MPV',seats:'7',motExpiry:addDays(20),insuranceProvider:'Demo Insurance',insurancePolicy:'POL-1002',insuranceExpiry:addDays(150),phvLicence:'PHV-1002',phvExpiry:addDays(80),roadTaxExpiry:addDays(170)},
{id:'VEH-3',reg:'GF20 DEF',make:'Skoda',model:'Octavia',year:'2020',color:'White',vehicleClass:'Estate',seats:'4',motExpiry:addDays(210),insuranceProvider:'Demo Insurance',insurancePolicy:'POL-1003',insuranceExpiry:addDays(25),phvLicence:'PHV-1003',phvExpiry:addDays(110),roadTaxExpiry:addDays(190)}
];
const defaultDrivers=[
{id:'DRV-1',name:'Ali Khan',phone:'+44 7700 111111',email:'ali@example.com',address:'London',callSign:'D01',licenceNumber:'DL-AK-001',licenceExpiry:addDays(180),pcoNumber:'PCO-001',pcoExpiry:addDays(140),vehicleId:'VEH-1',notes:''},
{id:'DRV-2',name:'Sarah Ahmed',phone:'+44 7700 222222',email:'sarah@example.com',address:'London',callSign:'D02',licenceNumber:'DL-SA-002',licenceExpiry:addDays(16),pcoNumber:'PCO-002',pcoExpiry:addDays(55),vehicleId:'VEH-2',notes:''},
{id:'DRV-3',name:'James Taylor',phone:'+44 7700 333333',email:'james@example.com',address:'London',callSign:'D03',licenceNumber:'DL-JT-003',licenceExpiry:addDays(220),pcoNumber:'PCO-003',pcoExpiry:addDays(180),vehicleId:'VEH-3',notes:''}
];
const baseBooking=(id,date,time,passenger,phone,sourceId,pickup,dropoff,driverId,dispatch,fare,externalRef='')=>({id,date,time,passenger,phone,email:'',sourceId,externalRef,pickup,vias:[],dropoff,journeyType:'One Way',waitReturn:false,waitingMinutes:0,returnDate:'',returnTime:'',flightNumber:'',airline:'',terminal:'',arrivalTime:'',passengers:1,handCarry:0,suitcases:0,requirements:[],otherRequirement:'',vehicleClassRequested:'Saloon',driverId,vehicleId:driverId?(defaultDrivers.find(d=>d.id===driverId)?.vehicleId||''):'',dispatch,fare,driverFare:Math.round(Number(fare||0)*0.72),payment:'Account',driverNotes:'',officeComments:'',dashboardComment:'',complaint:false,driverPaid:false,distanceMiles:'',durationText:''});
const defaultBookings=[
baseBooking('BK-000123',addDays(-3),'09:30','John Smith','+44 7712 345678','ACC-OWN','Heathrow T5','Central London','DRV-2','POB',85),
baseBooking('BK-000124',addDays(-3),'11:45','Emma Wilson','+44 7700 900123','ACC-HOTEL','Slough','Windsor','DRV-1','On the Way',45,'H-4402'),
baseBooking('BK-000125',addDays(-3),'13:15','Michael Brown','+44 7733 221122','ACC-UBER','Gatwick Airport','Croydon','DRV-3','Dispatched',60,'UB-7821'),
baseBooking('BK-000126',addDays(-3),'15:40','David Lee','+44 7799 553311','ACC-OWN','Heathrow T3','Reading','','Assigned',70),
baseBooking('BK-000127',addDays(-3),'17:30','Olivia Martin','+44 7744 889900','ACC-XYZ','London Bridge','Stansted Airport','','Assigned',90,'XYZ-1021'),
baseBooking('BK-000128',addDays(-2),'08:20','William Johnson','+44 7711 223344','ACC-OWN','Heathrow T2','Watford','DRV-2','On the Way',75),
baseBooking('BK-000129',addDays(-2),'10:00','Sophia Davis','+44 7755 667788','ACC-HOTEL','Luton Airport','Central London','DRV-1','POB',65,'H-4421'),
baseBooking('BK-000130',addDays(-2),'12:45','Daniel Thomas','+44 7708 112233','ACC-PARTNER','Southampton','Heathrow T5','DRV-3','Dispatched',110,'PC-8891'),
baseBooking('BK-000131',addDays(-1),'14:00','Grace Taylor','+44 7707 441100','ACC-OWN','Paddington','Heathrow T4','','Assigned',58),
baseBooking('BK-000132',todayISO(),'16:30','Noah Wilson','+44 7710 551122','ACC-XYZ','Canary Wharf','Gatwick Airport','DRV-1','Dispatched',92,'XYZ-1044'),
baseBooking('BK-000133',todayISO(),'18:10','Ava Harris','+44 7712 889922','ACC-OWN','Heathrow T5','Oxford','','Assigned',120),
baseBooking('BK-000134',addDays(1),'07:15','Lucas Green','+44 7721 441188','ACC-HOTEL','London Victoria','Stansted Airport','DRV-2','Assigned',88,'H-4450'),
baseBooking('BK-000135',todayISO(),'10:20','Completed Client','+44 7700 000001','ACC-OWN','Chelsea','City Airport','DRV-3','Completed',55)

];
// Make the demo visibly exercise V3.3 features.
defaultBookings[0].dashboardComment='Payment due today';
defaultBookings[0].driverPaid=true;
defaultBookings[1].dashboardComment='VIP guest - call reception on arrival';
defaultBookings[2].complaint=true;
defaultBookings[2].dashboardComment='Complaint: office manager to follow up';
defaultBookings[4].dispatch='Pax No Show';
defaultBookings[6].driverPaid=true;
defaultBookings[10].flightNumber='BA0281';
defaultBookings[10].passengers=3;
defaultBookings[10].suitcases=4;
defaultBookings[10].vehicleClassRequested='Executive MPV';

const defaultQuotes=[
{id:'QT-240101',date:todayISO(),passenger:'Charlotte Evans',phone:'+44 7700 600101',pickup:'Heathrow T5',dropoff:'Mayfair',sourceId:'ACC-HOTEL',fare:78,status:'Open'},
{id:'QT-240102',date:addDays(-1),passenger:'Liam Walker',phone:'+44 7700 600102',pickup:'Chelsea',dropoff:'Gatwick Airport',sourceId:'ACC-OWN',fare:95,status:'Open'},
{id:'QT-240103',date:addDays(-2),passenger:'Amelia Scott',phone:'+44 7700 600103',pickup:'Stansted Airport',dropoff:'Canary Wharf',sourceId:'ACC-PARTNER',fare:105,status:'Converted'}
];
const defaultExpenses=[
{id:'EXP-1001',date:todayISO(),category:'Parking',description:'Heathrow T5 short stay parking',sourceId:'ACC-HOTEL',amount:18.50},
{id:'EXP-1002',date:addDays(-1),category:'Tolls',description:'Dart Charge',sourceId:'ACC-XYZ',amount:5.00},
{id:'EXP-1003',date:addDays(-2),category:'Vehicle Maintenance',description:'Tyre replacement - KP19 ABC',sourceId:'',amount:145.00},
{id:'EXP-1004',date:addDays(-3),category:'Office',description:'Dispatch phone / office supplies',sourceId:'ACC-OWN',amount:42.80}
];

let accounts=load('tbc_accounts_v3',load('tbc_accounts_v2',defaultAccounts));
let vehicles=load('tbc_vehicles_v3',load('tbc_vehicles_v2',defaultVehicles));
let drivers=load('tbc_drivers_v3',load('tbc_drivers_v2',defaultDrivers));
let bookings=load('tbc_bookings_v3',load('tbc_bookings_v2',defaultBookings));
let quotes=load('tbc_quotes_v3',defaultQuotes);
let expenses=load('tbc_expenses_v3',defaultExpenses);
// Older test versions may have saved empty arrays. Seed useful demo data instead of opening blank.
if(!Array.isArray(accounts)||accounts.length<3) accounts=defaultAccounts;
if(!Array.isArray(vehicles)||vehicles.length<3) vehicles=defaultVehicles;
if(!Array.isArray(drivers)||drivers.length<3) drivers=defaultDrivers;
if(!Array.isArray(bookings)||bookings.length<8) bookings=defaultBookings;
if(!Array.isArray(quotes)||quotes.length<2) quotes=defaultQuotes;
if(!Array.isArray(expenses)||expenses.length<2) expenses=defaultExpenses;

function persist(){store('tbc_accounts_v3',accounts);store('tbc_vehicles_v3',vehicles);store('tbc_drivers_v3',drivers);store('tbc_bookings_v3',bookings);store('tbc_quotes_v3',quotes);store('tbc_expenses_v3',expenses)}

$('loginForm').addEventListener('submit',e=>{e.preventDefault();$('loginView').classList.add('hidden');$('appView').classList.remove('hidden');showPage('dashboard')});

document.querySelectorAll('.nav-btn[data-page]').forEach(b=>b.onclick=()=>b.dataset.page==='bookingForm'?openBookingForm():showPage(b.dataset.page));
document.querySelectorAll('[data-page-link]').forEach(b=>b.onclick=()=>showPage(b.dataset.pageLink));
document.querySelectorAll('[data-open-booking]').forEach(b=>b.onclick=()=>openBookingForm());

const pageMap={dashboard:'dashboardPage',bookings:'bookingsPage',bookingForm:'bookingFormPage',drivers:'driversPage',accounts:'accountsPage',customers:'customersPage',calendar:'calendarPage',quotes:'quotesPage',dispatch:'dispatchPage',earnings:'earningsPage',expenses:'expensesPage',reports:'reportsPage',settings:'settingsPage'};
const titles={dashboard:['Dashboard','Booking operations at a glance'],bookings:['All Bookings','Every booking in one place'],bookingForm:['Add New Booking','Create and manage a complete journey'],drivers:['Drivers & Vehicles','Complete driver, vehicle and compliance records'],accounts:['Companies / Accounts','Booking sources and partner accounts'],customers:['Customers','Passenger records'],calendar:['Calendar View','Journey schedule'],quotes:['Booking Quotes','Quotes and enquiries'],dispatch:['Dispatch Board','Manual journey dispatch control'],earnings:['Earnings','Revenue overview'],expenses:['Expenses','Cost tracking'],reports:['Reports','PDF / CSV reporting'],settings:['Settings','System configuration']};
function showPage(name){document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));$(pageMap[name]||pageMap.dashboard).classList.add('active');document.querySelectorAll('.nav-btn').forEach(n=>n.classList.toggle('active',n.dataset.page===name||(name==='dashboard'&&n.dataset.page==='dashboard')));$('pageTitle').textContent=(titles[name]||titles.dashboard)[0];$('pageSubtitle').textContent=(titles[name]||titles.dashboard)[1];if(name==='bookingForm')setTimeout(()=>initMapIfReady(),30);renderAll()}

function nextRef(){const nums=bookings.map(b=>Number(String(b.id).replace(/\D/g,''))||0);return `BK-${String(Math.max(0,...nums)+1).padStart(6,'0')}`}
function accountName(id){return accounts.find(a=>a.id===id)?.name||'—'}
function driverName(id){return drivers.find(d=>d.id===id)?.name||'Not Assigned'}
function vehicleForDriver(driverId){const d=drivers.find(x=>x.id===driverId);return vehicles.find(v=>v.id===d?.vehicleId)}
function vehicleText(vehicleId){const v=vehicles.find(x=>x.id===vehicleId);return v?`${[v.make,v.model].filter(Boolean).join(' ')} · ${v.reg}${v.color?` · ${v.color}`:''}`:'Not Assigned'}
function isActiveJourney(b){return !['Completed','Cancelled','Driver No Show','Pax No Show'].includes(b.dispatch)}
function countBy(arr,keyFn){return arr.reduce((m,x)=>{const k=keyFn(x)||'Other';m[k]=(m[k]||0)+1;return m},{})}

function renderAll(){populateSelects();renderDashboard();renderBookings();renderDrivers();renderAccounts();renderEarnings();renderCompliance();renderNotifications()}
window.resetDemoData=()=>{if(!confirm('Reset all browser test data and reload the professional demo records?'))return;['tbc_accounts_v3','tbc_vehicles_v3','tbc_drivers_v3','tbc_bookings_v3','tbc_quotes_v3','tbc_expenses_v3'].forEach(k=>localStorage.removeItem(k));location.reload()};
function populateSelects(){
 const src=$('bookingSource');if(src){const cur=src.value;src.innerHTML='<option value="">Select booking account</option>'+accounts.map(a=>`<option value="${a.id}">${a.name}</option>`).join('');if(accounts.some(a=>a.id===cur))src.value=cur}
 const drv=$('bookingDriver');if(drv){const cur=drv.value;drv.innerHTML='<option value="">Not assigned</option>'+drivers.map(d=>`<option value="${d.id}">${d.name}</option>`).join('');if(drivers.some(d=>d.id===cur))drv.value=cur}
}

function defaultDashboardRange(){const from=addDays(-3),to=addDays(2);if(!$('upcomingFrom').value)$('upcomingFrom').value=from;if(!$('upcomingTo').value)$('upcomingTo').value=to}
function renderDashboard(){
 defaultDashboardRange();
 const todays=bookings.filter(b=>b.date===todayISO());
 const active=bookings.filter(isActiveJourney);
 const inProcess=active.filter(b=>['Dispatched','On the Way','POB'].includes(b.dispatch));
 $('todayBookings').textContent=todays.length;
 $('upcomingCount').textContent=active.filter(b=>b.date>=todayISO()).length;
 $('inProcessCount').textContent=inProcess.length;
 $('completedToday').textContent=todays.filter(b=>b.dispatch==='Completed').length;
 $('todayRevenue').textContent=money(todays.filter(b=>b.dispatch==='Completed').reduce((s,b)=>s+Number(b.fare||0),0));
 const from=$('upcomingFrom').value,to=$('upcomingTo').value;
 const list=active.filter(b=>dateInRange(b.date,from,to)).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
 $('upcomingBody').innerHTML=list.length?list.map(upcomingRow).join(''):'<tr><td colspan="10" class="muted">No active journeys in this date range.</td></tr>';
 const month=todayISO().slice(0,7),monthBookings=bookings.filter(b=>b.date.startsWith(month));
 renderSourceVisual(monthBookings);
 renderBars('dispatchBars',countBy(active,b=>b.dispatch));
 $('monthRevenue').textContent=money(monthBookings.filter(b=>b.dispatch==='Completed').reduce((s,b)=>s+Number(b.fare||0),0));
}
function upcomingRow(b){const v=vehicles.find(x=>x.id===b.vehicleId),rowClass=b.complaint?'complaint-row':'';return `<tr class="${rowClass}">
<td class="ref-col"><span class="ref-link" onclick="editBooking('${b.id}')">${escapeHtml(b.id)}</span>${b.externalRef?`<div class="subline">Ext: ${escapeHtml(b.externalRef)}</div>`:''}</td>
<td class="date-col"><strong>${escapeHtml(b.date)}</strong><div class="subline">${escapeHtml(b.time)}</div></td>
<td class="passenger-col"><strong>${escapeHtml(b.passenger)}</strong><div class="subline">${escapeHtml(b.phone)}</div></td>
<td class="route-col"><strong>${escapeHtml(b.pickup)}</strong><div class="subline">→ ${escapeHtml(b.dropoff)}${b.vias?.length?` · ${b.vias.length} via`:''}</div></td>
<td class="driver-col"><select class="table-select" onchange="assignDriver('${b.id}',this.value)"><option value="">Not Assigned</option>${drivers.map(d=>`<option value="${d.id}" ${b.driverId===d.id?'selected':''}>${escapeHtml(d.name)}</option>`).join('')}</select></td>
<td class="vehicle-col"><div class="vehicle-cell">${v?`${escapeHtml(v.make)}<div class="subline">${escapeHtml(v.reg)} · ${escapeHtml(v.color||'')}</div>`:'Not Assigned'}</div></td>
<td class="dispatch-col"><select class="table-select status-select" style="${statusStyle(b.dispatch)}" onchange="updateDispatch('${b.id}',this.value)">${dispatchStatuses.map(s=>`<option ${b.dispatch===s?'selected':''}>${s}</option>`).join('')}</select></td>
<td class="source-col" style="background:${accountColor(b.sourceId)}">${sourceCell(b)}</td>
<td class="fare-col"><div class="fare-stack"><strong>Total ${money(b.fare)}</strong><span>Driver ${money(b.driverFare||0)}</span></div></td>
<td class="comment-col"><input class="inline-comment" value="${escapeHtml(b.dashboardComment||'')}" placeholder="Important staff comment..." onchange="saveDashboardComment('${b.id}',this.value)"></td>
<td class="complaint-col"><label class="flag-toggle complaint-toggle"><input type="checkbox" ${b.complaint?'checked':''} onchange="toggleComplaint('${b.id}',this.checked)"><span>${b.complaint?'Complaint':'No'}</span></label></td>
<td class="driver-paid-col ${b.driverPaid?'is-paid':'is-pending'}"><label class="flag-toggle paid-toggle"><input type="checkbox" ${b.driverPaid?'checked':''} onchange="toggleDriverPaid('${b.id}',this.checked)"><span>${b.driverPaid?'Paid':'Pending'}</span></label></td>
<td class="action-col"><button class="btn btn-light tiny" onclick="editBooking('${b.id}')">Open</button></td></tr>`}
window.saveDashboardComment=(id,value)=>{const b=bookings.find(x=>x.id===id);if(!b)return;b.dashboardComment=value.trim();persist();renderNotifications()};
window.toggleComplaint=(id,checked)=>{const b=bookings.find(x=>x.id===id);if(!b)return;b.complaint=Boolean(checked);persist();renderAll()};
window.toggleDriverPaid=(id,checked)=>{const b=bookings.find(x=>x.id===id);if(!b)return;b.driverPaid=Boolean(checked);persist();renderAll()};

function renderRevenueChart(){
 const el=$('revenueChart');if(!el)return;const now=new Date(),months=[];
 for(let i=5;i>=0;i--){const d=new Date(now.getFullYear(),now.getMonth()-i,1),key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`,label=d.toLocaleDateString('en-GB',{month:'short'});const value=bookedRevenue(bookings.filter(b=>b.date.startsWith(key)));months.push({key,label,value})}
 const max=Math.max(1,...months.map(x=>x.value));
 el.innerHTML=months.map(m=>`<div class="revenue-bar-wrap" title="${m.label}: ${money(m.value)}"><div class="revenue-tooltip">${money(m.value)}</div><div class="revenue-bar" style="height:${Math.max(8,(m.value/max)*100)}%"></div><span>${m.label}</span></div>`).join('');
}

function renderBookings(){
 initAllRange();const q=($('bookingSearch')?.value||'').trim().toLowerCase(),from=$('allFrom').value,to=$('allTo').value,status=$('allStatus')?.value||'';
 let list=bookings.filter(b=>dateInRange(b.date,from,to));if(q)list=list.filter(b=>searchableBooking(b).includes(q));if(status==='__active')list=list.filter(isActiveJourney);else if(status==='__process')list=list.filter(b=>['Dispatched','On the Way','POB'].includes(b.dispatch));else if(status)list=list.filter(b=>b.dispatch===status);list.sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time));
 $('allBookingsBody').innerHTML=list.length?list.map(b=>{const v=vehicles.find(x=>x.id===b.vehicleId),rowClass=b.complaint?'complaint-row':'';return `<tr class="${rowClass}"><td class="ref-col"><span class="ref-link" onclick="editBooking('${b.id}')">${escapeHtml(b.id)}</span>${b.externalRef?`<div class="subline">Ext: ${escapeHtml(b.externalRef)}</div>`:''}</td><td class="date-col"><strong>${b.date}</strong><div class="subline">${b.time}</div></td><td class="passenger-col"><strong>${escapeHtml(b.passenger)}</strong><div class="subline">${escapeHtml(b.phone)}</div></td><td class="route-col"><strong>${escapeHtml(b.pickup)}</strong><div class="subline">→ ${escapeHtml(b.dropoff)}</div></td><td class="source-col" style="background:${accountColor(b.sourceId)}">${sourceCell(b)}</td><td class="driver-col">${escapeHtml(driverName(b.driverId))}</td><td class="vehicle-col">${v?`${escapeHtml(v.make)}<div class="subline">${escapeHtml(v.reg)}</div>`:'Not Assigned'}</td><td class="dispatch-col"><select class="table-select status-select" style="${statusStyle(b.dispatch)}" onchange="updateDispatch('${b.id}',this.value)">${dispatchStatuses.map(s=>`<option ${b.dispatch===s?'selected':''}>${s}</option>`).join('')}</select></td><td class="fare-col"><div class="fare-stack"><strong>Total ${money(b.fare)}</strong><span>Driver ${money(b.driverFare||0)}</span></div></td><td class="comment-col"><input class="inline-comment" value="${escapeHtml(b.dashboardComment||'')}" placeholder="Staff comment..." onchange="saveDashboardComment('${b.id}',this.value)"></td><td class="complaint-col"><label class="flag-toggle complaint-toggle"><input type="checkbox" ${b.complaint?'checked':''} onchange="toggleComplaint('${b.id}',this.checked)"><span>${b.complaint?'Complaint':'No'}</span></label></td><td class="driver-paid-col ${b.driverPaid?'is-paid':'is-pending'}"><label class="flag-toggle paid-toggle"><input type="checkbox" ${b.driverPaid?'checked':''} onchange="toggleDriverPaid('${b.id}',this.checked)"><span>${b.driverPaid?'Paid':'Pending'}</span></label></td><td><button class="btn btn-light tiny" onclick="editBooking('${b.id}')">Open</button></td></tr>`}).join(''):'<tr><td colspan="13" class="muted">No bookings found.</td></tr>';
}

function renderAccounts(){const month=currentMonthPrefix();$('accountsGrid').innerHTML=accounts.map(a=>{const jobs=bookings.filter(b=>b.sourceId===a.id&&b.date.startsWith(month)),rev=bookedRevenue(jobs);return `<div class="manage-card account-card" style="border-top:4px solid ${a.color}"><div class="account-title"><div><h3>${escapeHtml(a.name)}</h3><p>${escapeHtml(a.regName||'Trading / account name')}</p></div><span class="account-color" style="background:${a.color}"></span></div><div class="account-details"><span>Company Reg No.<b>${escapeHtml(a.regNumber||'—')}</b></span><span>Main Phone<b>${escapeHtml(a.phone||'—')}</b></span><span>Email<b>${escapeHtml(a.email||'—')}</b></span><span>Accounts Email<b>${escapeHtml(a.accountsEmail||'—')}</b></span><span>Contact 1<b>${escapeHtml([a.contact1Name,a.contact1Phone].filter(Boolean).join(' · ')||'—')}</b></span><span>Contact 2<b>${escapeHtml([a.contact2Name,a.contact2Phone].filter(Boolean).join(' · ')||'—')}</b></span></div><div class="manage-meta"><div class="meta-box">Bookings this month<strong>${jobs.length}</strong></div><div class="meta-box">Booked Revenue<strong>${money(rev)}</strong></div></div>${a.notes?`<p class="account-notes">${escapeHtml(a.notes)}</p>`:''}</div>`}).join('')}

function renderCustomers(){const q=($('customerSearch')?.value||'').trim().toLowerCase(),map=new Map();bookings.forEach(b=>{const key=(b.phone||b.email||b.passenger).toLowerCase();if(!map.has(key))map.set(key,{name:b.passenger,phone:b.phone,email:b.email,jobs:0,revenue:0,last:''});const c=map.get(key);c.jobs++;c.revenue+=Number(b.fare||0);if(!c.last||b.date>c.last)c.last=b.date});let arr=[...map.values()];if(q)arr=arr.filter(c=>[c.name,c.phone,c.email].join(' ').toLowerCase().includes(q));$('customersGrid').innerHTML=arr.map(c=>`<div class="manage-card customer-card"><h3>${escapeHtml(c.name)}</h3><p>${escapeHtml(c.phone||'No phone')} · ${escapeHtml(c.email||'No email')}</p><div class="manage-meta"><div class="meta-box">Bookings<strong>${c.jobs}</strong></div><div class="meta-box">Total Value<strong>${money(c.revenue)}</strong></div><div class="meta-box">Last Journey<strong>${c.last||'—'}</strong></div></div></div>`).join('')||'<div class="manage-card">No customers found.</div>'}

function renderCalendar(){const el=$('calendarGrid');if(!el)return;const month=$('calendarMonth').value||currentMonthPrefix();if(!$('calendarMonth').value)$('calendarMonth').value=month;const [y,m]=month.split('-').map(Number),days=new Date(y,m,0).getDate(),first=new Date(y,m-1,1).getDay();let html=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(x=>`<div class="cal-head">${x}</div>`).join('');for(let i=0;i<first;i++)html+='<div class="cal-day empty"></div>';for(let d=1;d<=days;d++){const date=`${month}-${String(d).padStart(2,'0')}`,jobs=bookings.filter(b=>b.date===date).sort((a,b)=>a.time.localeCompare(b.time));html+=`<div class="cal-day ${date===todayISO()?'today':''}"><b>${d}</b><div class="cal-jobs">${jobs.slice(0,4).map(b=>`<button onclick="editBooking('${b.id}')"><span>${b.time}</span> ${escapeHtml(b.passenger)}</button>`).join('')}${jobs.length>4?`<small>+${jobs.length-4} more</small>`:''}</div></div>`}el.innerHTML=html}

function renderQuotes(){const el=$('quotesBody');if(!el)return;el.innerHTML=quotes.map(q=>`<tr><td><strong>${q.id}</strong></td><td>${q.date}</td><td><strong>${escapeHtml(q.passenger)}</strong><div class="subline">${escapeHtml(q.phone||'')}</div></td><td class="route-col">${escapeHtml(q.pickup)}<div class="subline">→ ${escapeHtml(q.dropoff)}</div></td><td>${sourceCell(q)}</td><td>${money(q.fare)}</td><td><span class="quote-status ${q.status.toLowerCase()}">${q.status}</span></td><td><button class="btn btn-light tiny" onclick="convertQuote('${q.id}')">Convert to Booking</button></td></tr>`).join('')||'<tr><td colspan="8">No quotes yet.</td></tr>'}
window.convertQuote=id=>{const q=quotes.find(x=>x.id===id);if(!q)return;openBookingForm();$('passengerName').value=q.passenger;$('passengerPhone').value=q.phone||'';$('bookingSource').value=q.sourceId||'';$('pickup').value=q.pickup;$('dropoff').value=q.dropoff;$('fare').value=q.fare||0;updateMargin();q.status='Converted';persist();renderQuotes()};

function renderDispatchBoard(){const el=$('dispatchBoard');if(!el)return;const q=($('dispatchSearch')?.value||'').toLowerCase(),groups=[['Assigned'],['Dispatched','On the Way'],['POB'],['Completed'],['Cancelled','Driver No Show','Pax No Show']];const labels=['Assigned','En Route / Dispatched','Passenger On Board','Completed','Closed / No Show'];el.innerHTML=groups.map((statuses,i)=>{let arr=bookings.filter(b=>statuses.includes(b.dispatch));if(q)arr=arr.filter(b=>searchableBooking(b).includes(q));arr.sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));return `<section class="dispatch-column"><div class="dispatch-head"><h3>${labels[i]}</h3><span>${arr.length}</span></div><div class="dispatch-cards">${arr.slice(0,20).map(b=>`<div class="dispatch-card ${b.complaint?'dispatch-complaint':''}"><div><strong>${b.id}</strong><span>${b.date} ${b.time}</span></div><b>${escapeHtml(b.passenger)}</b><p>${escapeHtml(b.pickup)} → ${escapeHtml(b.dropoff)}</p><div class="dispatch-card-bottom"><select onchange="assignDriver('${b.id}',this.value)"><option value="">No driver</option>${drivers.map(d=>`<option value="${d.id}" ${b.driverId===d.id?'selected':''}>${escapeHtml(d.name)}</option>`).join('')}</select><select style="${statusStyle(b.dispatch)}" onchange="updateDispatch('${b.id}',this.value)">${dispatchStatuses.map(s=>`<option ${s===b.dispatch?'selected':''}>${s}</option>`).join('')}</select></div></div>`).join('')||'<div class="dispatch-empty">No journeys</div>'}</div></section>`}).join('')}

function renderEarnings(){if(!$('earningsTotal'))return;const from=$('earningsFrom').value||addDays(-30),to=$('earningsTo').value||todayISO();if(!$('earningsFrom').value)$('earningsFrom').value=from;if(!$('earningsTo').value)$('earningsTo').value=to;const company=$('earningsCompany').value;let arr=bookings.filter(b=>dateInRange(b.date,from,to)&&b.dispatch!=='Cancelled');if(company)arr=arr.filter(b=>b.sourceId===company);const total=arr.reduce((s,b)=>s+Number(b.fare||0),0),driver=arr.reduce((s,b)=>s+Number(b.driverFare||0),0);$('earningsTotal').textContent=money(total);$('earningsDriver').textContent=money(driver);$('earningsMargin').textContent=money(total-driver);$('earningsJobs').textContent=arr.length;const byCompany={};arr.forEach(b=>{const n=accountName(b.sourceId);byCompany[n]=(byCompany[n]||0)+Number(b.fare||0)});const max=Math.max(1,...Object.values(byCompany));$('earningsChart').innerHTML=Object.entries(byCompany).sort((a,b)=>b[1]-a[1]).map(([n,v])=>`<div class="wide-bar-row"><span>${escapeHtml(n)}</span><div><i style="width:${v/max*100}%"></i></div><strong>${money(v)}</strong></div>`).join('')||'<div class="muted chart-empty">No earnings in this range.</div>'}

function renderExpenses(){if(!$('expensesBody'))return;const from=$('expenseFrom').value||addDays(-30),to=$('expenseTo').value||todayISO();if(!$('expenseFrom').value)$('expenseFrom').value=from;if(!$('expenseTo').value)$('expenseTo').value=to;const arr=expenses.filter(e=>dateInRange(e.date,from,to)).sort((a,b)=>b.date.localeCompare(a.date));$('expenseTotal').textContent=money(arr.reduce((s,e)=>s+Number(e.amount||0),0));$('expenseCount').textContent=arr.length;$('expensesBody').innerHTML=arr.map(e=>`<tr><td>${e.date}</td><td><span class="expense-cat">${escapeHtml(e.category)}</span></td><td>${escapeHtml(e.description)}</td><td>${escapeHtml(accountName(e.sourceId))}</td><td><strong>${money(e.amount)}</strong></td><td><button class="btn btn-danger tiny" onclick="deleteExpense('${e.id}')">Delete</button></td></tr>`).join('')||'<tr><td colspan="6">No expenses found.</td></tr>'}
window.deleteExpense=id=>{if(!confirm('Delete this expense?'))return;expenses=expenses.filter(e=>e.id!==id);persist();renderExpenses()};

function applyReportPreset(){const p=$('reportPreset').value,now=new Date();let from='',to='';const iso=d=>d.toISOString().slice(0,10);if(p==='thisWeek'||p==='lastWeek'){const d=new Date(now),day=(d.getDay()+6)%7;d.setDate(d.getDate()-day+(p==='lastWeek'?-7:0));from=iso(d);const e=new Date(d);e.setDate(e.getDate()+6);to=iso(e)}else if(p==='thisMonth'||p==='lastMonth'){const off=p==='lastMonth'?-1:0;const first=new Date(now.getFullYear(),now.getMonth()+off,1),last=new Date(now.getFullYear(),now.getMonth()+off+1,0);from=iso(first);to=iso(last)}if(from){$('reportFrom').value=from;$('reportTo').value=to}}
function reportList(){const from=$('reportFrom').value||addDays(-30),to=$('reportTo').value||todayISO(),q=($('reportSearch').value||'').toLowerCase(),company=$('reportCompany').value;let arr=bookings.filter(b=>dateInRange(b.date,from,to));if(q)arr=arr.filter(b=>searchableBooking(b).includes(q));if(company)arr=arr.filter(b=>b.sourceId===company);return arr.sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time))}
function renderReports(){if(!$('reportBody'))return;if(!$('reportFrom').value)$('reportFrom').value=addDays(-30);if(!$('reportTo').value)$('reportTo').value=todayISO();const arr=reportList(),total=arr.reduce((s,b)=>s+Number(b.fare||0),0),driver=arr.reduce((s,b)=>s+Number(b.driverFare||0),0);$('reportJobs').textContent=arr.length;$('reportRevenue').textContent=money(total);$('reportDriverFare').textContent=money(driver);$('reportMargin').textContent=money(total-driver);$('reportBody').innerHTML=arr.map(b=>`<tr class="${b.complaint?'complaint-row':''}"><td>${escapeHtml(b.id)}</td><td>${b.date}<div class="subline">${b.time}</div></td><td>${escapeHtml(b.passenger)}</td><td class="route-col">${escapeHtml(b.pickup)}<div class="subline">→ ${escapeHtml(b.dropoff)}</div></td><td class="source-col" style="background:${accountColor(b.sourceId)}">${sourceCell(b)}</td><td><span class="status-pill" style="${statusStyle(b.dispatch)}">${b.dispatch}</span></td><td>${money(b.fare)}</td><td>${money(b.driverFare||0)}</td><td><strong>${money(Number(b.fare||0)-Number(b.driverFare||0))}</strong></td><td><span class="status-pill ${b.complaint?'report-complaint':''}">${b.complaint?'Complaint':'—'}</span></td><td><span class="status-pill ${b.driverPaid?'report-paid':'report-pending'}">${b.driverPaid?'Paid':'Pending'}</span></td></tr>`).join('')||'<tr><td colspan="11">No report data.</td></tr>'}

// Working navigation / View all controls
function openBookingsView(kind){showPage('bookings');$('bookingSearch').value='';$('allStatus').value='';if(kind==='today'||kind==='revenue'||kind==='completed'){$('allFrom').value=todayISO();$('allTo').value=todayISO()}else{$('allFrom').value=addDays(-3);$('allTo').value=addDays(30)}if(kind==='upcoming')$('allStatus').value='__active';if(kind==='process')$('allStatus').value='__process';if(kind==='completed')$('allStatus').value='Completed';renderBookings()}
document.querySelectorAll('[data-kpi-view]').forEach(b=>b.onclick=()=>openBookingsView(b.dataset.kpiView));
document.querySelectorAll('[data-page-link]').forEach(b=>b.onclick=()=>showPage(b.dataset.pageLink));
document.querySelectorAll('[data-quick-report]').forEach(b=>b.onclick=()=>{showPage('reports');if(b.dataset.quickReport==='earnings')$('reportPreset').value='thisMonth';applyReportPreset();renderReports()});

// Dashboard / booking filtering
$('applyUpcomingRange').onclick=renderDashboard;$('dashboardSearch').addEventListener('input',renderDashboard);$('clearUpcomingFilter').onclick=()=>{$('upcomingFrom').value=addDays(-3);$('upcomingTo').value=addDays(2);$('dashboardSearch').value='';renderDashboard()};
$('applyAllRange').onclick=renderBookings;$('bookingSearch').addEventListener('input',renderBookings);$('allStatus').addEventListener('change',renderBookings);$('clearAllFilters').onclick=()=>{$('allFrom').value=addDays(-30);$('allTo').value=addDays(30);$('bookingSearch').value='';$('allStatus').value='';renderBookings()};
$('customerSearch').addEventListener('input',renderCustomers);$('calendarMonth').addEventListener('change',renderCalendar);$('calendarTodayBtn').onclick=()=>{$('calendarMonth').value=currentMonthPrefix();renderCalendar()};$('dispatchSearch').addEventListener('input',renderDispatchBoard);$('dispatchRefresh').onclick=renderDispatchBoard;$('applyEarnings').onclick=renderEarnings;$('earningsCompany').addEventListener('change',renderEarnings);$('expenseFrom').addEventListener('change',renderExpenses);$('expenseTo').addEventListener('change',renderExpenses);$('reportPreset').addEventListener('change',()=>{applyReportPreset();renderReports()});$('generateReport').onclick=renderReports;$('reportSearch').addEventListener('input',renderReports);$('reportCompany').addEventListener('change',renderReports);

// Richer Company / Account profile
$('addAccountBtn').onclick=()=>openSimpleModal('Add Company / Account',[
{name:'name',label:'Account / Display Name',required:true},{name:'regName',label:'Company Registered Name'},{name:'regNumber',label:'Company Registration Number'},{name:'vatNumber',label:'VAT Number'},{name:'phone',label:'Main Phone'},{name:'email',label:'General Email',type:'email'},{name:'accountsEmail',label:'Accounts / Billing Email',type:'email'},{name:'website',label:'Website'},{name:'address',label:'Company Address'},{name:'postcode',label:'Postcode'},{name:'contact1Name',label:'Contact Person 1 Name'},{name:'contact1Phone',label:'Contact Person 1 Number'},{name:'contact2Name',label:'Contact Person 2 Name'},{name:'contact2Phone',label:'Contact Person 2 Number'},{name:'paymentTerms',label:'Payment Terms / Credit Terms'},{name:'notes',label:'Account Notes'}
],d=>{const idx=accounts.length;accounts.push({id:'ACC-'+Date.now(),...d,color:sourcePalette[idx%sourcePalette.length]})});

$('addQuoteBtn').onclick=()=>openSimpleModal('New Booking Quote',[{name:'passenger',label:'Passenger / Client Name',required:true},{name:'phone',label:'Phone'},{name:'date',label:'Quote Date',type:'date',required:true},{name:'pickup',label:'Pickup',required:true},{name:'dropoff',label:'Drop-off',required:true},{name:'sourceId',label:'Company / Account',type:'select',options:accounts.map(a=>({value:a.id,label:a.name}))},{name:'fare',label:'Quoted Fare (£)',type:'number',required:true}],d=>quotes.push({id:'QT-'+String(Date.now()).slice(-6),...d,fare:Number(d.fare||0),status:'Open'}));
$('addExpenseBtn').onclick=()=>openSimpleModal('Add Expense',[{name:'date',label:'Date',type:'date',required:true},{name:'category',label:'Category',type:'select',options:['Fuel','Parking','Tolls','Driver Payment','Vehicle Maintenance','Insurance','Office','Refund','Other'].map(x=>({value:x,label:x}))},{name:'description',label:'Description',required:true},{name:'sourceId',label:'Company / Account',type:'select',options:[{value:'',label:'General / No Account'},...accounts.map(a=>({value:a.id,label:a.name}))]},{name:'amount',label:'Amount (£)',type:'number',required:true}],d=>expenses.push({id:'EXP-'+Date.now(),...d,amount:Number(d.amount||0)}));

// Report CSV now obeys report filters
function exportCsv(){const arr=reportList();const headers=['Booking Ref','External Ref','Date','Time','Passenger','Phone','Source','Pickup','Via','Drop-off','Driver','Vehicle','Dispatch','Total Fare','Driver Fare','Company Margin','Complaint','Driver Payment','Staff Comment','Driver Notes','Office Comments'];const esc=v=>'"'+String(v??'').replaceAll('"','""')+'"';const csv=[headers.join(','),...arr.map(b=>[b.id,b.externalRef,b.date,b.time,b.passenger,b.phone,accountName(b.sourceId),b.pickup,(b.vias||[]).join(' | '),b.dropoff,driverName(b.driverId),vehicleText(b.vehicleId),b.dispatch,b.fare,b.driverFare||0,Number(b.fare||0)-Number(b.driverFare||0),b.complaint?'Yes':'No',b.driverPaid?'Paid':'Pending',b.dashboardComment,b.driverNotes,b.officeComments].map(esc).join(','))].join('\n');const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`taxi-report-${$('reportFrom').value||'all'}-to-${$('reportTo').value||'all'}.csv`;a.click();URL.revokeObjectURL(a.href)}
$('downloadCsv').onclick=exportCsv;$('printReport').onclick=()=>window.print();

// Global search takes staff straight to All Bookings
$('globalSearch').addEventListener('keydown',e=>{if(e.key==='Enter'){showPage('bookings');$('bookingSearch').value=e.target.value;renderBookings()}});

persist();renderAll();
