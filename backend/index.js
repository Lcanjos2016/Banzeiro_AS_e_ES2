const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();
const bodyParser = require('body-parser');

// Inicializa o express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Caminho do service account
const serviceAccountPath = process.env.SERVICE_ACCOUNT_PATH || './serviceAccountKey.json';

try {
  const serviceAccount = require(serviceAccountPath);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  console.log("Firebase conectado com sucesso.");
} catch (err) {
  console.warn("⚠️ Não foi possível inicializar o Firebase Admin.");
  console.warn(err.message);
}

const db = admin.firestore ? admin.firestore() : null;

// Rota básica
app.get('/', (req, res) => {
  res.send('Banzeiro backend OK');
});

// Lista alertas
app.get('/api/alerts', async (req, res) => {
  try {
    const snapshot = await db.collection('alerts').orderBy('createdAt', 'desc').get();
    const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Adiciona alerta
app.post('/api/alerts', async (req, res) => {
  try {
    const { text } = req.body;
    const doc = await db.collection('alerts').add({
      text,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    res.json({ id: doc.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Porta
const PORT = process.env.PORT || 5000;

// INICIA O SERVIDOR
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
