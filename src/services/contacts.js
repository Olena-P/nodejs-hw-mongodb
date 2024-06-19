import { ContactCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async (
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
) => {
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactCollection.find();

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [totalItems, contacts] = await Promise.all([
    contactsQuery.clone().countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(totalItems, perPage, page);

  return {
    contacts,
    ...paginationData,
  };
};

export const countContacts = async (filter) => {
  const contactsQuery = ContactCollection.find();

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  return await contactsQuery.countDocuments();
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
