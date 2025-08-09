// server.js
const express = require('express');
const bodyParser = require('body-parser');
const processPayload = require('./processpayloads'); // module from Step 1
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'frontend')));

// POST /webhook -> receives payloads and saves to payloads.json
app.post('/webhook', async (req, res) => {
  const payload = req.body;
  try {
    await processPayload(payload);
    console.log('🔔 Webhook received and saved.');
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error saving payload:', err);
    return res.status(500).json({ ok: false, error: 'save_failed' });
  }
});

// GET /payloads -> return raw saved payload entries
app.get('/payloads', (req, res) => {
  const file = path.join(__dirname, 'payloads.json');
  if (!fs.existsSync(file)) return res.json([]);
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return res.json(data);
  } catch (err) {
    console.error('Error reading payloads.json', err);
    return res.status(500).json([]);
  }
});

// helper: convert payloads -> chats grouped by 'from'
function getChatsFromPayloads() {
  const file = path.join(__dirname, 'payloads.json');
  if (!fs.existsSync(file)) return [];
  let arr = [];
  try {
    arr = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    return [];
  }

  const map = {};
  arr.forEach(item => {
    const payload = item.payload;
    try {
      const entries = payload.entry || [];
      entries.forEach(e => {
        (e.changes || []).forEach(ch => {
          const val = ch.value || {};
          (val.messages || []).forEach(m => {
            const from = m.from || (val.contacts && val.contacts[0] && val.contacts[0].wa_id) || 'unknown';
            const text = (m.text && m.text.body) || m.body || '';
            const ts = m.timestamp ? Number(m.timestamp) : Math.floor(Date.now() / 1000);
            const id = m.id || ('local-' + ts + '-' + Math.random().toString(36).slice(2,8));
            if (!map[from]) map[from] = [];
            map[from].push({ id, from, text, ts, status: m.status || 'sent' });
          });
        });
      });
    } catch (e) {
      // fallback: try simpler structure
      if (payload.sender && payload.message) {
        const from = payload.sender;
        const text = payload.message;
        const ts = Math.floor(Date.now() / 1000);
        if (!map[from]) map[from] = [];
        map[from].push({ id: 'local-' + ts, from, text, ts, status: 'sent' });
      }
    }
  });

  // convert to array, sorted by last message desc
  const chats = Object.keys(map).map(k => ({
    from: k,
    messages: map[k].sort((a,b)=>a.ts - b.ts)
  }));

  // sort chats by last message time (desc)
  chats.sort((a,b)=>{
    const at = a.messages.length ? a.messages[a.messages.length-1].ts : 0;
    const bt = b.messages.length ? b.messages[b.messages.length-1].ts : 0;
    return bt - at;
  });

  return chats;
}

// GET /api/chats -> returns grouped chats for frontend
app.get('/api/chats', (req, res) => {
  const chats = getChatsFromPayloads();
  res.json(chats);
});

// fallback root -> serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});