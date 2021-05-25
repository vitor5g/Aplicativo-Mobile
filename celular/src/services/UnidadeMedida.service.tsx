import { UnidadeMedida } from '../schemas/UnidadeMedida.model'
import { DatabaseConnection } from '../database/DataBaseConnection'

const table = "unidade_medida"
const db = DatabaseConnection.getConnection()

export default class UnidadeMedidaService {


    static addData(param: UnidadeMedida) {
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} (nome) 
                values (?)`,
                    [param.nome],
                    (_, { insertId, rows }) => {
                        console.log("id insert: " + insertId);
                        resolve(insertId)
                    }), (sqlError: unknown) => {
                        console.log(sqlError);
                    }
            }, (txError) => {
                console.log(txError);
            }));
    }

    static deleteById(id: number) {
        db.transaction(
            tx => {
                tx.executeSql(`delete from ${table} where id = ?;`, [id], (_, { rows }) => {
                }), (sqlError: unknown) => {
                    console.log(sqlError);
                }
            }, (txError) => {
                console.log(txError);

            });
    }


    static updateById(param: UnidadeMedida) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`update ${table} set nome = ? where id = ?;`, [param.nome, param.id], () => {
            }), (sqlError: unknown) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);

        }));
    }

    static findById(id: number) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} where id=?`, [id], (_, { rows }) => {
                resolve(rows)
            }), (sqlError: unknown) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);

        }));
    }

    static findAll() {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table}`, [], (_, { rows }) => {
                resolve(rows)
            }), (sqlError: unknown) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);
        }))


    }


}