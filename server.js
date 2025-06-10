require('dotenv').config();
const express = require('express');
const { getMarketData } = require('./exchange_api');
const { shouldAlert } = require('./ai_logic');

const app = express();
const PORT = process.env.PORT || 3000;

const coins = ['PEPE-USDT', 'FLOKI-USDT', 'DOGE-USDT', 'SHIB-USDT'];

let lastResults = [];

setInterval(async () => {
  lastResults = [];

  for (const symbol of coins) {
    try {
      const data = await getMarketData(symbol);

      if (shouldAlert(data)) {
        console.log(`📈 [ALERTA] ${symbol}: ${data.change.toFixed(2)}% | RSI: ${data.rsi} | Preço: $${data.price}`);
        console.log(`🔗 Negociar manualmente: ${data.link}\n`);
      }

      lastResults.push(data);
    } catch (err) {
      console.error(`Erro ao buscar ${symbol}: ${err.message}`);
    }
  }
}, 10000); // Verifica a cada 10 segundos

app.get('/', (_, res) => {
  let html = `<h2>🚨 IA de Análise KuCoin</h2><ul>`;
  for (const coin of lastResults) {
    html += `<li>${coin.symbol}: ${coin.change.toFixed(2)}% | RSI: ${coin.rsi} | Preço: $${coin.price} - <a href="${coin.link}" target="_blank">Negociar</a></li>`;
  }
  html += `</ul>`;
  res.send(html);
});

app.listen(PORT, () => console.log(`IA de Análise rodando em http://localhost:${PORT}`));
