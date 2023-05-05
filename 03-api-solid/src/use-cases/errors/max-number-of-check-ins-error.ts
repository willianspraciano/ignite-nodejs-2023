import { AppError } from '@/errors/AppError';

export class MaxNumberOfCheckInsError extends AppError {
  constructor() {
    super('Max number of check-ins reached.', 403);
  }
}
