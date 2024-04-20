const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

// Token API bot Telegram
const token = "6366928397:AAHp0g3kfZZOiu2_7f98YtCxMvwRDGyWdJs";
// Endpoint API coin gecko
const apiUrl = "https://api.coingecko.com/api/v3/simple/price";

// Inisialisasi bot
const bot = new TelegramBot(token, { polling: true });

// Fungsi untuk membuat tombol untuk setiap coin
function createCryptoKeyboard() {
  return {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Bitcoin Price", callback_data: "bitcoin" }],
        [{ text: "Ethereum Price", callback_data: "ethereum" }],
        [{ text: "USDT Price", callback_data: "usdt" }],
        [{ text: "BNB Price", callback_data: "bnb" }],
        [{ text: "Solana Price", callback_data: "solana" }],
      ],
    },
  };
}

// perintah '/start'
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  // Mengirim pesan dengan tombol
  bot.sendMessage(
    chatId,
    "Choose the cryptocurrency you want to know the price of:",
    createCryptoKeyboard()
  );
});

// Penanganan aksi tombol
bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const crypto = callbackQuery.data;

  try {
    // Mengambil data harga crypto CoinGecko
    const response = await axios.get(apiUrl, {
      params: {
        ids: crypto,
        vs_currencies: "usd",
      },
    });
    const price = response.data[crypto].usd;

    // Mengirim balasan dengan harga coin yang dipilih
    bot.sendMessage(chatId, `Price ${crypto.toUpperCase()} Now: $${price}`);
  } catch (error) {
    console.error("Error fetching data:", error);
    bot.sendMessage(chatId, "try again.");
  }
});
