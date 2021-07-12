const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
				content:{
					type: Sequelize.STRING(40),
                    allowNull: false,
                    unique: false,
				},
				img:{
					type: Sequelize.STRING(40),
                    allowNull: false,
                    unique: false,
				},
			},
			{
				sequelize,
				timestamps:true,
				underscored:false,
				modelName:'Comment',
				tableName:'comments',
				paranoid:false,
				charset:'utf8',
				collate:'utf8_general_ci',
			}
        );
    }

    static associate(db) {
		db.Comment.belongsTo(db.User);
		db.Comment.belongsTo(db.Post);
	}
};
