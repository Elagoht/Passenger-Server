import subprocess
from typing import Tuple, Callable, Any
from flask import jsonify, request
from functools import wraps
import json


def service(verb: str, *arguments: str) -> Tuple[Any, int]:
    """
    Interact with the passenger CLI application.
    """
    try:
        result = subprocess.run(
            ['app/passenger', verb] +
            [str(argument) for argument in arguments if argument is not None],
            capture_output=True,
            text=True
        )

        output = result.stdout.strip().split(
            "\n")[0].replace('passenger: ', '')
        try:
            # Try to parse output as JSON
            output = json.loads(output)
        except json.JSONDecodeError:
            # If not JSON, return as is
            output = output  # better than empty pass statement

        return output, result.returncode
    except Exception as e:
        return str(e), 1


def get_requested_fields(function: Callable[..., Any]) -> Callable[..., Any]:
    """
    Provide requested fields to the function.
    If certain fields are missing, return a
    400 response with corresponding field name.
    """
    @wraps(function)
    def decorated(*_: Any, **kwargs: Any) -> Any:
        try:
            if not request.is_json:
                return jsonify(error="Invalid JSON"), 400
            data = request.get_json()
        except Exception as e:
            return jsonify(error="Invalid JSON"), 400

        fields = function.__code__.co_varnames[:function.__code__.co_argcount]

        for field in fields:
            if field not in data:
                return jsonify(error=f"Missing field: {field}"), 400

        return function(*[data.get(field) for field in fields], **kwargs)
    return decorated


def service_route(success_code: int, error_code: int, *fields: str) -> Callable[..., Any]:
    """
    Decorator for service route. It calls the service function with the function name
    and returns the appropriate response based on the return code.
    """
    def decorator(function: Callable[..., Any]) -> Callable[..., Any]:
        @wraps(function)
        def decorated(*args: Any) -> Any:
            token = args[0] if args else None
            if request.method == 'GET':
                output, returncode = service(function.__name__, token)
            else:
                data = request.get_json() or {}
                values = [data.get(field) for field in fields]
                if token:
                    output, returncode = service(
                        function.__name__, token, *values)
                else:
                    output, returncode = service(function.__name__, *values)

            if isinstance(output, dict):
                response_content = jsonify(result=output)
            else:
                response_content = jsonify(result=str(output))

            response_status = success_code if returncode == 0 else error_code
            return response_content, response_status
        return decorated
    return decorator
