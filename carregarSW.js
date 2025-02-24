window.addEventListener('load',()=>{
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('serviceWorker.js')
        .then(function(reg) {
            console.log(reg.scope);
        }).catch(function(erro) {
            console.log(erro);
        });
    }
});