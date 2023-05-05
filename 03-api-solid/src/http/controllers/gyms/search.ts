import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case';

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = querySchema.parse(request.query);

  const searchGyms = makeSearchGymsUseCase();
  const { gyms } = await searchGyms.execute({
    query: q,
    page,
  });

  return reply.status(200).send({ gyms });
}
