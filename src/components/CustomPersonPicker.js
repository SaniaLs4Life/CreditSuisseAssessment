import React from 'react';
import PropTypes from 'prop-types';
import {
  CustomInputText,
  CustomFormInput,
  CustomErrorMessage
} from './CustomComponents';

export default function CustomPersonPicker({
  register,
  errors
}) {
  return (
    <>
      <CustomFormInput
        placeholder="Requestor"
        width="100%"
        type="text"
        className={errors.Requestor ? 'error' : ''}
        ref={register({ required: 'This field cannot be empty!' })}
        name="Requestor"
      />
      <CustomErrorMessage>
        {errors.Requestor && errors.Requestor.message}
      </CustomErrorMessage>
    </>
  );
}

CustomPersonPicker.propTypes = {
  register: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  errors: PropTypes.object,
  value: PropTypes.any,
  onChange: PropTypes.func
};
