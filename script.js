var EntradaDeArquivo = document.getElementById('EntradaDeArquivo');
var BotaoEntradaDeArquivo = document.getElementById('BotaoEntradaDeArquivo');
var NomeDaFonte = document.getElementById('NomeDaFonte');
EntradaDeArquivo.addEventListener('change', () => {
    var LeitorDeDocumentos = new FileReader();
    LeitorDeDocumentos.readAsDataURL(EntradaDeArquivo.files[0]);
    LeitorDeDocumentos.onload = function(){
        FonteArquivo = LeitorDeDocumentos.result;
        const FonteAtual = new FontFace("FonteAtual", `url(${FonteArquivo})`);
        FonteAtual.load().then(() =>{
            document.fonts.add(FonteAtual);
            document.body.classList.add("fonts-loaded");
            document.getElementById("Caracteres").style.fontFamily = "FonteAtual";
        });
    }
    FonteAtual.family;
});
BotaoEntradaDeArquivo.addEventListener('click',()=>{
    EntradaDeArquivo.click();
});
var Caracteres = document.getElementById('Caracteres');
var AreaDoTexto = document.getElementById('AreaDoTexto');
AreaDoTexto.addEventListener('input',()=>{
    Caracteres.textContent = AreaDoTexto.value
});
var CaracteresPorPagina = 1024;
var PaginasDeCaractere = document.getElementById('PaginasDeCaractere');
var Caracteres = document.getElementById('Caracteres');
PaginasDeCaractere.addEventListener('input', () => {
    const Inicio = (parseInt(PaginasDeCaractere.value) - 1) * CaracteresPorPagina + 1;
    const Fim = parseInt(PaginasDeCaractere.value) * CaracteresPorPagina;
    var Texto = ""; 
    for (let Posicao = Inicio; Posicao <= Fim; Posicao++) {
        Texto = Texto + " " + "&#" + Posicao + ";";
    }
    Caracteres.innerHTML = Texto;
});
var TamanhoDosCaracteres = document.getElementById('TamanhoDosCaracteres');
TamanhoDosCaracteres.addEventListener('input',()=>{
    Caracteres.style.fontSize = TamanhoDosCaracteres.value + 'px';
});
var CorDosCaracteres = document.getElementById('CorDosCaracteres');
CorDosCaracteres.addEventListener('input',()=> {
  Caracteres.style.color = CorDosCaracteres.value;
});
var CorDeFundo = document.getElementById('CorDeFundo');
CorDeFundo.addEventListener('input',()=> {
  Caracteres.style.backgroundColor = CorDeFundo.value;
});
var CorDoContorno = document.getElementById('CorDoContorno');
CorDoContorno.addEventListener('input',()=> {
  Caracteres.style.webkitTextStrokeColor = CorDoContorno.value;
});
var TamanhoDoContorno = document.getElementById('TamanhoDoContorno');
TamanhoDoContorno.addEventListener('input',()=>{
    Caracteres.style.webkitTextStrokeWidth = TamanhoDoContorno.value + 'px';
});
TamanhoDosCaracteres.dispatchEvent(new Event('input'));
PaginasDeCaractere.dispatchEvent(new Event('input'));