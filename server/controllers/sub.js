const Sub = require('../models/sub')
const Product = require('../models/product')
const slugify = require('slugify')

exports.create = async (req,res) => {
    try{
        const { name, parent } = req.body
        const category = await new Sub ({ name, parent, slug: slugify(name) }).save()
        res.json(category)
    }catch (e) {
        res.status(400).send('Ошибка при добавлении подкатегории')
    }
}

exports.list = async (req,res) => {
    res.json(await Sub.find({}).sort({CreatedAt: -1}).exec())
}
exports.read = async (req,res) => {
    let subs = await Sub.findOne({slug: req.params.slug}).exec()
    console.log('subs ->', subs)
    const products =  await Product.find({ subs })
        .populate('categories')
        .exec()
    res.json({
        subs,
        products
    })
}

exports.update = async (req,res) => {
    const { name, parent } = req.body
    try{
        const updated = await Sub.findOneAndUpdate(
            { slug: req.params.slug },
            { name, parent, slug: slugify(name) },
            { new: true }
        )
        res.json(updated)
    }catch (err) {
        res.json('sub not updated', err)
    }
}
exports.remove = async (req,res) => {
    try{
        const deleted = await Sub.findOneAndDelete({slug: req.params.slug})
        res.json(deleted)
    }catch (err) {
        res.json('sub not removed', err)
    }
}