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
    let value1 = Object.values(a[0]);
    let value2 = Object.values(a[1]); 
    let userName = String(value1[1]);
    let userPass = String(value2[1]);

    let credentials = {"Name":userName,"Password":userPass};

    
    console.log(credentials)
    console.log(typeof(credentials));
    $.ajax({
        type: "POST",
        url: "/login_user",
        data: JSON.stringify(credentials),
        contentType: "application/json",
        success: function(resp){
            console.log(Object.entries(resp));
        }
    });


};

function register(){
    var regName = document.getElementById("regName");
    var regPass = document.getElementById("regPass");
    var regEmail = document.getElementById("regEmail");
};