// Dependensi
const TelegramBot = require("node-telegram-bot-api");

// Token bot Telegram
const token = "6366928397:AAHp0g3kfZZOiu2_7f98YtCxMvwRDGyWdJs";

const options = {
  polling: true,
};

const bot = new TelegramBot(token, options);

// Mendefinisikan tombol-tombol
const inlineKeyboard = [
  [
    { text: "Button 1", callback_data: "Button 1" },
    { text: "Button 2", callback_data: "Button 2" },
  ],
  [
    { text: "Button 3", callback_data: "Button 3" },
    { text: "Button 4", callback_data: "Button 4" },
  ],
];

// perintah /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "hello I am a bot, please select the menu below:", {
    reply_markup: { inline_keyboard: inlineKeyboard },
  });
});

// Menangani penekanan tombol-tombol
bot.on("callback_query", (callbackQuery) => {
  const data = callbackQuery.data;
  const message = callbackQuery.message;

  // Menampilkan feedback ke pengguna berdasarkan tombol yang ditekan
  bot.sendMessage(message.chat.id, `You Press ${data}`);
});
