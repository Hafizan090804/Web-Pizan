const API_URL = "http://localhost:5000/api/visitors";

// ------ GET DATA ------
async function fetchVisitors() {
    const res = await fetch(API_URL);
    return await res.json();
}

// ------ TAMPILKAN DI INDEX ------
async function loadDashboard() {
    if (!document.getElementById("totalVisits")) return;

    const data = await fetchVisitors();

    const totalVisits = data.reduce((a, b) => a + b.jumlah, 0);
    const last = data[data.length - 1];

    document.getElementById("totalVisits").textContent = totalVisits.toLocaleString();
    document.getElementById("avgDaily").textContent = Math.round(totalVisits / data.length);
    document.getElementById("currentWeather").textContent = `${last.cuaca} - ${last.suhu}°C`;

    const labels = data.map(x => x.tanggal);
    const visitors = data.map(x => x.jumlah);

    renderChart(labels, visitors);
    initMap();
}

// ------ TAMPILKAN DI TABEL ------
async function loadTable() {
    const tbody = document.querySelector("#tableData tbody");
    if (!tbody) return;

    const data = await fetchVisitors();
    tbody.innerHTML = data.map(r =>
        `<tr>
            <td>${r.id}</td>
            <td>${r.tanggal}</td>
            <td>${r.jumlah}</td>
            <td>${r.cuaca}</td>
            <td>${r.suhu}</td>
         </tr>`
    ).join("");
}

// ------ INSERT DATA ------
async function handleAddForm() {
    const form = document.getElementById("addForm");
    if (!form) return;

    form.addEventListener("submit", async e => {
        e.preventDefault();

        const payload = {
            tanggal: document.getElementById("tanggal").value,
            jumlah: +document.getElementById("jumlah").value,
            cuaca: document.getElementById("cuaca").value,
            suhu: +document.getElementById("suhu").value
        };

        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const out = await res.json();
        document.getElementById("msg").innerText =
            out.error ? "Gagal: " + out.error : "Data berhasil ditambahkan!";
    });
}

loadDashboard();
loadTable();
handleAddForm();
