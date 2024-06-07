from flask import Flask
from dotenv import load_dotenv


def create_app():
    load_dotenv()
    app = Flask(__name__)
    app.config.from_object("app.config.Config")

    with app.app_context():
        from .routes import routes
        app.register_blueprint(routes)

    return app
