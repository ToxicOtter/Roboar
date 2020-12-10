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
    
    $.ajax({
        type: "POST",
        url: "/login_user",
        data: JSON.stringify(credentials),
        contentType: "application/json",
        success: function(resp){
            test(Object.entries(resp));
        }
    });
    
    function test(result){
        let loginPara = document.getElementById("loginPara");
        let alert = document.getElementById("alertLogin");

        if (result[0][1] == 0){
            loginPara.innerHTML = String(result[1][1]);
            alert.style.display = "Block";
        } else if (result[0][1] == 1){
            loginPara.innerHTML = String(result[1][1]);
            alert.style.backgroundColor = "rgba(11, 250, 51, 0.5)";
            alert.style.display = "Block";
            setTimeout(redirect(),500);

            function redirect(){
                window.location = "http://roboaranalytics.pythonanywhere.com";
            };
        } else if (result[0][1] == 2){
            loginPara.innerHTML = String(result[1][1]);
            alert.style.display = "Block";
        }
    };
};

function register(){
    let regName = document.getElementById("regName").value;
    //let regEmail = document.getElementById("regEmail").value;
    let regPass = document.getElementById("regPass").value;

    let credentials = {"Name":regName,"Password":regPass};
    
    $.ajax({
        type: "POST",
        url: "/register_user",
        data: JSON.stringify(credentials),
        contentType: "application/json",
        success: function(resp){
            test(Object.entries(resp));
        }
    });

    function test(result){
        let alert = document.getElementById("alertRegister");
        let regPara = document.getElementById("regPara");

        if (result[0][1] == 0){
            regPara.innerHTML = String(result[1][1]);
            alert.style.backgroundColor = "rgba(250,11,11,.5)";
            alert.style.display = "Block";
        } else if (result[0][1] == 1){
            regPara.innerHTML = String(result[1][1]);
            alert.style.backgroundColor = "rgba(11, 250, 51, 0.5)";
            alert.style.display = "Block";
        }
    };
};

const togglePassword = document.getElementById("eyeLog");
const password = document.getElementById("loginPass");

togglePassword.addEventListener('click', function(e){
    //toggle the type atribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type',type);
    //toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

const toggleReg = document.getElementById("eyeReg");
const passReg = document.getElementById("regPass");

toggleReg.addEventListener('click', function(e){
    //toggle the type atribute
    const tipo = passReg.getAttribute('type') === 'password' ? 'text' : 'password';
    passReg.setAttribute('type',tipo);
    //toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

const remeber = document.getElementById("rememberPassword");
remeber.addEventListener('change',function(){
    if(this.checked){
        var fields = document.querySelectorAll('input[type="password"]');
        for (var i = 0; i < fields.length; i++) {
            fields[i].autocomplete="on";
        };
    };
});