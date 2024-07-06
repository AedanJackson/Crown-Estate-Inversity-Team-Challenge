from flask import Flask, render_template, jsonify
from werkzeug.exceptions import abort
from wind_farms import wind_farms, proposed_wind_farms
app = Flask(__name__)


@app.route('/get_wind_farms')
def get_wind_farms():
    return jsonify(wind_farms)

@app.route('/get_proposed_wind_farms')
def get_proposed_wind_farms():
    return jsonify(proposed_wind_farms)

# routing the decorator function hello_name
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug = True)