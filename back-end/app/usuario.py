from flask import Blueprint, jsonify, request
from . import db
from app.model import Users
from app.functions import validar_cpf, validar_email, validar_numero_celular

user_blueprint = Blueprint('user', __name__)


@user_blueprint.route('/cadastro', methods=['POST'])
def cadastrar_usuario():    
    try:
        nome = request.json.get('nome', None)
        sobrenome = request.json.get('sobrenome', None)
        cpf = request.json.get('cpf', None)
        email = request.json.get('email', None)
        telefone = request.json.get('telefone', None)
        role =  request.json.get('role', None)
        matricula =  request.json.get('matricula', None)
        senha = "Mudar@123"
        
        if(validar_email(email)==False):
            return jsonify({"msg": "Email incorreto"}), 401
        if(validar_cpf(cpf)==False):
            return jsonify({"msg": "Cpf incorreto"}), 401
        if(validar_numero_celular(telefone)==False):
            return jsonify({"msg": "Número incorreto"}), 401
        
        user = Users(name=nome,sobrenome=sobrenome,cpf=cpf,email=email,telefone=telefone,role=role,matricula=matricula,senha=senha)
        db.session.add(user)
        db.session.commit()
        return jsonify(msg="Usuário cadastrado com sucesso!"), 200


    except Exception as e:
        print(e)
    
# No seu arquivo de rotas do Flask
@user_blueprint.route('/pesquisar/<matricula>', methods=['GET'])
def pesquisar_usuario(matricula):
    user = Users.query.filter_by(matricula=matricula).first()
    if user:
        return jsonify({
            "nome": user.name,
            "sobrenome": user.sobrenome,
            "email": user.email,
            "telefone": user.telefone,
            "role": user.role,
            "cpf": user.cpf,
            "matricula": user.matricula

        }), 200
    else:
        return jsonify({"error": "Usuário não encontrado"}), 404

@user_blueprint.route('/editar/<matricula>', methods=['PUT'])
def editar_usuario(matricula):
    user = Users.query.filter_by(matricula=matricula).first()
    if user:
        try:
            nome = request.json.get('nome', None)
            sobrenome = request.json.get('sobrenome', None)
            cpf = request.json.get('cpf', None)
            email = request.json.get('email', None)
            telefone = request.json.get('telefone', None)
            role =  request.json.get('role', None)
            matricula =  request.json.get('matricula', None)
            
            if(validar_email(email)==False):
                return jsonify({"msg": "Email incorreto"}), 401
            if(validar_cpf(cpf)==False):
                return jsonify({"msg": "Cpf incorreto"}), 401
            if(validar_numero_celular(telefone)==False):
                return jsonify({"msg": "Número incorreto"}), 401
            
            user.nome = nome
            user.sobrenome = sobrenome
            user.cpf = cpf
            user.email = email
            user.telefone = telefone
            user.role =  role
            user.matricula = matricula 
            db.session.commit()
            return jsonify(msg="Usuário editado com sucesso!"), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 404

    else:
        return jsonify({"error": "Usuário não encontrado"}), 404
