import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import useForm from 'react-hook-form';
import {
  CustomNavbar,
  CustomImage,
  CustomFormButton,
  CustomFormHeader,
  CustomFormInput,
  CustomInputText,
  CustomTextArea,
  CustomErrorMessage,
  CustomButton
} from './CustomComponents';
import './Form.scss';
import CreditSuisseLogo from '../assets/credit-suisse-logo.png';
import CustomDatePicker from './CustomDatePicker';
import { MattersService } from '../Services/MattersService';
import { setPopupVisibility } from '../store/actions';

export default function Form({ history }) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  const [isNeedStorytellerChecked, setIsNeedStorytellerChecked] = useState(
    false
  );

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async data => {
    let newData = {
      id: Math.floor(Math.random() * 90000) + 10000,
      Status: status,
      ...data
    };
    try {
      await MattersService.addMatter(newData);
      dispatch(setPopupVisibility(true));
      history.push('/');
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleNeedStoryteller = () => {
    setIsNeedStorytellerChecked(prevState => !prevState);
  };

  const handleStatus = status => {
    setStatus(status);
  };

  const handleCancel = () => {
    history.push('/');
  }

  const isCurrentUserOwner = () => {
    return user && user.Roles.includes('Owner');
  };


  return (
    <div>
      <CustomNavbar className="navbar">
        <Link to="/" className="navbar__link">
          <FaHome className="navbar__icon" />
          <span className="navbar__text">Home</span>
        </Link>
      </CustomNavbar>
      <CustomImage src={CreditSuisseLogo} alt="logo" />
      <div className="form-container">
        <div className="clearfix" />
        <CustomFormButton>Matter submission</CustomFormButton>
        <CustomFormButton inverse>Save changes</CustomFormButton>
        <CustomFormHeader>Matter Submission</CustomFormHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={!isCurrentUserOwner()}>
            <div className="margin-bottom">
              <CustomInputText>Request Name*</CustomInputText>
              <CustomFormInput
                placeholder="Request Name"
                width="100%"
                // value={"Default Request name"}
                // onChange={() => {}}
                type="text"
                className={errors.RequestName ? 'error' : ''}
                ref={register({ required: true, maxLength: 255 })}
                name="RequestName"
              />
              {errors.RequestName && (
                <CustomErrorMessage>
                  {errors.RequestName.type === 'required' &&
                    'This field cannot be empty!'}
                  {errors.RequestName.type === 'maxLength' &&
                    'You must enter maximum 255 characters!'}
                </CustomErrorMessage>
              )}
            </div>

            <div className="margin-bottom">
              <CustomInputText>Requestor*</CustomInputText>
              <CustomFormInput
                placeholder="Requestor"
                width="100%"
                isInline={true}
                type="text"
                className={errors.Requestor ? 'error' : ''}
                ref={register({ required: 'This field cannot be empty!' })}
                name="Requestor"
              />
              <CustomErrorMessage>
                {errors.Requestor && errors.Requestor.message}
              </CustomErrorMessage>
            </div>

            <div className="margin-bottom">
              <CustomInputText
                className={errors.GoodEnding ? 'text-error' : ''}
              >
                Good Ending*
              </CustomInputText>
              <label className="radio-container">
                <span className={errors.GoodEnding ? 'text-error__value' : ''}>
                  Yes
                </span>
                <input
                  type="radio"
                  name="GoodEnding"
                  value="Yes"
                  ref={register({ required: 'This field must be selected!' })}
                />
                <span className="radio-container__circle"></span>
              </label>
              <label className="radio-container">
                <span className={errors.GoodEnding ? 'text-error__value' : ''}>
                  Depends
                </span>
                <input
                  type="radio"
                  name="GoodEnding"
                  value="Depends"
                  ref={register({ required: 'This field must be selected!' })}
                />
                <span className="radio-container__circle"></span>
              </label>
              <label className="radio-container">
                <span className={errors.GoodEnding ? 'text-error__value' : ''}>
                  No
                </span>
                <input
                  type="radio"
                  name="GoodEnding"
                  value="No"
                  ref={register({ required: 'This field must be selected!' })}
                />
                <span className="radio-container__circle"></span>
              </label>
              {errors.GoodEnding && (
                <CustomErrorMessage style={{ marginTop: '10px' }}>
                  {errors.GoodEnding.message}
                </CustomErrorMessage>
              )}
            </div>
            <div className="margin-bottom">
              <CustomInputText>Description*</CustomInputText>
              <CustomTextArea
                placeholder="Description"
                name="Description"
                className={errors.Description ? 'error' : ''}
                ref={register({
                  required: true,
                  minLength: 250
                })}
              />
              {errors.Description && (
                <CustomErrorMessage>
                  {errors.Description.type === 'required' &&
                    'This field cannot be empty!'}
                  {errors.Description.type === 'minLength' &&
                    'You must enter minimum 250 characters!'}
                </CustomErrorMessage>
              )}
              <div className="description-spoiler">“No spoilers please”</div>
            </div>

            <div className="margin-bottom">
              <CustomInputText>Need storyteller*</CustomInputText>
              <label className="checkbox-container">
                <span
                  className={errors.NeedStoryteller ? 'text-error__value' : ''}
                >
                  Yes
                </span>
                <input
                  type="checkbox"
                  name="NeedStoryteller"
                  onChange={() =>
                    setIsNeedStorytellerChecked(!isNeedStorytellerChecked)
                  }
                  ref={register({ required: 'This field must be selected!' })}
                />

                <span
                  className={`checkbox-container__circle ${
                    errors.NeedStoryteller ? 'error' : ''
                  }`}
                ></span>
              </label>
              {errors.NeedStoryteller && (
                <CustomErrorMessage>
                  {errors.NeedStoryteller.message}
                </CustomErrorMessage>
              )}
            </div>

            {isNeedStorytellerChecked && (
              <div className="margin-bottom">
                <CustomInputText>Storyteller*</CustomInputText>
                <CustomFormInput
                  placeholder="Storyteller"
                  width="100%"
                  isInline={true}
                  className={errors.Storyteller ? 'error' : ''}
                  ref={register({ required: 'This field cannot be empty!' })}
                  type="text"
                  name="Storyteller"
                />
                {errors.Storyteller && (
                  <CustomErrorMessage>
                    {errors.Storyteller.message}
                  </CustomErrorMessage>
                )}
              </div>
            )}

            <CustomInputText>Deadline</CustomInputText>
            <CustomDatePicker register={register} name="Deadline" />
            <CustomButton onClick={handleCancel}>Cancel</CustomButton>
            <CustomButton type="submit" onClick={() => handleStatus('New')}>
              Submit
            </CustomButton>
            <CustomButton type="submit" onClick={() => handleStatus('Draft')}>
              Save as draft
            </CustomButton>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
