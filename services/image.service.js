import ImageRepository from '../repositories/imageRepository.js';

const imageRepository = new ImageRepository();

class ImageService {


    async getAll() {
        return await imageRepository.getAllPictures();
    }


    async findById(id) {
        return await imageRepository.getPictureById(id);
    }

    async createNewImage(pp_number, imageBuffer) {
        return await imageRepository.addPicture(pp_number, imageBuffer);
    }


    async deletePictureById(id) {
        return await imageRepository.deletePictureById(id);
    }
}

export default ImageService;