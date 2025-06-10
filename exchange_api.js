const axios = require('axios');

async function getMarketData(symbol) {
  const res = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
  return {
    price: parseFloat(res.data.lastPrice),
    price_change_percent: parseFloat(res.data.priceChangePercent),
    rsi: Math.floor(Math.random() * 100), // simulado por enquanto
  };
}

async function buy(symbol, amount) {
  console.log(`[COMPRA] ${symbol} | $${amount}`);
}

async function sell(symbol, amount) {
  console.log(`[VENDA] ${symbol} | $${amount}`);
}

module.exports = { getMarketData, buy, sell };
