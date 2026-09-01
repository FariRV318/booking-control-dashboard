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
const baseBooking=(id,date,time,passenger,phone,sourceId,pickup,dropoff,driverId,dispatch,fare,externalRef='')=>({id,date,time,passenger,phone,email:'',sourceId,externalRef,pickup,vias:[],dropoff,journeyType:'One Way',waitReturn:false,waitingMinutes:0,returnDate:'',returnTime:'',flightNumber:'',airline:'',terminal:'',arrivalTime:'',passengers:1,handCarry:0,suitcases:0,requirements:[],otherRequirement:'',vehicleClassRequested:'Saloon',driverId,vehicleId:driverId?(defaultDrivers.find(d=>d.id===driverId)?.vehicleId||''):'',dispatch,fare,driverFare:Math.round(Number(fare||0)*0.72),payment:'Account',driverNotes:'',officeComments:'',distanceMiles:'',durationText:''});
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
function isActiveJourney(b){return !['Completed','Cancelled'].includes(b.dispatch)}
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
function upcomingRow(b){const v=vehicles.find(x=>x.id===b.vehicleId);return `<tr><td><span class="ref-link" onclick="editBooking('${b.id}')">${b.id}</span>${b.externalRef?`<div class="subline">Ext: ${b.externalRef}</div>`:''}</td><td><strong>${b.date}</strong><div class="subline">${b.time}</div></td><td><strong>${b.passenger}</strong><div class="subline">${b.phone}</div></td><td><strong>${b.pickup}</strong><div class="subline">→ ${b.dropoff}${b.vias?.length?` · ${b.vias.length} via`:''}</div></td><td><select class="table-select" onchange="assignDriver('${b.id}',this.value)"><option value="">Not Assigned</option>${drivers.map(d=>`<option value="${d.id}" ${b.driverId===d.id?'selected':''}>${d.name}</option>`).join('')}</select></td><td><div class="vehicle-cell">${v?`${v.make}<div class="subline">${v.reg}</div>`:'Not Assigned'}</div></td><td><select class="table-select" onchange="updateDispatch('${b.id}',this.value)">${['Assigned','Dispatched','On the Way','POB','Completed','Cancelled'].map(s=>`<option ${b.dispatch===s?'selected':''}>${s}</option>`).join('')}</select></td><td>${accountName(b.sourceId)}</td><td><div class="fare-stack"><strong>Total ${money(b.fare)}</strong><span>Driver ${money(b.driverFare||0)}</span></div></td><td><button class="btn btn-light tiny" onclick="editBooking('${b.id}')">Open</button></td></tr>`}
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
 const data={id,date:$('journeyDate').value,time:$('journeyTime').value,passenger:$('passengerName').value.trim(),phone:$('passengerPhone').value.trim(),email:$('passengerEmail').value.trim(),sourceId:$('bookingSource').value,externalRef:$('externalRef').value.trim(),pickup:$('pickup').value.trim(),vias:[...document.querySelectorAll('.via-input')].map(x=>x.value.trim()).filter(Boolean),dropoff:$('dropoff').value.trim(),journeyType:$('journeyType').value,waitReturn:$('waitReturn').checked,waitingMinutes:Number($('waitingMinutes').value||0),returnDate:$('returnDate').value,returnTime:$('returnTime').value,flightNumber:$('flightNumber').value.trim(),airline:$('airline').value.trim(),terminal:$('terminal').value.trim(),arrivalTime:$('arrivalTime').value,passengers:Number($('passengerCount').value||1),handCarry:Number($('handCarry').value||0),suitcases:Number($('suitcases').value||0),requirements,otherRequirement:$('otherRequirement').value.trim(),vehicleClassRequested:$('vehicleClassRequested').value,driverId,vehicleId:driverId?(vehicleForDriver(driverId)?.id||''):'',dispatch:(bookings.find(b=>b.id===id)?.dispatch)||'Assigned',fare:Number($('fare').value||0),driverFare:Number($('driverFare').value||0),payment:$('paymentMethod').value,driverNotes:$('driverNotes').value.trim(),officeComments:$('officeComments').value.trim(),distanceMiles:$('routeMiles').textContent==='—'?'':$('routeMiles').textContent,durationText:$('routeTime').textContent==='—'?'':$('routeTime').textContent};
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

renderAll();
