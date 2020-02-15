exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    
    for (key of keys) {
        if (req.body[key] == ''){
            return res.render('/not-filled')
        }
    }
    return res.send("OK")
}