from flask import request, jsonify
from functools import wraps
from typing import Callable, Any


def auth_required(function: Callable[..., Any]) -> Callable[..., Any]:
    """
    Decorator that checks for a valid JWT token in the Authorization header.
    If the token is valid, it adds it as the first parameter to the decorated function.
    """
    @wraps(function)
    def decorated(*args: Any, **kwargs: Any) -> Any:
        if "Authorization" not in request.headers:
            return jsonify({"message": "Token is missing or invalid!"}), 401

        authorization = request.headers["Authorization"]
        if not authorization.startswith("Bearer "):
            return jsonify({"message": "Token is missing or invalid!"}), 401

        token = authorization.split(" ")[1]
        if not token:
            return jsonify({"message": "Token is missing or invalid!"}), 401

        return function(token, *args, **kwargs)

    return decorated
