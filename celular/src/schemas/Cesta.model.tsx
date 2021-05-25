export class Cesta {

    public id: number;
    public nome: string;
    public descricao: string;
    public total: unknown;
    public created_at: string;
    public updated_at: string;

    constructor(id?: number, nome?: string, descricao?: string, total?: unknown, created_at?: string, updated_at?: string) {

        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.created_at = created_at;
        this.updated_at = updated_at;

    }

}