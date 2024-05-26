from flask import Blueprint, jsonify, request
from . import db
from app.model import Item, Users, Itemaluno
import base64


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
def pesquisar_item(id):
    item = Item.query.filter_by(id=id).first()
    image_data = item.imagem

    image_base64_encoded = base64.b64encode(image_data).decode('utf-8')

    if item:
          return jsonify({
            "nome": item.nome,
            "descricao": item.descricao,
            "imagem": image_base64_encoded,
            "id":item.id
        }), 200
    else:
        return jsonify({"error": "Item não encontrado"}), 404

@item_blueprint.route('/editar/<id>', methods=['PUT'])
def editar_item(id):
    item = Item.query.filter_by(id=id).first()
    if item:
        try:
            nome = request.json.get('nome', None)
            descricao = request.json.get('descricao', None)
            imagem = request.json.get('imagem')
            if not nome or not descricao or not imagem:
                return jsonify(msg="Nome, descrição e imagem são obrigatórios"), 400
            if ',' in imagem:
                header, encoded = imagem.split(',', 1)
                dados_imagem = base64.b64decode(encoded)
            else:
                dados_imagem = base64.b64decode(imagem)
            item.nome = nome
            item.descricao = descricao
            item.imagem = dados_imagem

            db.session.commit()
            return jsonify(msg="Item editado com sucesso!"), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 404

    else:
        return jsonify({"error": "Item não encontrada"}), 404
    
@item_blueprint.route('/ver/<matricula>', methods=['GET'])
def ver_itens_usuario(matricula):
    try:
        user = Users.query.filter_by(matricula=matricula).first()
        if not user:
            return jsonify({"error": "Usuário não encontrado"}), 404

        itens = Itemaluno.query.filter_by(id_aluno=user.id).all()
        itens_list = []
        for item_aluno in itens:
            item = Item.query.filter_by(id=item_aluno.id_item).first()
            if item:
                itens_list.append({
                    "id": item.id,
                    "nome": item.nome,
                    "descricao": item.descricao,
                    "imagem": base64.b64encode(item.imagem).decode('utf-8')
                })
        
        return jsonify(itens_list), 200
    except Exception as e:
        print(f"Erro ao buscar itens do usuário: {e}")
        return jsonify({"error": "Erro ao buscar itens do usuário"}), 500

