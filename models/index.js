const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");


Blog.belongsTo(User, {
    foreignKey: 'userId'
});

Blog.hasMany(Comment, {
    foreignKey: 'blogId'
});
Comment.belongsTo(User, {
    foreignKey:'userId'
});

module.exports = { User, Blog,Comment}