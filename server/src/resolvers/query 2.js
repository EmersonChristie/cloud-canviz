const { authenticated } = require("../utils/auth");
/*
Remember the resolver function signature:
fieldName: (obj, args, context, info) => result;
*/
module.exports = {
  Query: {
    getAllArt: async (_, {offset = 0, limit}, { dataSources }) => dataSources.Art.getAllArt(offset, limit),
    getAllUsers: async (_, args, { dataSources }) =>
      dataSources.Users.getAllUsers(),
    getUser: async (_, { id }, { dataSources }) =>
      dataSources.Users.getUser(id),
    currentUser: authenticated((root, args, context, info) => context.user)
  }
};