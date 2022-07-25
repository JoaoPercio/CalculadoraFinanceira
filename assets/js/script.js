function valorTotalInvestido (valorInicial, valorMensal, tempo){
    // recuperação de todos os valores informados na tela
    window.valorTotalInvestido = 0;
    //calculo
    valorTotalInvestido = Number(valorMensal) * Number(tempo) + Number(valorInicial);
    // setar todos os resultados
    document.getElementById('valorTotalInvestidoP').innerHTML = valorTotalInvestido;
}

function valorTotalJuros (valorInicial, valorMensal, tempo, taxa){
    i = 0;
    window.valorTotalJuros = 0;
    let saldo = valorInicial;
    for(i == 0; i <= tempo; i++) {
        saldo = (Number(taxa) * Number(saldo)) + Number(saldo) + Number(valorMensal);
    }
    console.log("Saldo:" + saldo);
    console.log("valorTotalInvestido:" + valorTotalInvestido);
    valorTotalJuros = saldo - valorTotalInvestido ;
    console.log(valorTotalJuros);
    document.getElementById('valorTotalJurosP').innerHTML = valorTotalJuros;
}


function impostoRenda (tempo) {
        dias = tempo * 30;
        window.impostoRenda = 0;
    if( dias <= 180){
        impostoRenda = valorTotalJuros * 0.225;
    } if (dias >= 181 && dias <= 360) {
        impostoRenda = valorTotalJuros * 0.2;
    } if (dias >= 361 && dias <= 720){
        impostoRenda = valorTotalJuros * 0.175;
    } if (dias > 720){
        impostoRenda = valorTotalJuros * 0.15;
    }

    document.getElementById('valorImpostoRendaP').innerHTML = impostoRenda;
}

function calculoRedimento(){
    rendimento = valorTotalInvestido + valorTotalJuros- impostoRenda;
    document.getElementById('ValorTotalFinalP').innerHTML = rendimento;
}

function chamarCalculo(){
    let valorInicial = document.getElementById('valorInicial').value;
    let valorMensal = document.getElementById('valorMensal').value;
    let taxa= document.getElementById('taxa').value;
    let tempo = document.getElementById('tempo').value;

    console.log("Valor Inicial:" + valorInicial);
    console.log("Valor Mensal:" + valorMensal);
    console.log("taxa:" + taxa);
    console.log("tempo:" + tempo);
    valorTotalInvestido(valorInicial, valorMensal, tempo);
    valorTotalJuros (valorInicial, valorMensal, tempo, taxa);
    impostoRenda (tempo);
    calculoRedimento();

}