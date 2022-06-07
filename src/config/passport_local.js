const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user_model');

module.exports = function (passport) {
    const options = {
        usernameField: 'email',
        passwordField: 'sifre'
    };
    passport.use(new LocalStrategy(options, async (email, sifre, done) => {
        try {
            const _bulunanUser = await User.findOne({ email: email });
            if (!_bulunanUser) {
                return done(null, false,{ message: 'Email bulunamadı' });
            }
            if (_bulunanUser.sifre !== sifre) {
                return done(null, false,{ message: 'Şifre yanlış'});
            }
            else {
                return done(null,_bulunanUser);
            }

        } catch (err) {
            return done(err);
        }
    }));
/*
    passport.serializeUser((user,done)=>{
        console.log('sessiona kaydedildi' + User.id)
        done(null,User.id);
    })

    passport.deserializeUser((id,done)=>{
        console.log("sessiona kaydedilen id veritabanııda var" + User.id)
        User.findById(id,(err,user)=>{
            done(err,user)
        })
        done(null,User.id)
    })
    */

    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(user, done) {
          const yeniUser = {
              id:user.id,
              email:user.email,
              ad:user.ad,
              soyad:user.soyad
          }
        done(null, yeniUser);
      });
}