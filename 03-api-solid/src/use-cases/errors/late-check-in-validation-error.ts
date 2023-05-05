import { AppError } from '@/errors/AppError';

export class LateCheckInValidationError extends AppError {
  constructor() {
    super(
      'The check-in can only be validated util 20 minutes of its creation.',
      403
    );
  }
}
