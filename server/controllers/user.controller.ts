import User from '../models/user.model'
import IUser from '../models/types/user'
import bcrypt from 'bcrypt'
import {generateToken} from "../utils/jwt";

interface ICredentials {
  nickname: string;
  password: string;
}

const loginError = {
  message: "Login has failed"
}

async function getById(id: string) {
  return User.findById(id)
}

async function create(data: ICredentials) {
  const user: IUser = {
    nickname: data.nickname,
    hashPassword: bcrypt.hashSync(data.password, 10),
    items: [],
  }
  return new User(user).save()
}

async function login(data: ICredentials) {
  const user = await User.findOne<IUser>({ nickname: data.nickname })
  if (user) {
    const isPasswordValid = await bcrypt.compare(data.password, user.hashPassword)
    if (isPasswordValid) {
      user.token = generateToken(user._id)
      return user
    } else {
      throw loginError
    }
  } else {
    throw loginError
  }
}

async function addItems(id: string, items: string[]) {
  return User.updateOne({
      _id: id
    },
    {
      $push: {
        items: items
      }
    })
}

async function addSocket(id: string, socket: string) {
  return User.updateOne({
    _id: id
  }, {
    socket
  })
}

async function removeSocket(id: string) {
  return User.updateOne({
    _id: id
  }, {
    socket: null
  })
}

async function findBySocket(socket: string) {
  return User.findOne({ socket })
}

export {
  getById,
  create,
  login,
  addItems,
  addSocket,
  removeSocket,
  findBySocket
}
