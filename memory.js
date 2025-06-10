const memory = {};

function updateMemory(symbol, profitChance) {
  if (!memory[symbol]) memory[symbol] = 0;
  memory[symbol] += profitChance;
}

function getMemoryScore(symbol) {
  return memory[symbol] || 0;
}

function sortByMemory(data) {
  return data.sort((a, b) => getMemoryScore(b.symbol) - getMemoryScore(a.symbol));
}

module.exports = { updateMemory, getMemoryScore, sortByMemory };
