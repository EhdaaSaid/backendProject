const router = require('express').Router();
const userController = require('../controller/user.controller')
const stockController = require('../controller/stock.controller')
const halaController = require('../controller/hala.controller')
const Halat = require('../models/halat.model');
const auth = require('../middleware/auth');



router.post('/addHala' , auth,halaController.addHala)
router.get('/myHalat' , auth,halaController.myHalat)
router.get('/count' , auth,halaController.countHala)
router.get('/singleHala/:id' , auth,halaController.getSingleHala)
router.delete('/deletHala/:id' , auth,halaController.deletHala)

router.patch('/editHala/:id' , auth,halaController.editHala)

router.get('/myTasks', auth, halaController.assignTask)






module.exports = router