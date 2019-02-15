import React from 'react';
import Select from 'react-select';

const MySelect = ({ value, onChange, onBlur, touched, error, tags }) => {
  // console.log(tags);
  const handleChange = value => {
    // this is going to call setFieldValue and manually update values.topcis
    onChange('tags', value);
  };

  const handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    onBlur('tags', true);
  };
  return (
    <div style={{ margin: '1rem 0' }}>
      <label htmlFor="tags">Tags</label>
      <Select
        id="tags"
        options={tags}
        isMulti
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      />
      {!!error && touched && (
        <div style={{ color: 'red', marginTop: '.5rem' }}>{error}</div>
      )}
    </div>
  );
};

export default MySelect;
