import UserRepository from '../repositories/userRepository.js';
import bcrypt from 'bcrypt';

const userRepository = new UserRepository();

class UserService {

    // Create a new user and encrypt the password
    async createNewUser({ user_name, user_password, user_number_pp }) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user_password, saltRounds);

        return await userRepository.createUser({
            user_name,
            user_password: hashedPassword,
            user_number_pp
        });

        // return newUser;
    }

    // plain password
    async login(user_name, user_password) {
        const user = await userRepository.findByUsername(user_name)
        if (!user) return null

        const correctPw = await user.validatePassword(plainPw)
        if (!correctPw) return null

        return {
            user_name: user.user_name,
            user_number_pp: user.generate
        }
    }

    // Get a user by id with their messages and image
    async getFullUserByid(id) {
        return await userRepository.getFullUserById(id)
    }

    // Get a user by id with their picture

    async getUserWithPicture(id) {
        return await userRepository.getUserWithPicture(id);
    }

    // get a user by username
    async findByUsername(username) {
        return await userRepository.findByUsername(username);
    }


    // Update a user's name
    async updateUsername(id, newName) {
        return await userRepository.updateUsername(id, newName);
    }

    // Update a user's password
    async updatePassword(id, newPassword) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        return await userRepository.updatePassword(id, hashedPassword);
    }

    // Update a user's picture
    async updatePicture(id, pictureId) {
        return await userRepository.updatePicture(id, pictureId);
    }

    // delete a user by id
    async deleteUserById(id) {
        return await userRepository.deleteById(id);
    }

}

export default UserService;