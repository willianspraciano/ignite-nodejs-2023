import { AppError } from '@/errors/AppError';

export class MaxDistanceError extends AppError {
  constructor() {
    super('Max distance reached.', 403);
  }
}
