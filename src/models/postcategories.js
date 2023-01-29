const PostCategorieSchema = (sequelize, DataTypes) => {
  const PostCategoriesTable = sequelize.define('PostCategorie', {
    postId: {type: DataTypes.INTEGER, foreignKey: true},
    categoryId: {type: DataTypes.INTEGER, foreignKey:true}
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'posts_categories'
  });

  PostCategoriesTable.associate = ({categories, BlogPosts }) => {
    categories.belongsToMany(BlogPosts, {
      as: 'BlogPosts',
      through: PostCategoriesTable,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    });

    BlogPosts.belongsToMany(categories, {
      as: 'categories',
      through: PostCategoriesTable,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  }

  return PostCategoriesTable;
};

module.exports = PostCategorieSchema;