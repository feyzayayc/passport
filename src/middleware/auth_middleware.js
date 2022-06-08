const oturumAcilmis = (req,res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash('error', ['Lütfen önce oturum açın'])
        res.redirect('/login')
    }
}

module.exports ={oturumAcilmis}