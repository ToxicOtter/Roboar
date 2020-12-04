var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");

// move the div itens to register
function register(){
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";    
}

// move the div itens to login
function login(){
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0";    
}