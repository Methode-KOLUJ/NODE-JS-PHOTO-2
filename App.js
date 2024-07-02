const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const fs = require("fs").promises;
const multer = require("multer");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(favicon(path.join(__dirname, "public", "Icons", "Méthode.KOLUJ.ico")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public", "images"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Utiliser le nom d'origine du fichier
  },
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Endpoint pour récupérer les noms des images
app.get("/images", async (req, res) => {
  try {
    const imageDir = path.join(__dirname, "public", "images");
    const files = await fs.readdir(imageDir);
    const imageNames = files.filter(
      (file) =>
        file.endsWith(".jpg") || file.endsWith(".jpeg") || file.endsWith(".png")
    );
    res.json(imageNames);
  } catch (error) {
    console.error("Erreur lors de la récupération des images:", error);
    res.status(500).send("Erreur interne du serveur");
  }
});

// Endpoint pour supprimer une image
app.delete("/images/:imageName", async (req, res) => {
  const { imageName } = req.params;
  const { password } = req.body;

  if (password !== process.env.PASSWORD) {
    return res.status(401).send("Mot de passe incorrect");
  }

  const imagePath = path.join(__dirname, "public", "images", imageName);

  try {
    await fs.unlink(imagePath);
    res.sendStatus(200);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'image:", error);
    res.status(500).send("Erreur interne du serveur");
  }
});

// Endpoint pour télécharger les images
app.post("/upload", upload.array("images", 100), async (req, res) => {
  const { password } = req.body;

  if (password !== process.env.PASSWORD) {
    return res.status(401).send("Mot de passe incorrect");
  }

  try {
    res.sendStatus(200);
  } catch (error) {
    console.error("Erreur lors du téléchargement des images:", error);
    res.status(500).send("Erreur interne du serveur");
  }
});

// Page d'accueil
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Galerie.html"));
});

// Page d'uploader
app.get("/uploader", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Uploader.html"));
});

// Page pour supprimer les images
app.get("/eraser", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Eraser.html"));
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
