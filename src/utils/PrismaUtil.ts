import { PrismaClient } from '@prisma/client';

export default abstract class PrismaUtil {
	static readonly prismaClient: PrismaClient = new PrismaClient();
}
