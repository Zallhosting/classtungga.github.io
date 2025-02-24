// === LOADING SCREEN ===
setTimeout(() => {
    document.querySelector(".loading-screen").style.display = "none";
}, 2000);

// === LOGIN FUNCTION ===
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username !== "" && password !== "") {
        localStorage.setItem("loggedIn", true);
        document.querySelector(".login-box").style.display = "none";
        document.querySelector(".dashboard").style.display = "block";
    } else {
        alert("Nama dan Kode Kelas harus diisi!");
    }
}

// === CEK STATUS LOGIN ===
if (localStorage.getItem("loggedIn")) {
    document.querySelector(".login-box").style.display = "none";
    document.querySelector(".dashboard").style.display = "block";
}

// === LOGOUT FUNCTION ===
function logout() {
    localStorage.removeItem("loggedIn");
    location.reload();
}

// === DARK MODE FUNCTION ===
function toggleDarkMode() {
    let body = document.body;
    if (body.style.backgroundColor === "white") {
        body.style.backgroundColor = "#121212";
        body.style.color = "white";
    } else {
        body.style.backgroundColor = "white";
        body.style.color = "black";
    }
}

// === LOAD DATA DARI `data.json` ===
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        loadJadwal(data.jadwal);
        loadMateri(data.materi);
        loadPengumuman(data.pengumuman);
        loadAbsensi();
    });

// === MENAMPILKAN JADWAL ===
function loadJadwal(jadwal) {
    let table = document.getElementById("jadwal-table");
    jadwal.forEach(item => {
        let row = `<tr>
            <td>${item.hari}</td>
            <td>${item.mapel}</td>
            <td>${item.guru}</td>
            <td>${item.jam}</td>
        </tr>`;
        table.innerHTML += row;
    });
}

// === MENAMPILKAN MATERI ===
function loadMateri(materi) {
    let list = document.getElementById("materi-list");
    materi.forEach(item => {
        let li = `<li><a href="${item.link}" target="_blank">${item.judul} - ${item.mapel}</a></li>`;
        list.innerHTML += li;
    });
}

// === MENAMPILKAN PENGUMUMAN ===
function loadPengumuman(pengumuman) {
    let list = document.getElementById("pengumuman-list");
    pengumuman.forEach(item => {
        let li = `<li><strong>${item.judul} (${item.tanggal})</strong>: ${item.isi}</li>`;
        list.innerHTML += li;
    });
}

// === MENAMPILKAN TABEL ABSENSI ===
function loadAbsensi() {
    let table = document.getElementById("absensi-table");
    let siswa = [
        { no: 1, nama: "Andi" },
        { no: 2, nama: "Budi" },
        { no: 3, nama: "Citra" }
    ];
    
    let today = new Date().toISOString().split("T")[0]; // Ambil tanggal otomatis

    siswa.forEach(item => {
        let row = `<tr>
            <td>${item.no}</td>
            <td>${item.nama}</td>
            <td>${today}</td>
            <td><button onclick="setHadir(this)">Hadir</button></td>
        </tr>`;
        table.innerHTML += row;
    });
}

// === TOMBOL HADIR ===
function setHadir(button) {
    button.innerText = "✅ Hadir";
    button.style.background = "#4CAF50";
    button.disabled = true;
}

// === FORUM DISKUSI (CHAT LOCAL STORAGE) ===
function sendMessage() {
    let input = document.getElementById("chat-input");
    let chatBox = document.getElementById("chat-box");
    let message = input.value;

    if (message.trim() !== "") {
        let chat = `<p><strong>Anda:</strong> ${message}</p>`;
        chatBox.innerHTML += chat;
        saveChat(chat);
        input.value = "";
    }
}

// === SIMPAN CHAT DI LOCAL STORAGE ===
function saveChat(message) {
    let chatHistory = localStorage.getItem("chatHistory") || "";
    chatHistory += message;
    localStorage.setItem("chatHistory", chatHistory);
}

// === TAMPILKAN CHAT SEBELUMNYA ===
function loadChat() {
    let chatBox = document.getElementById("chat-box");
    let chatHistory = localStorage.getItem("chatHistory");
    if (chatHistory) {
        chatBox.innerHTML = chatHistory;
    }
}

// === LOAD CHAT SAAT HALAMAN FORUM DIBUKA ===
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("chat-box")) {
        loadChat();
    }
});
