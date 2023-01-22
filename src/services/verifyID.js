import validateUuid from 'uuid-validate';

export function verifyUUID(id) {
    const mensage = "O id enviado não é um UUID"

    if (!id) return

    if (validateUuid(id)) return true
    else throw new Error(mensage)
}
