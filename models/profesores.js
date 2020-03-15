const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query("select * from profesores", (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const getById = pProfesorId => {
    return new Promise((resolve, reject) => {
        db.query(
            "select * from profesores where id = ?",
            [pProfesorId],
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
    experiencia,

}) => {
    return new Promise((resolve, reject) => {
        db.query(
            "insert into profesores (nombre,experiencia) values (?,?)",
            [nombre, experiencia],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            }
        );
    });
};

const editById = ({
    nombre,
    experiencia
}, profesorId) => {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE profesores SET nombre,experiencia VALUES(?,?) WHERE id = ?",
            [
                nombre,
                experiencia,
                profesorId
            ],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const deleteById = pProfesorId => {
    return new Promise((resolve, reject) => {
        db.query("delete from profesores where id=?", [pProfesorId], (err, result) => {
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