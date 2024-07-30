import { Markup, Telegraf } from "telegraf";

const bot = new Telegraf("6863931065:AAHJQWf-iERLLEBwsEg6DloksuNpgYrjhjU");

const WEB_APP_URL = "https://baranadanir.github.io/Telegram-Game-Demo";

bot.command("start", ctx =>
	ctx.reply(
		"Play the game!",
		Markup.inlineKeyboard([Markup.button.webApp("Play", WEB_APP_URL)]),
	),
);

bot.launch();
