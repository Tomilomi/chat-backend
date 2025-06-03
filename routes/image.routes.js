import express from 'express';
import ImageService from '../services/image.service.js';
import multer from 'multer';



const router = express.Router();
const imageService = new ImageService();


const storage = multer.memoryStorage();
const upload = multer({ storage });

// All images
router.get("/", async (req, res) => {
  try {
    const images = await imageService.getAll();
    res.json(images);
  } catch (error) {
    console.error("Error al obtener imágenes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// get an image by id

router.get("/:id", async (req, res) => {
  try {
    const image = await imageService.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: "Imagen no encontrada" });
    }
    res.json(image);
  } catch (error) {
    console.error("Error al obtener imagen:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// upload a image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Archivo de imagen requerido" });
    }
    const pp_number = req.body.pp_number;
    if (isNaN(pp_number)) {
      return res.status(400).json({ error: "pp_number es requerido" });
    }

    const newImage = await imageService.createNewImage(pp_number, req.file.buffer);
    res.status(201).json(newImage);
  } catch (error) {
    console.error("Error al subir imagen:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


// Delete a image by id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await imageService.deletePictureById(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Imagen no encontrada" });
    }
    res.json({ message: "Imagen eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar imagen:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


export default router;