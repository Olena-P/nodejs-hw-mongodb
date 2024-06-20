import createHttpError from 'http-errors';
import * as contactsService from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllContactsController = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10 } = parsePaginationParams(req.query);
    const { sortBy = 'name', sortOrder = 'asc' } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    const { contacts, ...paginationData } =
      await contactsService.getAllContacts(
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
      );

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
      pagination: paginationData,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const contact = await contactsService.getContactById(req.params.contactId);
    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${req.params.contactId}!`,
      data: contact,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return next(createHttpError(400, 'Invalid contact ID format'));
    }
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const contact = await contactsService.createContact(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContactController = async (req, res, next) => {
  try {
    const contact = await contactsService.updateContact(
      req.params.contactId,
      req.body,
    );
    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }
    res.status(200).json({
      status: 200,
      message: 'Successfully updated a contact!',
      data: contact,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return next(createHttpError(400, 'Invalid contact ID format'));
    }
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const contact = await contactsService.deleteContact(req.params.contactId);
    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }
    res.status(204).json({
      status: 204,
      message: 'Successfully deleted a contact!',
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return next(createHttpError(400, 'Invalid contact ID format'));
    }
    next(error);
  }
};
