const { getData } = require("../models/product")

class ProductController {

    static GetList(req, res) {
        const list = getData()
        res.status(200).json(list);
    }
}

module.exports = ProductController