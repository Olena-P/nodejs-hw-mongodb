import { ContactCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async (page, perPage, sortBy, sortOrder) => {
  const skip = (page - 1) * perPage;
  const contacts = await ContactCollection.find()
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await countContacts();
  const paginationData = calculatePaginationData(totalItems, perPage, page);

  return {
    contacts,
    ...paginationData,
  };
};

export const countContacts = async () => {
  return await ContactCollection.countDocuments();
};

export const getContactById = async (contactId) => {
  return await ContactCollection.findById(contactId);
};

export const createContact = async (payload) => {
  return await ContactCollection.create(payload);
};

export const updateContact = async (contactId, contactData) => {
  return await ContactCollection.findByIdAndUpdate(contactId, contactData, {
    new: true,
  });
};

export const deleteContact = async (contactId) => {
  return await ContactCollection.findByIdAndDelete(contactId);
};
