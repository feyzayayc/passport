const router = require('express').Router();
const authController = require('../controllers/auth_controller');
const validatorMiddleware = require('../middleware/validatioan_middleware');
const authMiddleware = require('../middleware/auth_middleware');

router.get('/login',authMiddleware.oturumAcilmamis, authController.loginFormunuGoster);
router.post('/login',authMiddleware.oturumAcilmamis,validatorMiddleware.validateLogin() ,authController.login);

router.get('/register',authMiddleware.oturumAcilmamis, authController.registerFormunuGoster);
router.post('/register',authMiddleware.oturumAcilmamis, validatorMiddleware.validateNewUser(), authController.register);

router.get('/forget-password',authMiddleware.oturumAcilmamis, authController.forgetPasswordFormunuGoster);
router.post('/forget-password',authMiddleware.oturumAcilmamis, authController.forgetPassword);

router.get('/logout',authMiddleware.oturumAcilmis, authController.logout);

module.exports = router;