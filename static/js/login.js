var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");

// move the div itens to register
function registerMove(){
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";    
}

// move the div itens to login
function loginMove(){
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0";    
}

function login(){
    let a = $("form").serializeArray();
    let values = Object.values(a[0]); 
    console.log(values[1]);
    console.log(Object.keys(a[0]));
};

function register(){
    var regName = document.getElementById("regName");
    var regPass = document.getElementById("regPass");
    var regEmail = document.getElementById("regEmail");
};