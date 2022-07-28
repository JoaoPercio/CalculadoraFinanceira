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
    document.getElementById('valorTotalInvestidoP').innerHTML =  deFloatParaMoeda.format(valorTotalInvestidoR);
}

function valorTotalJuros (valorInicial, valorMensal, tempo, taxa, tempoInvestido, tempoRendimento){
    
    i = 0;
    window.valorTotalJurosR = 0.00;
    let saldo = valorInicial;
    rend= 0.0;

    if(tempoInvestido == 1){
         // funcional | Rendimento mensal | Periodo Mensal
         for(i == 0; i <= tempo; i++) { 
                rend= taxa * saldo;
               valorTotalJurosR= valorTotalJurosR + rend;
               saldo= saldo + valorMensal+rend;
            } 
        
           

    } else if (tempoInvestido == 2){ // periodo anual
        for(i == 0; i <= tempo*12; i++) { 
            rend= taxa * saldo;
            valorTotalJurosR= valorTotalJurosR + rend;
            saldo= saldo + valorMensal+rend;
            } 
        
           
        }
    document.getElementById('valorTotalJurosP').innerHTML =  deFloatParaMoeda.format(valorTotalJurosR);
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

    document.getElementById('valorImpostoRendaP').innerHTML =  deFloatParaMoeda.format(impostoRendaR);
}

function calculoRedimento(){
    rendimento = valorTotalInvestidoR + valorTotalJurosR - impostoRendaR;
    document.getElementById('ValorTotalFinalP').innerHTML = deFloatParaMoeda.format(rendimento);
}

function chamarCalculo(){
    // pega os valores dos inputs
    let valorInicial = document.getElementById('valorInicial').value;
    valorInicial=viraNormal(valorInicial)
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

    console.log("TempoInvestido: " + tempoInvestido);
}
function drawChart() {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Investimento');
    data.addColumn('number', 'rendimento');
    data.addColumn('number', 'Investimento Total');
   

    data.addRows([
      [1,  37.8, 1 ],
      [2,  30.9, 2],
      [3,  25.4, 3],
      [4,  11.7, 4],
      [5,  11.9, 5],
      [6,   8.8, 6],
      [7,   7.6, 7],
      [8,  12.3, 8],
      [9,  16.9,9],
      [10, 12.8, 10],
      [11,  5.3, 11 ],
      [12,  6.6, 12],
      [13,  4.8, 13 ],
      [14,  4.2, 14]
    ]);

    var options = {
      chart: {
        title: 'Investimento',
        
      },
      width: 600,
      height: 500,
      axes: {
        x: {
          0: {side: 'top'}
        }
      }
    };

    var chart = new google.charts.Line(document.getElementById('line_top_x'));

    chart.draw(data, google.charts.Line.convertOptions(options));
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
var deFloatParaMoeda = new Intl.NumberFormat('pt-BR', {
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