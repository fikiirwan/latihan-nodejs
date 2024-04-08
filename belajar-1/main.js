const TelegramBot = require("node-telegram-bot-api");

// token bot telegram
const token = "6366928397:AAHp0g3kfZZOiu2_7f98YtCxMvwRDGyWdJs";

const options = {
  polling: true,
};

const bot = new TelegramBot(token, options);

bot.on("message", (callback) => {
  const id = callback.from.id;
  bot.sendMessage(id, "ada yang bisa saya bantu??");
});
