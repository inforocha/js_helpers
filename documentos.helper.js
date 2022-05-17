/**
 * @autor Davi Rocha (info.rocha2@gmail.com)
 * @version 1.0
 */
function TestaCPF(cpf) {
    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11) return false;

    for (i = 0; i < cpf.length - 1; i++) {
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    }

    if (!digitos_iguais) {
        numeros = cpf.substring(0,9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--) {
            soma += numeros.charAt(10 - i) * i;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) {
            return false;
        }
        numeros = cpf.substring(0,10);
        soma = 0;
        for (i = 11; i > 1; i--) {
            soma += numeros.charAt(11 - i) * i;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) {
            return false;
        }
        return true;
    }
    return false;
}

function testarCNPJ(c) {
    var b = [6,5,4,3,2,9,8,7,6,5,4,3,2];

    if((c = c.replace(/[^\d]/g,"")).length != 14)
        return false;

    if(/0{14}/.test(c))
        return false;

    for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
    if(c[12] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false;

    for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
    if(c[13] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false;

    return true;
};