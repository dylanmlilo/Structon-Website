from flask import Flask, render_template


app = Flask(__name__)


@app.route("/")
def home():
    return render_template("home.html")

@app.route("/get-in-touch")
def get_in_touch():
    return render_template("get-in-touch.html")

@app.route("/who-we-are")
def who_we_are():
    return render_template("who-we-are.html")

@app.route("/what-we-do")
def what_we_do():
    return render_template("what-we-do.html")

@app.route("/projects")
def projects():
    return render_template("projects.html")

if __name__ == "__main__":
    app.run(debug=True, port=9000)