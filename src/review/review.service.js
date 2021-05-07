import Review from '../../models/review'
var jwt = require('jsonwebtoken');

export default {

    async addReview(req,res) {
        try{
            const reviewInfo ={
                comment :req.body.comment,
                rating:parseInt(req.body.rating),
                _product:req.body._product,
                _user:req.user.id,
            }
           let review =  await Review.create(reviewInfo)
        if(review) return res.status(201).send({data:review,success:true})
        return res.status(400).send({data:'',success:true})
        }catch(err)
        {
            console.log("--err",err)
         return res.status(500).send(err)
        }
    }
}