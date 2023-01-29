import validateUuid from 'uuid-validate';
import { prisma } from '../database/prisma.js';

export function verifyUUID(id) {
    const message = "O id enviado não é um UUID"

    if (!id) return

    if (validateUuid(id)) return true
    else throw new Error(message)
}

export async function verifyTableID(id, table) {
    const tuple = await prisma[table].findUnique({
        where: { id },
    });
    
    return tuple !== null;
}