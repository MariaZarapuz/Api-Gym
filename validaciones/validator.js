const {
    check
} = require("express-validator");



const validatorCliente = [
    check(
        [
            "nombre",
            "apellidos",
            "direccion",
            "email",
            "edad",
            "sexo",
            "cuota",
            "fecha_nacimiento",
            "dni"

        ],
        "Completa todos los campos (nombre, apellidos, direccion, email, edad, sexo, cuota, fecha_nacimiento, dni)"
    ).notEmpty(),
    check("nombre", "Nombre no válido. Debe contener al menos 3 caracteres.")
    .isLength({
        min: 3
    }),
    check("apellidos", "Apellidos no válidos. Deben contener al menos 3 caracteres.")
    .isLength({
        min: 3
    }),
    check("direccion"),
    check("email").isEmail(),
    check(
        "edad",
        "Edad no válida. Debe estar comprendida entre 0 y 125."
    ).isInt({
        min: 0,
        max: 125
    }),
    check("sexo", "escriba M para hombre o F para mujer")
    .isIn(["M", "F"])
    .isAlpha(["es-ES"]),
    check("cuota"),
    check(
        "fecha_nacimiento",
        "Debe introducir el formato de la fecha del siguiente modo aaaa-mm-dd"
    )
    .isISO8601()
    .toDate(),
    check("dni", "D.N.I no válido. Debe contener un total de 9 caracteres.")
    .custom(value => {
        return (/^\d{8}[a-zA-Z]$/).test(value)

    })

];

const validatorEjercicio = [check(["titulo", "duracion", "repeticiones"], "Completa todos los campos(titulo,duracion,repeticiones)").notEmpty(),
    check("titulo", " El titulo contener al menos 3 caracteres.").isLength({
        min: 3
    }),
    check("duracion", "La duracion debe tener el formato hh:mm:ss").custom(value => /^([0-9]{2}:[0-6]{2}:[0-6]{2})$/.test(value)),
    check("repeticiones", "Las repeticiones deben ser un numero").isNumeric(),
];


const validatorProfesor = [check(["nombre", "experiencia"], "Completa todos los campos(nombre,experiencia)").notEmpty(),
    check("nombre", " El nombre contener al menos 3 caracteres.").isLength({
        min: 3
    }),
    check("experiencia", "La experiencia debe ser un numero").isNumeric()
];




module.exports = {
    validatorCliente: validatorCliente,
    validatorEjercicio: validatorEjercicio,
    validatorProfesor: validatorProfesor
}