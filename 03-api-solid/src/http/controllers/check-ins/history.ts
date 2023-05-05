import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

import { makeFetchUserCheckInsUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case';

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const userId = request.user.sub;
  const { page } = querySchema.parse(request.query);

  const fetchUserCheckIns = makeFetchUserCheckInsUseCase();
  const { checkIns } = await fetchUserCheckIns.execute({
    userId,
    page,
  });

  return reply.status(200).send({ checkIns });
}
