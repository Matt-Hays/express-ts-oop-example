import { Product } from '@prisma/client';
import { RouterOptions, Router, Request, Response } from 'express';
import Service from '../services/Service';
import Route, { ClientResponse } from './Route';

/**
 * The Product Domain Controller.
 */
export default class ProductRoute extends Route<Product> {
	constructor(path: string, service: Service<Product>, router: (options?: RouterOptions) => Router) {
		super(path, service, router);
		this.#addRouteToRouter();
	}

	#addRouteToRouter() {
		this.getRouter().use('/', this.getAll);
	}

	getAll = async (req: Request, res: Response): Promise<void> => {
		const clientResponse: ClientResponse<Product[]> = { data: null };

		try {
			clientResponse.data = await this.getService().getAll!(0, 10);

			res.status(200).json(clientResponse);
		} catch (e) {
			console.log(e);
			res.status(500).json(clientResponse);
		}
	};
}
