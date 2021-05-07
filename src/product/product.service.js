import Product from '../../models/product'
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

export default {

    async addProduct(req,res) {
        try{
            console.log("--body",req.body)
            const productInfo ={
                name :req.body.name,
                photo:req.file.originalname,
                description:req.body.description,
                price:req.body.price,
                quantity:req.body.quantity,
                _category:req.body.category,
                sold:req.body.sold,
                shipping:req.body.shipping
               
            }
           let product =  await Product.create(productInfo)
        if(product) return res.send({data:product,success:true})
        return res.send({data:'',success:true})
        }catch(err)
        {
         return res.send(err)
        }
    },
    async getProduct(req,res) {
        let limit = req.query.limit && parseInt(req.query.limit)  || 5
        let order = req.query.order && req.query.order  || 'asc'
        let sortBy = req.query.sortBy && req.query.sortBy || '_id'
        try{
            await Product.find({}).sort([[sortBy,order]]).limit(limit).exec((err ,products) =>{
                if(err)
                {
                    return res.status(400).json({
                        error:"Product not found"
                    })
                }
                res.send(products)
            })

        }catch(err){

        }
    },
    async listBySearch (req, res){
        try{
        let order = req.body.order ? req.body.order : "desc";
        let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
        let limit = req.body.limit ? parseInt(req.body.limit) : 100;
        let skip = parseInt(req.body.skip);
        let findArgs = {};
    
        // console.log(order, sortBy, limit, skip, req.body.filters);
        // console.log("findArgs", findArgs);
      
        for (let key in req.body.filters) {
            if (req.body.filters[key].length > 0) {
                if (key === "price") {
                    // gte -  greater than price [0-10]
                    // lte - less than
                    findArgs[key] = {
                        $gte: req.body.filters[key][0],
                        $lte: req.body.filters[key][1]
                    };
                } else {
                    console.log("--req.body",req.body.filters[key])
                    findArgs[key] = {
                        $in:req.body.filters[key]
                }
            }
            }
        }
        // findArgs._category = {
        //     $in:findArgs._category
        // }
        console.log("--->>",findArgs)
    
     let product = await Product.find(findArgs)
            // .select("-photo")
            .populate("category")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit).exec();
            if(product)
            {
                res.status(200).json({
                            size: product.length,
                            product
                        }); 
            }
            else
            {
                return res.status(200).json({
                                error: "Products not found"
                            });
            }
        }catch(err){
            return res.status(400).json({
                            error: "Something went wrong"
                        });
        }
            // .exec((err, data) => {
            //     if (err) {
            //         return res.status(400).json({
            //             error: "Products not found"
            //         });
            //     }
            //     res.json({
            //         size: data.length,
            //         data
            //     });
            // });
    },
    async getProductById(req,res) {
        try {
         let product =   await Product.aggregate([
            {
                "$match": {
                    _id: mongoose.Types.ObjectId(req.params.productId)
                }
            },
            {
                $lookup:
                  {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "_product",
                    as: "review",
                  
                  }
             },
             {$sort: {"review.createdAt": -1}},
         ])
        console.log("---los",product)
           if(product){
           return res.status(200).json({
               message:"Product get successfully",
                data: product
            }); 
           }else
           {
            return res.status(200).json({
               message :"Data not found",
                data: {}
            }); 
           }
        }catch(err) {
            console.log("--er",err)
            return res.status(400).json({
                error: "Something went wrong"
            });
        }
    }
}