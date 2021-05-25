import { ProdutoNota } from '../schemas/ProdutoNota.model'
import { DatabaseConnection } from '../database/DataBaseConnection'

const table = "produtonota"
const db = DatabaseConnection.getConnection()

export default class ProdutoNotaService {


    static addData(param: ProdutoNota) {
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} (codigo, nome, quantidade, preco, total, cesta_id) 
                values (?, ?, ?, ?, ?, ?)`,
                    [param.codigo, param.nome, param.quantidade, param.preco, param.total, param.cesta_id],
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


    static updateById(param: ProdutoNota) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`update ${table} set nome = ?, codigo = ?, quantidade = ?, preco = ?, total = ?, cesta_id = ? where id = ?;`, [param.nome, param.codigo, param.quantidade, param.preco, param.total, param.cesta_id, param.id], () => {
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