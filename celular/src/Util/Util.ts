import React, { useState } from 'react';

import CestaService from '../services/Cesta.service'
import { Cesta as CestaModel } from '../schemas/Cesta.model'

import ProdutoService from '../services/Produto.service'
import { Produto as ProdutoModel } from '../schemas/Produto.model'




export function getDataHoraAtual() {
    //Pega a data atual
    const data = new Date();

    //Faz a nova data receber a data atual convertida para o timezone correto
    const data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);

    //setar data e hora atual
    let dataCadastro = data2.toISOString().replace(/\.\d{3}Z$/, '');

    dataCadastro = dataCadastro.replace("T", " ");

    dataCadastro = dataCadastro.split(" ")[0].split("-")[2] + "/" + dataCadastro.split(" ")[0].split("-")[1] + "/" + dataCadastro.split(" ")[0].split("-")[0] + " " + dataCadastro.split(" ")[1];

    return dataCadastro;
};

export function convertPriceInFloat(price: string) {

    //remove os caracteres da moeda e substitui a virgula pelo ponto para salvar no banco
    let newPrice = price.replace("R$", "").replace(",", ".");


    //remove o .00 do final exemplo R$ 1.250,00. Porém so remove caso o tamanho da string seja maior ou igual a 8
    // if (newPrice.length >= 8) {
    //     newPrice = newPrice.substring(0, newPrice.length - 3);
    // }

    return newPrice;
};

// export async function getTotalCesta(id: number) {


//     let produtos: any = [];

//     let total: string = '0';

//     //Busca todos os produtos referente ao id da cesta passado no parametro
//     total = await ProdutoService.findByCestaId(id)
//         .then((response: any) => {
//             let data = response._array;
//             for (let key = 0; key < Object.keys(data).length; key++) {
//                 total = (data[key].quantidade * data[key].preco).toFixed(2).toString().replace(".", ",");
//             }

//             return total;

//         }).catch((error: unknown) => {
//             console.log('error ao buscar: ' + error);
//             return 0;
//         });
//     //

//     //Seta o total dos produtos na tabela cesta
//     await CestaService.findById(id)
//         .then((response: any) => {

//             let cesta: CestaModel = new CestaModel();
//             let data = response._array;

//             cesta.id = data.id;
//             cesta.nome = data.nome;
//             cesta.descricao = data.descricao;
//             cesta.created_at = data.created_at;
//             cesta.updated_at = data.updated_at;
//             cesta.total = data.total;

//             CestaService.updateById(cesta)

//             // data.map((cesta: CestaModel) => {
//             //     cesta.total = total;
//             // })
//         }), (error: unknown) => {
//             console.log('error ao buscar: ' + error);
//         }


//     return total;
// };