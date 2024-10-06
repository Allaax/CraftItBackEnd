const express = require('express');
const customerRouter = require('../Controllers/CustomerController');

const router = express.Router();

router.get('/:userId',customerRouter.getCustomerByUserId);



module.exports = router;
