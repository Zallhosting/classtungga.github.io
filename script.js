const API_KEY = "GANTI_DENGAN_API_KEY_BARU"; // Ganti dengan API Key OpenAI kamu

async function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    let chatBox = document.getElementById("chatBox");

    if (userInput.trim() === "") return; // Cegah pesan kosong

    // Tampilkan pesan user di chatbox
    chatBox.innerHTML += `<p><b>Kamu:</b> ${userInput}</p>`;
    document.getElementById("userInput").value = ""; // Kosongkan input

    // Tampilkan teks loading "Sedang mengetik..."
    chatBox.innerHTML += `<p id="loading"><b>TUNGGA.AI:</b> Sedang mengetik...</p>`;
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll ke bawah

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userInput }]
            })
        });

        const data = await response.json();
        let aiReply = data.choices[0].message.content;

        // Hapus teks loading "Sedang mengetik..."
        document.getElementById("loading").remove();

        // Tampilkan balasan AI
        chatBox.innerHTML += `<p><b>TUNGGA.AI:</b> ${aiReply}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll ke bawah

    } catch (error) {
        document.getElementById("loading").remove();
        chatBox.innerHTML += `<p><b>TUNGGA.AI:</b> Maaf, ada kesalahan! 😢</p>`;
        console.error("Error:", error);
    }
}

// Fungsi untuk kirim pesan dengan Enter
function checkEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
