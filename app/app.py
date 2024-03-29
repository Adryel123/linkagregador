#-----------------------------------------------------------------------
# Agregador de Links
#-----------------------------------------------------------------------

from flask import Flask, session, redirect, url_for, request, render_template
app = Flask(__name__)
app.secret_key = 'adryelehgay'

#-----------------------------------------------------------------------

accounts = {
    'holtzwallund': {
        'nome': 'Richard',
        'senha': '95'
    }
}

trees = {
    'holtzwallund': {
        'Instagram': 'https://www.instagram.com/holtzwallund',
        'Facebook': 'https://www.facebook.com/holtzwallund',
        'Twitter': 'https://www.twitter.com/holtzwallund',
        'Telegram': 'https://www.telegram.org/holtzwallund'
    }
}

#-----------------------------------------------------------------------

@app.route('/')
def home():
    return render_template('index.html')

#-----------------------------------------------------------------------

@app.route('/signup')
def signup():
    return render_template('signup.html')

#-----------------------------------------------------------------------

@app.route('/signup/save', methods=['POST', 'GET'])
def save_account():
    if request.method == 'POST':
        name = request.form['name']
        user = request.form['user']
        password = request.form['password']
    else:
        name = request.form['name']
        user = request.form['user']
        password = request.args.get('password')

    global accounts
    user = user.lower()
    accounts[user] = {}
    accounts[user]['nome'] = name.capitalize()
    accounts[user]['senha'] = password
    session['username'] = user
    return redirect(url_for('edit'))

#-----------------------------------------------------------------------

@app.route('/login')
def login():
    if 'username' in session:
        user = session['username']
        return redirect(url_for('edit'))
    else:
        return render_template('login.html')

#-----------------------------------------------------------------------

@app.route('/login/verification', methods=['POST', 'GET'])
def verif_login():
    if request.method == 'POST':
        user = request.form['user']
        password = request.form['password']
    else:
        user = request.args.get('user')
        password = request.args.get('password')

    if (user in accounts) and (accounts.get(user).get('senha') == password):
        session['username'] = user
        return redirect(url_for('edit'))
    else:
        return redirect(url_for('login'))

#-----------------------------------------------------------------------

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

#-----------------------------------------------------------------------

@app.route('/dashboard/')
def edit():
    if 'username' in session:
        user = session['username']
        nome = accounts[user]['nome']
        return render_template('dashboard.html')
    else:
        return redirect(url_for('login'))
    
#-----------------------------------------------------------------------

@app.route('/dashboard/save', methods=['PUT'])
def save_tree():
    return 'aaaaaaaa'

#-----------------------------------------------------------------------

@app.route('/tree/<user>')
def tree(user):
    if user in trees:
        return render_template('tree.html', user=accounts.get(user).get('nome'), links=trees[user])
    else:
        return f'Quando houver links cadastrados pra {user}, essa página exibirá.'

#-----------------------------------------------------------------------

if __name__ == '__main__':
    from livereload import Server
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    server = Server(app.wsgi_app)
    server.serve(host='localhost', port=5000)
    
#-----------------------------------------------------------------------