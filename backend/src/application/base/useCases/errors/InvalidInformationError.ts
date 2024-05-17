import { UseCaseError } from '@app/core/errors/UseCaseErrors';

export class InvalidInformationError extends Error implements UseCaseError {
  constructor(resourceName?: string) {
    super(`${resourceName ? resourceName : 'resource'} invalid`);
  }
}
