$(document).ready(function(){
    var temperatureData = [];
    // atualize div
    $(function() {
        setTime();
        function setTime() {
            $.ajax({
                type: "GET",
                url: "http://127.0.0.1:5000/data/Leonardo/Temperature",
                dataType: 'json',
                success: function(data) {
                    temperatureData = Object.entries(data);
                    actualize(temperatureData);
                }
            });
            function actualize(temperatureData){
                var otherstring = Math.floor(Math.random() * 10);
                setTimeout(setTime, 3000);
                $('#data1').html(String(temperatureData[0][1][1]));
                $('#data2').html(otherstring);
            };
        };
    });
    getDat();
});

nameFunction();
function nameFunction(){
    const userPath = document.getElementById("userName");
    var userName = localStorage.getItem("Name");
    userPath.innerHTML = "Bem vindo, " + userName + "!";
};


var temperatureData = [];

//GET DATA FROM JSON https://cors-anywhere.herokuapp.com/http://roboaranalytics.pythonanywhere.com
function getDat(){
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/data/Leonardo/Temperature",
        dataType: 'json',
        success: function(data) {
            temperatureData = Object.entries(data);
            chart(temperatureData);
            listMaker(temperatureData);
        }
    }); 
};

//nav bar controls
//data area and graph paths
const dataArea = document.getElementById("data-area");
const graphArea = document.getElementById("chart");
const tableArea = document.getElementById("listDiv");

//data area control
const data = document.getElementById("data-show");
data.addEventListener('click', function(){
    dataArea.style.display = "block";
    graphArea.style.display = "none";
    tableArea.style.display = "none";
});

//temperature control
const temperatureButton = document.getElementById("temperatureId");
temperatureButton.addEventListener('click', function(){
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

//CHARTS
function chart(temperatureData){
    //to get values
    //temperatureData is received by ajax in the ready function
    //sensor date
    let temperatureV1 = [];
    let temperatureV2 = [];
    let i;

    if (temperatureData.length >= 10){
        i=9;
    } else {
        i = Number(temperatureData.length); 
    };

    for (i; i >= 0; --i){
        temperatureV1.push(String(temperatureData[Number(i)][1][0]));
        temperatureV2.push(String(temperatureData[Number(i)][1][1]));
    };

    // everytime we work with canvas, we need to set a context, in this case it's 2D (default)
    var ctx = document.getElementsByClassName('line-chart');

    //the framework work with 3 aspects: Type (type of chart), data (data of chart) and options (general configurations)
    var chartGraph = new Chart(ctx, {
        type: 'line', //set the type of chart
        //set data of char
        data: {
            labels: temperatureV1,
            datasets: [{
                label: "Indice de temperatura do ambiente",
                data: temperatureV2,
                borderWidth: 1,
                borderColor: 'rgba(77,176,253,0.75)',
                backgroundcolor: 'transparent',
            }]
        },
    });
};
    
//TABLE
function listMaker(temperatureData){
    //let listContainer = document.createElement("div"); //create list container
    let listContainer = document.getElementById("listDiv");
    let listName = document.createElement("h2"); //create the list title
    let listElement = document.createElement("ul"); //create list element
    let i; // create a variable to for

    listName.appendChild(document.createTextNode("Tabela")); //define title name

    //list header
    let listHeader = document.createElement("li"); //create list header container
    let listH1 = document.createElement("div"); //create list header title 1
    let listH2 = document.createElement("div"); //create list header title 2
    listHeader.className += "table-header"; //add class to list header
    listH1.className += "col col-1"; //add class to list header 1
    listH2.className += "col col-2"; //add class to list header 2
    listH1.appendChild(document.createTextNode("Data")); //add the first list header title
    listH2.appendChild(document.createTextNode("Temperatura (em ºC)")); //add the second list header title

    //give classes and ids
    listContainer.style.display = "none";
    listContainer.className += "container"; 
    listContainer.id += "lista";
    listElement.className += "responsive-table";

    document.getElementsByTagName('body')[0].appendChild(listContainer); //add the container (div) to body
    listContainer.appendChild(listName); //add the title (h2) to container (div)
    listContainer.appendChild(listElement); //add the list (ul) to container (div)
    listElement.appendChild(listHeader); //add the list header (li) to the list (ul)
    listHeader.appendChild(listH1); //add the first list header title (div) to the header (li)
    listHeader.appendChild(listH2); //add the second list header title (div) to the header (li)

    if (temperatureData.length >= 10){
        i=9;
    } else {
        i = Number(temperatureData.length); 
    };

    //add to page
    for (i; i >= 0; --i){
        let listDiv1 = document.createElement("div"); //create the first element of the row
        let listDiv2 = document.createElement("div"); //create the second element of the row
        let listItem = document.createElement("li"); //create the row


        //give value
        let value1 = temperatureData[i][1][0]; //select all 0 index of the first item of the i array
        let value2 = temperatureData[i][1][1]; //select all 1 index of the first item of the i array
        listDiv1.appendChild(document.createTextNode(String(value1))); //add the value to the first element
        listDiv2.appendChild(document.createTextNode(String(value2))); //add the value to the second element
        
        listDiv1.className = "col col-1"; //give class to the first element
        listDiv2.className = "col col-2"; //give class to the second element
        listItem.className += "table-row"; //give class to the row
        //add to page
        listItem.appendChild(listDiv1); //add the first element (div) to the row (li)
        listItem.appendChild(listDiv2); //add the second element (div) to the row (li)
        listElement.appendChild(listItem); //add the row (li) to the list (ul)
    };
}; 