//
const EntradaDeArquivo = document.getElementById('EntradaDeArquivo');
const BotaoEntradaDeArquivo = document.getElementById('BotaoEntradaDeArquivo');
const BotaoCorDosCaracteres = document.getElementById('BotaoCorDosCaracteres');
const CorDosCaracteres = document.getElementById('CorDosCaracteres');
const BotaoCorDeFundo = document.getElementById('BotaoCorDeFundo');
const CorDeFundo = document.getElementById('CorDeFundo');
const BotaoCorDoContorno = document.getElementById('BotaoCorDoContorno');
const CorDoContorno = document.getElementById('CorDoContorno');

const Caracteres = document.getElementById('Caracteres');
//
const CaracteresPorPagina = 1024;
//
BotaoEntradaDeArquivo.addEventListener('click', () => {
    EntradaDeArquivo.click();
});
//
EntradaDeArquivo.addEventListener('change', () => {
    Array.from(EntradaDeArquivo.files).forEach((arquivo, index) => {
        if (arquivo.name) {
            adicionar_fonte(arquivo, index === 0);
        }
    });
});
//
function definir_atributo_caracteres(valor,atributo,sub_atributo = '',modo){
    const Caracteres = document.getElementById('Caracteres');
    const Caracteres2 = document.getElementById('Caracteres2');
    switch (modo){
        case '=':
            if(sub_atributo){
                Caracteres[atributo][sub_atributo] = valor;
                Caracteres2[atributo][sub_atributo] = valor;
            } else {
                Caracteres[atributo] = valor;
                Caracteres2[atributo] = valor;
            }
        case '+':
            if(sub_atributo){
                Caracteres[atributo][sub_atributo] += valor;
                Caracteres2[atributo][sub_atributo] += valor;
            } else {
                Caracteres[atributo] += valor;
                Caracteres2[atributo] += valor;
            }
    }
    
}
// Função para adicionar a fontes nas opcoes selecionaveis
const selecionar_fonte = document.getElementById("selecionar_fonte");
const selecionar_fonte2 = document.getElementById("selecionar_fonte2");
function adicionar_fonte(arquivo, primeira) {
    const nome = arquivo.name.split('.').slice(0, -1).join('.');
    const option1 = document.createElement("option");
    option1.value = nome;
    option1.textContent = nome;
    selecionar_fonte.appendChild(option1);
    const option2 = document.createElement("option");
    option2.value = nome;
    option2.textContent = nome;
    selecionar_fonte2.appendChild(option2);
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
        option1.selected = true;
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
function alterar_fonte2() {
    const nomeFonteSelecionada = selecionar_fonte2.value;
    if (nomeFonteSelecionada) {
        document.getElementById("Caracteres2").style.fontFamily = nomeFonteSelecionada;
        document.getElementById("Caracteres2").style.display = "flex";
    } else {
        document.getElementById("Caracteres2").style.fontFamily = "";
        document.getElementById("Caracteres2").style.display = "none";
    }
}
//
let intervalo;
function inicia_repeticao(funcao) {
    intervalo = setInterval(funcao, 100);
}
function para_repeticao() {
    clearInterval(intervalo);
}
//
const PaginasDeCaractere = document.getElementById('PaginasDeCaractere');
PaginasDeCaractere.addEventListener('input', () => {
    DefinirPaginasDeCaractere(PaginasDeCaractere.value);
});
function DefinirPaginasDeCaractere(Pagina) {
    const Inicio = (parseInt(Pagina) - 1) * CaracteresPorPagina + 1;
    const Fim = parseInt(Pagina) * CaracteresPorPagina;
    definir_atributo_caracteres("",'value',undefined,'=')
    for (let Posicao = Inicio; Posicao <= Fim; Posicao++) {
        definir_atributo_caracteres(String.fromCodePoint(0x1F + Posicao - 1),'value',undefined,'+')
    }
}
DefinirPaginasDeCaractere(PaginasDeCaractere.value);
function trocar_pagina(numero) {
    if ((PaginasDeCaractere.value == 1 && numero < 0) 
        || (PaginasDeCaractere.value >= 1000 && numero > 0)) {
        return;
    }
    PaginasDeCaractere.value = parseFloat(PaginasDeCaractere.value) + numero;
    DefinirPaginasDeCaractere(PaginasDeCaractere.value);
}
document.getElementById('pagina_anterior').addEventListener('click', function () {
    trocar_pagina(-1);
});
document.getElementById('proxima_pagina').addEventListener('click', function () {
    trocar_pagina(+1);
});
document.getElementById('pagina_anterior').addEventListener('mousedown', function () {
    inicia_repeticao(() => trocar_pagina(-1));
});
document.getElementById('proxima_pagina').addEventListener('mousedown', function () {
    inicia_repeticao(() => trocar_pagina(+1));
});
//
const TamanhoDosCaracteres = document.getElementById('TamanhoDosCaracteres');
TamanhoDosCaracteres.addEventListener('input', () => {
    DefinirTamanhoDosCaracteres(TamanhoDosCaracteres.value);
});
function DefinirTamanhoDosCaracteres(Tamanho) {
    definir_atributo_caracteres(`${Tamanho}px`,'style','fontSize','=')
}
DefinirTamanhoDosCaracteres(TamanhoDosCaracteres.value);
function trocar_tamanho_caracter(numero) {
    if ((TamanhoDosCaracteres.value == 1 && numero < 0)
    || (TamanhoDosCaracteres.value >= 3000 && numero > 0)) {
        return;
    }
    TamanhoDosCaracteres.value = parseFloat(TamanhoDosCaracteres.value) + numero;
    DefinirTamanhoDosCaracteres(TamanhoDosCaracteres.value);
}
document.getElementById('tamanho_caracter_menos').addEventListener('click', function () {
    trocar_tamanho_caracter(-1);
});
document.getElementById('tamanho_caracter_mais').addEventListener('click', function () {
    trocar_tamanho_caracter(+1);
});
document.getElementById('tamanho_caracter_menos').addEventListener('mousedown', function () {
    inicia_repeticao(() => trocar_tamanho_caracter(-1));
});
document.getElementById('tamanho_caracter_mais').addEventListener('mousedown', function () {
    inicia_repeticao(() => trocar_tamanho_caracter(+1));
});
// 
BotaoCorDosCaracteres.addEventListener('click', () => {
    CorDosCaracteres.click();
});
CorDosCaracteres.addEventListener('input', () => {
    definir_atributo_caracteres(CorDosCaracteres.value,'style','color','=')
    atualizar_acessibilidade()
    document.getElementById('BotaoCorDosCaracteres').style.backgroundColor = CorDosCaracteres.value;
});
//
document.getElementById('BotaoCorDeFundo').addEventListener('click', () => {
    document.getElementById('CorDeFundo').click();
});
CorDeFundo.addEventListener('input', () => {
    definir_atributo_caracteres(CorDeFundo.value,'style','backgroundColor','=')
    atualizar_acessibilidade()
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
const TamanhoDoContorno = document.getElementById('TamanhoDoContorno');
TamanhoDoContorno.addEventListener('input', () => {
    Caracteres.style.webkitTextStrokeWidth = TamanhoDoContorno.value + 'px';
});
function trocar_tamanho_contorno(numero) {
    if (TamanhoDoContorno.value == 0 && numero < 0) {
        return;
    }
    TamanhoDoContorno.value = parseFloat(TamanhoDoContorno.value) + numero;
    Caracteres.style.webkitTextStrokeWidth = TamanhoDoContorno.value + 'px';
}
document.getElementById('tamanho_contorno_menos').addEventListener('click', function () {
    trocar_tamanho_contorno(-1);
});
document.getElementById('tamanho_contorno_mais').addEventListener('click', function () {
    trocar_tamanho_contorno(+1);
});
document.getElementById('tamanho_contorno_menos').addEventListener('mousedown', function () {
    inicia_repeticao(() => trocar_tamanho_contorno(-1));
});
document.getElementById('tamanho_contorno_mais').addEventListener('mousedown', function () {
    inicia_repeticao(() => trocar_tamanho_contorno(+1));
});
//
document.querySelectorAll('.seta').forEach(button => {
    button.addEventListener('mouseup', para_repeticao);
    button.addEventListener('mouseleave', para_repeticao);
});
//
const TamanhoDoEspacamento = document.getElementById('TamanhoDoEspacamento');
function trocar_tamanho_espacamento(numero) {
    TamanhoDoEspacamento.value = parseFloat(TamanhoDoEspacamento.value) + numero;
    Caracteres.style.letterSpacing = TamanhoDoEspacamento.value + 'px';
}
TamanhoDoEspacamento.addEventListener('input', () => {
    Caracteres.style.letterSpacing = TamanhoDoEspacamento.value + 'px';
});
document.getElementById('espacamento_mais').addEventListener('click', function () {
    trocar_tamanho_espacamento(+1);
});
document.getElementById('espacamento_menos').addEventListener('click', function () {
    trocar_tamanho_espacamento(-1);
});
document.getElementById('espacamento_mais').addEventListener('mousedown', function () {
    inicia_repeticao(() => trocar_tamanho_espacamento(+1));
});
document.getElementById('espacamento_menos').addEventListener('mousedown', function () {
    inicia_repeticao(() => trocar_tamanho_espacamento(-1));
});
//
const TamanhoDoEspessura = document.getElementById('TamanhoDoEspessura');
function trocar_tamanho_espessura(numero) {
    if ((TamanhoDoEspessura.value <= 100 && numero < 0)
        || (TamanhoDoEspessura.value >= 800 && numero > 0)) { return; }
    TamanhoDoEspessura.value = parseFloat(TamanhoDoEspessura.value) + numero;
    Caracteres.style.fontWeight = TamanhoDoEspessura.value;
}
TamanhoDoEspessura.addEventListener('input', () => {
    Caracteres.style.fontWeight = TamanhoDoEspessura.value;
});
document.getElementById('espessura_mais').addEventListener('click', function () {
    trocar_tamanho_espessura(+100);
});
document.getElementById('espessura_menos').addEventListener('click', function () {
    trocar_tamanho_espessura(-100);
});
document.getElementById('espessura_mais').addEventListener('mousedown', function () {
    inicia_repeticao(() => trocar_tamanho_espessura(+100));
});
document.getElementById('espessura_menos').addEventListener('mousedown', function () {
    inicia_repeticao(() => trocar_tamanho_espessura(-100));
});
//
function alterar_estilo() {
    const estilo_selecionado = selecionar_estilo.value;
    if (['italic', 'oblique'].includes(estilo_selecionado)) {
        document.getElementById("Caracteres").style.fontStyle = estilo_selecionado;
    }
    if (['small-caps'].includes(estilo_selecionado)) {
        document.getElementById("Caracteres").style.fontVariant = estilo_selecionado;
    }
    if (['underline'].includes(estilo_selecionado)) {
        document.getElementById("Caracteres").style.textDecoration = estilo_selecionado;
    }
    if (estilo_selecionado == 'normal') {
        document.getElementById("Caracteres").style.fontStyle = 'normal';
        document.getElementById("Caracteres").style.fontVariant = 'normal';
        document.getElementById("Caracteres").style.textDecoration = 'none';
    }
}
//
document.getElementById("trocar_texto_fundo").addEventListener("click", function () {
    const cor_texto = window.getComputedStyle(document.getElementById('BotaoCorDosCaracteres')).backgroundColor;
    const cor_fundo = window.getComputedStyle(document.getElementById('BotaoCorDeFundo')).backgroundColor;
    document.getElementById('BotaoCorDosCaracteres').style.backgroundColor = cor_fundo;
    document.getElementById('BotaoCorDeFundo').style.backgroundColor = cor_texto;
    Caracteres.style.color = cor_fundo;
    Caracteres.style.backgroundColor = cor_texto;
});
document.getElementById("trocar_fundo_contorno").addEventListener("click", function () {
    const cor_fundo = window.getComputedStyle(document.getElementById('BotaoCorDeFundo')).backgroundColor;
    const cor_contorno = window.getComputedStyle(document.getElementById('BotaoCorDoContorno')).backgroundColor;
    document.getElementById('BotaoCorDeFundo').style.backgroundColor = cor_contorno;
    document.getElementById('BotaoCorDoContorno').style.backgroundColor = cor_fundo;
    Caracteres.style.backgroundColor = cor_contorno;
    Caracteres.style.webkitTextStrokeColor = cor_fundo;
});
//
function rbga_para_luminancia(rgba) {
    const valores = rgba.match(/\d+/g).map(Number);
    const [r, g, b] = valores;
    const [R, G, B] = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
function atualizar_acessibilidade() {
    const cor_texto = window.getComputedStyle(document.getElementById('Caracteres')).color;
    const cor_fundo = window.getComputedStyle(document.getElementById('Caracteres')).backgroundColor;
    const luminanciaTexto = rbga_para_luminancia(cor_texto);
    const luminanciaFundo = rbga_para_luminancia(cor_fundo);
    const contraste = (Math.max(luminanciaTexto, luminanciaFundo) + 0.05) / (Math.min(luminanciaTexto, luminanciaFundo) + 0.05);
    if(contraste > 7){
        document.getElementById('contraste').style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--cor-verde').trim();
    }
    else if(contraste > 4.5){
        document.getElementById('contraste').style.borderColor= getComputedStyle(document.documentElement).getPropertyValue('--cor-amarela').trim();
    } else {
        document.getElementById('contraste').style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--cor-vermelha').trim();
    }
    document.getElementById('contraste').textContent = `${contraste.toFixed(2)} : 1`;
}
atualizar_acessibilidade()