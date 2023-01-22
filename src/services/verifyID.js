const validateUuid = require('uuid-validate');

const verifyUUID = (id) => {
    const mensage = "O id enviado não é um UUID"
    
    if (!id) return

    if (validateUuid(id)) return true
    else throw new Error(mensage)
}

module.exports = verifyUUID