class Logger {
  static success(message: string) {
    console.log(`${new Date().toISOString()} [SUCCESS]: ${message}`)
  }

  static error(message: string) {
    console.error(`${new Date().toISOString()} [ERROR]: ${message}`)
  }

  static warn(message: string) {
    console.warn(`${new Date().toISOString()} [WARN]: ${message}`)
  }

  static info(message: string) {
    console.info(`${new Date().toISOString()} [INFO]: ${message}`)
  }
}

export default Logger