import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { useForm } from '../utils/useForm';
import {
  CustomNavbar,
  CustomImage,
  CustomFormButton,
  CustomFormHeader,
  CustomFormInput
} from './CustomComponents';
import './Form.scss';

export default function Form() {
  //   console.log(useParams());
  const user = useSelector(state => state.user);

  const [fields, handleFieldsChange] = useForm({
    email: '',
    password: '',
    goodEnding: ''
  });

  const isCurrentUserOwner = () => {
    return user && user.Roles.includes('Owner');
  };

  return (
    <div>
      <CustomNavbar>
        <Link to="/" style={{ color: '#FFF', textDecoration: 'none' }}>
          <FaHome style={{ marginRight: '10px', verticalAlign: 'middle' }} />
          <span style={{ verticalAlign: 'middle' }}>Home</span>
        </Link>
      </CustomNavbar>
      <CustomImage
        src={
          'https://beyond-coal.eu/wp-content/uploads/2018/11/credit-suisse-logo-png-credit-suisse-credit-suisse-logo-5000.png'
        }
        alt="logo"
      />
      <div style={{ padding: '0 30px 0 30px' }}>
        <div style={{ clear: 'both' }} />
        <CustomFormButton>Matter submission</CustomFormButton>
        <CustomFormButton inverse>Save changes</CustomFormButton>
        <CustomFormHeader>Matter Submission</CustomFormHeader>
        <form>
          <fieldset disabled={!isCurrentUserOwner()}>
            <CustomFormInput
              placeholder="Request Name"
              width="100%"
              type="text"
              value={fields.email}
              name="email"
              onChange={handleFieldsChange}
            />
            <CustomFormInput
              placeholder="Requestor"
              width="45%"
              isInline={true}
              type="text"
              value={fields.password}
              name="password"
              onChange={handleFieldsChange}
            />
            <CustomFormInput
              placeholder="Good Ending"
              width="45%"
              isInline={true}
              type="text"
              value={fields.goodEnding}
              name="goodEnding"
              onChange={handleFieldsChange}
            />
          </fieldset>
        </form>
      </div>
    </div>
  );
}
