import BaseRepository from './BaseRepository.js';
import Message from '../models/message.js';

class MessageRepository extends BaseRepository {
    constructor() {
        super(Message);
    }

    // Obtener todos los mensajes
    async findAll() {
        return await this.model.findAll();
    }

    // Crear un nuevo mensaje
    async createMessage(data) {
        return await this.model.create(data);
    }
}

export default MessageRepository;
