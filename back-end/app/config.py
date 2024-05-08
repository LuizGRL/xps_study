class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:123@localhost/xps_study'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'your-secret-key'
