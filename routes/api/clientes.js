const router = require("express").Router();
const Cliente = require("../../models/clientes.js");
const {
  check,
  validationResult
} = require("express-validator");

router.get("/", async (req, res) => {
  const rows = await Cliente.getAll();
  res.json(rows);
});

router.get("/:clienteId", async (req, res) => {
  const cliente = await Cliente.getById(req.params.clienteId);
  res.json(cliente);
});

router.post(
  "/",
  [
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

  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    };

    const result = await Cliente.create(req.body);
    if (result["affectedRows"] === 1) {
      const cliente = await Cliente.getById(result["insertId"]);
      res.json(cliente);
    } else {
      res.json({
        error: "El cliente no se ha insertado"
      });
    }
  }
);

router.put("/:id", async (req, res) => {
  const cliente = await Cliente.editById(req.body, req.params.id)
  res.json(cliente)
})

router.delete("/:clienteId", async (req, res) => {
  //console.log(req.body);
  const result = await Cliente.deleteById(req.params.clienteId);
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