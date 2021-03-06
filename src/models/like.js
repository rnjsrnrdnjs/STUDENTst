const Sequelize = require('sequelize');

module.exports = class Like extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
				toggle:{
					type: Sequelize.STRING(10),
                    allowNull: false,
                    unique: false,
				}
			},
			{
				sequelize,
				timestamps:true,
				underscored:false,
				modelName:'Like',
				tableName:'likes',
				paranoid:false,
				charset:'utf8',
				collate:'utf8_general_ci',
			}
        );
    }

    static associate(db) {
		db.Like.belongsTo(db.User);
		db.Like.belongsTo(db.Post);
	}
};
