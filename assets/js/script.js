function valorTotalInvestido (valorInicial, valorMensal, tempo){
    if(tempo = mensal){
        valorTotalInvestido = valorInicial + valorMensal*tempo;
    } else {
        valorTotalInvestido = valorInicial + valorMensal*tempo*12;
    }
    return valorTotalInvestido;
}

valorTotalJuros (10000, 1000, 10, 1);

function valorTotalJuros (valorInicial, valorMensal, tempo, taxa){
    i = 0;
    saldo = valorInicial;
    if(tempo = mensal){
       for(i == 0; i < tempo; i++) {
            saldo = saldo * taxa + valorMensal + saldo;
        }
    valorTotalJuros = saldo - ( valorInicial + valorMensal * tempo ) ;
    } else{
        for(i == 0; i < tempo*12; i++) {
            saldo = saldo * taxa + valorMensal + saldo;
       }
        valorTotalJuros = saldo - ( valorInicial + valorMensal * tempo* 12 ) ;
    }
    console.log(valorTotalJuros);
    return valorTotalJuros;
}


function impostoRenda (valorInicial, valorMensal, tempo, taxa) {
    if (tempo = mensal){
        dias = tempo * 30;
    } else {
        dias = tempo * 12 * 30;
    }

    if( dias <= 180){
        impostoRenda = valorTotalJuros(valorInicial, valorMensal, tempo, taxa) * 0.225;
    } if (dias >= 181 && dias <= 360) {
        impostoRenda = valorTotalJuros(valorInicial, valorMensal, tempo, taxa) * 0.2;
    } if (dias >= 361 && dias <= 720){
        impostoRenda = valorTotalJuros(valorInicial, valorMensal, tempo, taxa) * 0.175;
    } if (dias > 720){
        impostoRenda = valorTotalJuros(valorInicial, valorMensal, tempo, taxa) * 0.15;
    }
}

function calculoRedimento(valorInicial, valorMensal, tempo, taxa){
    rendimento = valorTotalInvestido (valorInicial, valorMensal, tempo) + valorTotalJuros (valorInicial, valorMensal, tempo, taxa) - impostoRenda (valorInicial, valorMensal, tempo, taxa) 
    return rendimento;
}