import subprocess
from typing import Tuple, Callable, Any
from flask import jsonify, request
from functools import wraps


def service(verb: str, *arguments: str) -> Tuple[str, int]:
    """
    Interact with the passenger CLI application.
    """
    result = subprocess.run(
        ['app/passenger', verb] +
        [argument for argument in arguments if argument is not None],
        capture_output=True,
        text=True
    )

    return (
        result.stdout.strip().split("\n")[0].replace('passenger: ', ''),
        result.returncode
    )


def get_requested_fields(function: Callable[..., Any]) -> Callable[..., Any]:
    """
    Provide requested fields to the function.
    If certain fields are missing, return a
    400 response with corresponding field name.
    """
    @wraps(function)
    def decorated(*args: Any, **kwargs: Any) -> Any:
        try:
            data = request.get_json()
        except Exception:
            return jsonify(error="Invalid JSON"), 400

        data = request.get_json()
        fields = function.__code__.co_varnames[:function.__code__.co_argcount]

        for field in fields:
            if field not in data:
                return jsonify(error=f"Missing field: {field}"), 400

        return function(*[data.get(field) for field in fields], **kwargs)
    return decorated
