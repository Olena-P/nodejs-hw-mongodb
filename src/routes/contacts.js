import { Router } from 'express';
import * as contactsController from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contactSchemas.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get(
  '/',
  checkRoles(ROLES.OWNER, ROLES.PARENT),
  ctrlWrapper(contactsController.getAllContactsController),
);
contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsController.getContactByIdController),
);
contactsRouter.post(
  '/',
  checkRoles(ROLES.OWNER, ROLES.PARENT),
  validateBody(createContactSchema),
  ctrlWrapper(contactsController.createContactController),
);
contactsRouter.patch(
  '/:contactId',
  checkRoles(ROLES.OWNER, ROLES.PARENT),
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(contactsController.updateContactController),
);
contactsRouter.delete(
  '/:contactId',
  checkRoles(ROLES.OWNER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(contactsController.deleteContactController),
);

export default contactsRouter;
