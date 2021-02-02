const fs = require('fs/promises');
const path = require('path');
const dbProducts = require('../config/products.json');

class Model {
    save() {
        dbProducts.push(this);

        let productPath = path.join(__dirname, '../config/products.json');

        return fs.writeFile(productPath,
        JSON.stringify(dbProducts));
    };

    static getAll() {
        return dbProducts;
    };

    static getOne(id) {
        return dbProducts.find(x => x.id == id);
    }
}

module.exports = Model;