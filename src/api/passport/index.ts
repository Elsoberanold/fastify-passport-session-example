import { Authenticator } from '@fastify/passport';

import { FastifyRequest } from "fastify";
import type { User } from "./../types/definitionFile";
import type { Profile as GoogleProfile, GoogleCallbackParameters, VerifyCallback } from 'passport-google-oauth20';

import { prisma } from './../db/client'

const GoogleStrategy = require('passport-google-oauth20').Strategy;

function buildPassport() {

    const passport = new Authenticator()

    passport.registerUserSerializer(async (user: User, req: FastifyRequest) => {
        const { id } = user
        const userForSession = { id }
        return userForSession
    })
    
    passport.registerUserDeserializer(async (userForSession: User, req: FastifyRequest) => {

        const deserializeUser = await prisma.user.findUnique({ 
            where: {
                id: userForSession.id
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true
            }
        })

        return deserializeUser
    })
    
    passport.use('google', new GoogleStrategy({
        clientID: process.env['GOOGLE_CLIENT_ID'],
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
        callbackURL: `http://localhost:${process.env.API_PORT}/api/auth/callback/google`
    },
        async function (accessToken: string, refreshToken: string, params: GoogleCallbackParameters, profile: GoogleProfile, cb: VerifyCallback) {
    
            const cred = await prisma.account.findUnique({
                where: {
                    provider_providerAccountId: {
                        provider: 'google',
                        providerAccountId: profile.id,
                    }
                }
            })
    
            if (!cred) {
                // The account at Google has not logged in to this app before.  Create a
                // new user record and associate it with the Google account.
                const newuser = await prisma.user.create({
                    data: {
                        name: profile.displayName,
                        email: profile._json.email,
                        image: profile._json.picture
                    }
                })
    
                await prisma.account.create({
                    data: {
                        userId: newuser.id,
                        type: 'oauth',
                        provider: 'google',
                        providerAccountId: profile.id,
                        refresh_token: refreshToken,
                        access_token: accessToken,
                        expires_at: profile._json.exp,
                        token_type: params.token_type,
                        scope: params.scope,
                        id_token: params.id_token,
                    }
                })
    
                return cb(null, newuser);
    
            } else {
                // The account at Google has previously logged in to the app.  Get the
                // user record associated with the Google account and log the user in.
                const auth_user = await prisma.user.findUnique({
                    where: {
                        id: cred.userId
                    }
                })
    
                if (auth_user) { return cb(null, auth_user); }
            }
        }
    ))

    return passport
}

const passport = buildPassport();

export default passport;
