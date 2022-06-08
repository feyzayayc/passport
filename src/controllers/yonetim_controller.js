const anaSayfayiGoster =  (req, res, next) => {
    res.render('index',{layout : './layout/yonetim_layouts'})
}

module.exports = {anaSayfayiGoster}