from flask import Blueprint, jsonify, request
from . import db
from app.model import Item, ItemAluno, Users
import base64
import tempfile
import os


item_blueprint = Blueprint('item', __name__)


@item_blueprint.route('/cadastro', methods=['POST'])
def cadastrar_item():    
    try:
        nome = request.json.get('nome')
        descricao = request.json.get('descricao')
        imagem = request.json.get('imagem')
        if not nome or not descricao or not imagem:
            return jsonify(msg="Nome, descrição e imagem são obrigatórios"), 400
        if ',' in imagem:
            header, encoded = imagem.split(',', 1)
            dados_imagem = base64.b64decode(encoded)
        else:
            dados_imagem = base64.b64decode(imagem)

        item = Item(nome=nome, descricao=descricao, imagem=dados_imagem)
        db.session.add(item)
        db.session.commit()
        return jsonify(msg="Item cadastrado com sucesso!"), 200
    except Exception as e:
        print(f"Erro no cadastro do Item: {e}")
        return jsonify(msg="Erro no cadastro do Item"), 400

@item_blueprint.route('/pesquisar/<id>', methods=['GET'])
def pesquisar_turma(id):
    item = Item.query.filter_by(id=id).first()
    image_data = item.imagem

    image_base64_encoded = base64.b64encode(image_data).decode('utf-8')

    if item:
          return jsonify({
            "nome": item.nome,
            "descricao": item.descricao,
            "imagem": image_base64_encoded
        }), 200
    else:
        return jsonify({"error": "Item não encontrado"}), 404

@item_blueprint.route('/editar/<codigo>', methods=['PUT'])
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
    

@item_blueprint.route('/associar', methods=['POST'])
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

