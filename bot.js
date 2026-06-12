const { Bot } = require('grammy');

const bot = new Bot(process.env.BOT_TOKEN);

const REACTIONS = ['👍', '❤️', '🔥', '🥰', '👏', '😁', '🎉', '🤩', '💯', '⚡'];

let counter = 0;
let lastReactionTime = 0;

bot.on('message', async (ctx) => {
  try {
    if (ctx.from.id === ctx.me.id) return;

    const now = Date.now();
    // 36 soniya = 1 soatda 100 ta reaksiya
    if (now - lastReactionTime < 36000) return;

    const emoji = REACTIONS[Math.floor(Math.random() * REACTIONS.length)];
    
    await ctx.api.setMessageReaction(
      ctx.chat.id,
      ctx.message.message_id,
      [{ type: 'emoji', emoji }],
      true
    );

    counter++;
    lastReactionTime = now;
    console.log(`[${counter}/soat] Reaksiya: ${emoji}`);

  } catch (e) {
    console.error('Xato:', e.description || e.message);
  }
});

bot.start();
console.log('🤖 Reaksiya bot ishga tushdi! 1 soatda ~100 ta');
