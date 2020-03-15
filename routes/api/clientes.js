const router = require("express").Router();
const Cliente = require("../../models/clientes.js");
const {
  validatorCliente
} = require('../../validaciones/validator');
const {
  validationResult
} = require("express-validator");


//GET http://localhost:3000/api/clientes

router.get("/", async (req, res) => {
  const rows = await Cliente.getAll();
  res.json(rows);
});

//GET http://localhost:3000/api/clientes/1

router.get("/:clienteId", async (req, res) => {
  const cliente = await Cliente.getById(req.params.clienteId);
  res.json(cliente);
});

//POST http://localhost:3000/api/clientes

router.post("/", validatorCliente,
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

//PUT http://localhost:3000/api/clientes/1

router.put("/:id", validatorCliente, async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  };
  // console.log(req.body, req.params.id)
  const cliente = await Cliente.editById(req.body, req.params.id)
  if (cliente["affectedRows"] === 1) {
    res.json({
      message: "Se ha editado el cliente"
    })

  } else {
    res.json({
      error: "El cliente no se ha modificado"
    });
  }
  res.json(cliente)
});

//DELETE http://localhost:3000/api/clientes/16

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