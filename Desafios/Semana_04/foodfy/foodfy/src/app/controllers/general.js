module.exports = {
    not_found(req, res){
        return res.status(404).render('recipes/not-found')
    }
}
