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


@routes.route("/reset", methods=["POST"])
@get_requested_fields
@auth_required
@service_route(200, 400, "new")
def reset(): pass


@routes.route("/fetchAll", methods=["GET"])
@auth_required
@service_route(200, 404)
def fetchAll(): pass


@routes.route("/query", methods=["POST"])
@get_requested_fields
@auth_required
@service_route(200, 404, "keyword")
def query(): pass


@routes.route("/fetch", methods=["POST"])
@get_requested_fields
@auth_required
@service_route(200, 404, "uuid")
def fetch(): pass


@routes.route("/create", methods=["POST"])
@get_requested_fields
@auth_required
@service_route(201, 400, "data")
def create(): pass


@routes.route("/update", methods=["PUT"])
@get_requested_fields
@auth_required
@service_route(200, 400, "uuid", "data")
def update(): pass


@routes.route("/delete", methods=["DELETE"])
@get_requested_fields
@auth_required
@service_route(200, 404, "uuid")
def delete(): pass


@routes.route("/stats", methods=["GET"])
@auth_required
@service_route(200, 404)
def stats(): pass


@routes.route("/declare", methods=["POST"])
@get_requested_fields
@auth_required
@service_route(201, 400, "key", "value")
def declare(): pass


@routes.route("/forget", methods=["DELETE"])
@get_requested_fields
@auth_required
@service_route(200, 404, "key")
def forget(): pass


@routes.route("/constants", methods=["GET"])
@auth_required
@service_route(200, 404)
def constants(): pass


@routes.route("/generate", methods=["POST"])
@get_requested_fields
@service_route(200, 400, "length")
def generate(): pass


@routes.route("/manipulate", methods=["POST"])
@get_requested_fields
@service_route(200, 400, "passphrase")
def manipulate(): pass


def init_app(app):
    app.register_blueprint(routes)
