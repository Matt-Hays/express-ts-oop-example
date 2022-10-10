import { Order, Product, User, Address } from '@prisma/client';

/**
 * The Service interface structure.
 */
export default interface Service<T> {
	getAll?(page: number, limit: number): Promise<T[] | null>;
	getAllByParentId?(requestBody: RequestBody, page: number, limit: number): Promise<T[] | null>;
	get(id: number): Promise<T | null>;
	create(requestBody: RequestBody): Promise<T | null>;
	update(requestBody: RequestBody): Promise<T | null>;
	deleteById(id: number): Promise<T | null>;
}

export type RequestBody = {
	product?: Product;
	user?: User & { address: Address };
	userId?: number;
	order?: Order & { products: Product[] };
};
