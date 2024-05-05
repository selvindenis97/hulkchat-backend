export class RepositoryNotInitializedException extends Error {
    constructor(message) {
        super(message);
        this.name = "RepositoryNotInitializedException";
    }
}