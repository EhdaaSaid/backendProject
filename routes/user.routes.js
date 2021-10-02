const router = require('express').Router()
const auth = require('../middleware/auth')
const userController = require('../controller/user.controller')

router.post('/register', userController.register)
router.post('/addAddr/:id', userController.addAddr)
router.post('/login', userController.login)
router.post('/logout',auth, userController.logOut)
router.post('/logoutAll',auth, userController.logOutAll)
router.get('/me',auth,userController.me)
router.get('/allUser',auth,userController.myUser)
router.delete('/deleteUser/:id',auth,userController.deletUser)
router.get('/singleuser/:id',auth,userController.getSingleUser)

module.exports = router