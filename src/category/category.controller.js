import CategoryService from './category.service'
export default {
    async addCategory(req,res) {
        await CategoryService.addCategory(req,res).then(resp =>{
            return resp
        }).catch(err =>{
            return err
            console.log("--err",err)
        })
    },
    async getCategory(req,res) {
        await CategoryService.getCategory(req,res).then(resp =>{
            return resp
        }).catch(err =>{
            console.log("--err",err)
            return err
        })
    }
 
}