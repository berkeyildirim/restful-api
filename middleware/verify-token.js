const jwt = require('jsonwebtoken');

module.exports = (req , res, next) => {
    const token = req.headers['x-access-token'] || "";
    if(token){
        jwt.verify(token,req.app.get('api_secret_key'),(err,decoded) =>{
            if(err){
                res.send({
                    status:false,
                    message: 'Failed to authenticate token.'
                })
            }
            else{
                req.decode = decoded;
                next();      
            }
        })
    }
    else{
        res.json({status : false,message:'no token provided.'})
    }
}
