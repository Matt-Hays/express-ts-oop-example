import { Product } from '@prisma/client';
import PrismaUtil from '../../utils/PrismaUtil';
import Service, { RequestBody } from '../Service';

export default class ProductService implements Service<Product> {
	getAll = async (page: number, limit: number): Promise<Product[] | null> => {
		let response: Product[] | null = null;
		try {
			await PrismaUtil.prismaClient.$connect();
			response = await PrismaUtil.prismaClient.product.findMany({ skip: page, take: limit });
		} catch (e) {
			// Log the error chain
			console.log(e);
		} finally {
			await PrismaUtil.prismaClient.$disconnect();
			return response;
		}
	};

	get = async (id: number): Promise<Product | null> => {
		let response: Product | null = null;
		try {
			await PrismaUtil.prismaClient.$connect();
			response = await PrismaUtil.prismaClient.product.findUnique({
				where: {
					id: id,
				},
			});
		} catch (e) {
			// Log the error chain
			console.log(e);
		} finally {
			await PrismaUtil.prismaClient.$disconnect();
			return response;
		}
	};

	create = async (requestBody: RequestBody): Promise<Product | null> => {
		let response: Product | null = null;
		const { product } = requestBody;

		const insertStmt = {
			data: product!,
		};

		try {
			await PrismaUtil.prismaClient.$connect();
			response = await PrismaUtil.prismaClient.product.create(insertStmt);
		} catch (e) {
			// Log the error chain
			console.log(e);
		} finally {
			await PrismaUtil.prismaClient.$disconnect();
			return response;
		}
	};

	update = async (requestBody: RequestBody): Promise<Product | null> => {
		let response: Product | null = null;
		const { product } = requestBody;

		try {
			await PrismaUtil.prismaClient.$connect();
			response = await PrismaUtil.prismaClient.product.update({
				where: {
					id: product!.id,
				},
				data: product!,
			});
		} catch (e) {
			// Log the error chain
			console.log(e);
		} finally {
			await PrismaUtil.prismaClient.$disconnect();
			return response;
		}
	};

	deleteById = async (id: number): Promise<Product | null> => {
		let response: Product | null = null;

		try {
			await PrismaUtil.prismaClient.$connect();
			response = await PrismaUtil.prismaClient.product.delete({
				where: {
					id: id,
				},
			});
		} catch (e) {
			// Log the error chain
			console.log(e);
		} finally {
			await PrismaUtil.prismaClient.$disconnect();
			return response;
		}
	};
}
