/**
 * The Service interface structure.
 */
export default interface Service<T> {
	getAll?(page: number, limit: number): Promise<T[] | null>;
	getAllByParentId?(id: number, page: number, limit: number): Promise<T[] | null>;
	get(id: number): Promise<T | null>;
	create(requestBody: any): Promise<T | null>;
	update(requestBody: any): Promise<T | null>;
	deleteById(id: number): Promise<T | null>;
}
