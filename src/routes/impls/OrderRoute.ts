import { Order } from '@prisma/client';
import { RouterOptions, Router } from 'express';
import Service from '../../services/Service';
import Route from '../Route';

/**
 * The Order Domain Controller.
 */
export default class OrderRoute extends Route<Order> {
	constructor(path: string, service: Service<Order>, router: (options?: RouterOptions) => Router) {
		super(path, service, router);
	}
}
