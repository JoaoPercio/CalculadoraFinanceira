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
    document.getElementById('valorTotalInvestidoP').innerHTML =  transformaMoeda.format(valorTotalInvestidoR);
}

function valorTotalJuros (valorInicial, valorMensal, tempo, taxa, tempoInvestido, tempoRendimento){
    
    i = 0;
    window.valorTotalJurosR = 0.00;
    window.valoresJurosR = [];
    let saldo = valorInicial;
    rend= 0.0;
    

    if(tempoInvestido == 1){
         // funcional | Rendimento mensal | Periodo Mensal
         for(i == 0; i <= tempo; i++) { 
            if(i == 0){
                rend = taxa * saldo;
                valorTotalJurosR= valorTotalJurosR + rend;
                saldo = saldo + rend;
                valoresJurosR[i] = saldo;
            }else{
                rend= taxa * (saldo + valorMensal);
                valorTotalJurosR= valorTotalJurosR + rend;
                saldo= saldo + valorMensal+rend;
                valoresJurosR[i] = saldo;
            }    
        } 
        
           

    } else if (tempoInvestido == 2){ // periodo anual
        for(i == 0; i <= tempo*12; i++) { 
            if(i == 0){
                rend = taxa * saldo;
                valorTotalJurosR= valorTotalJurosR + rend;
                saldo = saldo + rend;
                valoresJurosR[i] = saldo;
            }else{
                rend= taxa * (saldo + valorMensal);
                valorTotalJurosR= valorTotalJurosR + rend;
                saldo= saldo + valorMensal+rend;
                valoresJurosR[i] = saldo;
            }
        }        
    }
    document.getElementById('valorTotalJurosP').innerHTML =  transformaMoeda.format(valorTotalJurosR);
}


function impostoRenda (tempo, tempoInvestido) {
    if(tempoInvestido == 1){
        dias = tempo * 30;
    } else if(tempoInvestido == 2){
        dias = tempo * 30 * 12;
    }
        
        window.impostoRendaR = 0;
    if( dias <= 180){
        impostoRendaR = valorTotalJurosR * (22.5/100);
    } if (dias >= 181 && dias <= 360) {
        impostoRendaR = valorTotalJurosR * (20/100);
    } if (dias >= 361 && dias <= 720){
        impostoRendaR = valorTotalJurosR * (17.5/100);
    } if (dias > 720){
        impostoRendaR = valorTotalJurosR * (15/100);
    }

    document.getElementById('valorImpostoRendaP').innerHTML =  transformaMoeda.format(impostoRendaR);
}

function calculoRedimento(){
    rendimento = valorTotalInvestidoR + valorTotalJurosR - impostoRendaR;
    document.getElementById('ValorTotalFinalP').innerHTML = transformaMoeda.format(rendimento);
}

function chamarCalculo(){
    // pega os valores dos inputs
    let valorInicial = document.getElementById('valorInicial').value;
    valorInicial = viraNormal(valorInicial)
    let valorMensal = document.getElementById('valorMensal').value;
    valorMensal=viraNormal(valorMensal)
    let taxa= document.getElementById('taxa').value;
    taxa=viraNormal(taxa)
    let tempo = document.getElementById('tempo').value;


    select = document.getElementById('inputGroupSelect02');
    let tempoInvestido = select.options[select.selectedIndex].value;


    valorTotalInvestido(valorInicial, valorMensal, tempo, tempoInvestido);
    valorTotalJuros (valorInicial,valorMensal, tempo, taxa/100, tempoInvestido);
    impostoRenda (tempo, tempoInvestido);
    calculoRedimento();
    drawChart(tempoInvestido, tempo, valorInicial, valorMensal);

    console.log("TempoInvestido: " + tempoInvestido);
}

function drawChart(tempoInvestido, tempo, valorInicial, valorMensal) {


    i = 0;
    window.tempoGrafico = [];
    window.valoresInvestidoR = [];
    let ctx = document.getElementById('grafico');
    document.getElementById("line_top_x").style.opacity = 1;


    if(tempoInvestido == 1){
        // funcional | Rendimento mensal | Periodo Mensal
        for(i == 0; i <= tempo; i++) { 
            tempoGrafico[i] = i;
            valoresInvestidoR[i] = Number(valorInicial) + Number(valorMensal)*i;
           } 
   } else if (tempoInvestido == 2){ // periodo anual
       for(i == 0; i <= tempo*12; i++) { 
        tempoGrafico[i] = tempo;
        tempoGrafico[i] = i;
        }
    }
console.log(valoresInvestidoR);
console.log("valores do juros" + valoresJurosR);
    const data = {
        labels: tempoGrafico,
        datasets: [{
            label: 'Valor Investido',
            data: valoresInvestidoR,
            backgroundColor: ['#5274D8'],
            fill: false,
            borderColor: '#5274D8',
            tension: 0.1,
        },{
            label: 'Valor com Juros',
            data: valoresJurosR,
            backgroundColor: ['#132644'],
            fill: false,
            borderColor: '#132644',
            tension: 0.1,
        }]
    };


    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            
        }
    };
    

    if (Chart.getChart("grafico")){
        Chart.getChart("grafico").destroy();
      }
    grafico = new Chart(ctx, config);
}


function formatarMoeda(moeda) {
    var elemento = moeda;
    var valor = elemento.value;

    valor = valor + '';
    valor = parseInt(valor.replace(/[\D]+/g, ''));
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");

    if (valor.length > 6) {
        valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    elemento.value = valor;
    if(valor == 'NaN') elemento.value = '';
}

function viraNormal(variable){
    if(variable ===""){
        variable=0;
    }
    variable = variable.replace("R$", "")
    variable = variable.replace(/\./g, "")
    variable = variable.replace(/\,/g,".")
    return parseFloat(variable)
}

var transformaMoeda = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

function limpar(){
    document.getElementById('ValorTotalFinalP').innerHTML = "";
    document.getElementById('valorImpostoRendaP').innerHTML = "";
    document.getElementById('valorTotalJurosP').innerHTML =  "";
    document.getElementById('valorTotalInvestidoP').innerHTML = "";
}