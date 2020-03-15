const router = require('express').Router();
const apiClientesRouter = require('./api/clientes');
const apiProfesoresRouter = require('./api/profesores');
const apiEjerciciosRouter = require('./api/ejercicios');

router.use('/clientes', apiClientesRouter);
router.use('/profesores', apiProfesoresRouter);
router.use('/ejercicios', apiEjerciciosRouter);


module.exports = router;