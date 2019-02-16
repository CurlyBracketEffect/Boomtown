import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import AllTags from './AllTags';
import MySelect from './MySelect';

const CREATEITEM = gql`
  mutation myCreateItemMutation($item: NewItemInput!) {
    addItem(input: $item) {
      id
      title
    }
  }
`;

const CreateItem = () => (
  <div>
    <h1>Create and Item</h1>
    <Mutation
      onError = {(error) => {
        alert(error)
      }}
      mutation={CREATEITEM}
      onCompleted={data => {
        console.log(data);
        window.location = '/';
      }}
    >
      {(createItem, { data }) => (
        <Formik
          initialValues={{ title: '', description: '', tags: '' }}
          validate={values => {
            let errors = {};
            if (!values.title) {
              errors.title = 'Required';
            }
            if (!values.description) {
              errors.description = 'Required';
            }
            if (!values.tags) {
              errors.tags = 'Required';//DOESN'T WORK Breaks component
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const actualTagIDs = values.tags.map(tag => tag.value);
            values.tagIDs = actualTagIDs;
            delete values.tags;
            createItem({
              variables: {
                item: values
              }
            });
            setSubmitting(false);
          }}
        >
          {({
            isSubmitting,
            values,
            setFieldValue,
            setFieldTouched,
            errors,
            touched
          }) => (
            <Form className="form">
              <Field
                className="field"
                type="text"
                name="title"
                placeholder="Item Name"
              />
              <ErrorMessage name="title" component="div" />
              <Field
                className="field"
                type="text"
                component="textarea"
                name="description"
                placeholder="Item Description"
              />
              <ErrorMessage name="description" component="div" />
              <AllTags>
                {tags => (
                  <MySelect
                    value={values.topics}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    error={errors.topics}
                    touched={touched.topics}
                    tags={tags}
                  />
                )}
              </AllTags>
              <ErrorMessage name="tags" component="div" />

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      )}
    </Mutation>
  </div>
  
);

export default CreateItem;
