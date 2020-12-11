const { Model, DataTypes } = require('sequelize');

class Purchase extends Model {
    static init(sequelize) {
        super.init({
            pdf_charge_link: DataTypes.STRING,
            charge_id: DataTypes.INTEGER,
        }, {
            sequelize
        })
    }
}

module.exports = Purchase;