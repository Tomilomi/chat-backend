import BaseRepository from './baseRepository.js';
import Usuario from '../models/user.js';
import Message from '../models/message.js';
import Picture from '../models/picture.js';

class UserRepository extends BaseRepository {
    constructor() {
        super(Usuario);
    }

    // Buscar usuario con sus mensajes
    async getUserWithMessages(id) {
        return await this.model.findByPk(id, {
            include: [{ model: Message, as: 'messages' }],
        });
    }

    // Buscar usuario por nombre de usuario
    async findByUsername(username) {
        return await this.model.findOne({
            where: { user_name: username },
        });
    }


    // Buscar usuario con su imagen de perfil
    async getUserWithPicture(id) {
        return await this.model.findByPk(id, {
            include: [{ model: Picture, as: 'picture' }],
        });
    }

    // Buscar usuario con todo (mensajes e imagen)
    async getFullUserById(id) {
        return await this.model.findByPk(id, {
            include: [
                { model: Message, as: 'messages' },
                { model: Picture, as: 'picture' }
            ],
        });
    }

    // Crear nuevo usuario
    async createUser(data) {
        return await this.model.create(data);
    }

    // Actualizar nombre de usuario
    async updateUsername(id, newName) {
        return await this.model.update(
            { user_name: newName },
            { where: { user_id: id } }
        );
    }

    // Actualizar contraseña
    async updatePassword(id, newPassword) {
        return await this.model.update(
            { user_password: newPassword },
            { where: { user_id: id } }
        );
    }

    // Actualizar foto (id de picture)
    async updatePicture(id, pictureId) {
        return await this.model.update(
            { user_number_pp: pictureId },
            { where: { user_id: id } }
        );
    }

    // Eliminar usuario por ID
    async deleteById(id) {
        return await this.model.destroy({ where: { user_id: id } });
    }
}

export default UserRepository;
