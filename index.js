import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

bot.onText(/\/start|\/help/, (msg) => {
  bot.sendMessage(msg.chat.id,
`🚀 Reaction Bot Online

⭐ Standard:
80 reactions / 1h -> /standard

🔥 VIP:
150 reactions / 1h -> /vip`
  );
});

async function runReaction(chatId, messageId, count, delay, label) {
  let success = 0;

  bot.sendMessage(chatId, `🚀 ${label} START`);

  for (let i = 0; i < count; i++) {

    try {
      if (bot.setMessageReaction) {
        await bot.setMessageReaction(chatId, messageId, {
          reaction: [{ type: "emoji", emoji: "🔥" }]
        });
        success++;
      }
    } catch (e) {
      // ignore error (no crash)
    }

    console.log(`${label}: ${i+1}/${count} success:${success}`);

    await sleep(delay);
  }

  bot.sendMessage(chatId,
`🎉 DONE ${label}

📊 Attempts: ${count}
✅ Success: ${success}`
  );
}

// ⭐ STANDARD (80 / 1h)
bot.onText(/\/standard/, async (msg) => {
  await runReaction(msg.chat.id, msg.message_id, 80, 45000, "STANDARD 80/1H");
});

// 🔥 VIP (150 / 1h)
bot.onText(/\/vip/, async (msg) => {
  await runReaction(msg.chat.id, msg.message_id, 150, 24000, "VIP 150/1H");
});

console.log("🤖 Bot started...");
