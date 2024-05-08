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
    app.register_blueprint(auth_blueprint, url_prefix='/auth')

    return app
