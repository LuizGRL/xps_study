from flask import Blueprint, jsonify, request
from . import db
from app.model import Turma

turma_blueprint = Blueprint('turma', __name__)


@turma_blueprint.route('/cadastro', methods=['POST'])
def cadastrar_turma():    
    try:
        nome = request.json.get('nome', None)
        descricao = request.json.get('descricao', None)
        codigo = request.json.get('codigo', None)
        
       
        turma = Turma(nome=nome,descricao=descricao, codigo=codigo)
        db.session.add(turma)
        db.session.commit()
        return jsonify(msg="Turma cadastrado com sucesso!"), 200
    except Exception as e:
        return jsonify(msg="Erro no cadastro da turma"), 200
    