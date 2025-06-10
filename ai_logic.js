const { getRSI, getSMA } = require('./utils/indicators');

function shouldBuy(data) {
  const rsi = getRSI(data);
  return rsi < 30 && data.price_change_percent > 5;
}

function shouldSell(data) {
  const rsi = getRSI(data);
  return rsi > 70 || data.price_change_percent < -5;
}

module.exports = { shouldBuy, shouldSell };
