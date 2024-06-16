import { isValidObjectId } from 'mongoose';
import { HttpError } from 'http-errors';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(404, 'Not found'));
  } else {
    next();
  }
};
