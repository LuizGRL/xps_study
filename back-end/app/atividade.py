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
        return jsonify(msg="Atividade cadastrada com sucesso!"), 200
    except Exception as e:
        print(f"Erro no cadastro da Atividade: {e}")
        return jsonify(msg="Erro no cadastro da Atividade"), 400
    
    



@atividade_blueprint.route('/pesquisar/<codigo>', methods=['GET'])
def pesquisar_atividade(codigo):
    atividade = Atividade.query.filter_by(codigo=codigo).first()


    if atividade:
          return jsonify({
            "nome": atividade.nome,
            "descricao": atividade.descricao,
            "codigo": atividade.codigo,
            "pontos": atividade.pontos,
            "item": atividade.item,
            "turma": atividade.turma,
            "anexo" : atividade.anexo.decode('latin1')

        }), 200
    else:
        return jsonify({"error": "Atividade não encontrado"}), 404
    
@atividade_blueprint.route('/editar/<codigo>', methods=['PUT'])
def editar_atividade(codigo):
    atividade = Atividade.query.filter_by(codigo=codigo).first()
    if atividade:
        try:
            nome = request.form.get('nome', None)
            descricao = request.form.get('descricao', None)
            codigo = request.form.get('codigo', None)
            pontos = request.form.get('pontos', None)
            item = request.form.get('item', None)
            turma = request.form.get('turma', None)
            anexo = request.files.get('anexo', None)
            atividade.nome = nome
            atividade.descricao = descricao
            atividade.codigo = codigo
            atividade.pontos = pontos
            atividade.item = item
            atividade.turma = turma
            if not nome or not descricao or not item or not codigo or not pontos or not turma:
                return jsonify(msg="Todos os dados são obrigatorios"), 400
        
            if not anexo or not anexo.filename.endswith('.pdf'):
                return jsonify({"error": "Formato de pdf invalido"}), 400
            pdf_data = anexo.read()
            atividade.anexo = pdf_data


            db.session.commit()
            return jsonify(msg="Atividade editada com sucesso!"), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 404

    else:
        return jsonify({"error": "Turma não encontrada"}), 404