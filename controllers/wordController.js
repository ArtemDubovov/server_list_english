import ApiError from "../error/ApiError.js";
import { User, Words } from "../models/models.js";

class WordController {
  async getAllWords(req, res, next) {
    const {id} = req.query;
    console.log('get all words');
    if (!id) {
      return next(ApiError.badRequest('Не указан ID'));
    }
    const allWords = await Words.findAll({where: {userId: id}});
    res.status(200).json({words: allWords});
  }

  async getWord(req, res, next) {
    console.log('get world');
  }

  async deleteWord(req, res, next) {
    const {id, userId} = req.body;
    console.log(req.body);
    const user = User.findOne({where: {id: userId}});
    if (!user) {
      return next(ApiError.forbidden('Нет прав'));
    }
    if (!id) {
      return next(ApiError.badRequest('Не указан ID.'));
    }
    const deleteWord = await Words.findOne({where: {id, userId}});
    if (deleteWord) {
      Words.destroy({where: {id, userId}});
      res.status(200).json({message: 'Слово удалено.'});
    } else {
      return next(ApiError.forbidden('Слово не найдено по ID.'));
    }
  }

  async updateWord(req, res, next) {
    try {
      const { id, userId, translation, word } = req.body;
      console.log(id, userId, translation, word);
      if (!id || !userId) {
        return next(ApiError.badRequest('Не указаны ID слова или пользователя.'));
      }
      if (word && translation) {
        console.log('Word and transl');
        const result = await Words.update({ word, translation },{ where: {userId, id}});
        res.json(result);
      } else if (!word && translation) {
        console.log('only transl');
        const result = await Words.update({ translation }, {where: {userId, id}});
        res.json(result);
      } else if (word && !translation) {
        console.log('only word');
        await Words.update({ word }, {where: {userId, id}});
        res.json({message: 'Словоs изменено.'});
      }

    } catch (e) {
      console.log(e);
    }
  }

  async addWord(req, res, next) {
    const {word, translation, userId} = req.body;
    if (!word || !translation) {
      return next(ApiError.badRequest('Введены не верно данные.'));
    }
    const findWord = await Words.findOne({where: {word, userId}});
    if (!findWord) {
      await Words.create({word, translation, userId});
      res.json(await Words.findOne({where: {word, userId}}));
    } else {
      return next(ApiError.forbidden('Такое слово уже добавлено.'));
    }
    
  }
}

export default new WordController();