from flask import Blueprint, jsonify
from .utils import service, get_requested_fields

routes = Blueprint('routes', __name__)


@routes.route('/login', methods=['POST'])
@get_requested_fields
def login(username, passphrase):
    output, returncode = service('login', username, passphrase)
    return (
        jsonify(result=output),
        200
    ) if returncode == 0 else (
        jsonify(error=output),
        400
    )


@routes.route('/register', methods=['POST'])
@get_requested_fields
def register(username, passphrase):
    output, returncode = service('register', username, passphrase)
    return (
        jsonify(result=output),
        201
    ) if returncode == 0 else (
        jsonify(error=output),
        400
    )


def init_app(app):
    app.register_blueprint(routes)
