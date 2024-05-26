from flask import Blueprint, jsonify, request
from . import db
from app.model import Resposta

resposta_blueprint = Blueprint('resposta', __name__)

@resposta_blueprint.route('/cadastro', methods=['POST'])
def cadastrar_resposta():    
    try:
        nome = request.form.get('nome')
        descricao = request.form.get('descricao')
        anexo = request.files.get('anexo')
        aprovado = 'N'
        id_atividade = request.form.get('codigo')
        matricula = request.form.get('matricula')
        if not nome or not descricao or not id_atividade or not matricula or not aprovado:
            return jsonify(msg="Todos os dados são obrigatorios"), 400
        
        if not anexo or not anexo.filename.endswith('.pdf'):
            return jsonify({"error": "Formato de pdf invalido"}), 400
        pdf_data = anexo.read()

        resposta = Resposta(
            nome=nome,
            descricao=descricao,
            aprovado=aprovado,
            id_atividade=id_atividade,
            matricula=matricula,
            anexo=pdf_data
        )
        db.session.add(resposta)
        db.session.commit()
        return jsonify(msg="Reposta cadastrada com sucesso!"), 200
    except Exception as e:
        print(f"Erro no cadastro da Resposta: {e}")
        return jsonify(msg="Erro no cadastro da Resposta"), 400
    
    
@resposta_blueprint.route('/pesquisar/<codigo>', methods=['GET'])
def pesquisar_resposta(codigo):
    resposta = Resposta.query.filter_by(id_atividade=codigo).first()
    if resposta:
          return jsonify({
            "nome": resposta.nome,
            "descricao": resposta.descricao,
            "aprovado": resposta.aprovado,
            "anexo" : resposta.anexo.decode('latin1')

        }), 200
    else:
        return jsonify({"error": "resposta não encontrado"}), 404
    
    
@resposta_blueprint.route('/ver/<codigo>', methods=['GET'])
def ver_respota(codigo):
    respostas = Resposta.query.filter_by(id_atividade=codigo).all()

    atividades_list = []
    
    for resposta in respostas:
        if(resposta.aprovado != 'S'):        
            atividades_list.append({
                    "nome": resposta.nome,
                    "descricao": resposta.descricao,
                    "aprovado": resposta.aprovado,
                    "anexo" : resposta.anexo.decode('latin1')
            })

    if atividades_list:
        return jsonify(atividades_list), 200
    else:
        return jsonify({"error": "Nenhuma atividade encontrada"}), 404
    
