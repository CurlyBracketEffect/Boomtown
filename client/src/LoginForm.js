import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";


const LOGIN = gql`
mutation myLogInMutation($email: String! $password: String!){
  login(input:{
    email: $email
    password: $password
  }){
    csrfToken
    user{
      id
      username
    }
  }
}
`;

function LoginForm({
  setCSRFToken,
}) {

  return(
  <Mutation 
    mutation={LOGIN}
    onCompleted = {(data) =>{
      localStorage.setItem('token', data.login.csrfToken)
      setCSRFToken(data.login.csrfToken)
    }}
  >
    {(signup, { data }) => (
      <Formik
        initialValues={{ email: '', password: '' }}
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
        onSubmit = {(values, { setSubmitting }) => {
          signup({variables: values})
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" placeholder= "Email Address" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" placeholder= "Password"/>
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>  
        )}
      </Formik>
    )}
    </Mutation>
  )
}

export default LoginForm