// Elementos
var EntradaDeArquivo = document.getElementById('EntradaDeArquivo');
var BotaoEntradaDeArquivo = document.getElementById('BotaoEntradaDeArquivo');
var EntradaInicio = document.getElementById('EntradaInicio');
var EntradaFim = document.getElementById('EntradaFim');
var AreaDoTexto = document.getElementById('AreaDoTexto');
var Caracteres = document.getElementById('Caracteres');
// Entrada de fonte
EntradaDeArquivo.addEventListener('change', () => {
    var LeitorDeDocumentos = new FileReader();
    LeitorDeDocumentos.readAsText(EntradaDeArquivo.files[0]);
    LeitorDeDocumentos.onload = function(){
        FonteArquivo = EntradaDeArquivo.files[0].name;
        // CarregarFonte(FonteArquivo);
    }
});
AreaDoTexto.addEventListener('input',()=>{
    MostrarTextoArea(AreaDoTexto.value);
});
EntradaInicio.addEventListener('input',()=>{
    Inicio = EntradaInicio.value;
});
EntradaFim.addEventListener('input',()=>{
    Fim = EntradaFim.value;
});

BotaoEntradaDeArquivo.addEventListener('click',()=>{
    MostrarCaracteres();
});
function MostrarCaracteres(){
    LimparCaracters();
    Texto = "";
    for(var i = Inicio; i < Number(Inicio) + Number(Fim) ;i++){
        Texto = Texto + " " + "&#" + i + ";";
    }
    CaracteresTela(Texto);
}
function MostrarTextoArea(Texto){
    LimparCaracters();
    CaracteresTela(Texto);
}
function LimparCaracters(){
    while (Caracteres.hasChildNodes()){
        Caracteres.removeChild(Caracteres.firstChild);
    }
}
function CaracteresTela(Texto){
    var Caracter = document.createElement('p');
    Caracter.innerHTML = Texto;
    Caracteres.appendChild(Caracter);
}
function CarregarFonte(FonteArquivo) {
    const font = new FontFace("myjopf","url(Meraki.ttf)");
    // wait for font to be loaded
    font.load();
    // add font to document
    document.fonts.add(font);
    // enable font with CSS class
    document.body.classList.add("fonts-loaded");
    document.getElementById("Caracteres").style.fontFamily = "myjopf";
  }

// function TamanhoCaracteres(){
//
// }
//
// function AlterarCorFundo(){
//
// }
