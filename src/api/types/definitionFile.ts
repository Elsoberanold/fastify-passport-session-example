import type { FastifyRequest, PassportUser } from "fastify";


export interface User extends PassportUser {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: ISODateString | null;
    image?: string | null;
    createdAt?: ISODateString | null;
}


export interface DefaultUser {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

export interface Session extends Record<string, unknown>, DefaultSession {
}

export declare type ISODateString = string;
export interface DefaultSession extends Record<string, unknown> {
    user?: DefaultUser;
    expires: ISODateString;
}

export interface IGetUserAuthInfoRequest extends FastifyRequest {
    user?: User | undefined
}