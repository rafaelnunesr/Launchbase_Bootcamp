const Cart = require('../../lib/cart')

const LoadProductService = require('../services/LoadProductServices')

module.exports = {
    async index(req, res) {
        try {
            let { cart } = req.session

            cart = Cart.init(cart)

            return res.render('cart/index', { cart })
        } catch (error) {
            console.error(error)
        }
    },
    async addOne(req, res) {
        try {
            const { id } = req.params

            const product = await LoadProductService.load('product', { where: { id }})
    
            let { cart } = req.session
    
            cart = Cart.init(cart).addOne(product)
    
            req.session.cart = cart
    
            return res.redirect('/cart')
        } catch (error) {
            console.error(error)
        }
    },
    removeOne (req, res) {
        // pegar o id do produto
        let { id } = req.params

        // pegar o carrinho da sessao
        let { cart } = req.session

        // se nao tiver carrinho, retornar
        if(!cart) return res.redirect('/cart')

        // iniciar o carrinho (gerenciador de carrinho) e remover
        cart = Cart.init(cart).removeOne(id)

        // atualizar o carrinho da sessão, removendo um item
        req.session.cart = cart

        // redirecionamento para a pagina cart
        return res.redirect('/cart')
    },
    delete(req, res) {
        let { id } = req.params
        let { cart } = req.session

        if(!cart) return

        req.session.cart = Cart.init(cart).delete(id)

        return res.redirect('/cart')
    }
}