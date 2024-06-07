from flask import request, jsonify
from functools import wraps
from typing import Any, Callable, Dict, Tuple


def token_provided(function: Callable[..., Any]) -> Callable[..., Any]:
    """
    Check if a token is provided in the Authorization header.
    This server does not validate the token. Just pass it to
    the CLI application.
    """
    unauthorized: Tuple[Dict[str, str], int] = (
        jsonify({"message": "Unauthorized"}), 401)

    @wraps(function)
    def decorated(*args: Any, **kwargs: Any) -> Any:
        if "Authorization" not in request.headers:
            return unauthorized

        authorization = request.headers["Authorization"]
        if not authorization.startswith("Bearer "):
            return unauthorized

        if authorization.split(" ")[1]:
            return function(*args, **kwargs)
        return unauthorized

    return decorated
