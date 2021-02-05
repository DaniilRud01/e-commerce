const Category = require('../models/category')
const Product = require('../models/product')
const Sub = require('../models/sub')
const slugify = require('slugify')

exports.create = async (req, res) => {
    try {
        const {name} = req.body
        const category = await new Category({name, slug: slugify(name)}).save()
        res.json(category)
    } catch (e) {
        res.status(400).send('Ошибка при добавлении категории')
    }
}

exports.list = async (req, res) => {
    res.json(await Category.find({}).sort({CreatedAt: -1}).exec())
}
exports.read = async (req, res) => {
    let category = await Category.findOne({slug: req.params.slug}).exec()
  const products =  await Product.find({category})
        .populate('categories')
        .exec()
    res.json({
        category,
        products
    })
}
exports.update = async (req, res) => {
    const {name} = req.body
    try {
        const updated = await Category.findOneAndUpdate(
            {slug: req.params.slug},
            {name, slug: slugify(name)},
            {new: true}
        )
        res.json(updated)
    } catch (err) {
        res.json('category not updated', err)
    }
}
exports.remove = async (req, res) => {
    try {
        const deleted = await Category.findOneAndDelete({slug: req.params.slug})
        res.json(deleted)
    } catch (err) {
        res.json('category not removed', err)
    }
}

exports.getSubs = (req, res) => {
    Sub.find({parent: req.params._id}).exec((err, subs) => {
        if (err) console.log(err)
        res.json(subs)
    })
}