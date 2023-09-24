// Elementos
var EntradaDeArquivo = document.getElementById('EntradaDeArquivo');
var BotaoEntradaDeArquivo = document.getElementById('BotaoEntradaDeArquivo');
var PaginasDeCaractere = document.getElementById('PaginasDeCaractere');
var TamanhoDosCaracteres = document.getElementById('TamanhoDosCaracteres');
var CorDosCaracteres = document.getElementById('CorDosCaracteres');
var CorDeFundo = document.getElementById('CorDeFundo');
var CorDoContorno = document.getElementById('CorDoContorno');
var TamanhoDoContorno = document.getElementById('TamanhoDoContorno');
var Caracteres = document.getElementById('Caracteres');
//
var CaracteresPorPagina = 1024;
// Inicia definindo TamanhoDosCaracteres e PaginasDeCaractere
DefinirTamanhoDosCaracteres(TamanhoDosCaracteres.value);
DefinirPaginasDeCaractere(PaginasDeCaractere.value);
// Botao para entrada
BotaoEntradaDeArquivo.addEventListener('click',()=>{
    EntradaDeArquivo.click();
});
// Entrada de arquivo
EntradaDeArquivo.addEventListener('change', () => {
    var LeitorDeDocumentos = new FileReader();
    LeitorDeDocumentos.readAsDataURL(EntradaDeArquivo.files[0]);
    LeitorDeDocumentos.onload = function(){
        FonteArquivo = LeitorDeDocumentos.result;
        const FonteAtual = new FontFace("FonteAtual", `url(${FonteArquivo})`);
        FonteAtual.load().then(() =>{
            document.fonts.add(FonteAtual);
            document.getElementById("Caracteres").style.fontFamily = "FonteAtual";
        });
    }
});
//
PaginasDeCaractere.addEventListener('input', () => {
    DefinirPaginasDeCaractere(PaginasDeCaractere.value);
    
});
//
function DefinirPaginasDeCaractere(Pagina){
    const Inicio = (parseInt(Pagina) - 1) * CaracteresPorPagina + 1;
    const Fim = parseInt(Pagina) * CaracteresPorPagina;
    Caracteres.value = ""; 
    for (let Posicao = Inicio; Posicao <= Fim; Posicao++) {
        Caracteres.value += String.fromCodePoint(0x1F + Posicao - 1);
    }
}
//
TamanhoDosCaracteres.addEventListener('input',()=>{
    DefinirTamanhoDosCaracteres(TamanhoDosCaracteres.value);
});
//
function DefinirTamanhoDosCaracteres(Tamanho){
    Caracteres.style.fontSize = Tamanho + 'px';
}
//
CorDosCaracteres.addEventListener('input',()=> {
  Caracteres.style.color = CorDosCaracteres.value;
});
//
CorDeFundo.addEventListener('input',()=> {
  Caracteres.style.backgroundColor = CorDeFundo.value;
});
//
CorDoContorno.addEventListener('input',()=> {
    Caracteres.style.webkitTextStrokeColor = CorDoContorno.value;
});
//
TamanhoDoContorno.addEventListener('input',()=>{
    Caracteres.style.webkitTextStrokeWidth = TamanhoDoContorno.value + 'px';
});