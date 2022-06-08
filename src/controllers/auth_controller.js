const { validationResult } = require('express-validator');
const User = require('../model/user_model');
const passport = require('passport');
require('../config/passport_local')(passport);

const loginFormunuGoster = (req, res, next) => {
    res.render('login', { layout: './layout/auth_layouts' });
    // layout ile login dosyasının konumu belirtildi
}
const login = (req, res, next) => {

    const hatalar = validationResult(req);
    req.flash('email', req.body.email);
    req.flash('sifre', req.body.sifre);
    if (!hatalar.isEmpty()) {
        req.flash('validation_error', hatalar.array())

        res.redirect('/login');
    }
    else {
        passport.authenticate('local', {
            successRedirect: '/yonetim',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
        // res.render('login',{layout : './layout/auth_layouts'});
        // layout ile login dosyasının konumu belirtildi
    }

}


const registerFormunuGoster = (req, res, next) => {
    console.log(req.flash('validation_error'));
    res.render('register', { layout: './layout/auth_layouts' });
}
const register = async (req, res, next) => {
    const hatalar = validationResult(req);

    if (!hatalar.isEmpty()) {
        req.flash('validation_error', hatalar.array())
        req.flash('email', req.body.email);
        req.flash('ad', req.body.ad);
        req.flash('soyad', req.body.soyad);
        req.flash('sifre', req.body.sifre);
        req.flash('resifre', req.body.resifre);
        res.redirect('/register'); // redirect parameter almaz
        // res.render('register',{layout : './layout/auth_layouts', hatalar:hatalar});
    }
    else {
        try {
            const _user = await User.findOne({ email: req.body.email });
            if (_user) {
                req.flash('validation_error', [{ msg: 'Bu mail kayıtlı!!' }]); // _mesaj dosyasında dizi olarak çağırıldığı için burada da dizi gönderildi 
                req.flash('email', req.body.email);
                req.flash('ad', req.body.ad);
                req.flash('soyad', req.body.soyad);
                req.flash('sifre', req.body.sifre);
                req.flash('resifre', req.body.resifre);
                res.redirect('/register');
            }
            else {
                const newUser = new User({
                    email: req.body.email,
                    ad: req.body.ad,
                    soyad: req.body.soyad,
                    sifre: req.body.sifre,
                });

                await newUser.save();
                console.log('Kullanıcı kaydedildi');
                req.flash('success_message', [{ msg: 'Giriş yapabilirsiniz.' }])
                res.redirect('login');
            }
        } catch (error) {
            console.log(error);
        }
    }

}


const forgetPasswordFormunuGoster = (req, res, next) => {
    res.render('forget_password', { layout: './layout/auth_layouts' })
}
const forgetPassword = (req, res, next) => {
    console.log(req.body)
    res.render('forget_password', { layout: './layout/auth_layouts' })
}
module.exports = {
    loginFormunuGoster,
    login,
    registerFormunuGoster,
    register,
    forgetPasswordFormunuGoster,
    forgetPassword
}