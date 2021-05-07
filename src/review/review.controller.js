import ReviewService from './review.service'
export default {
    async addReview(req,res) {
        await ReviewService.addReview(req,res).then(resp =>{
            return resp
        }).catch(err =>{
            console.log("--err",err)
            return err
        })
    }
}