import { DatabaseConnection } from './DataBaseConnection'

var db: any = null;
export default class DatabaseInit {

    constructor() {
        db = DatabaseConnection.getConnection()
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
            console.log('Foreign keys turned on')
        );
        this.InitDb()
    }
    private InitDb() {

        //Colocar essa variavel na linha 74 e apagar as demais quando for necessario excluir o banco.
        //Remover o ON da linha 8 e substituir por OFF para funcionar
        var dropsTable = [
            `DROP TABLE IF EXISTS cesta;`,
            `DROP TABLE IF EXISTS produto;`,
            `DROP TABLE IF EXISTS tipo_produto;`,
            `DROP TABLE IF EXISTS unidade_medida;`,
            `DROP TABLE IF EXISTS produtonota;`,
            `DROP TRIGGER IF EXISTS update_total_cesta_delete;`,
            `DROP TRIGGER IF EXISTS update_total_cesta_insert;`,
            `DROP TRIGGER IF EXISTS update_total_cesta_update;`
        ];

        var CestaTable = [
            `CREATE TABLE IF NOT EXISTS cesta (
            id integer primary key autoincrement,
            nome text,
            descricao text,
            total real,
            created_at text,
            updated_at text

        );`
        ];
        var UnidadeMedidaTable = [
            `CREATE TABLE IF NOT EXISTS unidade_medida (
                id integer primary key autoincrement,
                nome text
            );`,
        ];
        var TipoProdutoTable = [
            `CREATE TABLE IF NOT EXISTS tipo_produto (
                id integer primary key autoincrement,
                nome text
        
            );`,
        ];
        var ProdutoTable = [
            `CREATE TABLE IF NOT EXISTS produto (
                  id integer primary key autoincrement,
                  nome text,
                  descricao text,
                  quantidade real,
                  codBarras int,
                  preco real,
                  cesta_id int,
                  FOREIGN KEY(cesta_id) REFERENCES cesta(id)
            );`,
        ];
        var ProdutoNotaTable = [
            `CREATE TABLE IF NOT EXISTS produtonota (
                  id integer primary key autoincrement,
                  codigo text not null,
                  nome text,
                  quantidade real not null,
                  preco real not null,
                  total real not null,
                  cesta_id int,
                  FOREIGN KEY(cesta_id) REFERENCES cesta(id)
            );`,
        ];

        var TriggerUpdateTotalDelete = [
            `CREATE TRIGGER IF NOT EXISTS update_total_cesta_delete AFTER DELETE 
            ON produto
            BEGIN
               update cesta set total = (SELECT SUM((quantidade * preco)) FROM produto WHERE cesta_id = old.cesta_id) where id = old.cesta_id;
            END`,
        ];

        var TriggerUpdateTotalInsert = [
            `CREATE TRIGGER IF NOT EXISTS update_total_cesta_insert AFTER INSERT 
            ON produto
            BEGIN
               update cesta set total = (SELECT SUM((quantidade * preco)) FROM produto WHERE cesta_id = new.cesta_id) where id = new.cesta_id;
            END`,
        ];

        var TriggerUpdateTotalUpdate = [
            `CREATE TRIGGER IF NOT EXISTS update_total_cesta_update AFTER UPDATE 
            ON produto
            BEGIN
               update cesta set total = (SELECT SUM((quantidade * preco)) FROM produto WHERE cesta_id = new.cesta_id) where id = new.cesta_id;
            END`,
        ];


        var sql = [CestaTable, ProdutoTable, ProdutoNotaTable, TriggerUpdateTotalDelete, TriggerUpdateTotalInsert, TriggerUpdateTotalUpdate]
        // var sql = [dropsTable]

        // var sql = [
        //      `DROP TABLE IF EXISTS cesta;`,
        //      `DROP TABLE IF EXISTS produto;`,
        //      `DROP TABLE IF EXISTS tipo_produto;`,
        //      `DROP TABLE IF EXISTS unidade_medida;`,
        //      `DROP TABLE IF EXISTS produtonota;`,

        //     `create table if not exists cesta (
        //         id integer primary key autoincrement,
        //         nome text,
        //         descricao text,
        //         total real,
        //         created_at text,
        //         updated_at text

        //     );`,

        //     `create table if not exists unidade_medida (
        //          id integer primary key autoincrement,
        //          nome text,
        //      );`,

        //      `create table if not exists tipo_produto (
        //          id integer primary key autoincrement,
        //          nome text,

        //          );`,

        //      `create table if not exists produto (
        //          id integer primary key autoincrement,
        //          nome text,
        //          descricao text,
        //          quantidade real,
        //          preco real,
        //          cesta_id int,
        //          unidade_medida_id int,
        //          tipo_produto_id int
        //         foreign key (cesta_id) references cesta (id),
        //          foreign key (unidade_medida_id) references unidade_medida (id),
        //          foreign key (tipo_produto_id) references tipo_produto (id),

        //          );`,

        // ];

        db.transaction(tx => {
            sql.map((tabela: any) => {
                tabela.map((sql: any) => {
                    console.log(sql)
                    tx.executeSql(sql);
                })
            })
            // for (var i = 0; i < sql.length; i++) {
            // console.log("execute sql : " + sql[i]);
            // tx.executeSql(sql[i]);
            // }
        }, (error: unknown) => {
            console.log("error call back : " + JSON.stringify(error));
            console.log(error);
        }, () => {
            console.log("transaction complete call back ");
        }
        );
    }

}