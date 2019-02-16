import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const RETURN = gql`
  mutation myReturnMutation($itemID: BorrowInput!) {
    returnItem(input: $itemID)
  }
`;

const ReturnButton = props => {
  return (
    <Mutation onError = {(error) => {
      alert(error)
    }}
    mutation={RETURN} onCompleted={data => {}}>
      {(returnItem, { data }) => (
        <button
          onClick={() => {
            returnItem({
              variables: {
                itemID: props.itemID
              }
            });
            window.location = '/borrowed';
          }}
        >
          Return
        </button>
      )}
    </Mutation>
  );
};

export default ReturnButton;
