require('dotenv').config();
const express = require('express');
const { getMarketData, buy, sell } = require('./exchange_api');
const { shouldBuy, shouldSell } = require('./ai_logic');

const app = express();
const PORT = process.env.PORT || 3000;

setInterval(async () => {
  const data = await getMarketData('PEPEUSDT');

  if (shouldBuy(data)) {
    await buy('PEPEUSDT', 50);
  } else if (shouldSell(data)) {
    await sell('PEPEUSDT', 50);
  }

  console.log(`[AI] Preço: ${data.price} | RSI: ${data.rsi}`);
}, 5000);

app.get('/', (_, res) => res.send('IA de Cripto operando...'));
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
