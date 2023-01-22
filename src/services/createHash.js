import bcrypt from 'bcrypt'

export async function createHash(password) {
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    return hash
}
