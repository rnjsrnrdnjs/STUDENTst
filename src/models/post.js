const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
				title:{
					type:Sequelize.STRING(40),
					allowNull:false,
                    unique: false,
				},
				content:{
					type: Sequelize.STRING(40),
                    allowNull: false,
                    unique: false,
				},
				img:{
					type: Sequelize.STRING(40),
                    allowNull: true,
                    unique: false,
				},
			},
			{
				sequelize,
				timestamps:true,
				underscored:false,
				modelName:'Post',
				tableName:'posts',
				paranoid:false,
				charset:'utf8',
				collate:'utf8_general_ci',
			}
        );
    }

    static associate(db) {
		db.Post.belongsTo(db.User);
		db.Post.hasMany(db.Comment);
		db.Post.hasMany(db.Like);
	}
};
