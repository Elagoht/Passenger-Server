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
        if "Authorization" in request.headers:
            authorization = request.headers["Authorization"]
            if authorization.startswith("Bearer "):
                token = authorization.split(" ")[1]
                if token:
                    return function(token, *args, **kwargs)

        return jsonify({"message": "Token is missing or invalid!"}), 401

    return decorated
