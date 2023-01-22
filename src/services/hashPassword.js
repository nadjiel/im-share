const bcrypt = require('bcrypt')

const createHash = async (password) => {
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    return await hash
}

module.exports = createHash