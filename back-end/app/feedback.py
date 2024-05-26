from flask import Blueprint, jsonify, request
from . import db
from app.model import Resposta, Atividade, Itemaluno, Users, Feedback

feedback_blueprint = Blueprint('feedback', __name__)

@feedback_blueprint.route('/avaliar', methods=['POST'])
def cadastrar_feedback():
    try:
        data = request.get_json()
        id_atividade = data.get('id_atividade')
        descricao = data.get('descricao')
        aprovado = data.get('aprovado')

        if not descricao or not aprovado:
            return jsonify(msg="Todos os dados são obrigatórios"), 400

        resposta = Resposta.query.filter_by(id_atividade=id_atividade).first()
        if not resposta:
            return jsonify(msg="Resposta não encontrada"), 404

        id_atividade = resposta.id_atividade
        resposta.aprovado = aprovado

        if aprovado == 'S':
            atividade = Atividade.query.filter_by(codigo=str(id_atividade)).first()
            if not atividade:
                return jsonify(msg="Atividade não encontrada"), 404

            user = Users.query.filter_by(matricula=resposta.matricula).first()
            if not user:
                return jsonify(msg="Usuário não encontrado"), 404

            itemaluno = Itemaluno(id_aluno=user.id, id_item=atividade.item)
            db.session.add(itemaluno)

        feedback = Feedback(id_resposta=resposta.id, id_atividade=id_atividade, descricao=descricao)
        db.session.add(feedback)
        db.session.commit()

        return jsonify(msg="Feedback cadastrado com sucesso!"), 200
    except Exception as e:
        print(f"Erro no cadastro de Feedback: {e}")
        db.session.rollback()
        return jsonify(msg="Erro no cadastro de Feedback"), 400
