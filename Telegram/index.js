const TelegramBot = require("node-telegram-bot-api");
const TOKEN = "6863931065:AAHJQWf-iERLLEBwsEg6DloksuNpgYrjhjU";
const bot = new TelegramBot(TOKEN, { polling: true });
const gameName = "telegram_demo_game";
const queries = {};

bot.onText(/help/, (msg) => {
    console.log("Received help command");
    bot.sendMessage(msg.from.id, "Type /start to play.");
});

bot.onText(/start/, (msg) => {
    console.log("Received /start command");
    bot.sendGame(msg.from.id, gameName, {
        reply_markup: {
            inline_keyboard: [[{
                text: "Play Game",
                callback_game: {
                    short_name: gameName
                }
            }, {
                text: "Help",
                callback_data: "help"
            }]]
        }
    });
});

bot.on("callback_query", (query) => {
    console.log("Received callback query:", query);
    if (query.data === "help") {
        bot.answerCallbackQuery(query.id);
        bot.sendMessage(query.from.id, "This is a placeholder text for /help command.");
    } else if (query.game_short_name !== gameName) {
        bot.answerCallbackQuery(query.id, {
            text: "Sorry, '" + query.game_short_name + "' is not available."
        });
    } else {
        console.log("Starting game for query:", query);

        bot.answerCallbackQuery(query.id, {
            url: "https://baranadanir.github.io/Telegram-Game-Demo/"
        });
    }
});

console.log("Bot is up and running...");
