import flask
import os
app = flask.Flask(__name__)
app.config["DEBUG"] = True


#########################################################Front-End Routes#######################################
@app.route('/')
def home():
    return flask.render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return flask.render_template('dashboard.html')


#########################################################Data Routes#######################################

@app.route('/_get_data/', methods=['POST'])
def _get_data():
    myList = ["1","2","3","4"]
    return flask.jsonify({'data': flask.render_template('response.html', myList=myList)})

######## to solve problem with browser cache ############
@app.context_processor
def override_url_for():
    return dict(url_for=dated_url_for)

def dated_url_for(endpoint, **values):
    if endpoint == 'static':
        filename = values.get('filename', None)
        if filename:
            file_path = os.path.join(app.root_path, endpoint, filename)
            values['q'] = int(os.stat(file_path).st_mtime)
    return flask.url_for(endpoint, **values)

app.run()