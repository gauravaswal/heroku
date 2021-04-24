import User from '../../models/user'
import Login from '../../models/login'
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

export default {

    async signup(req,res) {
        try{
            const userInfo ={
                email :req.body.email,
                password :req.body.password,
                firstName:req.body.firstName,
            }
           let user =  await User.create(userInfo)
        if(user) return res.send({data:user,success:true})
        return res.send({data:'',success:true})
        }catch(err)
        {
         return res.send(err)
        }
    },
    async signin(req,res) {
        try{
           
          await  User.findOne({email:req.body.email}).then(user =>{
             if(!user)
             {
                return res.status(400).json({ error: "User not exist" })
             }
             bcrypt.compare(req.body.password, user.password, async (err, data) => {
                if (err) throw err
                console.log("---eerrrr")
                if (data) {
                  console.log("-----testtt",data)
                    let jwttoken =  jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        id:user._id ,
                      }, process.env.SECRET_KEY);
                      const loginInfo ={
                          loginType:'Web',
                          token:jwttoken,
                          _user:user._id
                      }
                     let login = await Login.create(loginInfo) 
                if(login) return res.status(200).json({ msg: "Login success",data:user,token:jwttoken,success:true })
                } else {
                    console.log("--elseee")
                    return res.status(404).json({ error: "Invalid credencial",data:'',success:true })
                }

            })
         })
        //  console.log("--logs",user)
        //  if(user)
        //  {
        //      console.log("---im jere",(bcrypt.compare(req.body.password,user.password)))
        //     if(bcrypt.compare(req.body.password,user.password))
        //     {
        //         return res.send({success:true})
        //     }else
        //     {
        //         return res.send({success:false , message:"Invalid Password"})
        //     }
        //  }
        //  else{
        //      return res.send({success:false , message:"User not found"})
        //  }
        }catch(err)
        {

        }
    },
    async signout (req,res) {
        try{
            console.log("---im here login",req.headers['authorization'])
            await Login.deleteOne({token:req.headers['authorization']}).then(login =>{
                if(login)
                {
                    return res.status(200).json({success:true,error:''})
                }
                else
                {
                    return res.status(400).json({success:true,error:'Invalid data provided'})
                }
            })

        }catch(err) {

        }
    }
}