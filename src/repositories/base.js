import { Schema } from 'redis-om';
import { Repository } from 'redis-om';
import { RepositoryNotInitializedException } from '../utils/exceptions.js';
import { EntityId } from 'redis-om';

export class BaseRepository {

    repository;
    extendedBy;
    schema;

    constructor(extendedBy, schema) {
        this.extendedBy = extendedBy;
        this.schema = schema;
    }

    //has to be called in db.js
    initRepo(redisClient) {
        const repo = new Repository(this.schema, redisClient)
        repo.createIndex();

        this.repository = repo;
    };

    checkIfInitialized() {
        if (this.repository == null) {
            throw new RepositoryNotInitializedException(`${this.extendedBy} not initialized`)
        }
    };

    getRepo() {
        return this.repository;
    };

    async update(data) {
        return await this.repository.save(data);
    }

    async add(data) {
        return await this.repository.save(data);
    }

    async getAll() {
        return await this.repository.search().return.all();
    }

    async removeAll() {
        const data = await this.repository
            .search().return.all();

        const entityToRemove = [];
        for (let key of Object.keys(data)) {
            entityToRemove.push(data[key][EntityId]);
        }
        await this.repository.remove(entityToRemove);
    }

}
