from flask import Blueprint
from .utils import get_requested_fields, service_route
from .auth import auth_required

routes = Blueprint("routes", __name__)


@routes.route("/login", methods=["POST"])
@get_requested_fields
@service_route(200, 401, "username", "passphrase")
def login(): pass


@routes.route("/register", methods=["POST"])
@get_requested_fields
@service_route(201, 400, "username", "passphrase")
def register(): pass


@routes.route("/fetchAll", methods=["GET"])
@auth_required
@service_route(200, 404)
def fetchAll(): pass


@routes.route("/create", methods=["POST"])
@get_requested_fields
@auth_required
@service_route(201, 400, "data")
def create(): pass


def init_app(app):
    app.register_blueprint(routes)
