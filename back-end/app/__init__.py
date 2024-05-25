from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from .config import Config
from flask_cors import CORS



db = SQLAlchemy()
jwt = JWTManager()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
  
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)

    from .auth import auth_blueprint
    from .usuario import user_blueprint
    from .turma import turma_blueprint
    from .item import item_blueprint
    from .atividade import atividade_blueprint

    app.register_blueprint(auth_blueprint, url_prefix='/auth')
    app.register_blueprint(user_blueprint, url_prefix='/usuario')
    app.register_blueprint(turma_blueprint, url_prefix='/turma')
    app.register_blueprint(item_blueprint, url_prefix='/item')
    app.register_blueprint(atividade_blueprint, url_prefix='/atividade')





    return app
