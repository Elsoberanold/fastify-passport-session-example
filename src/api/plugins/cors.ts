import fp from 'fastify-plugin';
import cors from '@fastify/cors';

export default fp(async (app) => {
    return app
        .register(cors, {
            origin: `http://localhost:${process.env.PORT}`,
            credentials: true,
        })
});