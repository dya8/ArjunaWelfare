// -----------------------------
// server.js
// -----------------------------
import express from "express";
import multer from "multer";
import cors from "cors";
import admin from "firebase-admin";
import { google } from "googleapis";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


dotenv.config();



// -----------------------------
// Fix __dirname in ES modules
// -----------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -----------------------------
// Firebase Setup
// -----------------------------
//import serviceAccount from "./arjuna-animal-welfare-59bf3-firebase-adminsdk-fbsvc-a48bf86a1e.json" with { type: "json" };

/*admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();*/

// -----------------------------
// Express Setup
// -----------------------------
const app = express();
app.use(cors());
//const upload = multer({ dest: "uploads/" }); // temp folder for files

// -----------------------------
// Google OAuth2 Setup
// -----------------------------
/**const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || "http://localhost:5000/oauth2callback"
);

// Load tokens if previously saved
try {
  if (fs.existsSync("tokens.json")) {
    const savedTokens = JSON.parse(fs.readFileSync("tokens.json", "utf8"));
    oAuth2Client.setCredentials(savedTokens);
    console.log("✅ Loaded saved Google OAuth tokens");
  }
} catch (err) {
  console.warn("⚠️ Could not load tokens.json:", err.message);
}

// Return Drive client if authenticated
function getDrive() {
  if (oAuth2Client.credentials?.access_token || oAuth2Client.credentials?.refresh_token) {
    return google.drive({ version: "v3", auth: oAuth2Client });
  }
  return null;
}

// -----------------------------
// Google OAuth Routes
// -----------------------------
app.get("/auth/google", (req, res) => {
  const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/drive.file"], // upload only
  });
  res.redirect(url);
});

app.get("/oauth2callback", async (req, res) => {
  try {
    const { code } = req.query;
    const { tokens } = await oAuth2Client.getToken(code);
    fs.writeFileSync("tokens.json", JSON.stringify(tokens));
    oAuth2Client.setCredentials(tokens);
    res.send("✅ Google Drive connected! You can close this tab now.");
  } catch (err) {
    console.error("OAuth callback error:", err.message);
    res.status(500).send("❌ OAuth failed");
  }
});

// -----------------------------
// Upload to Google Drive
// -----------------------------
async function uploadToDrive(filePath, fileName, mimeType) {
  const drive = getDrive();
  if (!drive) throw new Error("Not authenticated with Google Drive. Visit /auth/google first.");

  const fileMetadata = {
    name: fileName,
    ...(process.env.FOLDER_ID ? { parents: [process.env.FOLDER_ID] } : {}),
  };

  const media = { mimeType, body: fs.createReadStream(filePath) };

  const res = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: "id, webViewLink",
  });

  // Make file public (optional)
  await drive.permissions.create({
    fileId: res.data.id,
    requestBody: { role: "reader", type: "anyone" },
  });

  return res.data.webViewLink;
}

// -----------------------------
// Donation API
// -----------------------------
app.post("/api/donate", upload.single("proof"), async (req, res) => {
  try {
    const { name, contact, email, amount } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Upload proof to Drive
    const driveLink = await uploadToDrive(file.path, file.originalname, file.mimetype);

    // Save donor info in Firestore
    await db.collection("donations").add({
      name,
      contact,
      email,
      amount,
      proofLink: driveLink,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Delete local temp file
    fs.unlinkSync(file.path);

    res.json({ success: true, message: "Donation recorded!", proofLink: driveLink });
  } catch (error) {
    console.error("Error uploading donation:", error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }

});

**/

const SPREADSHEET_ID = process.env.SHEET_ID; // Your sheet id
// Either put entire JSON in env var GOOGLE_SERVICE_ACCOUNT_KEY (stringified JSON)
// or place service-account.json next to server and use require('./service-account.json')
const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY)
  : require("./service-account.json");

// Google auth
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

let sheetsClient = null;
async function getSheets() {
  if (!sheetsClient) {
    const client = await auth.getClient();
    sheetsClient = google.sheets({ version: "v4", auth: client });
  }
  return sheetsClient;
}

// Simple cache (avoid hitting API on every request)
let cache = { ts: 0, data: null };
const CACHE_TTL = 30 * 1000; // 30s

app.get("/api/animals", async (req, res) => {
  try {
    if (Date.now() - cache.ts < CACHE_TTL && cache.data) {
      return res.json({ success: true, animals: cache.data });
    }

    const sheets = await getSheets();

    // ✅ Read header row
    const headerResp = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Adoption!A1:Z1",
    });
    const headers = (headerResp.data.values && headerResp.data.values[0]) || [];

    // ✅ Read data rows
    const dataResp = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Adoption!A2:Z",
    });
    const rows = dataResp.data.values || [];

    // Debug logs
    console.log("Headers from sheet:", headers);
    console.log("First row:", rows[0]);

    // ✅ Map rows into objects using exact header names
    const animals = rows.map((row, idx) => {
      const obj = {};
      headers.forEach((h, i) => {
        obj[h.trim()] = row[i] || ""; // keep header names as-is
      });
      obj.id = String(idx + 1); // ensure an ID
      return obj;
    });

    cache = { ts: Date.now(), data: animals };
    res.json({ success: true, animals });
  } catch (err) {
    console.error("Error reading sheet:", err.message || err);
    res.status(500).json({ success: false, message: err.message });
  }
});


/**
// -----------------------------
// Serve React frontend (Production)
// -----------------------------
app.use(express.static(path.join(__dirname, "client/build")));

// Catch-all for React Router
 
//app.get(/.*/    /** , (req, res) => {
//  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
**/
// -----------------------------
// Start Server
//-----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
