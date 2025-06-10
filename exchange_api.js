const axios = require('axios');

const BASE_URL = 'https://api.kucoin.com';

async function getAllMarketData() {
  const res = await axios.get(`${BASE_URL}/api/v1/market/allTickers`);
  return res.data.data.ticker
    .map(t => ({
      symbol: t.symbol,
      price: parseFloat(t.last),
      change: parseFloat(t.changeRate) * 100,
      link: `https://www.kucoin.com/trade/${t.symbol.replace('-', '/')}`,
      rsi: Math.floor(Math.random() * 100) // simulado
    }))
    .filter(t => t.symbol.endsWith('-USDT')); // só moedas pareadas com USDT
}

module.exports = { getAllMarketData };
