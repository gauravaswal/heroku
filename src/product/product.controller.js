import ProductService from './product.service'
export default {
    async addProduct(req,res) {
        await ProductService.addProduct(req,res).then(resp =>{
            return resp
        }).catch(err =>{
            console.log("--err",err)
            return err
            console.log("--err",err)
        })
    },
    async getProduct(req,res) {
        await ProductService.getProduct(req,res).then(resp =>{
            return resp
        }).catch(err =>{
            console.log("--err",err)
            return err
        })
    },
    async listBySearch(req,res) {
        await ProductService.listBySearch(req,res).then(resp =>{
            return resp
        }).catch(err =>{
            console.log("--err",err)
            return err
        })
    },
    async getProductById(req,res) {
        await ProductService.getProductById(req,res).then(resp =>{
            return resp
        }).catch(err =>{
            console.log("--err",err)
            return err
        }) 
    }
}