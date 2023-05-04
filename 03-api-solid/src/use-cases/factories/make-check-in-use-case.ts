import { CheckInUseCase } from '../check-in';
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';

export function makeCheckInUseCase() {
  const checkInRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();

  const useCase = new CheckInUseCase(checkInRepository, gymsRepository);

  return useCase;
}
