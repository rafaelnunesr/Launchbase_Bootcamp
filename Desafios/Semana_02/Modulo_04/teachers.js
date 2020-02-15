exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    
    return res.send(req.body)
}