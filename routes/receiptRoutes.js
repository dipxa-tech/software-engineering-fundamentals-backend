const express = require('express');
const router = express.Router();
const receiptControllers = require('../controllers/receiptControllers');
// const verifyJWT = require('../middleware/verifyJWT');

// router.use(verifyJWT);

router.route('/')
  .get(receiptControllers.getAllReceipts)
  .post(receiptControllers.createReceipt)
  .delete(receiptControllers.deleteReceipt);

router.route('/:id')
.get(receiptControllers.getReceiptsByUserId)
.patch(receiptControllers.updateReceipt);

router.route('/specific/:id')
  .get(receiptControllers.getReceiptsById)


module.exports = router;
