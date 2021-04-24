import Category from '../../models/category'
var jwt = require('jsonwebtoken');

export default {

    async addCategory(req, res) {
        try {
            const categoryInfo = {
                name: req.body.name,

            }
            let category = await Category.create(categoryInfo)
            if (category) return res.send({
                data: category,
                success: true
            })
            return res.send({
                data: '',
                success: true
            })
        } catch (err) {
            return res.send(err)
        }
    },
    async getCategory(req, res) {
        try {
            let category = await Category.find({}).lean()
            if (category) {
                return res.send({
                    message:"Category listing successfully",
                    data: category,
                    success: true
                })
            }
            else
            {
                return res.send({
                    data: {},
                    success: true
                }) 
            }

        } catch (err) {
            return res.send(err)
        }
    }
}