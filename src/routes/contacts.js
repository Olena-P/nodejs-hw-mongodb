import { Router } from 'express';
import * as contactsController from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get(
  '/contacts',
  ctrlWrapper(contactsController.getAllContactsController),
);
router.get(
  '/contacts/:contactId',
  ctrlWrapper(contactsController.getContactByIdController),
);
router.post(
  '/contacts',
  ctrlWrapper(contactsController.createContactController),
);
router.patch(
  '/contacts/:contactId',
  ctrlWrapper(contactsController.updateContactController),
);
router.delete(
  '/contacts/:contactId',
  ctrlWrapper(contactsController.deleteContactController),
);

export default router;
