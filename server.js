require('dotenv').config();
const express = require('express');
const { getAllMarketData } = require('./exchange_api');
const { shouldAlert } = require('./ai_logic');

const app = express();
const PORT = process.env.PORT || 3000;

let lastAlerts = [];

setInterval(async () => {
  try {
    const allData = await getAllMarketData();

    // aplica filtro de alerta
    lastAlerts = allData.filter(shouldAlert);

    console.clear();
    console.log(`🔍 Verificando ${allData.length} pares USDT na KuCoin...`);

    for (const coin of lastAlerts) {
      console.log(`📈 ${coin.symbol}: ${coin.change.toFixed(2)}% | RSI: ${coin.rsi} | $${coin.price}`);
      console.log(`🔗 ${coin.link}\n`);
    }
  } catch (err) {
    console.error('Erro ao obter dados:', err.message);
  }
}, 10000); // a cada 10s

app.get('/', (_, res) => {
  let html = `<h2>🚨 Moedas em alta na KuCoin</h2><ul>`;
  for (const coin of lastAlerts) {
    html += `<li>${coin.symbol}: ${coin.change.toFixed(2)}% | RSI: ${coin.rsi} | $${coin.price} - <a href="${coin.link}" target="_blank">Negociar</a></li>`;
  }
  html += `</ul>`;
  res.send(html);
});

app.listen(PORT, () => console.log(`IA rodando em http://localhost:${PORT}`));
