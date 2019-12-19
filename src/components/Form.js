import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import useForm from 'react-hook-form';
import Popover from 'react-popover';
// import { useForm } from '../utils/useForm';
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
  // console.log(useParams());
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [toggleDate, setToggleDate] = useState(false);
  const [Deadline, setDeadline] = useState('');

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async data => {
    let newData = {
      id: Math.floor(Math.random() * 90000) + 10000,
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

  const isCurrentUserOwner = () => {
    return user && user.Roles.includes('Owner');
  };

  const toggleDatePicker = () => {
    setToggleDate(prevState => !prevState);
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
            <CustomInputText className={errors.RequestName ? 'text-error' : ''}>
              Request Name*
            </CustomInputText>
            <CustomFormInput
              placeholder="Request Name"
              width="100%"
              type="text"
              className={errors.RequestName ? 'error' : ''}
              ref={register({ required: 'This field cannot be empty!' })}
              name="RequestName"
            />
            <CustomErrorMessage>
              {errors.RequestName && errors.RequestName.message}
            </CustomErrorMessage>

            <CustomInputText className={errors.Requestor ? 'text-error' : ''}>
              Requestor*
            </CustomInputText>
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

            <CustomInputText className={errors.Storyteller ? 'text-error' : ''}>
              Storyteller*
            </CustomInputText>
            <CustomFormInput
              placeholder="Storyteller"
              width="100%"
              isInline={true}
              className={errors.Storyteller ? 'error' : ''}
              ref={register({ required: 'This field cannot be empty!' })}
              type="text"
              name="Storyteller"
            />
            <CustomErrorMessage>
              {errors.Storyteller && errors.Storyteller.message}
            </CustomErrorMessage>

            <CustomInputText className={errors.GoodEnding ? 'text-error' : ''}>
              Good Ending*
            </CustomInputText>
            <label className="radio-container">
              <span className={errors.GoodEnding ? 'radio-error' : ''}>
                Yes
              </span>
              <input
                type="radio"
                name="GoodEnding"
                value="Yes"
                ref={register({ required: 'This field cannot be empty!' })}
              />
              <span className="radio-container__circle"></span>
            </label>
            <label className="radio-container">
              <span className={errors.GoodEnding ? 'radio-error' : ''}>
                Depends
              </span>
              <input
                type="radio"
                name="GoodEnding"
                value="Depends"
                ref={register({ required: 'This field cannot be empty!' })}
              />
              <span className="radio-container__circle"></span>
            </label>
            <label className="radio-container">
              <span className={errors.GoodEnding ? 'radio-error' : ''}>No</span>
              <input
                type="radio"
                name="GoodEnding"
                value="No"
                ref={register({ required: 'This field cannot be empty!' })}
              />
              <span className="radio-container__circle"></span>
            </label>
            {errors.GoodEnding && (
              <CustomErrorMessage style={{ marginTop: '10px' }}>
                {errors.GoodEnding.message}
              </CustomErrorMessage>
            )}
            <CustomInputText className={errors.Description ? 'text-error' : ''}>
              Description*
            </CustomInputText>
            <CustomTextArea
              placeholder="Description"
              name="Description"
              className={errors.Description ? 'error' : ''}
              ref={register({
                required: true,
                minLength: 250
              })}
            />
            <div className="description-spoiler">“No spoilers please”</div>

            {errors.Description && (
              <CustomErrorMessage>
                {errors.Description.type === 'required' &&
                  'This field cannot be empty!'}
                {errors.Description.type === 'minLength' &&
                  'You must enter minimum 250 characters!'}
              </CustomErrorMessage>
            )}

            <CustomInputText>Deadline</CustomInputText>
            <Popover
              isOpen={toggleDate}
              body={
                <CustomDatePicker
                  setDeadline={setDeadline}
                  toggleDatePicker={toggleDatePicker}
                />
              }
            >
              <CustomFormInput
                width="100%"
                type="text"
                onClick={toggleDatePicker}
                value={Deadline}
                onChange={() => {}}
                name="Deadline"
                ref={register}
                placeholder="DD/MM/YYYY"
              />
            </Popover>
            <CustomButton type="submit">Save</CustomButton>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
