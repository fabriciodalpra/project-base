import { UseCaseError } from '@app/core/errors/UseCaseErrors';

export class ResourceAlreadyExistsError extends Error implements UseCaseError {
  constructor(resourceName?: string) {
    super(`${resourceName ? resourceName : 'resource'} already exists`);
  }
}