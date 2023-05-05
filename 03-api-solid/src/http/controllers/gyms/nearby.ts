import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case';
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case';

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  });

  const { latitude, longitude } = querySchema.parse(request.query);

  const searchGyms = makeFetchNearbyGymsUseCase();
  const { gyms } = await searchGyms.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({ gyms });
}
