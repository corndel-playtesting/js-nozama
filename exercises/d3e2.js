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
    // If newUsername is not given, throw an AppError with code 400 (Bad Request)
    if (!newUsername) throw new AppError('No username given', 400)

    // If password is not given, throw an AppError with code 401 (Unauthorized)
    if (!password) throw new AppError('No password given', 401)

    // If password is given but not correct, throw an AppError with code 403 (Forbidden)
    if (password !== account.password) throw new AppError('Incorrect password', 403)

    // If newUsername is given and password is correct, update the username and return the new username
    account.username = newUsername
  }
}
