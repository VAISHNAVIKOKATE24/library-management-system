const express = require('express');
const borrowController = require('../controllers/borrowController');
const router = express.Router();

router.post('/borrow', borrowController.borrowBook);
router.post('/return', borrowController.returnBook);

module.exports = router;
