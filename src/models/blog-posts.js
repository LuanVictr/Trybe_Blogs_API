const BlogPostsSchema = (sequelize, DataTypes) => {
  const BlogPostsTable = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {type: DataTypes.INTEGER, foreignKey: true},
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, {
    timestamps: false,
    tableName: 'blog_posts',
    underscored: true,
  });

  BlogPostsTable.associate = (models) => {
    BlogPostsTable.belongsTo(models.user,{
      foreignKey: 'userId',
      as: 'user'
    });
  }

  return BlogPostsTable;
  };

  module.exports = BlogPostsSchema;