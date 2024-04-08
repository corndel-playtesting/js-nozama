const account = {
  username: 'legolas',
  email: 'legolas@thefellowship.com',
  password: 'elf4life'
}

export class AppError extends Error {
  constructor(message, code) {
    super(message)
    this.code = code
  }
}

export class Account {
  static updateUsername(newUsername, password) {
    if (!newUsername) {
      throw new AppError('New username is required', 400)
    }

    if (!password) {
      throw new AppError('Password is required', 401)
    }

    if (password !== account.password) {
      throw new AppError('Password is incorrect', 403)
    }

    account.username = newUsername
    return { username: account.username, email: account.email }
  }
}
