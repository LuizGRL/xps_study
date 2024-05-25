from flask import Blueprint, jsonify, request
from . import db
from app.model import Atividade

atividade_blueprint = Blueprint('atividade', __name__)

@atividade_blueprint.route('/cadastro', methods=['POST'])
def cadastrar_atividade():    
    try:
        nome = request.form.get('nome')
        descricao = request.form.get('descricao')
        codigo = request.form.get('codigo')
        pontos = request.form.get('pontos')
        item = request.form.get('item')
        turma = request.form.get('turma')
        anexo = request.files.get('anexo')

        if not nome or not descricao or not item or not codigo or not pontos or not turma:
            return jsonify(msg="Todos os dados são obrigatorios"), 400
        
        if not anexo or not anexo.filename.endswith('.pdf'):
            return jsonify({"error": "Formato de pdf invalido"}), 400
        pdf_data = anexo.read()

        atividade = Atividade(
            nome=nome,
            descricao=descricao,
            codigo=codigo,
            pontos=pontos,
            item=item,
            turma=turma,
            anexo=pdf_data
        )
        db.session.add(atividade)
        db.session.commit()
        return jsonify(msg="Item cadastrado com sucesso!"), 200
    except Exception as e:
        print(f"Erro no cadastro do Item: {e}")
        return jsonify(msg="Erro no cadastro do Item"), 400
