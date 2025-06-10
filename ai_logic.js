function shouldAlert(data) {
  const change = Math.abs(data.change);
  const rsi = data.rsi;
  return change >= 5 || rsi > 70 || rsi < 30;
}

module.exports = { shouldAlert };
