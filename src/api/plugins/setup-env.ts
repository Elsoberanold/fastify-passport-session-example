import fp from 'fastify-plugin';
import fastifyEnv from '@fastify/env';

const schema = {
    type: 'object',
    required: ['API_PORT', 'PORT', 'DATABASE_URL', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'],
    properties: {
        API_PORT: {
            type: 'string',
            default: '4000',
        },
        PORT: {
            type: 'string',
            default: '3000',
        },
        DATABASE_URL: {
            type: 'string',
        },
        GOOGLE_CLIENT_ID: {
            type: 'string',
        },
        GOOGLE_CLIENT_SECRET: {
            type: 'string',
        },
    },
}

export default fp(async (app) => {
    return app
        .register(fastifyEnv, {
            schema,
            dotenv: true,
        })
});