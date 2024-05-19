import { UseCaseError } from '@app/core/errors/UseCaseErrors';

export class ResourceNotFoundError extends Error implements UseCaseError {
    constructor(resourceName?: string) {
        super(`${resourceName ? resourceName : 'resource'} not found`);
    }
}
