const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(express.json());
app.use(cors());

const db = admin.firestore();

// Route: Get documents from a Firestore collection
app.get("/api/patients", async (req, res) => {
  try {
    const snapshot = await db.collection("patients").get();
    const documents = snapshot.docs.map((doc) => doc.data());
    res.json({ documents });
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
});

// Route: Add a document to Firestore
app.post("/api/patient", async (req, res) => {
  try {
    const docRef = await db.collection("patients").add(req.body);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
