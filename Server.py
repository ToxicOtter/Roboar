import flask
import os

app = flask.Flask(__name__)
app.config["DEBUG"] = True

import Database


#########################################################Front-End Routes#######################################
@app.route('/')
def home():
    return flask.render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return flask.render_template('dashboard.html')

@app.route('/login')
def login():
    return flask.render_template('login.html')

###################### to solve problem with browser cache #########################
@app.context_processor
def override_url_for():
    return dict(url_for=dated_url_for)

def dated_url_for(endpoint, **values):
    if endpoint == 'static':
        filename = values.get('filename', None)
        if filename:
            file_path = os.path.join(app.root_path,
                                 endpoint, filename)
            values['q'] = int(os.stat(file_path).st_mtime)
    return flask.url_for(endpoint, **values)

#########################################################LOGIN#######################################




@app.route("/login_user",methods=["POST"])
def login_user():

    data = flask.request.json
    print(type(data))

    response = {}


    #Check if the user exists
    if(Database.exists("User","Name",data["Name"])):

        #Then checks if the password matches
        if(data["Password"]==Database.get_pass(data["Name"])):

            response["Code"] = 1
            response["Message"] = "Login bem sucedido!"
        else:
            response["Code"] = 2
            response["Message"] = "Senha incorreta"
    
    else:
        response["Code"] = 0
        response["Message"] = "Usuário inexistente, faça o registro"


    return response


@app.route("/register_user",methods=["POST"])
def register_user():
    data = flask.request.json

    response = {}
    #Checks if it's a valid input


    #Checks if the name already exists, if not registers
    if(not Database.exists("User","Name",data["Name"]) ):

        Database.insert_table("User",[data["Name"],data["Password"]])
        response["Code"] = 1
        response["Message"] = "Registro bem-sucedido, faça o login"

    else:
        response["Code"] = 0
        response["Message"] = "Nome de usuário indisponível"
    
    return flask.jsonify(response)


#########################################################GET#######################################

@app.route("/data/<table>")
def _return_data(table):

    args = table.split(";")

    if(len(args)>1):
        rows = 0
        order = 0
        for a in range(len(args)):
            if   args[a]=='+':
                order = 1
            elif args[a]=='-':
                order = 2
            elif args[a].isnumeric():
                rows = int(args[a])
        return flask.jsonify(Database.get_table(args[0],order=order,rows=rows))
                 
    else:
        return flask.jsonify(Database.get_table(table))

#########################################################POST#######################################


@app.route("/upload/json",methods=["POST"])
def _insert_json():
    data = flask.request.json
    print(type(data))
    values = []
    for key,value in data["Values"].items():
        print(f"Key:{key} Value:{value} Type:{type(value)}")
        values.append(value)

    Database.insert_table(data["Table"],values)
    return "JSON IS COOL!"

@app.route("/upload/<table>:<value>")
def _insert(table,value):
    values = ["10/10"]
    for i in value.split(';'):
        values.append(int(i))
    Database.insert_table(table,values)
    print(values)

    return "Sucess upload"




app.run()

########################################################################################################

#http://127.0.0.1:5000/upload/generic:3131231;31231231 Insert example
#http://127.0.0.1:5000/data/generic                    Retrieve example