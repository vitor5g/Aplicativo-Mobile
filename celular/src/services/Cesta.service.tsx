import { Cesta } from '../schemas/Cesta.model'
import { DatabaseConnection } from '../database/DataBaseConnection'

const table = "cesta"
const db = DatabaseConnection.getConnection()

export default class CestaService {


    static addData(param: Cesta) {
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} (nome, descricao, total, created_at, updated_at) 
                values (?, ?, ?, ?, ?)`,
                    [param.nome, param.descricao, param.total, param.created_at, param.updated_at],
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

    static deleteAll() {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`DELETE FROM ${table}`, [], (_, { rows }) => {
                // resolve(rows)
            }), (sqlError: unknown) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);
        }))


    }

    static updateById(param: Cesta) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`update ${table} set nome = ?, descricao = ?, total = ?, created_at = ?, updated_at = ? where id = ?;`, [param.nome, param.descricao, param.total, param.created_at, param.updated_at, param.id], () => {
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