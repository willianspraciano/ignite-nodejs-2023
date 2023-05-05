import { AppError } from '@/errors/AppError';

export class ResourceNotFoundError extends AppError {
  constructor() {
    super('Resource not found.', 404);
  }
}
