import AuthService from './user.service'
export default {
    async signup(req,res) {
        console.log("---ebdy",req.body)
        await AuthService.signup(req,res).then(resp =>{
            return resp
        }).catch(err =>{
            console.log("--err",err)
        })
    },
    async signin(req,res) {
        await AuthService.signin(req,res).then(resp =>{
            return resp
        }).catch(err =>{
            console.log("--err",err)
        })
    },
    async signout(req,res){
        await AuthService.signout(req,res).then(resp =>{
            return resp
        }).catch(err =>{
            console.log("--err",err)
        })
    }
}