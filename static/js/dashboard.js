$(document).ready(function(){
    //o codigo desse bloco é executado após o documento html ser carregado
    const userPath = document.getElementById("userName"); //recebe o caminho do nome do usuario
    userPath.innerHTML = "Bem vindo, " + localStorage.getItem("Name") + "!"; //atualiza o nome do usuario pelo salvo no localStorage

    //a variavel userData cria uma url, string, com valores imutaveis concatenados ao nome do usuario que esta salvo no localStorage
    const userData = "http://127.0.0.1:5000/data/" + localStorage.getItem("Name") + "/Temperature";
    let temperatureData = []; //temperatureData cria um array em branco para guardar os dados do sensor de temperatura

    $(function() {
        setTime(); //chama a função setTime pela primeira vez
        function setTime() {
            $.ajax({
                type: "GET",
                url: userData, //usa a variável userData como url
                dataType: 'json',
                success: function(data) {
                    temperatureData = Object.entries(data); //adiciona os valores de temperatura à variavel temperatureData 
                    actualize(temperatureData); //chama a função de atualizar div para os dados em tempo real
                }
            });
            function actualize(temperatureData){
                //funcão recebe os dados do sensor
                if (temperatureData.length <=0){
                    //se a quantidade de itens for igual ou menor a 0, as divs mostram a string "Sem Valor" 
                    $('#data1').html("Sem valor");
                    $('#data2').html("Sem valor");    
                } else {
                    //se a quantidade de itens for maior que 0, as divs mostram o valor mais recente salvo na variavel
                    var otherstring = Math.floor(Math.random() * 10);
                    setTimeout(setTime, 3000); //chama a função setTime a cada 3s (3000ms)
                    $('#data1').html(String(temperatureData[0][1][1])); 
                    $('#data2').html(otherstring);
                };
            };
        };
    });
    getDat(); //chama a função getDat, que vai resultar por fim na lista e nos graficos
});

function getDat(){
    let temperatureData
    //assim como no bloco acima, a variavel userData cria uma url, string, com valores imutaveis concatenados ao nome do usuario que esta salvo no localStorage
    const userData = "http://127.0.0.1:5000/data/" + localStorage.getItem("Name") + "/Temperature";
    $.ajax({
        type: "GET",
        url: userData,
        dataType: 'json',
        success: function(data){
            temperatureData = Object.entries(data); //adiciona os valores do sensor na variavel temperatureData
            avaliaDados(temperatureData); //chama a função avaliaDados, passando os dados como parametro, essa vai avaliar a quantidade de valores da array e tomar os procedimentos seguintes
        }
    }); 
};

function avaliaDados(temperatureData){
    let i; //cria a variavel i para o processamento
    if (temperatureData.length <= 1){
        //se a quantidade de dados forem menores ou iguais a 1, é criada uma imagem para informar ao usuario que não tem dados suficientes
        console.log("eae0");
    } else {
        //caso a quantidade de dados for maior que 1
        if (temperatureData.length >= 10){
            //se forem maiores que 10, o i valerá 9, ja que precisamos de 10 valores para o grafico e os mesmos começam a contar de 0 a 9
            i = 9;
            chart(temperatureData,i); //função que cria grafico, recebe parametro dos dados e da variavel i
            listo(temperatureData,i); //função que cria lista, recebe parametro dos dados e da variavel i
        } else {
            //se forem menores que 10, a variavel i recebera a quantidade de index da array
            i = Number(temperatureData.length);
            chart(temperatureData,i); //função que cria grafico, recebe parametro dos dados e da variavel i
            listo(temperatureData,i); //função que cria lista, recebe parametro dos dados e da variavel i
        };
    };
};

function chart(temperatureData,i){
    //função que cria o grafico, recebe os dados e a variavel i com o tanto de valores da array
    //variaveis criadas para separar o horario que o dado foi coletado do valor em si
    let temperatureTempo = [];
    let temperatureValor = [];

    //o caminho do canvas onde vai o grafico é chamado de contexto
    var ctx = document.getElementsByClassName('line-chart');

    //para separar os dados nas duas variaveis, foi usado um laço for, que pega os dados do mais antigo para o mais recente, de acordo com o numero de i
    for (i; i >= 0; --i){
        temperatureTempo.push(String(temperatureData[Number(i)][1][0]));
        temperatureValor.push(String(temperatureData[Number(i)][1][1]));
    };
    
    //o framework do grafico funciona com 3 aspectos: Type (tipo do grafico), data (dados do grafico) e options (configurações gerais)
    var chartGraph = new Chart(ctx, {
        type: 'line', 
        data: {
            labels: temperatureTempo, //pega a variavel como as labels do grafico
            datasets: [{
                label: "Indice de temperatura do ambiente", //define o titulo do grafico
                data: temperatureValor, //pega a variavel como dados do grafico
                borderWidth: 1, //grossura da borda
                borderColor: 'rgba(77,176,253,0.75)', //cor da borda
                backgroundcolor: 'transparent', //customização para o fundo
            }]
        },
    });
};

//bloco que cria a tabela
function listo(temperatureData,i){
    let listContainer = document.getElementById("listDiv"); //recebe o caminho da div, o container da lista
    let listName = document.createElement("h2"); //cria o titulo da lista
    let listElement = document.createElement("ul"); //cria a lista

    listName.appendChild(document.createTextNode("Tabela")); //define o titulo da tabela

    //cabeçalho da lista
    let listHeader = document.createElement("li"); //cria o container do cabeçalho
    let listH1 = document.createElement("div"); //cria o titulo 1 do cabeçalho
    let listH2 = document.createElement("div"); //cria o titulo 2 do cabeçalho
    listHeader.className += "table-header"; //adiciona a classe para o container
    listH1.className += "col col-1"; //adiciona classe para o titulo 1 do cabeçalho
    listH2.className += "col col-2"; //adiciona classe para o titulo 2 do cabeçalho
    listH1.appendChild(document.createTextNode("Data")); //adiciona o primeiro titulo
    listH2.appendChild(document.createTextNode("Temperatura (em ºC)")); //adiciona o segundo titulo

    //distribuir classes e ids
    listContainer.style.display = "none"; //esconde a lista
    listContainer.className += "container"; //adiciona a classe ao container da lista
    listContainer.id += "lista"; //adiciona o id para o container da lista
    listElement.className += "responsive-table"; //adiciona a classe à lista, para torna-la responsiva

    document.getElementsByTagName('body')[0].appendChild(listContainer); //adiciona o container (div) ao body
    listContainer.appendChild(listName); //adiciona o titulo (h2) ao container (div)
    listContainer.appendChild(listElement); //adiciona a lista (ul) ao container (div)
    listElement.appendChild(listHeader); //adiciona o cabeçalho da lista (li) à lista (ul)
    listHeader.appendChild(listH1); //adiciona o primeiro titulo do cabeçalho (div) ao cabeçalho (li)
    listHeader.appendChild(listH2); //adiciona o segundo titulo do cabeçalho (div) ao cabeçalho (li)

    //adicionando a lista à pagina, de acordo com o numero de i
    for (i; i >= 0; --i){
        let listItem = document.createElement("li"); //cria a linha
        let listDiv1 = document.createElement("div"); //cria o primeiro elemento da linha
        let listDiv2 = document.createElement("div"); //cria o segundo elemento da linha


        //adiciona os valores
        let value1 = temperatureData[i][1][0]; //seleciona todos o index 0 do primeiro item da array i
        let value2 = temperatureData[i][1][1]; //seleciona todos o index 1 do primeiro item da array i
        listDiv1.appendChild(document.createTextNode(String(value1))); //adiciona o valor ao primeiro elemento
        listDiv2.appendChild(document.createTextNode(String(value2))); //adiciona o valor ao segundo elemento
        
        listDiv1.className = "col col-1"; //da a classe ao primeiro elemento da linha
        listDiv2.className = "col col-2"; //da a classe ao segundo elemento da linha
        listItem.className += "table-row"; //da a classe à linha
        //adiciona à pagina
        listItem.appendChild(listDiv1); //adiciona o primeiro elemento (div) à linha (li)
        listItem.appendChild(listDiv2); //adiciona o segundo elemento (div) à linha (li)
        listElement.appendChild(listItem); //adiciona a linha (li) à lista (ul)
    };
}; 

//controles da nav bar (o que será mostrado de acordo com o botão apertado)
//caminho do dado e do grafico
const dataArea = document.getElementById("data-area"); //area dos dados em tempo real
const graphArea = document.getElementById("chart"); //area do grafico
const tableArea = document.getElementById("listDiv"); //area da tabela

//controle da area dos dados
const data = document.getElementById("data-show"); //recebe o caminho do botão dos dados
data.addEventListener('click', function(){ 
    //adiciona um ouvinte de clique ao botão
    //dados aparece, lista e grafico somem
    dataArea.style.display = "block"; 
    graphArea.style.display = "none";
    tableArea.style.display = "none";
});

//controle da area do grafico e tabela
const temperatureButton = document.getElementById("temperatureId");
temperatureButton.addEventListener('click', function(){
    //adiciona um ouvinte de clique ao botão
    //dados somem, lista e grafico aparecem
    dataArea.style.display = "none";
    graphArea.style.display = "block";
    tableArea.style.display = "block";
});

// SIDEBAR
// show navbar
const showNavbar = (toggleId, navId, bodyId, headerId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId) 
    //validate that all variables exist
    if(toggle && nav && bodypd && headerpd){
        toggle.addEventListener('click', ()=>{
            //show navbar
            nav.classList.toggle('show')
            //change icon
            toggle.classList.toggle('bx-x')
            //add padding to body
            bodypd.classList.toggle('body-pd')
            //add padding to header
            headerpd.classList.toggle('body-pd')
        })
    }
};

showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header');

//linl-active
const linkColor = document.querySelectorAll('.nav__link');
function colorLink(){
    if(linkColor){
        linkColor.forEach(l => l.classList.remove('active'))
        this.classList.add('active')
    }
};

linkColor.forEach(l => l.addEventListener('click', colorLink));