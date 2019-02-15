import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const AllTags = ({ children }) => (
  <Query
    query={gql`
      query {
        tags {
          id
          title
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) {
        console.log(error);
        return <div>Error </div>;
      }
      const tags = data.tags.map(tag => ({
        label: tag.title,
        value: tag.id
      }));
      return children(tags);
    }}
  </Query>
);

export default AllTags;
