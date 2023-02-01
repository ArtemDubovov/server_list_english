import ApiError from "../error/ApiError.js";

export default function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    res.status(err.status).json({message: err.message});
    return;
  }
  return res.status(500).json({message: 'Не предвиденная ошибка!'});
}