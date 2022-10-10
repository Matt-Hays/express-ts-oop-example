import { Order } from '@prisma/client';
import PrismaUtil from '../../utils/PrismaUtil';
import Service, { RequestBody } from '../Service';

export default class OrderService implements Service<Order> {
	getAllByParentId = async (requestBody: RequestBody, page: number, limit: number): Promise<Order[] | null> => {
		let response: Order[] | null = null;
		const { userId } = requestBody;

		const query = {
			where: {
				userId: userId!,
			},
			include: {
				products: true,
			},
		};

		try {
			await PrismaUtil.prismaClient.$connect();
			response = await PrismaUtil.prismaClient.order.findMany(query);
		} catch (e) {
			// Log the error chain
			console.log(e);
		} finally {
			await PrismaUtil.prismaClient.$disconnect();
			return response;
		}
	};

	get = async (id: number): Promise<Order | null> => {
		let response: Order | null = null;
		const query = {
			where: {
				id: id,
			},
			include: {
				products: true,
			},
		};

		try {
			await PrismaUtil.prismaClient.$connect();
			response = await PrismaUtil.prismaClient.order.findUnique(query);
		} catch (e) {
			// Log the error chain
			console.log(e);
		} finally {
			await PrismaUtil.prismaClient.$disconnect();
			return response;
		}
	};

	create = async (requestBody: RequestBody): Promise<Order | null> => {
		let response: Order | null = null;
		const { order } = requestBody;

		const insertStmt = {
			data: {
				products: {
					connect: order!.products,
				},
				userId: order!.userId,
			},
			include: {
				products: true,
			},
		};

		try {
			await PrismaUtil.prismaClient.$connect();
			response = await PrismaUtil.prismaClient.order.create(insertStmt);
		} catch (e) {
			console.log(e);
		} finally {
			await PrismaUtil.prismaClient.$disconnect();
			return response;
		}
	};

	update = async (requestBody: any): Promise<Order | null> => {
		throw new Error('Method not implemented.');
	};

	deleteById = async (id: number): Promise<Order | null> => {
		throw new Error('Method not implemented.');
	};
}
