const puppeteer = require('puppeteer');
//Importa o arquivo util
const Util = require('../util/util');


//Função para pegar o nome do produto de acordo com o codigo de barras
exports.getProdutoNomeFromCodBarras = async function(cod_barras) {

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    //Acessa  apgina
    await page.goto('https://cosmos.bluesoft.com.br');

    //Coloca o cod_barras no campo
    const codBarrasProduto = await page.$eval("#search-input", (el, value) => el.value = value, cod_barras);

    //pega o botão de submit
    const btnElement = await page.$("#magnifier");

    //Clica no botão de submit e aguarda a navegação ate a outra pagina
    await Promise.all([
        page.waitForNavigation(),
        btnElement.click(),
    ]);

    //pega o nome do produto
    const nomeProduto = await page.evaluate(() => {

        const nomeProduto = document.getElementById('product_description').innerHTML;

        return nomeProduto;
    })

    await browser.close();

    return nomeProduto;

};