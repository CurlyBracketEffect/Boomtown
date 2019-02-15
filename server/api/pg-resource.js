const strs = require('stringstream');
let x = 0;
function tagsQueryString(tags, itemid, result) {
  /**
   * Challenge:
   * This function is recursive, and a little complicated.
   * Can you refactor it to be simpler / more readable?
   */
  const length = tags.length;
  return length === 0
    ? `${result};`
    : tags.shift() &&
        tagsQueryString(
          tags,
          itemid,
          `${result}($${tags.length + 1}, ${itemid})${length === 1 ? '' : ','}`
        );
}

module.exports = postgres => {
  return {
    //LATER -- PART 2
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text: '', // @TODO: Authentication - Server
        values: [fullname, email, password]
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.';
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.';
          default:
            throw 'There was a problem creating your account.';
        }
      }
    },
    //LATER -- PART 2
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: 'Select * from users where email = $1', // @TODO: Authentication - Server
        values: [email]
      };
      const user = await postgres.query(findUserQuery);
      if (!user) throw 'User was not found.';
      return user.rows[0];
    },

    async getUserById(id) {
      //given the id for a user, return all the data in that row   //WORKS
      /**
       *  @TODO: Handling Server Errors
       *
       *  Inside of our resource methods we get to determine when and how errors are returned
       *  to our resolvers using try / catch / throw semantics.
       *
       *  Ideally, the errors that we'll throw from our resource should be able to be used by the client
       *  to display user feedback. This means we'll be catching errors and throwing new ones.
       *
       *  Errors thrown from our resource will be captured and returned from our resolvers.
       *
       *  This will be the basic logic for this resource method:
       *  1) Query for the user using the given id. If no user is found throw an error.
       *  2) If there is an error with the query (500) throw an error.
       *  3) If the user is found and there are no errors, return only the id, email, fullname, bio fields.
       *     -- this is important, don't return the password!
       *
       *  You'll need to complete the query first before attempting this exercise.
       */

      const findUserQuery = {
        text: 'SELECT * FROM users WHERE id = $1',
        values: [id]
      };

      /**
       *  Refactor the following code using the error handling logic described above.
       *  When you're done here, ensure all of the resource methods in this file
       *  include a try catch, and throw appropriate errors.
       *
       *  Here is an example throw statement: throw 'User was not found.'
       *  Customize your throw statements so the message can be used by the client.
       */
      try {
        const user = await postgres.query(findUserQuery);
        return user.rows[0];
      } catch (e) {
        throw 'User is not found';
      }
    },
    async getItems(idToOmit) {
      //WORKS
      const items = await postgres.query({
        text: `SELECT * FROM items ${idToOmit ? `WHERE NOT id = $1;` : ''}`,
        values: idToOmit ? [idToOmit] : []
      });
      if (items.rowCount < 1) throw 'No items were found'; //if no items were returned, throw this error
      return items.rows;
    },
    // PART 1
    async getItemsForUser(id) {
      //Returns a list of all the items a user owns //WORKS
      const items = await postgres.query({
        text: `SELECT * FROM items WHERE ownerid = $1`,
        values: [id]
      });
      //Error message if the id does not exist handled under USER
      return items.rows;
    },
    // PART 1
    async getBorrowedItemsForUser(id) {
      //Returns a list of all items a user has borrowed //WORKS
      const items = await postgres.query({
        text: `SELECT * FROM items where borrowerid = $1`,
        values: [id]
      });
      return items.rows;
    },
    async getTags() {
      //Returns a list of all tags //WORKS
      // PART 1
      const tags = await postgres.query({
        text: `SELECT * from tags`,
        values: []
      });
      return tags.rows;
    },
    async getTagsForItem(id) {
      //Returns a list of all the tags that belong to an item //DOES NOT WORK!!!
      // PART 1
      const tagsQuery = {
        text: `SELECT * FROM tags INNER JOIN items_tags ON items_tags.tag_id = tags.id WHERE item_id = $1;`, // @TODO: Advanced queries
        values: [id]
      };

      const tags = await postgres.query(tagsQuery);

      return tags.rows;
    },
    async getItemsOwner(itemID) {
      //Returns the owner of an item
      // PART 1
      const user = await postgres.query({
        text: `SELECT * FROM users WHERE id =(SELECT ownerid FROM items WHERE id = $1)`,
        values: [itemID]
      });
      return user.rows;
    },
    async getItemsBorrower(itemID) {
      //Returns the borrower of an item
      // PART 1
      const user = await postgres.query({
        text: `SELECT * FROM users WHERE id =(SELECT borrowerid FROM items WHERE id = $1)`,
        values: [itemID]
      });
      return user.rows;
    },
    async saveNewItem({
      title,
      imageURL,
      description,
      ownerid,
      borrowerid,
      tagIDs
    }) {
      /**
       *  @TODO: Adding a New Item
       *
       *  Adding a new Item to Posgtres is the most advanced query.
       *  It requires 3 separate INSERT statements.
       *
       *  All of the INSERT statements must:
       *  1) Proceed in a specific order.
       *  2) Succeed for the new Item to be considered added
       *  3) If any of the INSERT queries fail, any successful INSERT
       *     queries should be 'rolled back' to avoid 'orphan' data in the database.
       *
       *  To achieve #3 we'll ue something called a Postgres Transaction!
       *  The code for the transaction has been provided for you, along with
       *  helpful comments to help you get started.
       *
       *  Read the method and the comments carefully before you begin.
       */

      /**
       * Begin transaction by opening a long-lived connection
       * to a client from the client pool.
       * - Read about transactions here: https://node-postgres.com/features/transactions
       */
      const client = await postgres.connect();
      try {
        // Begin postgres transaction
        await client.query('BEGIN');

        // Insert new Item
        // @TODO
        // -------------------------------
        const itemResult = await client.query({
          text: `INSERT INTO items (title, imageURL, description, ownerid, borrowerid) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          values: [title, imageURL, description, ownerid, borrowerid] //currently does not return the array of tagIDs
        });

        // Insert tags
        // @TODO
        // -------------------------------

        tagIDs = tagIDs ? tagIDs : [];

        const item_id = itemResult.rows[0].id;
        const tagPromise = tagIDs.map(async tagID => {
          await client.query({
            text: `INSERT INTO items_tags (item_id, tag_id) VALUES ($1, $2)`,
            values: [item_id, tagID]
          });
        });
        await Promise.all(tagPromise);

        // Commit the entire transaction!
        await client.query('COMMIT');

        return itemResult.rows[0];
      } catch (e) {
        // Something went wrong
        client.query('ROLLBACK', err => {
          if (err) {
            throw err;
          }
          // release the client back to the pool
        });
        throw e;
      }
    },
    async createUser(userToAdd) {
      //Returns the borrower of an item
      // PART 1
      const user = await postgres.query({
        text: `INSERT INTO users (username, email, bio, password) VALUES ($1, $2, $3, $4)RETURNING *`,
        values: [
          userToAdd.username,
          userToAdd.email,
          userToAdd.bio,
          userToAdd.password
        ]
      });
      return user.rows[0];
    }
  };
};
