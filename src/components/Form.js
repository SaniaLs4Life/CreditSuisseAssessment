import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { useForm } from '../utils/useForm';
import {
  CustomNavbar,
  CustomImage,
  CustomFormButton,
  CustomFormHeader,
  CustomFormInput,
  CustomInputText,
  CustomTextArea
} from './CustomComponents';
import './Form.scss';
import CreditSuisseLogo from '../assets/credit-suisse-logo.png';

export default function Form() {
  console.log(useParams());
  const user = useSelector(state => state.user);

  const [fields, handleFieldsChange] = useForm({
    RequestName: '',
    Requestor: '',
    goodEnding: ''
  });

  const isCurrentUserOwner = () => {
    return user && user.Roles.includes('Owner');
  };

  return (
    <div>
      <CustomNavbar className="navbar">
        <Link to='/' className="navbar__link">
          <FaHome className="navbar__icon" />
          <span className="navbar__text">Home</span>
        </Link>
      </CustomNavbar>
      <CustomImage src={CreditSuisseLogo} alt='logo' />
      <div className="form-container">
        <div className="clearfix" />
        <CustomFormButton>Matter submission</CustomFormButton>
        <CustomFormButton inverse>Save changes</CustomFormButton>
        <CustomFormHeader>Matter Submission</CustomFormHeader>
        <form>
          <fieldset disabled={!isCurrentUserOwner()}>
            <CustomInputText>Request Name*</CustomInputText>
            <CustomFormInput
              placeholder='Request Name'
              width='100%'
              type='text'
              value={fields.RequestName}
              name='RequestName'
              onChange={handleFieldsChange}
            />

            <CustomInputText>Requestor*</CustomInputText>
            <CustomFormInput
              placeholder='Requestor'
              width='100%'
              isInline={true}
              type='text'
              value={fields.Requestor}
              name='Requestor'
              onChange={handleFieldsChange}
            />

            <CustomInputText>Storyteller*</CustomInputText>
            <CustomFormInput
              placeholder='Storyteller'
              width='100%'
              isInline={true}
              type='text'
              value={fields.StoryTeller}
              name='StoryTeller'
              onChange={handleFieldsChange}
            />
            
            <CustomInputText>Good Ending*</CustomInputText>
            <label className="radio-container">Yes
              <input type="radio" name="asd" />
              <span className="radio-container__circle"></span>
            </label>
            <label className="radio-container">Depends
              <input type="radio" name="asd" />
              <span className="radio-container__circle"></span>
            </label>
            <label className="radio-container">No
              <input type="radio" name="asd" />
              <span className="radio-container__circle"></span>
            </label>
            
            <CustomInputText>Description*</CustomInputText>
            <CustomTextArea placeholder="Description" />
            <div className="description-spoiler">“No spoilers please”</div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
