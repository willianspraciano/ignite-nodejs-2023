import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';

import { env } from './env';
import { userRoutes } from './http/controllers/users/routes';
import { gymRoutes } from './http/controllers/gyms/routes';
import { errorHandler } from './errors/errorHandler';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(userRoutes);
app.register(gymRoutes);

app.setErrorHandler(errorHandler);
