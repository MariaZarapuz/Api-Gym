const {
    check
} = require("express-validator");


const validatorProfesor = [check(["nombre", "experiencia"], "Completa todos los campos(nombre,experiencia)").notEmpty(),
    check("nombre", " El nombre contener al menos 3 caracteres.").isLength({
        min: 3
    }),
    check("experiencia", "La experiencia debe ser un numero").isNumeric()
]

module.exports = {
    validatorProfesor: validatorProfesor
}