var temperatureData = [];

$(document).ready(function(){
    //GET DATA FROM JSON
    function getDat(){
        $.ajax({
            type: "GET",
            url: "https://cors-anywhere.herokuapp.com/http://roboaranalytics.pythonanywhere.com/data/Temperature",
            dataType: 'json',
            success: function(data) {
                //$('#teste').text(data);
                temperatureData = Object.entries(data);
                chart(temperatureData);
                listMaker(temperatureData);
            }
        }); 
    };
    getDat();
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
    var temperatureV1 = [String(temperatureData[9][1][0]),String(temperatureData[8][1][0]),String(temperatureData[7][1][0]),String(temperatureData[6][1][0]),String(temperatureData[5][1][0]),String(temperatureData[4][1][0]),String(temperatureData[3][1][0]),String(temperatureData[2][1][0]),String(temperatureData[1][1][0]),String(temperatureData[0][1][0])];
    //sensor data
    var temperatureV2 = [Number(temperatureData[9][1][1]),Number(temperatureData[8][1][1]),Number(temperatureData[7][1][1]),Number(temperatureData[6][1][1]),Number(temperatureData[5][1][1]),Number(temperatureData[4][1][1]),Number(temperatureData[3][1][1]),Number(temperatureData[2][1][1]),Number(temperatureData[1][1][1]),Number(temperatureData[0][1][1])];
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
};

//TABLE
function listMaker(temperatureData){
    let listData = temperatureData; //to receive data
    let listContainer = document.createElement("div"); //create list container
    let listName = document.createElement("h2"); //create the list title
    let listElement = document.createElement("ul"); //create list element
    let numberOfList = listData.length; //count list elements
    let i; // create a variable to for

    listName.appendChild(document.createTextNode("Tabela")); //define title name

    //list header
    let listHeader = document.createElement("li"); //create list header container
    let listH1 = document.createElement("div"); //create list header title 1
    let listH2 = document.createElement("div"); //create list header title 2
    listHeader.className += "table-header"; //add class to list header
    listH1.className += "col col-1"; //add class to list header 1
    listH2.className += "col col-2"; //add class to list header 2
    listH1.appendChild(document.createTextNode("Temperatura")); //add the first list header title
    listH2.appendChild(document.createTextNode("Valor")); //add the second list header title


    //give classes and ids
    listContainer.className += "container"; 
    listElement.className += "responsive-table";
   
    document.getElementsByTagName('body')[0].appendChild(listContainer); //add the container (div) to body
    listContainer.appendChild(listName); //add the title (h2) to container (div)
    listContainer.appendChild(listElement); //add the list (ul) to container (div)
    listElement.appendChild(listHeader); //add the list header (li) to the list (ul)
    listHeader.appendChild(listH1); //add the first list header title (div) to the header (li)
    listHeader.appendChild(listH2); //add the second list header title (div) to the header (li)

    //add to page
    for (i =0; i < numberOfList; ++i){
        let listDiv1 = document.createElement("div"); //create the first element of the row
        let listDiv2 = document.createElement("div"); //create the second element of the row
        let listItem = document.createElement("li"); //create the row


        //give value
        let value1 = listData[i][1][0]; //select all 0 index of the first item of the i array
        let value2 = listData[i][1][1]; //select all 1 index of the first item of the i array
        
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

/*$(function() {
    setTime();
    function setTime() {
       var date = new Date().getTime();
       var string = "Timestamp: "+date;
       setTimeout(setTime, 3000);
    }
});*/