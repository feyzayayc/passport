const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
// db bağlantısı
require('./src/config/database');


// template engine ayarları
const path = require('path');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
app.use(express.static('public'));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set("views", path.resolve(__dirname, './src/views'));
// default olarak views klasörü ile çalıştığı için klasörün yerini belirttik


// sessin ve flash message
const store = new MongoDBStore({
    // uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
    uri: 'mongodb://localhost:27017/proje',
    collection: 'sessionlar'
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000* 60 * 60 * 24
    },
    // cookie süresi
    store: store,
}));

app.use(flash());
app.use((req, res, next) => {
    res.locals.validation_error = req.flash('validation_error');
    res.locals.success_message = req.flash('success_message');
    res.locals.email = req.flash('email');
    res.locals.ad = req.flash('ad');
    res.locals.soyad = req.flash('soyad');
    res.locals.sifre = req.flash('sifre');
    res.locals.resifre = req.flash('resifre');
    res.locals.login_error = req.flash('error');

    next();
});

app.use(passport.initialize());
app.use(passport.session());

const authRouter = require('./src/routers/auth_router');
const yonetimRouter = require('./src/routers/yonetim_router');

// formDan gelen değerlerin okunabilmesi için
// bu olmazsa formdan veri gelmiyor
app.use(express.urlencoded({ extended: true }));

let sayac = 0;

app.get('/', (req, res) => {
    if (req.session.sayac) {
        req.session.sayac++;
    }
    else {
        req.session.sayac = 1;
    }
    res.json({
        mesaj: 'uygulama çalıştı',
        sayac: req.session.sayac
    })
});

app.use('/', authRouter);
app.use('/yonetim', yonetimRouter);


app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);

})