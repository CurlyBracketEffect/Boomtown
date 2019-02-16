import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SIGNUP = gql`
  mutation mySignUpMutation(
    $email: String!
    $password: String!
    $bio: String!
    $username: String!
  ) {
    signup(
      input: {
        username: $username
        email: $email
        bio: $bio
        password: $password
      }
    ) {
      csrfToken
      user {
        id
        username
        bio
        email
        password
      }
    }
  }
`;

function CreateAccount({ setCSRFToken }) {
  return (
    <Mutation
      onError={error => {
        alert(error);
      }}
      mutation={SIGNUP}
      onCompleted={data => {
        localStorage.setItem('token', data.signup.csrfToken);
        setCSRFToken(data.signup.csrfToken);
        window.location = '/';
      }}
    >
      {(signup, { data }) => (
        <Formik
          initialValues={{ email: '', password: '', bio: '', username: '' }}
          validate={values => {
            let errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            signup({ variables: values });

            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <Field
                className="field"
                type="text"
                name="username"
                placeholder="Username"
              />
              <ErrorMessage name="password" component="div" />
              <Field
                className="field"
                type="email"
                name="email"
                placeholder="Email Address"
              />
              <ErrorMessage name="email" component="div" />
              <Field
                className="field"
                type="text"
                component="textarea"
                name="bio"
                placeholder="Tell us about yourself"
              />
              <ErrorMessage name="password" component="div" />
              <Field
                className="field"
                type="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage name="password" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      )}
    </Mutation>
  );
}

export default CreateAccount;
