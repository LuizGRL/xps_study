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
    
class Alunoxturma(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_aluno = db.Column(db.Integer)
    id_turma = db.Column(db.Integer)

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.String(100), nullable=False)
    imagem = db.Column(db.LargeBinary)

  
class ItemAluno(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_aluno = db.Column(db.Integer)
    id_item = db.Column(db.Integer)

class ItemAtividade(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_atividade = db.Column(db.Integer)
    id_item = db.Column(db.Integer)

class Atividade(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.String(400), nullable=False)
    pontos = db.Column(db.Integer)
    codigo = db.Column(db.Integer,unique=True)
    anexo =db.Column(db.LargeBinary)
    item = db.Column(db.Integer)
    turma = db.Column(db.Integer)

class AtividadeTurma(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_atividade = db.Column(db.Integer)
    id_turma = db.Column(db.Integer)

class Resposta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_atividade = db.Column(db.Integer)
    matricula = db.Column(db.Integer)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.String(400), nullable=False)
    anexo = db.Column(db.LargeBinary)
    aprovado = db.Column(db.String(1))




   

