import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const bodySchema = z.object({
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  });

  const userId = request.user.sub;
  const { gymId } = paramsSchema.parse(request.params);
  const { latitude, longitude } = bodySchema.parse(request.body);

  const createCheckIn = makeCheckInUseCase();
  await createCheckIn.execute({
    gymId,
    userId,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send();
}
