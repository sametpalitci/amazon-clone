const { userValidation } = require('../../utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../../models');

async function login(args) {
  const { email, password } = args;
  const userCheck = userValidation(email, password);
  if (userCheck.status !== 'OK') throw new Error(userCheck.notice);

  const checkEmail = await db.users.findOne({ where: [{ email }], raw: true });
  if (!checkEmail || !bcrypt.compareSync(password, checkEmail.password))
    throw new Error('E-mail or Password is wrong!');

  checkEmail.token = jwt.sign(
    { email, id: checkEmail.id },
    process.env.SECRET_KEY
  );
  return checkEmail;
}

async function register(args) {
  const { email, password } = args;
  const userCheck = userValidation(email, password);
  if (userCheck.status !== 'OK') throw new Error(userCheck.notice);

  const checkEmail = await db.users.findOne({ where: [{ email }], raw: true });
  if (checkEmail) throw new Error('This email already used by another user');

  try {
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const createdUser = await db.users.create({
      email,
      password: hashPassword,
    });
    createdUser.token = jwt.sign(
      { email, id: createdUser.id },
      process.env.SECRET_KEY
    );
    return createdUser;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = { login, register };
