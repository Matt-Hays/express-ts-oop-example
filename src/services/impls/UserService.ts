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
		const { user } = requestBody;
		let response: User | null = null;

		const insertStmt = {
			data: {
				email: user.email,
				passwordHash: user.passwordHash,
				firstName: user.firstName,
				lastName: user.lastName,
				phone: user.phone,
				address: {
					create: user.address,
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