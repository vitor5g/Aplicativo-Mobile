//Importa o arquivo util
const Util = require('../util/util');

//Importa o arquivo serviceMaanger
const ServiceManager = require('./serviceManager');

//Função para pegar todos os produtos da nota fiscal. Armazenando id da cesta em cada objeto
exports.getAllProdutosNota = async function(cesta_id) {

    //pega o arquivo json salvo
    let jsonData = require('../../productList.json');

    //split para pegar o nome do produto da lista
    const reNome = "(?<=\>)(.*?)(?=\<)";
    //split para pegar o codigo do produto da lista
    const reCodigo = "(?<=\:)(.*?)(?=\<)";
    //split para pegar a quantidade do produto da lista
    const reQuantidade = /(?<=\>)(\d.*?)(?=\<)/gm;
    //split para pegar o valor unitario do produto da lista
    const reValorUnitario = /(?<=\;)(.*?)(?=\<)/gm;
    //split para pegar o valor total do produto da lista
    const reValorTotal = /(?<=\>)(\d.*?)(?=\<)/gm;

    //Pega o valor total da nota
    let total_price = Util.convertPriceInFloat(jsonData[Object.keys(jsonData).length - 1]);
    //PEga a quantidade total dos itens
    let total_itens = jsonData[Object.keys(jsonData).length - 2];

    const produtos = [{
        total_price: total_price,
        total_itens: total_itens,
    }];

    // loop through each key/value
    for (let key = 0; key < Object.keys(jsonData).length - 2; key++) {
        if (key % 2 == 0) {
            //caso seja par
            produto = {
                //split para pegar o nome do produto da lista
                nome: jsonData[key].toString().match(reNome).toString().split(',')[0].toString().trim(),
                codigo: jsonData[key].toString().match(reCodigo).toString().split(',')[0].split(')').toString().replace(',', '').trim(),
                quantidade: jsonData[key].toString().match(reQuantidade).toString(),
                preco: parseFloat(jsonData[key].toString().match(reValorUnitario).toString().replace(',', '.')).toFixed(2),
            };
            //insere o produto do array de produtos
            produtos.push(produto);
            //caso seja impar
        } else {
            produto.total = parseFloat(jsonData[key].toString().match(reValorTotal).toString().replace(',', '.')).toFixed(2)
        }
        produto.cesta = cesta_id;


    }

    return produtos;

}


//Função para comparar o produto da nota com os produtos do ap
exports.compareProducts = async function(produtosNota, produtosApp) {

    //Duplo for para percorrer ambos os arrays de objeto para pegar o nome do produto e comparar
    for (let key = 0; key < Object.keys(produtosNota).length; key++) {
        for (let key2 = 0; key2 < Object.keys(produtosApp).length; key2++) {

            //Cria variavel para verificar o tamanho da igualdade da String.Exemplo (farinha de trigo X farinha lactea)
            //Verifica cada posição da string para não ocorrer de so porque o nome tem uma determinada palavra se refira a quele produto
            let totalIgualdade = 0;

            //Pega o nome do produto do array que veio do app retirar os ascentos e coloca em minusculo. Realiza um split por espaçõ em branco para separar as partes do nome
            let nomeProdutoApp = await Util.removerAscentos(produtosApp[key2].nome).toLowerCase().split(" ")
                //Pega o nome do produto do array que veio da nota retirar os ascentos e coloca em minusculo. Realiza um split por espaçõ em branco para separar as partes do nome
            let nomeProdutoNota = await Util.removerAscentos(String(produtosNota[key].nome).toLowerCase()).split(" ")

            //console.log(nomeProdutoNota)
            //For duplo para percorrer as partes separadas dos nomes pegos tanto do aaray de produtos que veio do app quanto o da nota. 
            //Afim de comparar as partes do nome
            for (let partNomeNota = 0; partNomeNota < nomeProdutoNota.length; partNomeNota++) {
                for (let partNomeApp = 0; partNomeApp < nomeProdutoApp.length; partNomeApp++) {
                    if (nomeProdutoApp[partNomeApp] === nomeProdutoNota[partNomeNota]) {
                        //Pega o tamanho do array do nome do produto que veio da nota e subtrai 1 para ficar o tamanho correto visto que o aaray começa de 0
                        let sizeNomeProdutoNota = nomeProdutoNota.length - 1;
                        //Cria a varaiavel cont. Varaivel apenas para percorerr o array do inicio começando do 0. Visto que na linha anterior foi pego o tamanho dele e iria ter que ir decrescendo o valor
                        let cont = 0;
                        totalIgualdade = 0;

                        //While que percorre o nome do produto da nota para verificar todas as posições do array de nome afim de comparar a string
                        while (nomeProdutoNota[cont]) {
                            //Verifica se a string é semelhante a outra caso seja a variavel total igualdede recebe +1
                            if (nomeProdutoNota[cont] === nomeProdutoApp[cont]) {
                                totalIgualdade++;
                            }
                            //O que falei anteriormente diminui de um e acrescenta em outra variavel para percorer o array do inicio ao fim e não ao contrario
                            sizeNomeProdutoNota--;
                            cont++;
                        }

                    }

                }

            }

            if (totalIgualdade >= 3) {
                produtosNota[key].id = produtosApp[key2].id;
            }


        }
    }

    return produtosNota;


}