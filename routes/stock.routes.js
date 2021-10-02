const router = require('express').Router();
const userController = require('../controller/user.controller')
const stockController = require('../controller/stock.controller')
const Items = require('../models/stock.model');
const auth = require('../middleware/auth');



router.post('/addItem' , auth,stockController.addItem)
router.post('/addCategory/:id',auth, stockController.addCategory)
router.patch('/editItem/:id' , auth, stockController.editItem)
router.patch('/addQuqntity/:id' , auth, stockController.addQuantity)
router.patch('/sahbItem/:id' , auth, stockController.sahbItem)


router.get('/myItems' , auth,stockController.myItems)






module.exports = router