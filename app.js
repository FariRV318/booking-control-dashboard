const $=id=>document.getElementById(id);
const todayISO=()=>new Date().toISOString().slice(0,10);
const money=v=>`£${Number(v||0).toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const store=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const load=(k,fallback)=>{try{return JSON.parse(localStorage.getItem(k))??fallback}catch{return fallback}};
const addDays=(n)=>{const d=new Date();d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)};
const dateInRange=(date,from,to)=>(!from||date>=from)&&(!to||date<=to);

const defaultAccounts=[
{id:'ACC-OWN',name:'Own Company',phone:'',email:''},
{id:'ACC-HOTEL',name:'Hotel ABC',phone:'',email:''},
{id:'ACC-UBER',name:'Uber Account',phone:'',email:''},
{id:'ACC-XYZ',name:'Company XYZ',phone:'',email:''},
{id:'ACC-PARTNER',name:'Partner Company',phone:'',email:''}
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
// V3.3 demo examples for complaint/payment/no-show workflows.
defaultBookings[0].dashboardComment='Payment due today';
defaultBookings[0].driverPaid=true;
defaultBookings[2].complaint=true;
defaultBookings[2].dashboardComment='Complaint: office manager to follow up';
defaultBookings[4].dispatch='Pax No Show';
defaultBookings[6].driverPaid=true;

let accounts=load('tbc_accounts_v3',load('tbc_accounts_v2',defaultAccounts));
let vehicles=load('tbc_vehicles_v3',load('tbc_vehicles_v2',defaultVehicles));
let drivers=load('tbc_drivers_v3',load('tbc_drivers_v2',defaultDrivers));
let bookings=load('tbc_bookings_v3',load('tbc_bookings_v2',defaultBookings));
if(bookings.length<8) bookings=defaultBookings;

function persist(){store('tbc_accounts_v3',accounts);store('tbc_vehicles_v3',vehicles);store('tbc_drivers_v3',drivers);store('tbc_bookings_v3',bookings)}

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
function upcomingRow(b){const v=vehicles.find(x=>x.id===b.vehicleId);return `<tr><td><span class="ref-link" onclick="editBooking('${b.id}')">${b.id}</span>${b.externalRef?`<div class="subline">Ext: ${b.externalRef}</div>`:''}</td><td><strong>${b.date}</strong><div class="subline">${b.time}</div></td><td><strong>${b.passenger}</strong><div class="subline">${b.phone}</div></td><td><strong>${b.pickup}</strong><div class="subline">→ ${b.dropoff}${b.vias?.length?` · ${b.vias.length} via`:''}</div></td><td><select class="table-select" onchange="assignDriver('${b.id}',this.value)"><option value="">Not Assigned</option>${drivers.map(d=>`<option value="${d.id}" ${b.driverId===d.id?'selected':''}>${d.name}</option>`).join('')}</select></td><td><div class="vehicle-cell">${v?`${v.make}<div class="subline">${v.reg}</div>`:'Not Assigned'}</div></td><td><select class="table-select" onchange="updateDispatch('${b.id}',this.value)">${dispatchStatuses.map(s=>`<option ${b.dispatch===s?'selected':''}>${s}</option>`).join('')}</select></td><td>${accountName(b.sourceId)}</td><td><div class="fare-stack"><strong>Total ${money(b.fare)}</strong><span>Driver ${money(b.driverFare||0)}</span></div></td><td><button class="btn btn-light tiny" onclick="editBooking('${b.id}')">Open</button></td></tr>`}
function renderSourceVisual(arr){const counts=countBy(arr,b=>accountName(b.sourceId));const entries=Object.entries(counts);$('sourceTotal').textContent=arr.length;const colors=['#2f6ff0','#22a864','#f6a11f','#de3c4b','#7f70e8'];$('sourceLegend').innerHTML=entries.slice(0,5).map(([name,count],i)=>`<div class="legend-item"><span class="legend-dot" style="background:${colors[i%colors.length]}"></span><span>${name}</span><strong>${count}</strong></div>`).join('')||'<div class="muted">No bookings</div>'}
function renderBars(id,obj){const el=$(id);if(!el)return;const max=Math.max(1,...Object.values(obj));el.innerHTML=Object.entries(obj).map(([name,count])=>`<div class="bar-row"><span>${name}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.max(8,count/max*100)}%"></div></div><strong>${count}</strong></div>`).join('')||'<div class="muted">No data</div>'}
$('applyUpcomingRange').onclick=renderDashboard;
window.assignDriver=(id,driverId)=>{const b=bookings.find(x=>x.id===id);if(!b)return;b.driverId=driverId;b.vehicleId=driverId?(vehicleForDriver(driverId)?.id||''):'';if(driverId&&!b.dispatch)b.dispatch='Assigned';persist();renderAll()};
window.updateDispatch=(id,status)=>{const b=bookings.find(x=>x.id===id);if(!b)return;b.dispatch=status;persist();renderAll()};

function initAllRange(){if(!$('allFrom').value)$('allFrom').value=addDays(-30);if(!$('allTo').value)$('allTo').value=addDays(30)}
function renderBookings(){
 initAllRange();const q=($('bookingSearch')?.value||'').trim().toLowerCase();const from=$('allFrom').value,to=$('allTo').value;
 let list=bookings.filter(b=>dateInRange(b.date,from,to));
 if(q)list=list.filter(b=>[b.id,b.externalRef,b.passenger,b.phone,b.pickup,b.dropoff,accountName(b.sourceId),driverName(b.driverId)].join(' ').toLowerCase().includes(q));
 list.sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time));
 $('allBookingsBody').innerHTML=list.length?list.map(b=>{const v=vehicles.find(x=>x.id===b.vehicleId);return `<tr><td><span class="ref-link" onclick="editBooking('${b.id}')">${b.id}</span>${b.externalRef?`<div class="subline">Ext: ${b.externalRef}</div>`:''}</td><td><strong>${b.date}</strong><div class="subline">${b.time}</div></td><td><strong>${b.passenger}</strong><div class="subline">${b.phone}</div></td><td><strong>${b.pickup}</strong><div class="subline">→ ${b.dropoff}</div></td><td>${accountName(b.sourceId)}</td><td>${driverName(b.driverId)}</td><td>${v?`${v.make}<div class="subline">${v.reg}</div>`:'Not Assigned'}</td><td>${b.dispatch}</td><td><div class="fare-stack"><strong>Total ${money(b.fare)}</strong><span>Driver ${money(b.driverFare||0)}</span></div></td><td><button class="btn btn-light tiny" onclick="editBooking('${b.id}')">Open</button></td></tr>`}).join(''):'<tr><td colspan="10" class="muted">No bookings found.</td></tr>';
}
$('applyAllRange').onclick=renderBookings;$('bookingSearch').addEventListener('input',renderBookings);

function setupNumberSelect(id,max,start=0){$(id).innerHTML=Array.from({length:max-start+1},(_,i)=>`<option>${i+start}</option>`).join('')}
setupNumberSelect('passengerCount',8,1);setupNumberSelect('handCarry',10,0);setupNumberSelect('suitcases',10,0);
function clearBookingForm(){
 $('bookingForm').reset();$('bookingId').value='';$('ourRef').value=nextRef();$('journeyDate').value=todayISO();$('journeyTime').value='12:00';$('returnFields').classList.add('hidden');$('viaContainer').innerHTML='';$('viaCount').textContent='0';$('bookingVehicle').value='';$('vehicleClassRequested').value='Saloon';$('driverFare').value='0';updateMargin();$('routeMiles').textContent='—';$('routeTime').textContent='—';$('deleteBookingBtn').classList.add('hidden');document.querySelectorAll('.req').forEach(x=>x.checked=false);if(directionsRenderer)directionsRenderer.set('directions',null)}
function openBookingForm(){clearBookingForm();showPage('bookingForm')}
$('resetBookingBtn').onclick=()=>clearBookingForm();$('saveBookingTop').onclick=()=>{if($('bookingForm').reportValidity())$('bookingForm').requestSubmit()};
$('waitReturn').addEventListener('change',()=>$('returnFields').classList.toggle('hidden',!$('waitReturn').checked));
$('bookingDriver').addEventListener('change',()=>{const v=vehicleForDriver($('bookingDriver').value);$('bookingVehicle').value=v?`${[v.make,v.model].filter(Boolean).join(' ')} · ${v.reg}${v.color?` · ${v.color}`:''}`:''});
function updateMargin(){if(!$('companyMargin'))return;$('companyMargin').textContent=money(Number($('fare').value||0)-Number($('driverFare').value||0))}
$('fare').addEventListener('input',updateMargin);$('driverFare').addEventListener('input',updateMargin);

function addVia(value=''){const row=document.createElement('div');row.className='route-row via-route';row.innerHTML=`<span class="marker via">V</span><label>Via<input class="via-input map-address" placeholder="Additional point" value="${String(value).replaceAll('"','&quot;')}"></label><button type="button" class="remove-via">×</button>`;row.querySelector('.remove-via').onclick=()=>{row.remove();updateRoutePreview();calculateRoute()};$('viaContainer').appendChild(row);attachAutocomplete(row.querySelector('input'));row.querySelector('input').addEventListener('change',()=>{updateRoutePreview();calculateRoute()});updateRoutePreview()}
$('addViaBtn').onclick=()=>addVia('');
function updateRoutePreview(){$('viaCount').textContent=document.querySelectorAll('.via-input').length}
['pickup','dropoff'].forEach(id=>$(id).addEventListener('input',updateRoutePreview));

$('bookingForm').addEventListener('submit',e=>{e.preventDefault();saveBooking()});
function saveBooking(){
 const id=$('bookingId').value||$('ourRef').value||nextRef();const driverId=$('bookingDriver').value;const requirements=[...document.querySelectorAll('.req:checked')].map(x=>x.value);
 const data={id,date:$('journeyDate').value,time:$('journeyTime').value,passenger:$('passengerName').value.trim(),phone:$('passengerPhone').value.trim(),email:$('passengerEmail').value.trim(),sourceId:$('bookingSource').value,externalRef:$('externalRef').value.trim(),pickup:$('pickup').value.trim(),vias:[...document.querySelectorAll('.via-input')].map(x=>x.value.trim()).filter(Boolean),dropoff:$('dropoff').value.trim(),journeyType:$('journeyType').value,waitReturn:$('waitReturn').checked,waitingMinutes:Number($('waitingMinutes').value||0),returnDate:$('returnDate').value,returnTime:$('returnTime').value,flightNumber:$('flightNumber').value.trim(),airline:$('airline').value.trim(),terminal:$('terminal').value.trim(),arrivalTime:$('arrivalTime').value,passengers:Number($('passengerCount').value||1),handCarry:Number($('handCarry').value||0),suitcases:Number($('suitcases').value||0),requirements,otherRequirement:$('otherRequirement').value.trim(),vehicleClassRequested:$('vehicleClassRequested').value,driverId,vehicleId:driverId?(vehicleForDriver(driverId)?.id||''):'',dispatch:(bookings.find(b=>b.id===id)?.dispatch)||'Assigned',fare:Number($('fare').value||0),driverFare:Number($('driverFare').value||0),payment:$('paymentMethod').value,driverNotes:$('driverNotes').value.trim(),officeComments:$('officeComments').value.trim(),dashboardComment:(bookings.find(b=>b.id===id)?.dashboardComment)||'',distanceMiles:$('routeMiles').textContent==='—'?'':$('routeMiles').textContent,durationText:$('routeTime').textContent==='—'?'':$('routeTime').textContent};
 const idx=bookings.findIndex(b=>b.id===id);if(idx>=0)bookings[idx]={...bookings[idx],...data};else bookings.push(data);persist();showPage('bookings')
}
window.editBooking=id=>{const b=bookings.find(x=>x.id===id);if(!b)return;clearBookingForm();$('bookingId').value=b.id;$('ourRef').value=b.id;$('journeyDate').value=b.date;$('journeyTime').value=b.time;$('passengerName').value=b.passenger;$('passengerPhone').value=b.phone;$('passengerEmail').value=b.email||'';$('bookingSource').value=b.sourceId||'';$('externalRef').value=b.externalRef||'';$('journeyType').value=b.journeyType||'One Way';$('waitReturn').checked=!!b.waitReturn;$('returnFields').classList.toggle('hidden',!b.waitReturn);$('waitingMinutes').value=b.waitingMinutes||0;$('returnDate').value=b.returnDate||'';$('returnTime').value=b.returnTime||'';$('flightNumber').value=b.flightNumber||'';$('airline').value=b.airline||'';$('terminal').value=b.terminal||'';$('arrivalTime').value=b.arrivalTime||'';$('pickup').value=b.pickup||'';(b.vias||[]).forEach(addVia);$('dropoff').value=b.dropoff||'';$('passengerCount').value=String(b.passengers||1);$('handCarry').value=String(b.handCarry||0);$('suitcases').value=String(b.suitcases||0);$('vehicleClassRequested').value=b.vehicleClassRequested||'Saloon';document.querySelectorAll('.req').forEach(x=>x.checked=(b.requirements||[]).includes(x.value));$('otherRequirement').value=b.otherRequirement||'';$('bookingDriver').value=b.driverId||'';$('bookingVehicle').value=b.vehicleId?vehicleText(b.vehicleId):'';$('fare').value=b.fare||0;$('driverFare').value=b.driverFare||0;updateMargin();$('paymentMethod').value=b.payment||'Account';$('driverNotes').value=b.driverNotes||'';$('officeComments').value=b.officeComments||'';$('routeMiles').textContent=b.distanceMiles||'—';$('routeTime').textContent=b.durationText||'—';$('deleteBookingBtn').classList.remove('hidden');updateRoutePreview();showPage('bookingForm');setTimeout(calculateRoute,300)};
$('deleteBookingBtn').onclick=()=>{const id=$('bookingId').value;if(!id)return;if(confirm(`Delete ${id}? This removes the booking from this browser.`)){bookings=bookings.filter(b=>b.id!==id);persist();showPage('bookings')}};

function renderDrivers(){$('driversGrid').innerHTML=drivers.length?drivers.map(d=>{const v=vehicles.find(x=>x.id===d.vehicleId)||{};return `<div class="manage-card driver-vehicle-card"><div class="driver-card-head"><div><h3>${d.name}</h3><p>${d.callSign?`Call Sign: ${d.callSign} · `:''}${d.phone||'No phone'}</p></div><span class="vehicle-class-pill">${v.vehicleClass||'Vehicle class not set'}</span></div><div class="driver-vehicle-summary"><div><span>Driver</span><b>${d.licenceNumber||'Licence no. not set'}</b><small>${d.email||'No email'}</small></div><div><span>Vehicle</span><b>${v.reg||'Not assigned'}</b><small>${[v.make,v.model,v.color].filter(Boolean).join(' · ')||'No vehicle details'}</small></div></div><div class="manage-meta four-meta"><div class="meta-box">Driving Licence<strong class="${expiryClass(d.licenceExpiry)}">${d.licenceExpiry||'Not set'}</strong></div><div class="meta-box">PCO / PHV Driver<strong class="${expiryClass(d.pcoExpiry)}">${d.pcoExpiry||'Not set'}</strong></div><div class="meta-box">MOT<strong class="${expiryClass(v.motExpiry)}">${v.motExpiry||'Not set'}</strong></div><div class="meta-box">Insurance<strong class="${expiryClass(v.insuranceExpiry)}">${v.insuranceExpiry||'Not set'}</strong></div><div class="meta-box">Vehicle Licence<strong class="${expiryClass(v.phvExpiry)}">${v.phvExpiry||'Not set'}</strong></div><div class="meta-box">Road Tax<strong class="${expiryClass(v.roadTaxExpiry)}">${v.roadTaxExpiry||'Not set'}</strong></div><div class="meta-box">Seats<strong>${v.seats||'—'}</strong></div><div class="meta-box">Colour<strong>${v.color||'—'}</strong></div></div>${d.notes?`<p class="driver-notes-preview">${d.notes}</p>`:''}</div>`}).join(''):'<div class="manage-card"><h3>No driver & vehicle records yet</h3><p>Use Add Driver & Vehicle to create the first profile.</p></div>'}
function renderAccounts(){const month=todayISO().slice(0,7);$('accountsGrid').innerHTML=accounts.map(a=>{const jobs=bookings.filter(b=>b.sourceId===a.id&&b.date.startsWith(month));const rev=jobs.reduce((s,b)=>s+Number(b.fare||0),0);return `<div class="manage-card"><h3>${a.name}</h3><p>${a.phone||'Booking source account'}</p><div class="manage-meta"><div class="meta-box">Bookings this month<strong>${jobs.length}</strong></div><div class="meta-box">Revenue<strong>${money(rev)}</strong></div></div></div>`}).join('')}
function renderEarnings(){$('earningsTotal').textContent=money(bookings.filter(b=>b.dispatch==='Completed').reduce((s,b)=>s+Number(b.fare||0),0))}
function daysUntil(date){if(!date)return 9999;return Math.ceil((new Date(date+'T12:00')-new Date())/86400000)}
function expiryClass(date){const d=daysUntil(date);return d<0?'expiry-bad':d<=30?'expiry-warn':'expiry-ok'}
function renderCompliance(){let alerts=[];const add=(label,date)=>{const n=daysUntil(date);if(n<=30)alerts.push(`${label} ${n<0?'expired':`expires in ${n} days`}`)};drivers.forEach(d=>{add(`${d.name} driving licence`,d.licenceExpiry);add(`${d.name} PCO / PHV driver licence`,d.pcoExpiry);const v=vehicles.find(x=>x.id===d.vehicleId);if(v){add(`${v.reg} MOT`,v.motExpiry);add(`${v.reg} insurance`,v.insuranceExpiry);add(`${v.reg} vehicle licence`,v.phvExpiry);add(`${v.reg} road tax`,v.roadTaxExpiry)}});$('complianceAlerts').innerHTML=alerts.length?alerts.slice(0,4).map(a=>`<div class="alert-item"><span class="alert-warn">⚠ ${a}</span></div>`).join(''):'<div class="alert-item"><span class="expiry-ok">✓ No documents expiring within 30 days</span></div>'}
function renderNotifications(){const recent=[...bookings].sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time)).slice(0,4);$('notificationsList').innerHTML=recent.map((b,i)=>`<div class="notification-item">○ ${i%2?'Journey updated':'New booking received'}: <strong>${b.id}</strong></div>`).join('')}

const modal=$('simpleModal'),modalForm=$('simpleModalForm');$('simpleModalClose').onclick=()=>modal.classList.add('hidden');
function openSimpleModal(title,fields,onSave){$('simpleModalTitle').textContent=title;modalForm.innerHTML=fields.map(f=>`<label>${f.label}${f.type==='select'?`<select name="${f.name}">${f.options.map(o=>`<option value="${o.value}">${o.label}</option>`).join('')}</select>`:`<input name="${f.name}" type="${f.type||'text'}" ${f.required?'required':''}>`}</label>`).join('')+`<div class="modal-actions"><button type="button" class="btn btn-light" id="modalCancel">Cancel</button><button class="btn btn-primary" type="submit">Save</button></div>`;modal.classList.remove('hidden');$('modalCancel').onclick=()=>modal.classList.add('hidden');modalForm.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(modalForm));onSave(d);modal.classList.add('hidden');persist();renderAll()}}
$('addAccountBtn').onclick=()=>openSimpleModal('Add Company / Account',[{name:'name',label:'Company / Account Name',required:true},{name:'phone',label:'Phone'},{name:'email',label:'Email',type:'email'}],d=>accounts.push({id:'ACC-'+Date.now(),...d}));
$('addDriverBtn').onclick=()=>openSimpleModal('Add Driver & Vehicle',[
{name:'name',label:'Driver Full Name',required:true},{name:'phone',label:'Phone Number',required:true},{name:'email',label:'Driver Email',type:'email'},{name:'address',label:'Driver Address'},{name:'callSign',label:'Driver ID / Call Sign'},{name:'licenceNumber',label:'Driving Licence Number'},{name:'licenceExpiry',label:'Driving Licence Expiry',type:'date'},{name:'pcoNumber',label:'PCO / PHV Driver Licence Number'},{name:'pcoExpiry',label:'PCO / PHV Driver Licence Expiry',type:'date'},
{name:'reg',label:'Vehicle Registration',required:true},{name:'make',label:'Vehicle Make',required:true},{name:'model',label:'Vehicle Model',required:true},{name:'year',label:'Vehicle Year',type:'number'},{name:'color',label:'Vehicle Colour',required:true},{name:'vehicleClass',label:'Vehicle Class',type:'select',options:['Saloon','Estate','MPV','Minivan','Executive Saloon','Executive MPV','Luxury / VIP','8-Seater / Large MPV','Wheelchair Accessible','Other'].map(x=>({value:x,label:x}))},{name:'seats',label:'Number of Seats',type:'number'},
{name:'motExpiry',label:'MOT Expiry',type:'date'},{name:'insuranceProvider',label:'Insurance Provider'},{name:'insurancePolicy',label:'Insurance Policy Number'},{name:'insuranceExpiry',label:'Insurance Expiry',type:'date'},{name:'phvLicence',label:'PHV / Vehicle Licence Number'},{name:'phvExpiry',label:'PHV / Vehicle Licence Expiry',type:'date'},{name:'roadTaxExpiry',label:'Road Tax Expiry',type:'date'},{name:'notes',label:'Driver / Vehicle Notes'}
],d=>{const stamp=Date.now(),vehicleId='VEH-'+stamp;vehicles.push({id:vehicleId,reg:d.reg,make:d.make,model:d.model,year:d.year,color:d.color,vehicleClass:d.vehicleClass,seats:d.seats,motExpiry:d.motExpiry,insuranceProvider:d.insuranceProvider,insurancePolicy:d.insurancePolicy,insuranceExpiry:d.insuranceExpiry,phvLicence:d.phvLicence,phvExpiry:d.phvExpiry,roadTaxExpiry:d.roadTaxExpiry});drivers.push({id:'DRV-'+stamp,name:d.name,phone:d.phone,email:d.email,address:d.address,callSign:d.callSign,licenceNumber:d.licenceNumber,licenceExpiry:d.licenceExpiry,pcoNumber:d.pcoNumber,pcoExpiry:d.pcoExpiry,vehicleId,notes:d.notes})});



function exportCsv(){const headers=['Booking Ref','External Ref','Date','Time','Passenger','Phone','Source','Pickup','Via','Drop-off','Passengers','Hand Carry','Suitcases','Vehicle Class Requested','Requirements','Flight Number','Driver','Vehicle','Dispatch','Total Fare','Driver Fare','Company Margin','Payment','Driver Notes','Office Comments'];const esc=v=>'"'+String(v??'').replaceAll('"','""')+'"';const csv=[headers.join(','),...bookings.map(b=>[b.id,b.externalRef,b.date,b.time,b.passenger,b.phone,accountName(b.sourceId),b.pickup,(b.vias||[]).join(' | '),b.dropoff,b.passengers,b.handCarry,b.suitcases,b.vehicleClassRequested||'',(b.requirements||[]).join(' | '),b.flightNumber,driverName(b.driverId),vehicleText(b.vehicleId),b.dispatch,b.fare,b.driverFare||0,Number(b.fare||0)-Number(b.driverFare||0),b.payment,b.driverNotes,b.officeComments].map(esc).join(','))].join('\n');const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`taxi-bookings-${todayISO()}.csv`;a.click();URL.revokeObjectURL(a.href)}
$('downloadCsv').onclick=exportCsv;$('printReport').onclick=()=>window.print();

let googleReady=false,map,directionsService,directionsRenderer;
window.initTaxiMaps=function(){googleReady=true;initMapIfReady();document.querySelectorAll('.map-address').forEach(attachAutocomplete)};
function initMapIfReady(){if(!googleReady||!$('map'))return;if(!map){map=new google.maps.Map($('map'),{center:{lat:51.5074,lng:-0.1278},zoom:9,mapTypeControl:false,streetViewControl:false});directionsService=new google.maps.DirectionsService();directionsRenderer=new google.maps.DirectionsRenderer({map,preserveViewport:false})}document.querySelectorAll('.map-address').forEach(attachAutocomplete)}
function attachAutocomplete(input){if(!googleReady||!input||input.dataset.ac)return;input.dataset.ac='1';const ac=new google.maps.places.Autocomplete(input,{componentRestrictions:{country:'gb'},fields:['formatted_address','geometry','name']});ac.addListener('place_changed',()=>{const p=ac.getPlace();if(p.formatted_address)input.value=p.formatted_address;updateRoutePreview();calculateRoute()})}
function calculateRoute(){if(!googleReady||!directionsService)return;const origin=$('pickup').value.trim(),destination=$('dropoff').value.trim();if(!origin||!destination)return;const waypoints=[...document.querySelectorAll('.via-input')].map(i=>i.value.trim()).filter(Boolean).map(location=>({location,stopover:true}));directionsService.route({origin,destination,waypoints,travelMode:google.maps.TravelMode.DRIVING,provideRouteAlternatives:false},(result,status)=>{if(status!=='OK')return;directionsRenderer.setDirections(result);const legs=result.routes[0].legs;const metres=legs.reduce((s,l)=>s+(l.distance?.value||0),0);const seconds=legs.reduce((s,l)=>s+(l.duration?.value||0),0);$('routeMiles').textContent=(metres/1609.344).toFixed(1);const h=Math.floor(seconds/3600),m=Math.round((seconds%3600)/60);$('routeTime').textContent=h?`${h}h ${m}m`:`${m}m`})}
['pickup','dropoff'].forEach(id=>$(id).addEventListener('change',calculateRoute));
function loadGoogle(){const key=window.TAXI_CONFIG?.googleMapsApiKey?.trim();if(!key)return;const s=document.createElement('script');s.src=`https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=places&callback=initTaxiMaps`;s.async=true;s.defer=true;document.head.appendChild(s)}
loadGoogle();



// ==================== V3.2 PROFESSIONAL OPERATIONS UPDATE ====================
const sourcePalette=['#dfeaff','#e3f6ea','#fff0d9','#f0e8ff','#ffe5ec','#e5f7f6','#fff7d6','#e8eef9','#fce8df','#e6f0ff'];
const statusPalette={Assigned:['#fff4d7','#9b6600'],Dispatched:['#e6efff','#2358b8'],'On the Way':['#e8e5ff','#5b43b5'],POB:['#def5ec','#15744f'],Completed:['#dcf4e4','#16703e'],Cancelled:['#ffe3e5','#aa2933'],'Driver No Show':['#fde7ef','#9b1c4d'],'Pax No Show':['#fbe9d8','#9a4d00']};
const dispatchStatuses=['Assigned','Dispatched','On the Way','POB','Completed','Cancelled','Driver No Show','Pax No Show'];
const defaultQuotes=[{id:'QT-000101',date:todayISO(),passenger:'Demo Enquiry',phone:'+44 7700 010101',pickup:'Heathrow Airport',dropoff:'Central London',sourceId:'ACC-OWN',fare:72,status:'Open'}];
const defaultExpenses=[{id:'EXP-1',date:todayISO(),category:'Parking',description:'Airport parking',sourceId:'ACC-OWN',amount:18.50}];
let quotes=load('tbc_quotes_v3',defaultQuotes);
let expenses=load('tbc_expenses_v3',defaultExpenses);
bookings=bookings.map(b=>({...b,dashboardComment:b.dashboardComment||'',complaint:!!b.complaint,driverPaid:!!b.driverPaid}));
accounts=accounts.map((a,i)=>({...a,regName:a.regName||'',regNumber:a.regNumber||'',address:a.address||'',postcode:a.postcode||'',website:a.website||'',accountsEmail:a.accountsEmail||'',contact1Name:a.contact1Name||'',contact1Phone:a.contact1Phone||'',contact2Name:a.contact2Name||'',contact2Phone:a.contact2Phone||'',vatNumber:a.vatNumber||'',paymentTerms:a.paymentTerms||'',notes:a.notes||'',color:a.color||sourcePalette[i%sourcePalette.length]}));
const oldPersist=persist;
persist=function(){oldPersist();store('tbc_quotes_v3',quotes);store('tbc_expenses_v3',expenses)};

function escapeHtml(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function accountObj(id){return accounts.find(a=>a.id===id)}
function accountColor(id){return accountObj(id)?.color||'#edf2fa'}
function textOnSoft(){return '#24364f'}
function statusStyle(s){const p=statusPalette[s]||['#edf1f6','#44546a'];return `background:${p[0]};color:${p[1]}`}
function sourceCell(b){return `<span class="source-pill" style="background:${accountColor(b.sourceId)};color:${textOnSoft()}">${escapeHtml(accountName(b.sourceId))}</span>`}
function searchableBooking(b){return [b.id,b.externalRef,b.passenger,b.phone,b.email,b.pickup,(b.vias||[]).join(' '),b.dropoff,accountName(b.sourceId),driverName(b.driverId),vehicleText(b.vehicleId),b.flightNumber,b.dispatch,b.dashboardComment,b.officeComments].join(' ').toLowerCase()}
function currentMonthPrefix(){return todayISO().slice(0,7)}
function bookedRevenue(arr){return arr.filter(b=>b.dispatch!=='Cancelled').reduce((s,b)=>s+Number(b.fare||0),0)}

function populateSelects(){
 const src=$('bookingSource');if(src){const cur=src.value;src.innerHTML='<option value="">Select booking account</option>'+accounts.map(a=>`<option value="${a.id}">${escapeHtml(a.name)}</option>`).join('');if(accounts.some(a=>a.id===cur))src.value=cur}
 const drv=$('bookingDriver');if(drv){const cur=drv.value;drv.innerHTML='<option value="">Not assigned</option>'+drivers.map(d=>`<option value="${d.id}">${escapeHtml(d.name)}</option>`).join('');if(drivers.some(d=>d.id===cur))drv.value=cur}
 ['reportCompany','earningsCompany'].forEach(id=>{const el=$(id);if(!el)return;const cur=el.value;el.innerHTML='<option value="">All Companies / Accounts</option>'+accounts.map(a=>`<option value="${a.id}">${escapeHtml(a.name)}</option>`).join('');if(accounts.some(a=>a.id===cur))el.value=cur});
}

function renderAll(){populateSelects();renderDashboard();renderBookings();renderDrivers();renderAccounts();renderCustomers();renderCalendar();renderQuotes();renderDispatchBoard();renderEarnings();renderExpenses();renderReports();renderCompliance();renderNotifications()}

function dashboardFilteredList(){
 defaultDashboardRange();
 const from=$('upcomingFrom').value,to=$('upcomingTo').value,q=($('dashboardSearch')?.value||'').trim().toLowerCase();
 let list=bookings.filter(isActiveJourney).filter(b=>dateInRange(b.date,from,to));
 if(q)list=list.filter(b=>searchableBooking(b).includes(q));
 return list.sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
}
function renderDashboard(){
 defaultDashboardRange();
 const todays=bookings.filter(b=>b.date===todayISO()),active=bookings.filter(isActiveJourney),inProcess=active.filter(b=>['Dispatched','On the Way','POB'].includes(b.dispatch));
 $('todayBookings').textContent=todays.length;
 $('upcomingCount').textContent=active.filter(b=>b.date>=todayISO()).length;
 $('inProcessCount').textContent=inProcess.length;
 $('completedToday').textContent=todays.filter(b=>b.dispatch==='Completed').length;
 // Revenue = all non-cancelled jobs dated today, not only completed jobs.
 $('todayRevenue').textContent=money(bookedRevenue(todays));
 const list=dashboardFilteredList();
 $('upcomingBody').innerHTML=list.length?list.map(upcomingRow).join(''):'<tr><td colspan="11" class="muted">No active journeys match these filters.</td></tr>';
 const monthBookings=bookings.filter(b=>b.date.startsWith(currentMonthPrefix()));
 renderSourceVisual(monthBookings);renderBars('dispatchBars',countBy(active,b=>b.dispatch));
 $('monthRevenue').textContent=money(bookedRevenue(monthBookings));renderRevenueChart();
}
function upcomingRow(b){const v=vehicles.find(x=>x.id===b.vehicleId),rowClass=b.complaint?'complaint-row':'';return `<tr class="${rowClass}">
<td class="ref-col"><span class="ref-link" onclick="editBooking('${b.id}')">${escapeHtml(b.id)}</span>${b.externalRef?`<div class="subline">Ext: ${escapeHtml(b.externalRef)}</div>`:''}</td>
<td class="date-col"><strong>${escapeHtml(b.date)}</strong><div class="subline">${escapeHtml(b.time)}</div></td>
<td class="passenger-col"><strong>${escapeHtml(b.passenger)}</strong><div class="subline">${escapeHtml(b.phone)}</div></td>
<td class="route-col"><strong>${escapeHtml(b.pickup)}</strong><div class="subline">to ${escapeHtml(b.dropoff)}${b.vias?.length?` · ${b.vias.length} via`:''}</div></td>
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
window.toggleComplaint=(id,checked)=>{const b=bookings.find(x=>x.id===id);if(!b)return;b.complaint=!!checked;persist();renderAll()};
window.toggleDriverPaid=(id,checked)=>{const b=bookings.find(x=>x.id===id);if(!b)return;b.driverPaid=!!checked;persist();renderAll()};

function renderRevenueChart(){
 const el=$('revenueChart');if(!el)return;const now=new Date(),months=[];
 for(let i=5;i>=0;i--){const d=new Date(now.getFullYear(),now.getMonth()-i,1),key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`,label=d.toLocaleDateString('en-GB',{month:'short'});const value=bookedRevenue(bookings.filter(b=>b.date.startsWith(key)));months.push({key,label,value})}
 const max=Math.max(1,...months.map(x=>x.value));
 el.innerHTML=months.map(m=>`<div class="revenue-bar-wrap" title="${m.label}: ${money(m.value)}"><div class="revenue-tooltip">${money(m.value)}</div><div class="revenue-bar" style="height:${Math.max(8,(m.value/max)*100)}%"></div><span>${m.label}</span></div>`).join('');
}

function renderBookings(){
 initAllRange();const q=($('bookingSearch')?.value||'').trim().toLowerCase(),from=$('allFrom').value,to=$('allTo').value,status=$('allStatus')?.value||'';
 let list=bookings.filter(b=>dateInRange(b.date,from,to));if(q)list=list.filter(b=>searchableBooking(b).includes(q));if(status==='__active')list=list.filter(isActiveJourney);else if(status==='__process')list=list.filter(b=>['Dispatched','On the Way','POB'].includes(b.dispatch));else if(status)list=list.filter(b=>b.dispatch===status);list.sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time));
 $('allBookingsBody').innerHTML=list.length?list.map(b=>{const v=vehicles.find(x=>x.id===b.vehicleId),rowClass=b.complaint?'complaint-row':'';return `<tr class="${rowClass}"><td class="ref-col"><span class="ref-link" onclick="editBooking('${b.id}')">${escapeHtml(b.id)}</span>${b.externalRef?`<div class="subline">Ext: ${escapeHtml(b.externalRef)}</div>`:''}</td><td class="date-col"><strong>${b.date}</strong><div class="subline">${b.time}</div></td><td class="passenger-col"><strong>${escapeHtml(b.passenger)}</strong><div class="subline">${escapeHtml(b.phone)}</div></td><td class="route-col"><strong>${escapeHtml(b.pickup)}</strong><div class="subline">to ${escapeHtml(b.dropoff)}</div></td><td class="source-col" style="background:${accountColor(b.sourceId)}">${sourceCell(b)}</td><td class="driver-col">${escapeHtml(driverName(b.driverId))}</td><td class="vehicle-col">${v?`${escapeHtml(v.make)}<div class="subline">${escapeHtml(v.reg)}</div>`:'Not Assigned'}</td><td class="dispatch-col"><select class="table-select status-select" style="${statusStyle(b.dispatch)}" onchange="updateDispatch('${b.id}',this.value)">${dispatchStatuses.map(s=>`<option ${b.dispatch===s?'selected':''}>${s}</option>`).join('')}</select></td><td class="fare-col"><div class="fare-stack"><strong>Total ${money(b.fare)}</strong><span>Driver ${money(b.driverFare||0)}</span></div></td><td class="comment-col"><input class="inline-comment" value="${escapeHtml(b.dashboardComment||'')}" placeholder="Staff comment..." onchange="saveDashboardComment('${b.id}',this.value)"></td><td class="complaint-col"><label class="flag-toggle complaint-toggle"><input type="checkbox" ${b.complaint?'checked':''} onchange="toggleComplaint('${b.id}',this.checked)"><span>${b.complaint?'Complaint':'No'}</span></label></td><td class="driver-paid-col ${b.driverPaid?'is-paid':'is-pending'}"><label class="flag-toggle paid-toggle"><input type="checkbox" ${b.driverPaid?'checked':''} onchange="toggleDriverPaid('${b.id}',this.checked)"><span>${b.driverPaid?'Paid':'Pending'}</span></label></td><td><button class="btn btn-light tiny" onclick="editBooking('${b.id}')">Open</button></td></tr>`}).join(''):'<tr><td colspan="13" class="muted">No bookings found.</td></tr>';
}
function renderAccounts(){const month=currentMonthPrefix();$('accountsGrid').innerHTML=accounts.map(a=>{const jobs=bookings.filter(b=>b.sourceId===a.id&&b.date.startsWith(month)),rev=bookedRevenue(jobs);return `<div class="manage-card account-card" style="border-top:4px solid ${a.color}"><div class="account-title"><div><h3>${escapeHtml(a.name)}</h3><p>${escapeHtml(a.regName||'Trading / account name')}</p></div><span class="account-color" style="background:${a.color}"></span></div><div class="account-details"><span>Company Reg No.<b>${escapeHtml(a.regNumber||'—')}</b></span><span>Main Phone<b>${escapeHtml(a.phone||'—')}</b></span><span>Email<b>${escapeHtml(a.email||'—')}</b></span><span>Accounts Email<b>${escapeHtml(a.accountsEmail||'—')}</b></span><span>Contact 1<b>${escapeHtml([a.contact1Name,a.contact1Phone].filter(Boolean).join(' · ')||'—')}</b></span><span>Contact 2<b>${escapeHtml([a.contact2Name,a.contact2Phone].filter(Boolean).join(' · ')||'—')}</b></span></div><div class="manage-meta"><div class="meta-box">Bookings this month<strong>${jobs.length}</strong></div><div class="meta-box">Booked Revenue<strong>${money(rev)}</strong></div></div>${a.notes?`<p class="account-notes">${escapeHtml(a.notes)}</p>`:''}</div>`}).join('')}

function renderCustomers(){const q=($('customerSearch')?.value||'').trim().toLowerCase(),map=new Map();bookings.forEach(b=>{const key=(b.phone||b.email||b.passenger).toLowerCase();if(!map.has(key))map.set(key,{name:b.passenger,phone:b.phone,email:b.email,jobs:0,revenue:0,last:''});const c=map.get(key);c.jobs++;c.revenue+=Number(b.fare||0);if(!c.last||b.date>c.last)c.last=b.date});let arr=[...map.values()];if(q)arr=arr.filter(c=>[c.name,c.phone,c.email].join(' ').toLowerCase().includes(q));$('customersGrid').innerHTML=arr.map(c=>`<div class="manage-card customer-card"><h3>${escapeHtml(c.name)}</h3><p>${escapeHtml(c.phone||'No phone')} · ${escapeHtml(c.email||'No email')}</p><div class="manage-meta"><div class="meta-box">Bookings<strong>${c.jobs}</strong></div><div class="meta-box">Total Value<strong>${money(c.revenue)}</strong></div><div class="meta-box">Last Journey<strong>${c.last||'—'}</strong></div></div></div>`).join('')||'<div class="manage-card">No customers found.</div>'}

function renderCalendar(){const el=$('calendarGrid');if(!el)return;const month=$('calendarMonth').value||currentMonthPrefix();if(!$('calendarMonth').value)$('calendarMonth').value=month;const [y,m]=month.split('-').map(Number),days=new Date(y,m,0).getDate(),first=new Date(y,m-1,1).getDay();let html=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(x=>`<div class="cal-head">${x}</div>`).join('');for(let i=0;i<first;i++)html+='<div class="cal-day empty"></div>';for(let d=1;d<=days;d++){const date=`${month}-${String(d).padStart(2,'0')}`,jobs=bookings.filter(b=>b.date===date).sort((a,b)=>a.time.localeCompare(b.time));html+=`<div class="cal-day ${date===todayISO()?'today':''}"><b>${d}</b><div class="cal-jobs">${jobs.slice(0,4).map(b=>`<button onclick="editBooking('${b.id}')"><span>${b.time}</span> ${escapeHtml(b.passenger)}</button>`).join('')}${jobs.length>4?`<small>+${jobs.length-4} more</small>`:''}</div></div>`}el.innerHTML=html}

function renderQuotes(){const el=$('quotesBody');if(!el)return;el.innerHTML=quotes.map(q=>`<tr><td><strong>${q.id}</strong></td><td>${q.date}</td><td><strong>${escapeHtml(q.passenger)}</strong><div class="subline">${escapeHtml(q.phone||'')}</div></td><td class="route-col">${escapeHtml(q.pickup)}<div class="subline">→ ${escapeHtml(q.dropoff)}</div></td><td>${sourceCell(q)}</td><td>${money(q.fare)}</td><td><span class="quote-status ${q.status.toLowerCase()}">${q.status}</span></td><td><button class="btn btn-light tiny" onclick="convertQuote('${q.id}')">Convert to Booking</button></td></tr>`).join('')||'<tr><td colspan="8">No quotes yet.</td></tr>'}
window.convertQuote=id=>{const q=quotes.find(x=>x.id===id);if(!q)return;openBookingForm();$('passengerName').value=q.passenger;$('passengerPhone').value=q.phone||'';$('bookingSource').value=q.sourceId||'';$('pickup').value=q.pickup;$('dropoff').value=q.dropoff;$('fare').value=q.fare||0;updateMargin();q.status='Converted';persist();renderQuotes()};

function renderDispatchBoard(){const el=$('dispatchBoard');if(!el)return;const q=($('dispatchSearch')?.value||'').toLowerCase(),groups=[['Assigned'],['Dispatched','On the Way'],['POB'],['Completed'],['Cancelled','Driver No Show','Pax No Show']];const labels=['Assigned','En Route / Dispatched','Passenger On Board','Completed','Closed / No Show'];el.innerHTML=groups.map((statuses,i)=>{let arr=bookings.filter(b=>statuses.includes(b.dispatch));if(q)arr=arr.filter(b=>searchableBooking(b).includes(q));arr.sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));return `<section class="dispatch-column"><div class="dispatch-head"><h3>${labels[i]}</h3><span>${arr.length}</span></div><div class="dispatch-cards">${arr.slice(0,20).map(b=>`<div class="dispatch-card ${b.complaint?'dispatch-complaint':''}"><div><strong>${b.id}</strong><span>${b.date} ${b.time}</span></div><b>${escapeHtml(b.passenger)}</b><p>${escapeHtml(b.pickup)} to ${escapeHtml(b.dropoff)}</p><div class="dispatch-card-bottom"><select onchange="assignDriver('${b.id}',this.value)"><option value="">No driver</option>${drivers.map(d=>`<option value="${d.id}" ${b.driverId===d.id?'selected':''}>${escapeHtml(d.name)}</option>`).join('')}</select><select style="${statusStyle(b.dispatch)}" onchange="updateDispatch('${b.id}',this.value)">${dispatchStatuses.map(s=>`<option ${s===b.dispatch?'selected':''}>${s}</option>`).join('')}</select></div></div>`).join('')||'<div class="dispatch-empty">No journeys</div>'}</div></section>`}).join('')}

function renderEarnings(){if(!$('earningsTotal'))return;const from=$('earningsFrom').value||addDays(-30),to=$('earningsTo').value||todayISO();if(!$('earningsFrom').value)$('earningsFrom').value=from;if(!$('earningsTo').value)$('earningsTo').value=to;const company=$('earningsCompany').value;let arr=bookings.filter(b=>dateInRange(b.date,from,to)&&b.dispatch!=='Cancelled');if(company)arr=arr.filter(b=>b.sourceId===company);const total=arr.reduce((s,b)=>s+Number(b.fare||0),0),driver=arr.reduce((s,b)=>s+Number(b.driverFare||0),0);$('earningsTotal').textContent=money(total);$('earningsDriver').textContent=money(driver);$('earningsMargin').textContent=money(total-driver);$('earningsJobs').textContent=arr.length;const byCompany={};arr.forEach(b=>{const n=accountName(b.sourceId);byCompany[n]=(byCompany[n]||0)+Number(b.fare||0)});const max=Math.max(1,...Object.values(byCompany));$('earningsChart').innerHTML=Object.entries(byCompany).sort((a,b)=>b[1]-a[1]).map(([n,v])=>`<div class="wide-bar-row"><span>${escapeHtml(n)}</span><div><i style="width:${v/max*100}%"></i></div><strong>${money(v)}</strong></div>`).join('')||'<div class="muted chart-empty">No earnings in this range.</div>'}

function renderExpenses(){if(!$('expensesBody'))return;const from=$('expenseFrom').value||addDays(-30),to=$('expenseTo').value||todayISO();if(!$('expenseFrom').value)$('expenseFrom').value=from;if(!$('expenseTo').value)$('expenseTo').value=to;const arr=expenses.filter(e=>dateInRange(e.date,from,to)).sort((a,b)=>b.date.localeCompare(a.date));$('expenseTotal').textContent=money(arr.reduce((s,e)=>s+Number(e.amount||0),0));$('expenseCount').textContent=arr.length;$('expensesBody').innerHTML=arr.map(e=>`<tr><td>${e.date}</td><td><span class="expense-cat">${escapeHtml(e.category)}</span></td><td>${escapeHtml(e.description)}</td><td>${escapeHtml(accountName(e.sourceId))}</td><td><strong>${money(e.amount)}</strong></td><td><button class="btn btn-danger tiny" onclick="deleteExpense('${e.id}')">Delete</button></td></tr>`).join('')||'<tr><td colspan="6">No expenses found.</td></tr>'}
window.deleteExpense=id=>{if(!confirm('Delete this expense?'))return;expenses=expenses.filter(e=>e.id!==id);persist();renderExpenses()};

function applyReportPreset(){const p=$('reportPreset').value,now=new Date();let from='',to='';const iso=d=>d.toISOString().slice(0,10);if(p==='thisWeek'||p==='lastWeek'){const d=new Date(now),day=(d.getDay()+6)%7;d.setDate(d.getDate()-day+(p==='lastWeek'?-7:0));from=iso(d);const e=new Date(d);e.setDate(e.getDate()+6);to=iso(e)}else if(p==='thisMonth'||p==='lastMonth'){const off=p==='lastMonth'?-1:0;const first=new Date(now.getFullYear(),now.getMonth()+off,1),last=new Date(now.getFullYear(),now.getMonth()+off+1,0);from=iso(first);to=iso(last)}if(from){$('reportFrom').value=from;$('reportTo').value=to}}
function reportList(){const from=$('reportFrom').value||addDays(-30),to=$('reportTo').value||todayISO(),q=($('reportSearch').value||'').toLowerCase(),company=$('reportCompany').value;let arr=bookings.filter(b=>dateInRange(b.date,from,to));if(q)arr=arr.filter(b=>searchableBooking(b).includes(q));if(company)arr=arr.filter(b=>b.sourceId===company);return arr.sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time))}
function renderReports(){if(!$('reportBody'))return;if(!$('reportFrom').value)$('reportFrom').value=addDays(-30);if(!$('reportTo').value)$('reportTo').value=todayISO();const arr=reportList(),total=arr.reduce((s,b)=>s+Number(b.fare||0),0),driver=arr.reduce((s,b)=>s+Number(b.driverFare||0),0);$('reportJobs').textContent=arr.length;$('reportRevenue').textContent=money(total);$('reportDriverFare').textContent=money(driver);$('reportMargin').textContent=money(total-driver);$('reportBody').innerHTML=arr.map(b=>`<tr class="${b.complaint?'complaint-row':''}"><td>${escapeHtml(b.id)}</td><td>${b.date}<div class="subline">${b.time}</div></td><td>${escapeHtml(b.passenger)}</td><td class="route-col">${escapeHtml(b.pickup)}<div class="subline">to ${escapeHtml(b.dropoff)}</div></td><td class="source-col" style="background:${accountColor(b.sourceId)}">${sourceCell(b)}</td><td><span class="status-pill" style="${statusStyle(b.dispatch)}">${b.dispatch}</span></td><td>${money(b.fare)}</td><td>${money(b.driverFare||0)}</td><td><strong>${money(Number(b.fare||0)-Number(b.driverFare||0))}</strong></td><td><span class="status-pill ${b.complaint?'report-complaint':''}">${b.complaint?'Complaint':'—'}</span></td><td><span class="status-pill ${b.driverPaid?'report-paid':'report-pending'}">${b.driverPaid?'Paid':'Pending'}</span></td></tr>`).join('')||'<tr><td colspan="11">No report data.</td></tr>'}

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
$('downloadCsv').onclick=exportCsv;

function reportMeta(){
  const arr=reportList();
  const total=arr.reduce((s,b)=>s+Number(b.fare||0),0), driver=arr.reduce((s,b)=>s+Number(b.driverFare||0),0);
  const companyId=$('reportCompany').value;
  return {arr,total,driver,margin:total-driver,from:$('reportFrom').value||'',to:$('reportTo').value||'',company:companyId?accountName(companyId):'All Companies / Accounts'};
}
function reportPrintHtml(){
  const r=reportMeta();
  const rows=r.arr.map(b=>`<tr class="${b.complaint?'complaint':''}"><td>${escapeHtml(b.id)}</td><td>${escapeHtml(b.date)}<br><small>${escapeHtml(b.time)}</small></td><td>${escapeHtml(b.passenger)}<br><small>${escapeHtml(b.phone||'')}</small></td><td>${escapeHtml(b.pickup)}<br><small>to ${escapeHtml(b.dropoff)}</small></td><td>${escapeHtml(accountName(b.sourceId))}</td><td>${escapeHtml(b.dispatch)}</td><td>${money(b.fare)}</td><td>${money(b.driverFare||0)}</td><td>${money(Number(b.fare||0)-Number(b.driverFare||0))}</td><td>${b.complaint?'YES':'-'}</td><td>${b.driverPaid?'Paid':'Pending'}</td></tr>`).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><title>Booking Report</title><style>
  @page{size:A4 landscape;margin:10mm}*{box-sizing:border-box}body{font-family:Arial,sans-serif;color:#17233a;margin:0;font-size:9px}.head{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #1767ed;padding-bottom:8px;margin-bottom:10px}.brand{font-size:18px;font-weight:800;color:#071b33}.brand small{display:block;font-size:8px;font-weight:500;color:#65758a;margin-top:2px}.meta{text-align:right;font-size:8px;line-height:1.6}.title{font-size:14px;font-weight:800;margin:0 0 3px}.summary{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin:8px 0 10px}.kpi{border:1px solid #dbe3ef;border-radius:6px;padding:7px}.kpi span{display:block;color:#69798f;font-size:7px}.kpi strong{font-size:12px;display:block;margin-top:2px}table{width:100%;border-collapse:collapse;table-layout:fixed}th{background:#0b2849;color:#fff;padding:6px 4px;font-size:7px;text-align:left}td{padding:5px 4px;border-bottom:1px solid #e2e7ef;vertical-align:top;overflow-wrap:anywhere}small{font-size:7px;color:#69798f}.complaint td{background:#8b1f2c;color:#fff}.complaint small{color:#fff}th:nth-child(1){width:8%}th:nth-child(2){width:8%}th:nth-child(3){width:11%}th:nth-child(4){width:19%}th:nth-child(5){width:10%}th:nth-child(6){width:9%}th:nth-child(7),th:nth-child(8),th:nth-child(9){width:7%}th:nth-child(10){width:6%}th:nth-child(11){width:8%}.foot{margin-top:8px;font-size:7px;color:#718096;text-align:right}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style></head><body><div class="head"><div><div class="brand">Taxi Booking Control Dashboard<small>Professional Booking & Dispatch Report</small></div><h1 class="title">Booking Report</h1><div>${escapeHtml(r.from)} to ${escapeHtml(r.to)} &nbsp; | &nbsp; ${escapeHtml(r.company)}</div></div><div class="meta">Generated: ${new Date().toLocaleString()}<br>Total records: ${r.arr.length}</div></div><div class="summary"><div class="kpi"><span>BOOKINGS</span><strong>${r.arr.length}</strong></div><div class="kpi"><span>TOTAL FARE</span><strong>${money(r.total)}</strong></div><div class="kpi"><span>DRIVER FARE</span><strong>${money(r.driver)}</strong></div><div class="kpi"><span>COMPANY MARGIN</span><strong>${money(r.margin)}</strong></div></div><table><thead><tr><th>Ref</th><th>Date</th><th>Passenger</th><th>Journey</th><th>Company</th><th>Status</th><th>Total</th><th>Driver</th><th>Margin</th><th>Complaint</th><th>Driver Pay</th></tr></thead><tbody>${rows||'<tr><td colspan="11">No report data.</td></tr>'}</tbody></table><div class="foot">Taxi Booking Control Dashboard</div></body></html>`;
}
function printProfessionalReport(){
  const w=window.open('','_blank','width=1200,height=850');
  if(!w){alert('Please allow pop-ups to print the report.');return;}
  w.document.open();w.document.write(reportPrintHtml());w.document.close();w.focus();setTimeout(()=>w.print(),250);
}
function downloadReportPdf(){
  const r=reportMeta();
  if(!window.jspdf||!window.jspdf.jsPDF){alert('PDF library is still loading. Please try again in a moment.');return;}
  const {jsPDF}=window.jspdf;const doc=new jsPDF({orientation:'landscape',unit:'mm',format:'a4'});
  doc.setTextColor(7,27,51);doc.setFontSize(16);doc.setFont(undefined,'bold');doc.text('Taxi Booking Control Dashboard',12,13);
  doc.setFontSize(11);doc.text('Booking Report',12,20);doc.setFont(undefined,'normal');doc.setFontSize(8);doc.setTextColor(90,105,125);doc.text(`${r.from} to ${r.to} | ${r.company}`,12,25);
  doc.setTextColor(16,33,59);doc.setFontSize(9);doc.text(`Bookings: ${r.arr.length}`,12,32);doc.text(`Total Fare: ${money(r.total)}`,48,32);doc.text(`Driver Fare: ${money(r.driver)}`,90,32);doc.text(`Margin: ${money(r.margin)}`,132,32);
  const body=r.arr.map(b=>[b.id,`${b.date}\n${b.time}`,`${b.passenger}\n${b.phone||''}`,`${b.pickup}\nto ${b.dropoff}`,accountName(b.sourceId),b.dispatch,money(b.fare),money(b.driverFare||0),money(Number(b.fare||0)-Number(b.driverFare||0)),b.complaint?'YES':'-',b.driverPaid?'Paid':'Pending']);
  doc.autoTable({startY:37,head:[['Ref','Date','Passenger','Journey','Company','Status','Total','Driver','Margin','Complaint','Driver Pay']],body,theme:'grid',styles:{fontSize:6.5,cellPadding:1.7,valign:'top',overflow:'linebreak'},headStyles:{fillColor:[11,40,73],textColor:255,fontStyle:'bold'},columnStyles:{0:{cellWidth:18},1:{cellWidth:20},2:{cellWidth:30},3:{cellWidth:55},4:{cellWidth:28},5:{cellWidth:25},6:{cellWidth:18},7:{cellWidth:18},8:{cellWidth:18},9:{cellWidth:20},10:{cellWidth:22}},didParseCell:data=>{if(data.section==='body'){const b=r.arr[data.row.index];if(b&&b.complaint){data.cell.styles.fillColor=[139,31,44];data.cell.styles.textColor=[255,255,255]}}},didDrawPage:data=>{const pages=doc.internal.getNumberOfPages();doc.setFontSize(7);doc.setTextColor(110);doc.text(`Page ${pages}`,282,202,{align:'right'})}});
  doc.save(`taxi-report-${r.from||'all'}-to-${r.to||'all'}.pdf`);
}
$('downloadPdf').onclick=downloadReportPdf;$('printReport').onclick=printProfessionalReport;

// Global search takes staff straight to All Bookings
$('globalSearch').addEventListener('keydown',e=>{if(e.key==='Enter'){showPage('bookings');$('bookingSearch').value=e.target.value;renderBookings()}});

persist();renderAll();
