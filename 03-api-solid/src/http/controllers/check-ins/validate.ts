import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case';

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = paramsSchema.parse(request.params);

  const validateCheckIn = makeValidateCheckInUseCase();
  await validateCheckIn.execute({
    checkInId,
  });

  return reply.status(204).send();
}
