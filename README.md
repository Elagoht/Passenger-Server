# Passenger-Server

![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python&logoColor=yellow)
![Flask](https://img.shields.io/badge/Flask-API-brown?logo=flask&logoColor=red)
![GitHub Repo stars](https://img.shields.io/github/stars/Elagoht/Passenger-server?style=flat)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/Elagoht/Passenger-server)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues-pr/Elagoht/Passenger-server)
![GitHub License](https://img.shields.io/github/license/Elagoht/Passenger-server)

Passenger Server, is the Web backend to interact Passenger over HTTP. You can think Passenger CLI as a kernel and Passenger Server as a shell. You can use cli tool standalone, but if you want to access its power over Web, here is the server.

The main idea of ​​using Passenger as a web server was born to be able to use it on your own 'self-hosted' server. This project is not designed for general use scenarios.

## Installation

### Manual Method

1. Create a virtual environment.

```sh
python -m venv .venv
# or python3 -m venv .venv
```

2. Activate virtual environment.

> On POSIX systems (such as GNU/Linux, BSD, MacOS)

```sh
source .venv/bin/activate
```

> On Windows

Visit <https://distrochooser.de> and <https://etcher.balena.io>

> [!WARNING]
> This is more than a joke. This project began to be developed based on the idea of "zero trust". After announcing the `Recall`, we cannot trust Windows anymore. You can run this project also on Windows as well but we do not recommend it.

1. Install the requirements.

```sh
pip install -r requirements.txt
```

4. Run the server

```sh
python run.py
# or python3 run.py
```

### Docker Container Method

Soon!

## Usage

Once the server is running, you can access the API endpoints at `http://localhost:9854`.

Available endpoints
* <http://localhost:9854/login>
* <http://localhost:9854/register>
* <http://localhost:9854/reset>
* <http://localhost:9854/fetchAll>
* <http://localhost:9854/query>
* <http://localhost:9854/fetch>
* <http://localhost:9854/create>
* <http://localhost:9854/update>
* <http://localhost:9854/delete>
* <http://localhost:9854/stats>
* <http://localhost:9854/declare>
* <http://localhost:9854/forget>
* <http://localhost:9854/constants>
* <http://localhost:9854/generate>
* <http://localhost:9854/manipulate>

## Contributing

We welcome contributions! Please take a look at [CODE OF CONDUCT](./CODE_OF_CONDUCT.md).

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

For more details, check out the [Passenger-CLI](https://github.com/Elagoht/Passenger-cli) and [Passenger-UI](https://github.com/Elagoht/Passenger-UI) repositories.