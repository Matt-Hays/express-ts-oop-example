import { User } from '@prisma/client';
import { RouterOptions, Router } from 'express';
import Service from '../services/Service';
import Route from './Route';

/**
 * The User Domain Controller.
 */
export default class UserRoute extends Route<User> {
	constructor(path: string, service: Service<User>, router: (options?: RouterOptions) => Router) {
		super(path, service, router);
	}
}
