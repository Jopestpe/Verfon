// Elementos
const EntradaDeArquivo = document.getElementById('EntradaDeArquivo');
const BotaoEntradaDeArquivo = document.getElementById('BotaoEntradaDeArquivo');
const PaginasDeCaractere = document.getElementById('PaginasDeCaractere');
const TamanhoDosCaracteres = document.getElementById('TamanhoDosCaracteres');
const BotaoCorDosCaracteres = document.getElementById('BotaoCorDosCaracteres');
const CorDosCaracteres = document.getElementById('CorDosCaracteres');
const BotaoCorDeFundo = document.getElementById('BotaoCorDeFundo');
const CorDeFundo = document.getElementById('CorDeFundo');
const BotaoCorDoContorno = document.getElementById('BotaoCorDoContorno');
const CorDoContorno = document.getElementById('CorDoContorno');
const TamanhoDoContorno = document.getElementById('TamanhoDoContorno');
const selecionar_fonte = document.getElementById("selecionar_fonte");
const Caracteres = document.getElementById('Caracteres');
// Numero de caracteres exibidos por pagina
var CaracteresPorPagina = 1024;
// Inicia definindo TamanhoDosCaracteres e PaginasDeCaractere
DefinirTamanhoDosCaracteres(TamanhoDosCaracteres.value);
DefinirPaginasDeCaractere(PaginasDeCaractere.value);
// Botao para entrada
BotaoEntradaDeArquivo.addEventListener('click', () => {
    EntradaDeArquivo.click();
});
// Entrada de arquivo
EntradaDeArquivo.addEventListener('change', () => {
    Array.from(EntradaDeArquivo.files).forEach((arquivo, index) => {
        if (arquivo.name) {
            adicionar_fonte(arquivo,index === 0);
        }
    });
});
// Função para adicionar a fonte ao select
function adicionar_fonte(arquivo,primeira) {
    localStorage.setItem(`fontes_locais/${arquivo.name}`, arquivo);
    const option = document.createElement("option");
    const nome = arquivo.name.split('.').slice(0, -1).join('.');
    option.value = nome
    option.textContent = nome
    selecionar_fonte.appendChild(option);
    //
    var LeitorDeDocumentos = new FileReader();
    LeitorDeDocumentos.readAsDataURL(arquivo);
    LeitorDeDocumentos.onload = function () {
        const FonteArquivo = LeitorDeDocumentos.result;
        const FonteAtual = new FontFace(nome, `url(${FonteArquivo})`);
        FonteAtual.load().then(() => {
            document.fonts.add(FonteAtual);
        });
    };
    //
    if (primeira) {
        option.selected = true; 
        document.getElementById("Caracteres").style.fontFamily = nome;
    }
}
// Função para alterar a fonte ao selecionar no select
function alterar_fonte() {
    const nomeFonteSelecionada = selecionar_fonte.value;
    if (nomeFonteSelecionada) {
        document.getElementById("Caracteres").style.fontFamily = nomeFonteSelecionada;
    } else {
        document.getElementById("Caracteres").style.fontFamily = "";
    }
}
//
PaginasDeCaractere.addEventListener('input', () => {
    DefinirPaginasDeCaractere(PaginasDeCaractere.value);
});
//
function DefinirPaginasDeCaractere(Pagina) {
    const Inicio = (parseInt(Pagina) - 1) * CaracteresPorPagina + 1;
    const Fim = parseInt(Pagina) * CaracteresPorPagina;
    Caracteres.value = "";
    for (let Posicao = Inicio; Posicao <= Fim; Posicao++) {
        Caracteres.value += String.fromCodePoint(0x1F + Posicao - 1);
    }
}
//
TamanhoDosCaracteres.addEventListener('input', () => {
    DefinirTamanhoDosCaracteres(TamanhoDosCaracteres.value);
});
//
function DefinirTamanhoDosCaracteres(Tamanho) {
    Caracteres.style.fontSize = Tamanho + 'px';
}
//
BotaoCorDosCaracteres.addEventListener('click', () => {
    CorDosCaracteres.click();
});
CorDosCaracteres.addEventListener('input', () => {
    Caracteres.style.color = CorDosCaracteres.value;
    document.getElementById('BotaoCorDosCaracteres').style.backgroundColor = CorDosCaracteres.value;
});
//
document.getElementById('BotaoCorDeFundo').addEventListener('click', () => {
    document.getElementById('CorDeFundo').click();
});
CorDeFundo.addEventListener('input', () => {
    Caracteres.style.backgroundColor = CorDeFundo.value;
    document.getElementById('BotaoCorDeFundo').style.backgroundColor = CorDeFundo.value;
});
//
document.getElementById('BotaoCorDoContorno').addEventListener('click', () => {
    document.getElementById('CorDoContorno').click();
});
CorDoContorno.addEventListener('input', () => {
    Caracteres.style.webkitTextStrokeColor = CorDoContorno.value;
    document.getElementById('BotaoCorDoContorno').style.backgroundColor = CorDoContorno.value;
});
//
TamanhoDoContorno.addEventListener('input', () => {
    Caracteres.style.webkitTextStrokeWidth = TamanhoDoContorno.value + 'px';
});
//
function trocar_pagina(numero) {
    if (PaginasDeCaractere.value == 1 && numero < 0) {
        return;
    }
    PaginasDeCaractere.value = parseFloat(PaginasDeCaractere.value) + numero;
    DefinirPaginasDeCaractere(PaginasDeCaractere.value);
}
//
function trocar_tamanho_caracter(numero) {
    if (TamanhoDosCaracteres.value == 1 && numero < 0) {
        return;
    }
    TamanhoDosCaracteres.value = parseFloat(TamanhoDosCaracteres.value) + numero;
    DefinirTamanhoDosCaracteres(TamanhoDosCaracteres.value);
}
//
function trocar_tamanho_contorno(numero) {
    if (TamanhoDoContorno.value == 0 && numero < 0) {
        return;
    }
    TamanhoDoContorno.value = parseFloat(TamanhoDoContorno.value) + numero;

    Caracteres.style.webkitTextStrokeWidth = TamanhoDoContorno.value + 'px';
}
//
document.getElementById('pagina_anterior').addEventListener('click', function () {
    trocar_pagina(-1);
});

document.getElementById('proxima_pagina').addEventListener('click', function () {
    trocar_pagina(+1);
});

document.getElementById('tamanho_caracter_menos').addEventListener('click', function () {
    trocar_tamanho_caracter(-1);
});

document.getElementById('tamanho_caracter_mais').addEventListener('click', function () {
    trocar_tamanho_caracter(+1);
});

document.getElementById('tamanho_contorno_menos').addEventListener('click', function () {
    trocar_tamanho_contorno(-1);
});

document.getElementById('tamanho_contorno_mais').addEventListener('click', function () {
    trocar_tamanho_contorno(+1);
});
//
let intervalo;
function inicia_repeticao(funcao) {
    intervalo = setInterval(funcao, 100);
}
//
function para_repeticao() {
    clearInterval(intervalo);
}
document.getElementById('pagina_anterior').addEventListener('mousedown', function () {
    inicia_repeticao(() => trocar_pagina(-1));
});
document.getElementById('proxima_pagina').addEventListener('mousedown', function () {
    inicia_repeticao(() => trocar_pagina(+1));
});
document.getElementById('tamanho_caracter_menos').addEventListener('mousedown', function () {
    inicia_repeticao(() => trocar_tamanho_caracter(-1));
});
document.getElementById('tamanho_caracter_mais').addEventListener('mousedown', function () {
    inicia_repeticao(() => trocar_tamanho_caracter(+1));
});
document.getElementById('tamanho_contorno_menos').addEventListener('mousedown', function () {
    inicia_repeticao(() => trocar_tamanho_contorno(-1));
});
document.getElementById('tamanho_contorno_mais').addEventListener('mousedown', function () {
    inicia_repeticao(() => trocar_tamanho_contorno(+1));
});
document.querySelectorAll('.seta').forEach(button => {
    button.addEventListener('mouseup', para_repeticao);
    button.addEventListener('mouseleave', para_repeticao);
});