const Product = require('../models/product')
const User = require('../models/user')
const slugify = require('slugify')

exports.create = async (req,res) => {
    try{
        console.log(req.body)
        req.body.slug = slugify(req.body.title)
        const newProduct = await new Product(req.body).save()
        res.json(newProduct)
    }catch (err) {
        res.status(400).json({
            err: err.message
        })
    }
}

exports.allList = async (req,res) => {
    let products = await Product.find({})
        .limit(parseInt(req.params.count))
        .populate('categories')
        .populate('subs')
        .sort([['createdAt','desc']])
    res.json(products)
}

exports.remove = async (req,res) => {
    try{
        const deleted = await Product.findOneAndDelete({slug: req.params.slug}).exec()
        res.json(deleted)
    }catch (e) {
       return res.status(400).send('deleted product failed')
    }
}

exports.read = async (req, res) => {
    let product = await Product.findOne({ slug: req.params.slug })
        .populate('categories')
        .populate('subs')
        .exec()
    res.json(product)
}

exports.update = async (req,res) => {
    try{
        if(req.body.title){
          req.body.slug = slugify(req.body.title)
        }
        const updated = await Product.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
            ).exec()
        res.json(updated)
    }catch (err) {
        console.log(err)
        res.send(400).json({err: err.message})
    }
}

// exports.list = async (req,res) => {
//     try{
//         const { sort, order, limit } = req.body
//         const products = await Product.find({})
//             .populate('categories')
//             .populate('subs')
//             .sort([[sort,order]])
//             .limit(limit)
//             .exec()
//
//         res.json(products)
//
//     }catch (err) {
//         console.log(err)
//     }
// }

//Пагинация
exports.list = async (req,res) => {
    try{
        const { sort, order, page } = req.body
        const currentPage = page || 1
        const perPage = 3

        const products = await Product.find({})
            .skip((currentPage -1) * perPage)
            .populate('categories')
            .populate('subs')
            .sort([[sort,order]])
            .limit(perPage)
            .exec()

        res.json(products)

    }catch (err) {
        console.log(err)
    }
}

exports.totalProducts = async (req,res) => {
    const total = await Product.find({}).estimatedDocumentCount().exec()
    res.json(total)
}


//Рейтинг
exports.productRating = async (req,res) => {
    const { email } = req.body
    const product = await Product.findById(req.params.productId).exec()
    const user = await User.findOne({ email }).exec()
    console.log('user rating added ID USER', user._id)
    let { star } = req.body
    console.log('rating START =====>', star)
    //что обновить
    let existingRatingObject = product.ratings.find((el) => el.postedBy.toString() === user._id.toString())

    if(existingRatingObject === undefined){
        let ratingAdded = await Product.findByIdAndUpdate(product._id, {
            $push: { ratings: { star, postedBy: user._id } }
        }, { new: true } ).exec()
        console.log('rating added', ratingAdded)
        res.json(ratingAdded)
    } else {
        const ratingUpdated = await Product.updateOne(
            { rating: { $elemMatch: existingRatingObject } },
            { $set: { 'ratings.$.star': star } },
            { new: true }
        ).exec()
        console.log('ratingUpdated', ratingUpdated)
        res.json(ratingUpdated)
    }
}

exports.listRelated = async (req,res) => {
    const product = await Product.findById(req.params.productId).exec()
    const related = await Product.find({
        _id: { $ne: product._id },
        category: product.category
    })
        .limit(3)
        .populate('categories')
        .populate('subs')
        .populate('postedBy')
        .exec()
    res.json(related)
}


//поиск

const handleQuery = async (req,res,query) => {
    const products = await Product.find({ $text: { $search: query }  })
        .populate('categories', '_id name')
        .populate('subs', '_id name')
        .populate('postedBy', '_id name')
        .exec()

    res.json(products)
}


const handlePrice = async (req, res, price) => {
    try{
        const products = await Product.find({
            price: {
                $gte: price[0],
                $lte: price[1],
            }
        })
            .populate('categories', '_id name')
            .populate('subs', '_id name')
            .populate('postedBy', '_id name')
            .exec()
        res.json(products)
    }catch (err) {
        console.log('error price filter ===>', err)
    }
}

const handleCategory = async (req,res,category) => {
    try{
        const products = await Product.find({ category })
            .populate('categories', '_id name')
            .populate('subs', '_id name')
            .populate('postedBy', '_id name')
            .exec()
        res.json(products)
    }catch (err){
        console.log('category filter ERROR', err)
    }
}

const handleStar =  (req,res,stars) => {
    Product.aggregate([
        {
            $project: {
               document: '$$ROOT',
                floorAverage: {
                   $floor: { $avg: "$ratings.star" }
                }
            }
        },
        { $match: { floorAverage: stars }}
    ])
        .limit(12)
        .exec((err, aggregates) => {
            if(err) console.log('AGGREGATES ERROR', err)
            Product.find({_id:aggregates })
                .populate('categories', '_id name')
                .populate('subs', '_id name')
                .populate('postedBy', '_id name')
                .exec((err, products) => {
                    if(err) console.log('PRODUCT AGGREGATE ERROR', err)
                    res.json(products)
                })
        })
    
}

const handleSub = async (req,res,sub) => {
    try{
       const products = await Product.find({ subs: sub })
           .populate('categories', '_id name')
           .populate('subs', '_id name')
           .populate('postedBy', '_id name')
           .exec()
        res.json(products)
    }catch (err) {
        console.log('SUB FILTER IS ERROR', err)
    }
}

const handleShipping = async (req,res,shipping) => {
    const products = await Product.find({ shipping })
        .populate('categories', '_id name')
        .populate('subs', '_id name')
        .populate('postedBy', '_id name')
        .exec()
    res.json(products)
}

const handleColor = async (req,res,color) => {
    const products = await Product.find({ color })
        .populate('categories', '_id name')
        .populate('subs', '_id name')
        .populate('postedBy', '_id name')
        .exec()
    res.json(products)
}
const handleBrand = async (req,res,brand) => {
    console.log('brand -->', brand)
    const products = await Product.find({brand} )
        .populate('categories', '_id name')
        .populate('subs', '_id name')
        .populate('postedBy', '_id name')
        .exec()
    res.json(products)
}
exports.searchFilters = async (req,res) => {
    const { query, price, category, stars, sub, shipping, color, brand } = req.body
    if(query){
        await handleQuery(req,res,query)
    }
    //сортировка по цене
    if(price){
        await handlePrice(req,res,price)
    }
    if(category){
        await handleCategory(req,res,category)
    }
    if(stars){
        await handleStar(req,res,category)
    }
    if(sub){
        await handleSub(req,res,sub)
    }
    if(brand){
        await handleBrand(req,res,brand)
    }
    if(shipping){
        await handleShipping(req,res,shipping)
    }
    if(color){
        await handleColor(req,res,color)
    }
}
