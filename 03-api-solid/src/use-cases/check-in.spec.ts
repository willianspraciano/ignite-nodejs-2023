import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { Decimal } from '@prisma/client/runtime/library';

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CheckInUseCase } from './check-in';

let usersRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

//longitude -3.6941378
//latitude -40.3370292,15

describe('Check-in Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(usersRepository, gymsRepository);

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-3.6941378),
      longitude: new Decimal(-40.3370292),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 28, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -3.6941378,
      userLongitude: -40.3370292,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 28, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -3.6941378,
      userLongitude: -40.3370292,
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -3.6941378,
        userLongitude: -40.3370292,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 28, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -3.6941378,
      userLongitude: -40.3370292,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -3.6941378,
      userLongitude: -40.3370292,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in on distant gym', async () => {
    vi.setSystemTime(new Date(2022, 0, 28, 8, 0, 0));

    // -3.6969304,-40.2805632
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-3.6969304),
      longitude: new Decimal(-40.2805632),
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -3.6941378,
        userLongitude: -40.3370292,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
