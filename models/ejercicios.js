const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query("select * from ejercicios", (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const getById = pEjercicioId => {
    return new Promise((resolve, reject) => {
        db.query(
            "select * from ejercicios where id = ?",
            [pEjercicioId],
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
    titulo,
    duracion,
    repeticiones
}) => {
    return new Promise((resolve, reject) => {
        db.query(
            "insert into ejercicios (titulo,duracion,repeticiones) values (?,?,?)",
            [
                titulo,
                duracion,
                repeticiones

            ],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            }
        );
    });
};

const editById = ({
        titulo,
        duracion,
        repeticiones
    },
    ejercicioId
) => {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE ejercicios SET titulo=?,duracion=?,repeticiones=? WHERE id = ?",
            [
                titulo,
                duracion,
                repeticiones,
                ejercicioId
            ],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const deleteById = pEjercicioId => {
    return new Promise((resolve, reject) => {
        db.query("delete from ejercicios where id=?", [pEjercicioId], (err, result) => {
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