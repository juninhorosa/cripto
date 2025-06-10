require('dotenv').config();
const express = require('express');
const { getAllMarketData } = require('./exchange_api');
const { shouldAlert } = require('./ai_logic');
const { sortByMemory } = require('./memory');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('📡 Nova conexão WebSocket');
});

setInterval(async () => {
  try {
    let all = await getAllMarketData();
    all.forEach(shouldAlert);
    const ranked = sortByMemory(all);
    io.emit('update', ranked.slice(0, 50)); // envia top 50
  } catch (e) {
    console.error('Erro na IA:', e.message);
  }
}, 5000); // atualiza a cada 5s (requisição)

http.listen(PORT, () => console.log(`🟢 IA rodando em http://localhost:${PORT}`));
