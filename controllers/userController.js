import ApiError from "../error/ApiError.js";
import { User } from "../models/models.js";
import * as EmailValidator from 'email-validator';
import {v4 as uuidv4} from 'uuid';

class UserController {

  async registration(req, res, next) {
    const {email, password} = req.body;
    const checkUser = await User.findOne({where: {email}});
    console.log(checkUser);
    if (!email || !password) {
      return next(ApiError.internal('Не введена почта или пароль!'));
    } else if (password.length < 6) {
      return next(ApiError.internal('Длинна пароля должна быть более 6 символов'));
    } else if (!EmailValidator.validate(email)) {
      return next(ApiError.internal('Не верный формат email'));
    } else if (checkUser) {
      return next(ApiError.forbidden('Пользователь с такой почтой уже зарегистрирован'));
    }
    const newId = uuidv4();
    const user = await User.create({email: email.trim().toLowerCase(), password, id: newId});
    return res.json(user);
  }

  async login(req, res, next) {
    const {email, password} = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Не указан логин или пароль.'));
    }
    const user = await User.findOne({where: {email: email.trim().toLowerCase(), password}});
    console.log(email, password);
    if (!user) {
      return next(ApiError.forbidden('Не верные логин или пароль!'));
    }
    res.json(user);
  }

  async checkAuth(req, res, next) {
    console.log('auth')
    const {id} = req.query;
    console.log(id, '-------------------- ID');
    if (!id) {
      return next(ApiError.badRequest('Не задан ID'));
    }
    const user = await User.findOne({where:{id}});
    if (!user) {
      res.status(203);
      res.send(false);
    } else {
      res.send(id);
    }

  }

  async getAllUsers(req, res, next) {
    const users = await User.findAll();
    res.json(users);
  }
}

export default new UserController();