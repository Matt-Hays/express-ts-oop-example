import { Request, Response, Router, RouterOptions } from 'express';
import Service from '../services/Service';

/**
 * The parent / super class for all routes.
 * Provides generic controller-level function for select CRUD operations.
 */
export default class Route<T> {
	readonly #basePath: string;
	readonly #service: Service<T>;
	readonly #router: Router;

	constructor(path: string, service: Service<T>, router: (options?: RouterOptions) => Router) {
		this.#basePath = path;
		this.#service = service;
		this.#router = router();

		this.#addRouteHandlers();
	}

	/**
	 * PRIVATE METHODS
	 */

	/**
	 * Add methods to route handler.
	 */
	#addRouteHandlers(): void {
		this.#router.get('/:id', this.#getById);
		this.#router.post('/', this.#create);
		this.#router.put('/:id', this.#update);
		this.#router.delete('/:id', this.#deleteById);
	}

	/**
	 * Get by id.
	 * @param req Request
	 * @param res Response
	 */
	#getById = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;
		const clientResponse: ClientResponse<T> = { data: null };

		try {
			clientResponse.data = await this.#service.get(parseInt(id));

			res.status(200).json(clientResponse);
		} catch (e) {
			res.status(500).json({ message: 'An error has occured' });
		}
	};

	/**
	 * Create a new.
	 * @param req Request
	 * @param res Response
	 */
	#create = async (req: Request, res: Response): Promise<void> => {
		const clientResponse: ClientResponse<T> = { data: null };

		try {
			clientResponse.data = await this.#service.create(req.body);

			res.status(200).json(clientResponse);
		} catch (e) {
			res.status(500).json(clientResponse);
		}
	};

	/**
	 * Update an existing.
	 * @param req Request
	 * @param res Response
	 */
	#update = async (req: Request, res: Response): Promise<void> => {
		const clientResponse: ClientResponse<T> = { data: null };

		try {
			clientResponse.data = await this.#service.update(req.body);

			res.status(200).json(clientResponse);
		} catch (e) {
			res.status(500).json(clientResponse);
		}
	};

	/**
	 * Delete an existing.
	 * @param req Request
	 * @param res Response
	 */
	#deleteById = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;
		const clientResponse: ClientResponse<T> = { data: null };

		try {
			clientResponse.data = await this.#service.deleteById(parseInt(id));

			res.status(200).json(clientResponse);
		} catch (e) {
			res.status(500).json(clientResponse);
		}
	};

	/**
	 * PUBLIC METHODS
	 */

	/**
	 * Return the router for the router.
	 * @returns Router
	 */
	getRouter(): Router {
		return this.#router;
	}

	/**
	 * Returns the base path for the router.
	 * @returns string Base path.
	 */
	getBasePath(): string {
		return this.#basePath;
	}

	/**
	 * Returns the service used by the route.
	 * @returns Service
	 */
	getService(): Service<T> {
		return this.#service;
	}
}

export type ClientResponse<T> = {
	data: Awaited<T | null>;
};
