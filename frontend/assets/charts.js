// functions used by main.js
function renderChart(labels, visitors) {
  const ctx = document.getElementById('visitorsChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: [{ label:'Kunjungan', data: visitors, tension:0.3, fill:true, backgroundColor:'rgba(10,147,150,0.12)', borderColor:'rgba(10,147,150,0.95)' }]},
    options: { responsive:true, plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true}} }
  });
}

function initMap() {
  if (!document.getElementById('map')) return;
  const map = L.map('map',{attributionControl:false}).setView([-8.3405,116.4558],10);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);
  L.marker([-8.3405,116.4558]).addTo(map).bindPopup('<strong>Gunung Rinjani</strong><br>Segara Anak');
}
