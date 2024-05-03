from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, MetaData, Table, text




DATABASE_URL = "postgresql://postgres:123@localhost/xps_study"
engine = create_engine(DATABASE_URL)

app = Flask(__name__)
CORS(app)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    if username == 'admin' and password == 'admin':  # Essas seriam suas credenciais de verificação
        return jsonify({'message': 'Login Successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/turma/cadastro', methods=['POST'])
def turma():
    data = request.get_json()
    classname = data.get('className')
    description = data.get('description')
    number = data.get('number')
    try:
        with engine.connect() as connection:
            sql_string = text(f"""INSERT INTO classes (class_name, class_description, class_number, creation_date) VALUES
                        ('{classname}', '{description}', {number}, '2024-05-02 20:00:00');""")
            result = connection.execute(sql_string)
            connection.commit()
            connection.close()
        return jsonify({'message': 'Login Successful'}), 200      
    except Exception as e:
        print(str(e))
        return jsonify({'message': str(e)}), 401


if __name__ == '__main__':
    app.run(debug=True)
