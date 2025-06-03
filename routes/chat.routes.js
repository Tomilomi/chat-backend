import express from "express"
import MessageService from "../services/message.service.js";

const router = express.Router();
const messageService = new MessageService();


// All message -> Chat
router.get("/", async (req, res) => {
    try {
        const messages = await messageService.getAllMessages();
        res.json(messages);
    }
    catch (error) {
        console.log("Error al obtener el chat:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// post a message
router.post("/", async (req, res) => {
    try {
        const { message_text, user_id, image_id } = req.body;

        // Validaciones básicas
        if (!message_text || !user_id) {
            return res.status(400).json({ error: "message_text y user_id son obligatorios" });
        }

        // Crear mensaje usando el servicio
        const newMessage = await messageService.createNewMessage({ message_text, user_id, image_id });

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error al crear mensaje:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
