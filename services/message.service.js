import MessageRepository from "../repositories/messageRepository";

const messageRepository = new MessageRepository();

class MessageService {

    // Get all messages
    async getAllMessages() {
        return await messageRepository.findAll();
    }

    // Create a new message
    async createNewMessage({ message_text, user_id, image_id }) {
        return await messageRepository.createMessage({
            message_text,
            user_id,
            image_id
        });
    }

}

export default MessageService;