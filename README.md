<div align="center">
<img src="https://raw.githubusercontent.com/Elagoht/Passenger-Landing/main/public/assets/logo.png" width="192" height="192" />

# Passenger Server

![Node.js](https://img.shields.io/badge/Node.js-Server-green?logo=node.js)
![Nest.js](https://img.shields.io/badge/Nest.js-API-red?logo=nestjs&logoColor=red)
![Passenger](https://img.shields.io/badge/Core_Version-0.3.0_beta.1-F2970D)
![GitHub Repo stars](https://img.shields.io/github/stars/Elagoht/Passenger-server?style=flat)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/Elagoht/Passenger-server)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues-pr/Elagoht/Passenger-server)
![GitHub License](https://img.shields.io/github/license/Elagoht/Passenger-server)
</div>

Passenger Server is the translation utility to interact with Passenger Core over HTTP. You can think of Passenger CLI as a kernel and Passenger Server as a shell. You can use the CLI tool standalone, but if you want to access its power over the Web, here is the server.

The main idea of ​​using Passenger as a web server was born to be able to use it on your own 'self-hosted' server. This project is not designed for general use.

##  Installation

### Prerequisites

You **MUST** have the corresponding executable of Passenger CLI on `app/`. You can download it on [release page](https://github.com/Elagoht/Passenger-cli/releases) of the project.

### Running on Development Mode

1. Clone the project.
2. Open the directory.
3. Install requirements

  ```sh
  npm install
  ```

4. Run the project:

  ```sh
  npm run start:dev
  # Or with Swagger document
  SWAGGER=1 npm run start:dev
  ```

> [!NOTE]
> Of you started server with swagger document, you can see the documentation on <https://localhost:3000/swagger>

## Usage

Once the server is running, you can access the API endpoints at <http://localhost:3000>.

## Contributing

We welcome contributions! Please take a look at [CODE OF CONDUCT](./CODE_OF_CONDUCT.md).

## License

This project is licensed under the GNU General Public License v3. See the [LICENSE](./LICENSE) file for details.

---

For more details, visit our [website](https://passenger-landing.vercel.app)