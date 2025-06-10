const axios = require('axios');

const BASE_URL = 'https://api.kucoin.com';

async function getMarketData(symbol) {
  const res = await axios.get(`${BASE_URL}/api/v1/market/stats?symbol=${symbol}`);
  return {
    symbol,
    price: parseFloat(res.data.data.last),
    change: parseFloat(res.data.data.changeRate) * 100,
    link: `https://www.kucoin.com/trade/${symbol.replace('-', '/')}`,
    rsi: Math.floor(Math.random() * 100) // simulado
  };
}

module.exports = { getMarketData };
