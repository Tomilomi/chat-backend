import BaseRepository from './baseRepository.js';
import Picture from '../models/picture.js';

class ImageRepository extends BaseRepository {
  constructor() {
    super(Picture);
  }

  // get all pictures

  async getAllPictures() {
    const pictures = await this.model.findAll();
    return pictures.map(picture => ({
      id: picture.pp_number,
      imageBase64: picture.pp_image.toString('base64')
    }));
  }

  // get a picture with id

  async getPictureById(id) {
    const picture = await this.model.findByPk(id);
    if (!picture) return null;

    return {
      id: picture.pp_number,
      imageBase64: picture.pp_image.toString('base64')
    };
  }

  // add a picture with image

  async addPicture(pp_number, imageBuffer) {
    try {
          const newPicture = await this.model.create({
      pp_number: pp_number,
      pp_image: imageBuffer
    });
    return {
      id: newPicture.pp_number,
      imageBase64: newPicture.pp_image.toString('base64')
    };
    }
    catch (error) {
      console.log(error)
    }

  }


  // delete a picture with an id

  async deletePictureById(id) {
    const deletedCount = await this.model.destroy({
      where: { pp_number: id }
    });
    return deletedCount > 0;
  }




}
export default ImageRepository;
