exports.convertPriceInFloat = function(price) {
    //remove os caracteres da moeda e substitui a virgula pelo ponto para salvar no banco
    let newPrice = price.replace("R$", "").replace(",", ".");


    //remove o .00 do final exemplo R$ 1.250,00. Porém so remove caso o tamanho da string seja maior ou igual a 8
    if (newPrice.length >= 8) {
        newPrice = newPrice.substring(0, newPrice.length - 3);
    }

    return newPrice;

};
exports.removerAscentos = function(newStringComAcento) {

    var string = newStringComAcento;
    var mapaAcentosHex = {
        a: /[\xE0-\xE6]/g,
        A: /[\xC0-\xC6]/g,
        e: /[\xE8-\xEB]/g,
        E: /[\xC8-\xCB]/g,
        i: /[\xEC-\xEF]/g,
        I: /[\xCC-\xCF]/g,
        o: /[\xF2-\xF6]/g,
        O: /[\xD2-\xD6]/g,
        u: /[\xF9-\xFC]/g,
        U: /[\xD9-\xDC]/g,
        c: /\xE7/g,
        C: /\xC7/g,
        n: /\xF1/g,
        N: /\xD1/g
    };

    for (var letra in mapaAcentosHex) {
        var expressaoRegular = mapaAcentosHex[letra];
        string = string.replace(expressaoRegular, letra);
    }

    return string;
};