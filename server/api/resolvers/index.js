/**
 *  @TODO: Handling Server Errors
 *
 *  Once you've completed your pg-resource.js methods and handled errors
 *  use the ApolloError constructor to capture and return errors from your resolvers.
 *
 *  Throwing ApolloErrors from your resolvers is a nice pattern to follow and
 *  will help you easily debug problems in your resolving functions.
 *
 *  It will also help you control th error output of your resource methods and use error
 *  messages on the client! (More on that later).
 *
 *  The user resolver has been completed as an example of what you'll need to do.
 *  Finish of the rest of the resolvers when you're ready.
 */
const { ApolloError } = require('apollo-server-express');

// @TODO: Uncomment these lines later when we add auth
const jwt = require('jsonwebtoken');
const authMutations = require('./auth');
// -------------------------------
const { UploadScalar, DateScalar } = require('../custom-types');

const authenticate = require('../authenticate');

module.exports = app => {
  return {
    // Upload: UploadScalar,
    // Date: DateScalar,

    Query: {
      async viewer(parent, args, context) {
        //PART 2
        /**
         * @TODO: Authentication - Server
         *
         *  If you're here, you have successfully completed the sign-up and login resolvers
         *  and have added the JWT from the HTTP cookie to your resolver's context.
         *
         *  The viewer is what we're calling the current user signed into your application.
         *  When the user signed in with their username and password, an JWT was created with
         *  the user's information cryptographically encoded inside.
         *
         *  To provide information about the user's session to the app, decode and return
         *  the token's stored user here. If there is no token, the user has signed out,
         *  in which case you'll return null
         */

        const userID = authenticate(app, context.req);

        const user = await context.pgResource.getUserById(userID);

        return user;
      },
      async user(parent, { id }, { pgResource, req }, info) {
        //WORKS!!!
        // authenticate(app, req)
        try {
          const user = await pgResource.getUserById(id);
          return user;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async items(parent, args, { pgResource, req }, info) {
        //WORKS
        // authenticate(app, req)
        try {
          const items = await pgResource.getItems(args.filter);
          console.log('ITEMS', items);
          return items;
        } catch (e) {
          throw new ApolloError(e);
        }
        // -------------------------------
      },
      async tags(parent, { id }, { pgResource, req }, info) {
        //WORKS
        // authenticate(app, req)
        try {
          const allTags = await pgResource.getTags();
          return allTags;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    User: {
      /**
       *  @TODO: Advanced resolvers
       *
       *  The User GraphQL type has two fields that are not present in the
       *  user table in Postgres: items and borrowed.
       *
       *  According to our GraphQL schema, these fields should return a list of
       *  Items (GraphQL type) the user has lent (items) and borrowed (borrowed).
       *
       */
      async items(user, {}, { pgResource }) {
        //WORKS
        try {
          const items = await pgResource.getItemsForUser(user.id);
          return items;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async borrowed(user, {}, { pgResource }) {
        //WORKS
        try {
          const items = await pgResource.getBorrowedItemsForUser(user.id);
          return items;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
      // -------------------------------
    },

    Item: {
      /**
       *  @TODO: Advanced resolvers
       *
       *  The Item GraphQL type has two fields that are not present in the
       *  Items table in Postgres: itemowner, tags and borrower.
       *
       * According to our GraphQL schema, the itemowner and borrower should return
       * a User (GraphQL type) and tags should return a list of Tags (GraphQL type)
       *
       */
      // @TODO: Uncomment these lines after you define the Item type with these fields
      async owner(parent, {}, { pgResource }, info) {
        //WORKs
        try {
          if (parent.ownerid == null) return null;
          const owner = await pgResource.getUserById(parent.ownerid);
          return owner;
        } catch (e) {
          throw new ApolloError(e);
        }
        // -------------------------------
      },
      async tags(parent, {}, { pgResource }, info) {
        //WORKS
        try {
          const tags = await pgResource.getTagsForItem(parent.id);
          return tags;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async borrower(parent, {}, { pgResource }, info) {
        //WORKS
        /**
         * @TODO: Replace this mock return statement with the correct user from Postgres
         * or null in the case where the item has not been borrowed.
         */
        try {
          const tags = await pgResource.getUserById(parent.borrowerid);
          return tags;
        } catch (e) {
          throw new ApolloError(e);
        }
        return null;
        // -------------------------------
      }
      //
      // -------------------------------
    },

    Mutation: {
      // @TODO: Uncomment this later when we add auth
      ...authMutations(app),
      // -------------------------------

      addItem: async (parent, args, { pgResource, req }, info) => {
        // authenticate(app, req)
        /*
         *  @TODO: Destructuring
         *
         *  The 'args' and 'context' parameters of this resolver can be destructured
         *  to make things more readable and avoid duplication.
         *
         *  When you're finished with this resolver, destructure all necessary
         *  parameters in all of your resolver functions.
         *
         *  Again, you may look at the user resolver for an example of what
         *  destructuring should look like.
         */

        // image = await image;
        // const user = await jwt.decode(context.token, app.get('JWT_SECRET'));
        args.input.ownerid = authenticate(app, req);
        const newItem = await pgResource.saveNewItem(args.input);
        return newItem;
      }
    }
  };
};
