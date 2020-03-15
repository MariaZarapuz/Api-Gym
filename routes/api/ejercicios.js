const router = require("express").Router();
const Ejercicio = require("../../models/ejercicios.js");
const {
    check,
    validationResult
} = require("express-validator");

//GET http://localhost:3000/api/ejercicios

router.get("/", async (req, res) => {
    const rows = await Ejercicio.getAll();
    res.json(rows);
});
//GET http://localhost:3000/api/ejercicios/:ejercicioId

router.get("/:ejercicioId", async (req, res) => {
    const ejercicio = await Ejercicio.getById(req.params.ejercicioId);
    res.json(ejercicio);
});

//POST http://localhost:3000/api/ejercicios

router.post("/", [check(["titulo", "duracion", "repeticiones"], "Completa todos los campos(titulo,duracion,repeticiones)").notEmpty(),
        check("titulo", " El titulo contener al menos 3 caracteres.").isLength({
            min: 3
        }),
        check("duracion", "La duracion debe tener el formato hh:mm:ss").custom(value => /^([0-9]{2}:[0-6]{2}:[0-6]{2})$/.test(value)),
        check("repeticiones", "Las repeticiones deben ser un numero").isNumeric(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        };

        const result = await Ejercicio.create(req.body);
        if (result["affectedRows"] === 1) {
            const ejercicio = await Ejercicio.getById(result["insertId"]);
            res.json(ejercicio);
        } else {
            res.json({
                error: "El ejercico no se ha insertado"
            });
        }
    }
);

//PUT http://localhost:3000/api/ejercicios/:id


router.put("/:id", async (req, res) => {
    const ejercicio = await Ejercicio.editById(req.body, req.params.id)
    res.json(ejercicio)
});

//DELETE http://localhost:3000/api/ejercicios/:ejercicioId

router.delete("/:ejercicioId", async (req, res) => {
    //console.log(req.body);
    const result = await Ejercicio.deleteById(req.params.ejercicioId);
    if (result["affectedRows"] === 1) {
        res.json({
            success: "Se ha borrado correctamente"
        });
    } else {
        res.json({
            error: "No se ha borrado correctamente"
        });
    }
});

module.exports = router;