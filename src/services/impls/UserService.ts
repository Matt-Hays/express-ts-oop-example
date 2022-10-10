import { User } from '@prisma/client';
import PrismaUtil from '../../utils/PrismaUtil';
import Service from '../Service';

export default class UserService implements Service<User> {
	get = async (id: number): Promise<User | null> => {
		let response: User | null = null;

		try {
			await PrismaUtil.prismaClient.$connect();
			response = await PrismaUtil.prismaClient.user.findUnique({
				where: {
					id: id,
				},
				include: {
					address: true,
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

	create = async (requestBody: any): Promise<User | null> => {
		const { address, ...userBody } = requestBody.user;
		let response: User | null = null;

		const insertStmt = {
			data: {
				...userBody,
				address: {
					create: address,
				},
			},
		};

		try {
			await PrismaUtil.prismaClient.$connect();
			response = await PrismaUtil.prismaClient.user.create(insertStmt);
		} catch (e) {
			// Log the error chain
			console.log(e);
		} finally {
			await PrismaUtil.prismaClient.$disconnect();
			return response;
		}
	};

	update = async (requestBody: any): Promise<User | null> => {
		throw new Error('Method not implemented.');
	};

	deleteById = async (id: number): Promise<User | null> => {
		throw new Error('Method not implemented.');
	};
}
