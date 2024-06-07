from flask import Blueprint
from .utils import get_requested_fields, service_route

routes = Blueprint('routes', __name__)


@routes.route('/login', methods=['POST'])
@get_requested_fields
@service_route(200, 401, "username", "passphrase")
def login(): pass


@routes.route('/register', methods=['POST'])
@get_requested_fields
@service_route(201, 400, "username", "passphrase")
def register(): pass


def init_app(app):
    app.register_blueprint(routes)
