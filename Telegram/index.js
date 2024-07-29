const TelegramBot = require("node-telegram-bot-api");
const TOKEN = "6863931065:AAHJQWf-iERLLEBwsEg6DloksuNpgYrjhjU";
const bot = new TelegramBot(TOKEN, { polling: true });
const gameName = "telegram_demo_game";
const queries = {};

bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "Say /game if you want to play."));
bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName));

bot.on("callback_query", (query) => {
    if (query.game_short_name !== gameName) {
        bot.answerCallbackQuery(query.id, {
            text: "Sorry, '" + query.game_short_name + "' is not available."
        });
    } else {
        queries[query.id] = query;
        let gameurl = "https://baranadanir.github.io/Telegram-Game-Demo/";
        bot.answerCallbackQuery(query.id, {
            url: gameurl
        });
    }
});

bot.on("inline_query", (iq) => {
    bot.answerInlineQuery(iq.id, [{
        type: "game",
        id: "0",
        game_short_name: gameName
    }]);
});
