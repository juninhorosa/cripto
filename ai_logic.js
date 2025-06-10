const { updateMemory } = require('./memory');

function shouldAlert(data) {
  const change = data.change;
  const rsi = data.rsi;

  const isGood = change >= 6 && rsi < 60;
  const isRisk = change <= -4 || rsi > 80;

  if (isGood) updateMemory(data.symbol, 5);
  else if (isRisk) updateMemory(data.symbol, -3);
  else updateMemory(data.symbol, 1);

  data.status = isGood ? 'good' : isRisk ? 'risk' : 'neutral';
  return true;
}

module.exports = { shouldAlert };
