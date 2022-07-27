function valorTotalInvestido (valorInicial, valorMensal, tempo, tempoInvestido){
    // recuperação de todos os valores informados na tela
    window.valorTotalInvestidoR = 0;
    //calculo
    if(tempoInvestido == 1) {
        valorTotalInvestidoR = Number(valorMensal) * Number(tempo) + Number(valorInicial);
    } else if(tempoInvestido == 2) {
        valorTotalInvestidoR = Number(valorMensal) * Number(tempo) * 12 + Number(valorInicial);
    }
    // setar todos os resultados
    document.getElementById('valorTotalInvestidoP').innerHTML = valorTotalInvestidoR;
}

function valorTotalJuros (valorInicial, valorMensal, tempo, taxa, tempoInvestido, tempoRendimento){
    i = 0;
    window.valorTotalJurosR = 0;
    let saldo = valorInicial;

    if(tempoInvestido == 1){
        if(tempoRendimento == 1){ // funcional | Rendimento mensal | Periodo Mensal
            if(tempo >= 1){ //
            for(i == 0; i <= tempo; i++) { 
                saldo = (Number(taxa) * Number(saldo)) + Number(saldo) + Number(valorMensal);
            } 
            valorTotalJurosR = saldo - valorTotalInvestidoR ;
            } else {  // funcional | Rendimento mensal | periodo Mensal | caso seja 0 ou menor
                valorTotalJurosR = 0;
            }
        } else if(tempoRendimento == 2){ // funcional | Rendimento anual | Periodo Mensal
            if(tempo >= 12){
                quantDeAnos = tempo/12;
                quantDeAnos = parseInt(quantDeAnos);
                

                for(i == 0; i <= quantDeAnos; i++) {
                    saldo = Number(saldo) + Number(valorMensal)* 12;
                    saldo = Number(taxa) * Number(saldo) + Number(saldo);
                }
                valorTotalJurosR = saldo - valorTotalInvestidoR ;
            } else{ // funcional | Rendimento anual | periodo Mensal | caso seja 0 ou menor
                valorTotalJurosR = 0;
                //avisar que o rendimento está anual e não passou 1 ano?
            }    
        } 

    } else if (tempoInvestido == 2){ // periodo anual
        if(tempoRendimento == 1){ 
            if(tempo >= 1){// funcional | Rendimento mensal
            for(i == 0; i <= tempo*12; i++) { 
                saldo = (Number(taxa) * Number(saldo)) + Number(saldo) + Number(valorMensal);
            } 
            valorTotalJurosR = saldo - valorTotalInvestidoR ;
            } else { // funcional | Rendimento mensal | caso seja 0 ou menor
                    valorTotalJurosR = 0;
            }
        } else if(tempoRendimento == 2){ // funcional |  Rendimento anual
            if(tempo >= 1){
                for(i == 0; i < tempo; i++) {
                    saldo = Number(saldo) + Number(valorMensal)* 12;
                    saldo = Number(taxa) * Number(saldo) + Number(saldo);
                }
                valorTotalJurosR = saldo - valorTotalInvestidoR ;
            } else { // funcional | Rendimento anual | caso seja 0 ou menor
                valorTotalJurosR = 0;
        }
        }
    }

    document.getElementById('valorTotalJurosP').innerHTML = valorTotalJurosR;
}


function impostoRenda (tempo, tempoInvestido) {
    if(tempoInvestido == 1){
        dias = tempo * 30;
    } else if(tempoInvestido == 2){
        dias = tempo * 30 * 12;
    }
        
        window.impostoRendaR = 0;
    if( dias <= 180){
        impostoRendaR = valorTotalJurosR * 0.225;
    } if (dias >= 181 && dias <= 360) {
        impostoRendaR = valorTotalJurosR * 0.2;
    } if (dias >= 361 && dias <= 720){
        impostoRendaR = valorTotalJurosR * 0.175;
    } if (dias > 720){
        impostoRendaR = valorTotalJurosR * 0.15;
    }

    document.getElementById('valorImpostoRendaP').innerHTML = impostoRendaR;
}

function calculoRedimento(){
    rendimento = valorTotalInvestidoR + valorTotalJurosR - impostoRendaR;
    document.getElementById('ValorTotalFinalP').innerHTML = rendimento;
}

function chamarCalculo(){
    // pega os valores dos inputs
    let valorInicial = document.getElementById('valorInicial').value;
    let valorMensal = document.getElementById('valorMensal').value;
    let taxa= document.getElementById('taxa').value;
    let tempo = document.getElementById('tempo').value;


    select = document.getElementById('inputGroupSelect01');
    let tempoRendimento = select.options[select.selectedIndex].value;
    select = document.getElementById('inputGroupSelect02');
    let tempoInvestido = select.options[select.selectedIndex].value;


    valorTotalInvestido(valorInicial, valorMensal, tempo, tempoInvestido);
    valorTotalJuros (valorInicial, valorMensal, tempo, taxa, tempoInvestido, tempoRendimento);
    impostoRenda (tempo, tempoInvestido);
    calculoRedimento();

    console.log("TempoRendimento: " + tempoRendimento);
    console.log("TempoInvestido: " + tempoInvestido);
}