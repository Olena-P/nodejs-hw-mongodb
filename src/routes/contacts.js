import { Router } from 'express';
import * as contactsController from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contactSchemas.js';

const router = Router();

router.get(
  '/contacts',
  ctrlWrapper(contactsController.getAllContactsController),
);
router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(contactsController.getContactByIdController),
);
router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(contactsController.createContactController),
);
router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(contactsController.updateContactController),
);
router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(contactsController.deleteContactController),
);

export default router;
