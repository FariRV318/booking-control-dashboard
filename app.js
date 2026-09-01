const seedBookings = [
  {id:'BK-1001',date:'2026-09-01',time:'08:30',customer:'Sarah Khan',phone:'',pickup:'Heathrow Airport T2',vias:[],dropoff:'Mayfair, London',journeyType:'One Way',waitMinutes:0,returnDate:'',returnTime:'',driver:'A. Malik',status:'Completed',fare:68.00,payment:'Card'},
  {id:'BK-1002',date:'2026-09-01',time:'09:15',customer:'James Wilson',phone:'',pickup:'Paddington Station',vias:['Baker Street, London'],dropoff:'Canary Wharf',journeyType:'One Way',waitMinutes:0,returnDate:'',returnTime:'',driver:'R. Ahmed',status:'Confirmed',fare:42.50,payment:'Account'},
  {id:'BK-1003',date:'2026-09-01',time:'10:00',customer:'Emily Brown',phone:'',pickup:'Chelsea',vias:[],dropoff:'Gatwick Airport',journeyType:'Wait & Return',waitMinutes:45,returnDate:'2026-09-01',returnTime:'13:00',driver:'S. Ali',status:'Pending',fare:75.00,payment:'Cash'},
  {id:'BK-1004',date:'2026-09-01',time:'11:20',customer:'Daniel Smith',phone:'',pickup:'Victoria Station',vias:[],dropoff:'Wembley',journeyType:'One Way',waitMinutes:0,returnDate:'',returnTime:'',driver:'M. Hussain',status:'Completed',fare:39.00,payment:'Card'},
  {id:'BK-1005',date:'2026-09-01',time:'12:45',customer:'Olivia Taylor',phone:'',pickup:'Soho',vias:[],dropoff:'London City Airport',journeyType:'Return Later',waitMinutes:0,returnDate:'2026-09-02',returnTime:'09:30',driver:'A. Malik',status:'Cancelled',fare:0,payment:'Card'}
];

let bookings = JSON.parse(localStorage.getItem('taxiBookings') || 'null') || seedBookings;
bookings = bookings.map(b => ({vias:[], journeyType:'One Way', waitMinutes:0, returnDate:'', returnTime:'', ...b}));

const loginView=document.getElementById('loginView'),appView=document.getElementById('appView');
const loginForm=document.getElementById('loginForm');
loginForm.addEventListener('submit',e=>{e.preventDefault();localStorage.setItem('taxiLoggedIn','1');showApp();});
document.getElementById('logoutBtn').onclick=()=>{localStorage.removeItem('taxiLoggedIn');appView.classList.add('hidden');loginView.classList.remove('hidden');};
function showApp(){loginView.classList.add('hidden');appView.classList.remove('hidden');renderAll();}
if(localStorage.getItem('taxiLoggedIn')==='1') showApp();

const navItems=[...document.querySelectorAll('.nav-item[data-section]')];
navItems.forEach(btn=>btn.onclick=()=>openSection(btn.dataset.section));
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>openSection(b.dataset.go));
function openSection(id){document.querySelectorAll('.section').forEach(s=>s.classList.remove('active-section'));document.getElementById(id).classList.add('active-section');navItems.forEach(n=>n.classList.toggle('active',n.dataset.section===id));document.getElementById('pageTitle').textContent=id.charAt(0).toUpperCase()+id.slice(1);}

function persist(){localStorage.setItem('taxiBookings',JSON.stringify(bookings));renderAll();}
function money(n){return '£'+Number(n||0).toFixed(2)}
function routeDetails(b){
  const viaText=(b.vias||[]).length?` • Via: ${(b.vias||[]).join(' → ')}`:'';
  const journey=b.journeyType&&b.journeyType!=='One Way'?` • ${b.journeyType}`:'';
  const wait=b.journeyType==='Wait & Return'&&Number(b.waitMinutes)>0?` (${b.waitMinutes} min wait)`:'';
  const ret=(b.journeyType==='Wait & Return'||b.journeyType==='Return Later') && (b.returnDate||b.returnTime) ? ` • Return: ${b.returnDate||''} ${b.returnTime||''}`:'';
  return viaText+journey+wait+ret;
}
function renderAll(){renderDashboard();renderBookings();renderDrivers();renderEarnings();}
function renderDashboard(){
 const today=new Date().toISOString().slice(0,10); const todays=bookings.filter(b=>b.date===today);
 document.getElementById('kpiBookings').textContent=todays.length;
 document.getElementById('kpiCompleted').textContent=todays.filter(b=>b.status==='Completed').length;
 document.getElementById('kpiPending').textContent=todays.filter(b=>b.status==='Pending').length;
 document.getElementById('kpiRevenue').textContent=money(todays.filter(b=>b.status==='Completed').reduce((a,b)=>a+Number(b.fare||0),0));
 document.getElementById('recentBookingsBody').innerHTML=bookings.slice(-6).reverse().map(row=>`<tr><td>${row.id}</td><td>${row.customer}</td><td>${row.pickup}</td><td>${row.dropoff}<span class="route-subline">${routeDetails(row)}</span></td><td>${row.driver||'-'}</td><td><span class="status ${row.status}">${row.status}</span></td><td>${money(row.fare)}</td></tr>`).join('');
 document.getElementById('scheduleList').innerHTML=todays.sort((a,b)=>a.time.localeCompare(b.time)).map(b=>`<div class="schedule-item"><div><strong>${b.time} · ${b.customer}</strong><div class="muted">${b.pickup} → ${b.dropoff}</div><div class="route-subline">${routeDetails(b)}</div></div><span class="status ${b.status}">${b.status}</span></div>`).join('')||'<p class="muted">No bookings today.</p>';
 const driverCounts={}; bookings.forEach(b=>{if(b.driver) driverCounts[b.driver]=(driverCounts[b.driver]||0)+1});
 document.getElementById('driverSummary').innerHTML=Object.entries(driverCounts).map(([d,c])=>`<div class="stat-item"><span>${d}</span><strong>${c} jobs</strong></div>`).join('')||'<p class="muted">No drivers yet.</p>';
}
function currentFiltered(){let list=[...bookings];const q=document.getElementById('globalSearch').value.trim().toLowerCase();const status=document.getElementById('statusFilter').value;const date=document.getElementById('dateFilter').value;if(q) list=list.filter(b=>JSON.stringify(b).toLowerCase().includes(q));if(status!=='all') list=list.filter(b=>b.status===status);if(date) list=list.filter(b=>b.date===date);return list;}
function renderBookings(){const body=document.getElementById('bookingsBody');body.innerHTML=currentFiltered().sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time)).map(b=>`<tr><td>${b.id}</td><td>${b.date}</td><td>${b.time}</td><td>${b.customer}</td><td>${b.pickup}</td><td>${b.dropoff}<span class="route-subline">${routeDetails(b)}</span></td><td>${b.driver||'-'}</td><td><span class="status ${b.status}">${b.status}</span></td><td>${money(b.fare)}</td><td><button class="link-btn" onclick="editBooking('${b.id}')">Edit</button> <button class="link-btn" onclick="deleteBooking('${b.id}')">Delete</button></td></tr>`).join('');}
['globalSearch','statusFilter','dateFilter'].forEach(id=>document.getElementById(id).addEventListener('input',renderBookings));

const modal=document.getElementById('bookingModal');
const viaStops=document.getElementById('viaStops');
function openModal(){modal.classList.remove('hidden');setTimeout(()=>document.getElementById('customer').focus(),50);}
function clearViaStops(){viaStops.innerHTML='';}
function closeModal(){modal.classList.add('hidden');document.getElementById('bookingForm').reset();document.getElementById('bookingId').value='';document.getElementById('modalTitle').textContent='Add Booking';clearViaStops();updateJourneyFields();}

document.getElementById('addBookingBtn').onclick=()=>{closeModal();document.getElementById('bookingDate').value=new Date().toISOString().slice(0,10);openModal();};
document.getElementById('quickAdd').onclick=document.getElementById('addBookingBtn').onclick;
document.getElementById('closeModal').onclick=closeModal;
document.getElementById('cancelModal').onclick=closeModal;

function addViaStop(value=''){
  const row=document.createElement('div'); row.className='via-row';
  row.innerHTML=`<div class="address-field"><span class="address-icon">+</span><input class="map-address via-input" placeholder="Start typing via address..." autocomplete="off"></div><button type="button" class="remove-via" title="Remove stop">×</button>`;
  const input=row.querySelector('input'); input.value=value;
  row.querySelector('.remove-via').onclick=()=>row.remove();
  viaStops.appendChild(row);
  attachGoogleAutocomplete(input);
  return input;
}
document.getElementById('addViaBtn').onclick=()=>addViaStop();

function updateJourneyFields(){
  const type=document.getElementById('journeyType').value;
  const isWait=type==='Wait & Return';
  const hasReturn=isWait||type==='Return Later';
  document.getElementById('waitMinutesWrap').classList.toggle('hidden',!isWait);
  document.getElementById('returnDateWrap').classList.toggle('hidden',!hasReturn);
  document.getElementById('returnTimeWrap').classList.toggle('hidden',!hasReturn);
}
document.getElementById('journeyType').addEventListener('change',updateJourneyFields);
updateJourneyFields();

window.editBooking=id=>{
  const b=bookings.find(x=>x.id===id); if(!b)return;
  closeModal();
  document.getElementById('modalTitle').textContent='Edit Booking';
  Object.entries({bookingId:b.id,bookingDate:b.date,bookingTime:b.time,customer:b.customer,phone:b.phone,pickup:b.pickup,dropoff:b.dropoff,journeyType:b.journeyType||'One Way',waitMinutes:b.waitMinutes||0,returnDate:b.returnDate||'',returnTime:b.returnTime||'',driver:b.driver,status:b.status,fare:b.fare,payment:b.payment}).forEach(([id,v])=>document.getElementById(id).value=v??'');
  (b.vias||[]).forEach(v=>addViaStop(v)); updateJourneyFields(); openModal();
};
window.deleteBooking=id=>{if(confirm('Delete this booking?')){bookings=bookings.filter(b=>b.id!==id);persist();}};

document.getElementById('bookingForm').addEventListener('submit',e=>{
  e.preventDefault(); const existing=document.getElementById('bookingId').value;
  const vias=[...document.querySelectorAll('.via-input')].map(i=>i.value.trim()).filter(Boolean);
  const data={
    id:existing||`BK-${String(Date.now()).slice(-6)}`,
    date:document.getElementById('bookingDate').value,time:document.getElementById('bookingTime').value,
    customer:document.getElementById('customer').value,phone:document.getElementById('phone').value,
    pickup:document.getElementById('pickup').value,vias,dropoff:document.getElementById('dropoff').value,
    journeyType:document.getElementById('journeyType').value,
    waitMinutes:Number(document.getElementById('waitMinutes').value||0),
    returnDate:document.getElementById('returnDate').value,returnTime:document.getElementById('returnTime').value,
    driver:document.getElementById('driver').value,status:document.getElementById('status').value,
    fare:Number(document.getElementById('fare').value||0),payment:document.getElementById('payment').value
  };
  if(existing){const i=bookings.findIndex(b=>b.id===existing);bookings[i]=data}else bookings.push(data);
  persist();closeModal();
});

function renderDrivers(){const map={};bookings.forEach(b=>{if(!b.driver)return;if(!map[b.driver])map[b.driver]={jobs:0,revenue:0};map[b.driver].jobs++;if(b.status==='Completed')map[b.driver].revenue+=Number(b.fare||0)});document.getElementById('driversGrid').innerHTML=Object.entries(map).map(([name,s])=>`<div class="driver-card"><strong>${name}</strong><span class="muted">${s.jobs} bookings · ${money(s.revenue)} completed revenue</span></div>`).join('')||'<p class="muted">No driver data yet.</p>'}
function renderEarnings(){const total=bookings.filter(b=>b.status==='Completed').reduce((a,b)=>a+Number(b.fare||0),0);document.getElementById('earningsSummary').textContent=`Completed booking revenue: ${money(total)}`}

function exportCsv(){
  const rows=currentFiltered();
  const headers=['ID','Date','Time','Customer','Phone','Pickup','Via Stops','Drop-off','Journey Type','Wait Minutes','Return Date','Return Time','Driver','Status','Fare','Payment'];
  const esc=v=>'"'+String(v??'').replaceAll('"','""')+'"';
  const csv=[headers.join(','),...rows.map(b=>[b.id,b.date,b.time,b.customer,b.phone,b.pickup,(b.vias||[]).join(' | '),b.dropoff,b.journeyType,b.waitMinutes,b.returnDate,b.returnTime,b.driver,b.status,b.fare,b.payment].map(esc).join(','))].join('\n');
  const blob=new Blob([csv],{type:'text/csv'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='taxi-bookings.csv';a.click();URL.revokeObjectURL(a.href)
}
['exportCsvBtn','quickCsv','reportCsv'].forEach(id=>document.getElementById(id).onclick=exportCsv);
['printBtn','quickPrint','reportPrint'].forEach(id=>document.getElementById(id).onclick=()=>window.print());

// --- Google Maps / Places address suggestions ---
let googleReady=false;
function attachGoogleAutocomplete(input){
  if(!googleReady || !input || input.dataset.autocompleteReady==='1') return;
  input.dataset.autocompleteReady='1';
  const ac=new google.maps.places.Autocomplete(input,{componentRestrictions:{country:'gb'},fields:['formatted_address','name']});
  ac.addListener('place_changed',()=>{const p=ac.getPlace(); if(p.formatted_address) input.value=p.formatted_address;});
}
window.initTaxiGooglePlaces=function(){
  googleReady=true;
  document.querySelectorAll('.map-address').forEach(attachGoogleAutocomplete);
};
function loadGooglePlaces(){
  const key=(window.TAXI_CONFIG&&window.TAXI_CONFIG.googleMapsApiKey||'').trim();
  if(!key) return;
  const script=document.createElement('script');
  script.src=`https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=places&callback=initTaxiGooglePlaces`;
  script.async=true;script.defer=true;document.head.appendChild(script);
}
loadGooglePlaces();
