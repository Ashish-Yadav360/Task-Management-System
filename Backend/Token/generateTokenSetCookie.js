import jwt from 'jsonwebtoken'

const generateTokenSetCookie =(userid,res) => {
    const token = jwt.sign({userid},'ThomasMuller',{
        expiresIn:"15d"
    });
    res.cookie('cookies',token,{
        Expires:15 *24 *60*60 *1000,
        httpOnly:true,
        SameSite:'strict'
    })
}

export default generateTokenSetCookie