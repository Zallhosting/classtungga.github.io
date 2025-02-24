const API_KEY = "GANTI_DENGAN_API_KEY_BARU"; // Ganti dengan API Key OpenAI kamu
let chatHistory = []; // Simpan history chat biar AI ingat konteks

async function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    let chatBox = document.getElementById("chatBox");

    if (userInput.trim() === "") return; // Cegah pesan kosong

    // Tampilkan pesan user di chatbox
    chatBox.innerHTML += `<p><b>Kamu:</b> ${userInput}</p>`;
    document.getElementById("userInput").value = ""; // Kosongkan input

    // Tambahkan teks loading "Sedang mengetik..."
    chatBox.innerHTML += `<p id="loading"><b>TUNGGA.AI:</b> Sedang mengetik...</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    // Tambahkan pertanyaan user ke history
    chatHistory.push({ role: "user", content: userInput });

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: chatHistory // Kirim history chat ke AI supaya lebih nyambung
            })
        });

        const data = await response.json();
        let aiReply = data.choices[0].message.content;

        // Hapus teks loading
        document.getElementById("loading").remove();

        // Tampilkan balasan AI
        chatBox.innerHTML += `<p><b>TUNGGA.AI:</b> ${aiReply}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;

        // Tambahkan jawaban AI ke history chat
        chatHistory.push({ role: "assistant", content: aiReply });

    } catch (error) {
        document.getElementById("loading").remove();

        // 🔥 Jawaban default kalau API gagal
        let fallbackReplies = [
            "Hmm... Saya kurang yakin, coba cek di buku catatanmu.",
            "Mungkin jawabannya terkait dengan konsep dasar ini...",
            "Saya tidak tahu pasti, tapi coba cek sumber referensi lain.",
            "Coba lihat materi yang pernah dipelajari, mungkin bisa membantu!",
            `Sepertinya ini jawabannya: ${generateRandomAnswer(userInput)}`
        ];

        let randomReply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
        chatBox.innerHTML += `<p><b>TUNGGA.AI:</b> ${randomReply}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;

        console.error("Error:", error);
    }
}

// 🔥 Fungsi buat kasih jawaban default yang sedikit relevan
function generateRandomAnswer(question) {
    if (question.includes("matematika")) {
        return "Jawaban bisa menggunakan rumus dasar seperti integral atau limit.";
    } else if (question.includes("sejarah")) {
        return "Peristiwa ini terjadi di masa lalu, coba cari tahu lebih lanjut di buku sejarah.";
    } else if (question.includes("fisika")) {
        return "Pastikan menggunakan rumus yang benar, seperti Hukum Newton.";
    } else if (question.includes("kimia")) {
        return "Coba cek tabel periodik, mungkin ada unsur yang berhubungan.";
    } else {
        return "Mungkin ini bisa membantu: cek sumber referensi terpercaya!";
    }
}

// Fungsi untuk kirim pesan dengan Enter
function checkEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
