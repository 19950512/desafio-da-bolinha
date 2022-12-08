window.bolinhas_na_tela = [];
window.bolinhas_removidas = [];

function addBolinha(evento){

    let data = {
        "x": evento.clientX,
        "y": evento.clientY,
    };

    bolinhas_na_tela.push(data);
    render(data);
}

function random(min, max){
    return Math.random() * (max - min) + min;
}

// gera cor tons escuro, quanto menor o MIN, mais escuro, quanto maior o MAX mais claro.
function randomColor(){
    var red = random(30, 150);
    var green = random(30, 150);
    var blue = random(30, 150);
    var bgColor = "rgb(" + red + "," + green + "," + blue + ")";

    return bgColor;
}

function desfazer(){

    if(bolinhas_na_tela.length <= 0){
        console.warn('Não há ação para executar o desfazer.');
        return;
    }

    if(bolinhas_na_tela.at(-1)){
        bolinhas_na_tela.at(-1).elemento.remove();
    }
    let bolinhaRemovida = bolinhas_na_tela.pop();

    if(bolinhaRemovida){
        bolinhas_removidas.push(bolinhaRemovida);
    }
}
function refazer(){

    if(bolinhas_removidas.length <= 0){
        console.warn('Não há ação para executar o refazer.');
        return;
    }
    let bolinhaNova = bolinhas_removidas.pop();

    if(bolinhaNova){
        bolinhas_na_tela.push(bolinhaNova);
        render(bolinhaNova);
    }
}

function commandHandler(event) {
    // ctrl + z
    if (event.keyCode == 90 && event.ctrlKey){
        desfazer();
    }
   
    // ctrl + y
    if (event.keyCode == 89 && event.ctrlKey){
        refazer();
    }
}

function render(data){

    let bolinha = document.createElement('DIV');
    bolinha.classList.add('bolinha');

    let tamanho = random(20, 90);

    bolinha.style.width = `${tamanho}px`;
    bolinha.style.height = `${tamanho}px`;

    bolinha.style.backgroundColor = randomColor();

    bolinha.style.top = `${data.y}px`;
    bolinha.style.left = `${data.x}px`;
    bolinha.style.transform = 'translate(-50%, -50%)';

    if(bolinhas_na_tela.at(-1)){
        bolinhas_na_tela.at(-1).elemento = bolinha;
    }

    document.body.appendChild(bolinha);
}


document.addEventListener('click', addBolinha);
document.addEventListener('keydown', commandHandler);