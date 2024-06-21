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

const router = Router();

router.use(authenticate);

router.get(
  '/contacts',
  checkRoles(ROLES.OWNER, ROLES.PARENT),
  ctrlWrapper(contactsController.getAllContactsController),
);
router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(contactsController.getContactByIdController),
);
router.post(
  '/contacts',
  checkRoles(ROLES.OWNER, ROLES.PARENT),
  validateBody(createContactSchema),
  ctrlWrapper(contactsController.createContactController),
);
router.patch(
  '/contacts/:contactId',
  checkRoles(ROLES.OWNER, ROLES.PARENT),
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(contactsController.updateContactController),
);
router.delete(
  '/contacts/:contactId',
  checkRoles(ROLES.OWNER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(contactsController.deleteContactController),
);

export default router;
