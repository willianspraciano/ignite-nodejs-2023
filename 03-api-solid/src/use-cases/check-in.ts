import { CheckIn } from '@prisma/client';

import { CheckInsRepository } from '@/repositories/check-ins-repository';

interface ICheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface ICheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    gymId,
    userId,
  }: ICheckInUseCaseRequest): Promise<ICheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
