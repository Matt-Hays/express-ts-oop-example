import bodyParser from 'body-parser';
import express, { Express, RequestHandler, Router } from 'express';
import { Server } from 'http';
import OrderRoute from './routes/impls/OrderRoute';
import ProductRoute from './routes/impls/ProductRoute';
import UserRoute from './routes/impls/UserRoute';
import ProductService from './services/impls/ProductService';
import UserService from './services/impls/UserService';
import OrderService from './services/impls/OrderService';

/**
 * Server configuration / dependency injection class.
 */
export default class Runner {
	readonly #app: Express;
	readonly #middleware: RequestHandler[];
	readonly #port: number = 8080;
	#server: Server | null = null;

	constructor() {
		this.#app = express();
		this.#middleware = this.#initConfiguration();

		this.#loadMiddleware();
		this.#loadRouters();
	}

	/**
	 * PRIVATE METHODS
	 */

	/**
	 * Constructs an array of configuration middleware.
	 * Do not modify this method. See ~/index.ts.
	 * @returns RequestHandler[]
	 */
	#initConfiguration = (): RequestHandler[] => {
		const urlencoded: RequestHandler = bodyParser.urlencoded({ extended: false });
		const parseJson: RequestHandler = bodyParser.json();

		return [urlencoded, parseJson];
	};

	/**
	 * Load all middleware.
	 */
	#loadMiddleware = (): void => {
		this.#middleware.forEach((mw) => this.#app.use(mw));
	};

	/**
	 * Load all custom routes.
	 * REGISTER ROUTES HERE
	 */
	#loadRouters = (): void => {
		const productRoute = new ProductRoute('/api/v1/product', new ProductService(), Router);
		const userRoute = new UserRoute('/api/v1/user', new UserService(), Router);
		const orderRoute = new OrderRoute('/api/v1/order', new OrderService(), Router);

		const routes = [productRoute, userRoute, orderRoute];

		routes.forEach((router) => this.#app.use(router.getBasePath(), router.getRouter()));
	};

	/**
	 * PUBLIC METHODS
	 */

	/**
	 * Allows the addition of optional middleware.
	 * @param requestHandler RequestHandler - middleware
	 */
	addMiddleware = (requestHandler: RequestHandler): void => {
		if (requestHandler) {
			this.#middleware.push(requestHandler);
			this.#app.use(requestHandler);
			if (this.#server)
				console.error(
					'To apply the new middleware options, Runner.start() must be called to restart the running server.'
				);
		}
	};

	/**
	 * Start the server.
	 * @returns Server
	 */
	start = (): Server => {
		this.#server = this.#app.listen(this.#port, () => console.log(`App is running on port: ${this.#port}`));

		return this.#server;
	};
}
