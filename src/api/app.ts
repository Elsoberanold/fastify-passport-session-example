import { join } from 'path';
import AutoLoad from '@fastify/autoload';
import fastify from "fastify";

export function buildApp(logging = true) {

    const app = fastify({
        logger: true
    })

    app.register(AutoLoad, {
        dir: join(__dirname, 'plugins')
    })

    app.register(AutoLoad, {
        dir: join(__dirname, 'routes')
    })

    return app
}