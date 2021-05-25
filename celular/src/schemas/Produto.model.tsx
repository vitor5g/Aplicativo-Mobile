export class Produto {

    public id: number;
    public nome: string;
    public descricao: string;
    public quantidade: string;
    public preco: unknown;
    public cesta_id: number;
    public codBarras: unknown;

    constructor(id?: number, nome?: string, descricao?: string, quantidade?: string, preco?: unknown, cesta_id?: number, codBarras?: number) {

        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.preco = preco;
        this.cesta_id = cesta_id;
        this.codBarras = codBarras;

    }

}