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
// everytime we work with canvas, we need to set a context, in this case it's 2D (default)
var ctx = document.getElementsByClassName('line-chart');

//the framework work with 3 aspects: Type (type of chart), data (data of chart) and options (general configurations)
var chartGraph = new Chart(ctx, {
    type: 'line', //set the type of chart
    //set data of char
    data: {
        labels: ["Jan","Fev","Mar","Abr","Mai"],
        datasets: [{
            label: "Indice de fumaça no ambiente",
            data: [5,4,10,4,6,6,7,],
            borderWidth: 1,
            borderColor: 'rgba(77,176,253,0.75)',
            backgroundcolor: 'transparent',
        }]
    }
});

