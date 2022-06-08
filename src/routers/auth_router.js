const router = require('express').Router();
const authController = require('../controllers/auth_controller');
const validatorMiddleware = require('../middleware/validatioan_middleware')

router.get('/login', authController.loginFormunuGoster);
router.post('/login',validatorMiddleware.validateLogin() ,authController.login);

router.get('/register', authController.registerFormunuGoster);
router.post('/register', validatorMiddleware.validateNewUser(), authController.register);

router.get('/forget-password', authController.forgetPasswordFormunuGoster);
router.post('/forget-password', authController.forgetPassword);


module.exports = router;