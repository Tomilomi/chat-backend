class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async findAll(options = {}) {
        return await this.model.findAll(options);
    }

    async findById(id) {
        return await this.model.findByPk(id);
    }

    async create(data) {
        return await this.model.create(data);
    }

    async update(id, data) {
        const instance = await this.findById(id);
        return instance ? await instance.update(data) : null;
    }

    async delete(id) {
        const instance = await this.findById(id);
        return instance ? await instance.destroy() : null;
    }
}

export default BaseRepository;
