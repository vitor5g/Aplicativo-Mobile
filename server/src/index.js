const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const captcha = require('async-captcha');


//Importa o arquivo serviceLocale
const ServiceLocale = require('./service/serviceLocale');

const anticaptcha = new captcha("90aa2bdd5d42527fbbe07a8247f4ffe3", 2, 10);

const cors = require('cors');

const app = express();

app.use(cors())

//Permite ao express usar json nas requisições
app.use(express.json());

//chamada da requisição
app.post('/:cesta', async(request, response) => {
    const cesta_id = parseInt(request.params.cesta);
    const ip = request.connection.remoteAddress.toString().replace('::', '').replace('ffff:', '');
    const acessKey = request.body.acessKey;
    const produtosApp = (request.body.produtosApp) ? JSON.parse(request.body.produtosApp) : request.body.produtosApp;

    console.log(ip)
    console.log(cesta_id)
    console.log(acessKey)

    //const result = await run();
    const produtosNota = await ServiceLocale.getAllProdutosNota(cesta_id);

    const result = await ServiceLocale.compareProducts(produtosNota, produtosApp);

    //const nomeProduto = await ServiceManager.getProdutoNomeFromCodBarras(7898080640222);

    console.log(result)

    //console.log(Object.keys(jsonData).length - 2)
    //console.log(count - 2);
    //console.log(jsonData['0'].toString().split(reNome).toString())
    return response.json(result)

});

async function getNotaFromSite() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://nfe.sefaz.ba.gov.br/servicos/nfce/Modulos/Geral/NFCEC_consulta_chave_acesso.aspx');

    const elemethandler = await page.$("#img_captcha");

    const base64String = await elemethandler.screenshot({ encoding: 'base64' });



    const captchaCode = await anticaptcha.getResult(base64String);

    const textElement = await page.$eval("#txt_chave_acesso", txt => txt.value = '29201103927907000199651070000806009009127440');


    const codCaptchaElement = await page.$eval("#txt_cod_antirobo", (el, value) => el.value = value, captchaCode);

    const btnElement = await page.$("#btn_consulta_completa");


    await Promise.all([
        page.waitForNavigation(),
        btnElement.click(),
    ]);

    const productList = await page.evaluate(() => {

        const oTable = document.getElementById('tabResult');

        //gets rows of table
        var rowLength = oTable.rows.length;
        var produtos = [];

        //loops through rows
        for (i = 0; i < rowLength; i++) {

            //gets cells of current row
            var oCells = oTable.rows.item(i).cells;

            //gets amount of cells of current row
            var cellLength = oCells.length;

            //loops through each cell in current row
            for (var j = 0; j < cellLength; j++) {

                // get your cell info here
                produtos.push([oCells.item(j).innerHTML]);

            }
        }


        produtos.push(document.getElementsByClassName('totalNumb')[0].innerHTML);
        produtos.push(document.getElementsByClassName('totalNumb')[1].innerHTML);

        // const convertArrayToObject = (array, key) => {
        //     const initialValue = {};
        //     return array.reduce((obj, item) => {
        //         return {
        //             ...obj,
        //             [item[key]]: item,
        //         };
        //     }, initialValue);
        // };

        produtos = Object.assign({}, produtos);

        return produtos;
    })

    //escrever os dados em um arquivo local
    fs.writeFile('productList.json', JSON.stringify(productList, null, 2), err => {
        if (err) throw new Error('Erro ao salvar arquivo')

        console.log('Arquivo salvo com sucesso!!')
    });

    await browser.close();

};

//Porta do servidor
app.listen(3333);