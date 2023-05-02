import { Prisma, Gym } from '@prisma/client';

export interface IFindManyNearby {
  latitude: number;
  longitude: number;
}

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  findById(id: string): Promise<Gym | null>;
  findManyNearby(parms: IFindManyNearby): Promise<Gym[]>;
}
