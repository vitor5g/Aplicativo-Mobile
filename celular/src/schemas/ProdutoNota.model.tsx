export class ProdutoNota {

    public id: number;
    public codigo: string;
    public nome: string;
    public quantidade: unknown;
    public preco: unknown;
    public total: unknown;
    public cesta_id: number;

    constructor(id?: number, codigo?: string, nome?: string, quantidade?: unknown, preco?: unknown, total?: unknown, cesta_id?: number) {

        this.id = id;
        this.codigo = codigo;
        this.nome = nome;
        this.quantidade = quantidade;
        this.preco = preco;
        this.total = total;
        this.cesta_id = cesta_id;

    }

}