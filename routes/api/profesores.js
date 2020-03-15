const router = require("express").Router();
const Profesor = require("../../models/profesores.js");
const {
    validatorProfesor
} = require('../../validaciones/validator');
const {
    validationResult
} = require("express-validator");

//GET http://localhost:3000/api/profesores

router.get("/", async (req, res) => {
    const rows = await Profesor.getAll();
    res.json(rows);
});
//GET http://localhost:3000/api/profesores/:profesorId

router.get("/:profesorId", async (req, res) => {
    const profesor = await Profesor.getById(req.params.profesorId);
    res.json(profesor);
});

//POST http://localhost:3000/api/profesores

router.post("/", validatorProfesor,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        };
        const result = await Profesor.create(req.body);
        if (result["affectedRows"] === 1) {
            const profesor = await Profesor.getById(result["insertId"]);
            res.json(profesor);
        } else {
            res.json({
                error: "El ejercico no se ha insertado"
            });
        }
    }
);

//PUT http://localhost:3000/api/profesores/:id

router.put("/:id", validatorProfesor, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    };
    const profesor = await Profesor.editById(req.body, req.params.id)
    if (profesor["affectedRows"] === 1) {
        res.json(profesor)

    } else {
        res.json({
            error: "El profesor no se ha modificado"
        });
    }
    res.json(profesor)
});

//DELETE http://localhost:3000/api/profesores/:profesorId

router.delete("/:profesorId", async (req, res) => {
    //console.log(req.body);
    const result = await Profesor.deleteById(req.params.profesorId);
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