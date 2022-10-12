import { Order } from '@prisma/client';
import { RouterOptions, Router, Request, Response } from 'express';
import Service from '../services/Service';
import Route, { ClientResponse } from './Route';

/**
 * The Order Domain Controller.
 */
export default class OrderRoute extends Route<Order> {
	constructor(path: string, service: Service<Order>, router: (options?: RouterOptions) => Router) {
		super(path, service, router);
		this.#addRouteToRouter();
	}

	#addRouteToRouter() {
		this.getRouter().get('/', this.getAllByParentId);
	}

	getAllByParentId = async (req: Request, res: Response): Promise<void> => {
		const clientResponse: ClientResponse<Order[]> = { data: null };
		try {
			clientResponse.data = await this.getService().getAllByParentId!(req.body, 0, 10);

			res.status(200).json(clientResponse);
		} catch (e) {
			res.status(500).json(clientResponse);
		}
	};
}
