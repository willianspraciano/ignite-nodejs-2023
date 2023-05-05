import { FastifyRequest, FastifyReply } from 'fastify';

import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case';

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub;

  const getUserMatrics = makeGetUserMetricsUseCase();
  const { checkInsCount } = await getUserMatrics.execute({
    userId,
  });

  return reply.status(200).send({ checkInsCount });
}
