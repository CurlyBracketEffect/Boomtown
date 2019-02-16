import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const BORROW = gql`
  mutation myBorrowMutation($itemID: BorrowInput!) {
    borrowItem(input: $itemID)
  }
`;

const BorrowButton = props => {
  return (
    <Mutation 
    onError = {(error) => {
      alert(error)
    }}
    mutation={BORROW} onCompleted={data => {}}>
      {(borrowItem, { data }) => (
        <button
          onClick={() => {
            borrowItem({
              variables: {
                itemID: props.itemID
              }
            });
            window.location = '/library';
          }}
        >
          Borrow
        </button>
      )}
    </Mutation>
  );
};

export default BorrowButton;
