import { FastifyPluginAsync } from 'fastify'
import type { IGetUserAuthInfoRequest } from "./../types/definitionFile";
import passport from '../passport';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.get('/',
		{
			preValidation: (req: IGetUserAuthInfoRequest, res, done) => {
				//console.log(req.user)
				if (!req.user) {
					//res.redirect('/login')
				}
				done()
			}
		},
		async (req: IGetUserAuthInfoRequest, res) => {
			console.log(req.user)
			if (req.user) {
				res.send(`Hello ${req.user.name}!`)
			}
			else {
				res.send(`Hello World`)
			}
		})

	fastify.get('/login-fail', (req, res) => {
		res.send('Login Failure')
	})

	fastify.get('/getuser', (req, res) => {
		res.send(req.user)
	})

	fastify.get(
		'/api/auth/callback/google',
		{
			preValidation: passport.authenticate('google', {
				scope: ['profile', 'email', 'openid'],
				successRedirect: `http://localhost:${process.env.PORT}/`,
				failureRedirect: `http://localhost:${process.env.PORT}/`
			})
		}, function (req, res) {
			res.redirect(`http://localhost:${process.env.PORT}/`)
		}
	)

	fastify.get(
		'/auth/google',
		{
			preValidation: passport.authenticate('google', { scope: ['profile', 'email', 'openid'] })
		}, async (req, res: any) => {
			console.log('GOOGLE API foward')
			const token = await res.generateCsrf()
			return { token }
		}
	)

	fastify.get(
		'/logout',
		(req: any, res: any) => {
			req.logout();
			req.session.destroy((err: Error) => {
				res.clearCookie('connect.sid');
				// Don't redirect, just print text
				res.redirect(`http://localhost:${process.env.PORT}/`)
			});
		}
	)
}

export default root;
