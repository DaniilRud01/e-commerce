const admin = require('../firebase')
const User = require('../models/user')

exports.authCheck = async (req,res,next) => {
   try{
    const fireBaseUser = await admin
        .auth()
        .verifyIdToken(req.headers.authtoken)
       //console.log('fireBase user auth check', fireBaseUser)
       req.user = fireBaseUser
       next()
   }catch (e) {
       console.log(e)
       res.status(401).json({
           err: 'Invalid token'
       })
   }
}

exports.adminCheck = async (req,res,next) => {
    const { email } = req.user

    const adminUser = await User.findOne({email}).exec()

    if(adminUser.role !== 'admin'){
        res.status(403).json({
            err: 'Отказано в доступе администратора'
        })
    } else{
        next()
    }

}