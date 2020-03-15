const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from clientes", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

const getById = pClienteId => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from clientes where id = ?",
      [pClienteId],
      (err, rows) => {
        if (err) reject(err);
        if (rows.length === 0) {
          resolve(null);
        }
        resolve(rows[0]);
      }
    );
  });
};
const create = ({
  nombre,
  apellidos,
  direccion,
  email,
  edad,
  sexo,
  cuota,
  fecha_nacimiento,
  dni
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into clientes (nombre,apellidos,direccion, email, edad, sexo, fecha_inscripcion, cuota, fecha_nacimiento, dni) values (?,?,?,?,?,?,?,?,?,?)",
      [
        nombre,
        apellidos,
        direccion,
        email,
        edad,
        sexo,
        new Date(),
        cuota,
        fecha_nacimiento,
        dni

      ],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const editById = ({
    nombre,
    apellidos,
    direccion,
    email,
    edad,
    sexo,
    cuota,
    fecha_nacimiento,
    dni
  },
  clienteId
) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE clientes SET nombre, apellidos, direccion , email, edad, sexo, fecha_inscripcion, cuota, fecha_nacimiento, dni VALUES(?,?,?,?,?,?,?,?,?,? ) WHERE id = ?",
      [
        nombre,
        apellidos,
        direccion,
        email,
        edad,
        sexo,
        fecha_inscripcion,
        cuota,
        fecha_nacimiento,
        dni,
        clienteId
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const deleteById = pclienteId => {
  return new Promise((resolve, reject) => {
    db.query("delete from clientes where id=?", [pclienteId], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  getAll: getAll,
  getById: getById,
  create: create,
  editById: editById,
  deleteById: deleteById
};