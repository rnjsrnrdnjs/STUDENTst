const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const Like = require('./like');
const Memo = require('./memo');
const Note = require('./Note');
const Study = require('./study');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;

db.User=User;
db.Post=Post;
db.Comment=Comment;
db.Like=Like;
db.Memo=Memo;
db.Note=Note;
db.Study=Study;

User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
Like.init(sequelize);
Memo.init(sequelize);
Note.init(sequelize);
Study.init(sequelize);

User.associate(db);
Post.associate(db);
Comment.associate(db);
Like.associate(db);
Memo.associate(db);
Note.associate(db);
Study.associate(db);

module.exports = db;
