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


//DATA FROM THE SERVER
var temperatureV1 = ["Jan","Fev","Mar","Abr","Mai"];
var temperatureV1 = ["Jan","Fev","Mar","Abr","Mai"];
var temperatureV2 = [5,4,10,4,6,6,7];

//CHARTS
// everytime we work with canvas, we need to set a context, in this case it's 2D (default)
var ctx = document.getElementsByClassName('line-chart');

//the framework work with 3 aspects: Type (type of chart), data (data of chart) and options (general configurations)
var chartGraph = new Chart(ctx, {
    type: 'line', //set the type of chart
    //set data of char
    data: {
        labels: temperatureV1,
        datasets: [{
            label: "Indice de fumaça no ambiente",
            data: temperatureV2,
            borderWidth: 1,
            borderColor: 'rgba(77,176,253,0.75)',
            backgroundcolor: 'transparent',
        }]
    }
});

/*TABLE
function generateTable(table){
    let thead = table.createTHead();
    let row = thead.insertRow();
};

let table = document.querySelector("table");
generateTable(table)

var temperature;
var requestJson = "https://cors-anywhere.herokuapp.com/http://roboaranalytics.pythonanywhere.com/data/Temperature";

var request = new XMLHttpRequest();
request.open('GET', requestJson);
request.responseType = 'json';
request.send();

request.onload = function(){
    temperature = request.response;
};

afonso = JSON.parse(temperature);
console.log(afonso);
  
var table = "";
var rows = 2;
var cols = 3;

for (var r = 0; r < rows; r++){
    table += '<tr>'
    for (var c = 1; c <= cols; c++){
        table += '<td>' + c + '</td>';
    }
    table += '</tr>'
};

document.write("<table>" + table + "</table>")
document.write(temperature)*/

function getDat(){
    $.ajax({
        type: "GET",
        url: "http://roboaranalytics.pythonanywhere.com/data/Temperature",
        dataType: 'json',
        success: function(data) {
            $('#teste').text(data[1]);
        }
    });
};
