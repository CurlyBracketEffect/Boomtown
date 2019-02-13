import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

const CreateItem = () => (
    <div>
      <h1>Create and Item</h1>

              <Formik
          initialValues={{ title: '', description: '', tags: ''}}
          validate={values => {
            let errors = {};
            if (!values.title) {
              errors.title = 'Required';
            }
            if(!values.description){
              errors.description = 'Required';
            }
            if(!values.tags){
              errors.tags = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
                        
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className = "form">
              <Field 
                className= "field" 
                type="text" 
                name="title" 
                placeholder= "Item Name"
                requiredStar
              />
              <ErrorMessage 
                name="title" 
                component="div" 
              />              
              <Field 
                className= "field" 
                type="text" 
                component="textarea" 
                name="description" 
                placeholder= "Item Description"
              />
              <ErrorMessage 
                name="description" 
                component="div" 
              />
              <Field 
                className= "field" 
                type="text" 
                name="tags" 
                placeholder= "Item Tags" 
              />
              <ErrorMessage 
                name="tags" 
                component="div" 
              />

              <button 
                type="submit" 
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
      </Formik>
    </div>
  )


export default CreateItem