from flask import Blueprint, jsonify, request
from . import db
from app.model import Turma, Alunoxturma, Users

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
    

@turma_blueprint.route('/pesquisar/<codigo>', methods=['GET'])
def pesquisar_turma(codigo):
    turma = Turma.query.filter_by(codigo=codigo).first()
    if turma:
          return jsonify({
            "nome": turma.nome,
            "descricao": turma.descricao,
            "codigo": turma.codigo,
        }), 200
    else:
        return jsonify({"error": "Turma não encontrado"}), 404

@turma_blueprint.route('/editar/<codigo>', methods=['PUT'])
def editar_turma(codigo):
    turma = Turma.query.filter_by(codigo=codigo).first()
    if turma:
        try:
            nome = request.json.get('nome', None)
            descricao = request.json.get('descricao', None)
            codigo = request.json.get('codigo', None)
     
            turma.nome = nome
            turma.descricao = descricao
            turma.codigo = codigo

            db.session.commit()
            return jsonify(msg="Turma editada com sucesso!"), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 404

    else:
        return jsonify({"error": "Turma não encontrada"}), 404
    

@turma_blueprint.route('/associar', methods=['POST'])
def associar_usuario():
    data = request.get_json()
    codigo = data.get('codigo')
    matricula = data.get('matricula')
    if not codigo or not matricula:
        return jsonify({'error': 'Código da turma e matrícula do aluno são obrigatórios'}), 400
    
    try:
        aluno = Users.query.filter_by(matricula=matricula).first()
        turma = Turma.query.filter_by(codigo = codigo).first()
        associacao = Alunoxturma(id_aluno = aluno.id, id_turma = turma.id)
        db.session.add(associacao)
        db.session.commit()
        return jsonify({'message': 'Aluno associado à turma com sucesso'}), 200
    except Exception as e:
        print(str(e))
        return jsonify({'error': f'{str(e)}'}), 400

