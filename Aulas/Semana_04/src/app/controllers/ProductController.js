const Category = require('../../app/models/Category')
const Product = require('../../app/models/Product')
const { formatPrice } = require('../../lib/utils')

module.exports = {
    create(req, res){
        // Pegar as categorias

        Category.all()
        .then(function(results){

            const categories = results.rows

            return res.render("products/create.njk", { categories })
        }).catch(function(err){ // If error
            throw new Error(err)
        })
    },
    async post(req, res){
        // Logica de salvar

        const keys = Object.keys(req.body)

        for (key of keys){
            if(req.body[key] == ''){
                return res.send('Please, fill all the fields!')
            }
        }

        let results = await Product.create(req.body)
        const productId = results.rows[0].id

        return res.redirect(`/products/${productId}/edit`)

    },
    async edit(req, res){

        let results = await Product.find(req.params.id)
        const product = results.rows[0]

        if(!product) return res.send('Product not found!')

        product.old_price = formatPrice(product.old_price)
        product.price = formatPrice(product.price)

        results = await Category.all()
        const categories = results.rows

        return res.render('products/edit.njk', { product, categories })
    }
}