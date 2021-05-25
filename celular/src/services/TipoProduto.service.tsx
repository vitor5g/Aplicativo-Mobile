import { TipoProduto } from '../schemas/TipoProduto.model'
import { DatabaseConnection } from '../database/DataBaseConnection'

const table = "tipo_produto"
const db = DatabaseConnection.getConnection()

export default class TipoProdutoService {


    static addData(param: TipoProduto) {
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


    static updateById(param: TipoProduto) {
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