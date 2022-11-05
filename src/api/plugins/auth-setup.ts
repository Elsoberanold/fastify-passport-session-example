import fp from 'fastify-plugin'
import cookie from '@fastify/cookie'
import passport from './../passport'

import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { prisma } from './../db/client'

const fastifySession = require('@fastify/session')
const fastifyCsrfProtection = require('@fastify/csrf-protection')

export default fp(async (app) => {
    app.register(cookie)
    app.register(fastifySession, {
            cookieName: 'user-session',
            secret: 'mysecretmysecretmysecretmysecret',
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                maxAge: 1000 * 60 * 60 * 24 * 1,
                sameSite: 'None'
            },
            store: new PrismaSessionStore(
                prisma,
                {
                    checkPeriod: 2 * 60 * 1000,
                    dbRecordIdIsSessionId: false,
                    dbRecordIdFunction: undefined
                }
            )
        })

    app.register(fastifyCsrfProtection, { sessionPlugin: '@fastify/session' })

    app.register(passport.initialize())
    app.register(passport.secureSession())

    return app
});

