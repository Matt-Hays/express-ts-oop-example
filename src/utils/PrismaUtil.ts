import { PrismaClient } from '@prisma/client';

export default class PrismaUtil {
	static readonly prismaClient: PrismaClient = new PrismaClient();
}
