from . import db  

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    sobrenome = db.Column(db.String(100), nullable=False)
    cpf = db.Column(db.String(100), unique=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    telefone = db.Column(db.String(100))
    role = db.Column(db.String(100))
    matricula = db.Column(db.String(100))
    senha = db.Column(db.String(100), nullable=False)

class Turma(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.String(100), nullable=False)
    codigo = db.Column(db.String(100), unique=True)
 


   

