const { Model, DataTypes } = require('sequelize');

class Product extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            value: DataTypes.FLOAT,
        }, {
            sequelize
        })
    }
}

module.exports = Product;