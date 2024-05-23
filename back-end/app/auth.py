# auth.py
from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
from . import db
from app.model import Users

auth_blueprint = Blueprint('auth', __name__)


@auth_blueprint.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    user = Users.query.filter_by(matricula=username).first()
    print(user.role)
    
    if user.senha != password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username, additional_claims={"role": user.role})
    return jsonify(access_token=access_token, role=user.role), 200

def role_required(required_role):
    def wrapper(fn):
        @jwt_required()
        def decorator(*args, **kwargs):
            claims = get_jwt()
            if claims['role'] != required_role:
                return jsonify(msg="Access denied"), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper

@auth_blueprint.route('/atividade', methods=['POST'])
def cadastrar_atividade():
    print("a")
    return jsonify(msg="Atividade cadastrada com sucesso!"), 200
