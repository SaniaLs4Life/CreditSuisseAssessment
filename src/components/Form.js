import React, { useState, useEffect } from 'react';
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
import CustomPersonPicker from './CustomPersonPicker';
import moment from 'moment';

export default function Form({ history }) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  const [isNeedStorytellerChecked, setIsNeedStorytellerChecked] = useState(
    false
  );

  const { id } = useParams();

  useEffect(() => {
    getMatterById();
  }, [id]);

  const getMatterById = async () => {
    try {
      const res = await MattersService.getMatterById(id);
      setValue('RequestName', res.data[0] && res.data[0].RequestName);
      setValue('Requestor', res.data[0] && res.data[0].Requestor);
      setValue('GoodEnding', res.data[0] && res.data[0].GoodEnding);
      setValue('Description', res.data[0] && res.data[0].Description);
      setValue('NeedStoryteller', res.data[0] && res.data[0].NeedStoryteller);
      setValue('Storyteller', res.data[0] && res.data[0].Storyteller);
      setValue('Deadline', res.data[0] && moment(res.data[0].Deadline).format('L'));
      setValue('Budget', res.data[0] && res.data[0].Budget);
      setIsNeedStorytellerChecked(
        res.data[0] && res.data[0].NeedStoryteller ? true : false
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChangeNeedStoryTeller = () => {
    setIsNeedStorytellerChecked(!isNeedStorytellerChecked);
    setValue('NeedStoryteller', !isNeedStorytellerChecked);
  };

  const { register, handleSubmit, errors, setValue, getValues } = useForm();
  const onSubmit = async data => {
    if (!id) {
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
    } else {
      let updatedData = {
        Status: status,
        ...getValues()
      };
      try {
        await MattersService.updateMatterById(parseInt(id), updatedData);
        dispatch(setPopupVisibility(true));
        history.push('/');
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  const handleStatus = status => {
    setStatus(status);
  };

  const handleCancel = () => {
    history.push('/');
  };

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
        <CustomFormButton inverse style={{ width: '250px' }}>
          Current User Role:{' '}
          {isCurrentUserOwner() === true ? 'Owner' : 'No Owner'}
        </CustomFormButton>
        <CustomFormHeader>Matter Submission</CustomFormHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={!isCurrentUserOwner()}>
            <div className="margin-bottom">
              <CustomInputText
                className={!isCurrentUserOwner() ? 'disabled' : ''}
              >
                Request Name*
              </CustomInputText>
              <CustomFormInput
                placeholder="Request Name"
                width="100%"
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
              <CustomInputText
                className={!isCurrentUserOwner() ? 'disabled' : ''}
              >
                Requestor*
              </CustomInputText>
              <CustomPersonPicker register={register} errors={errors} />
            </div>

            <div className="margin-bottom">
              <CustomInputText
                className={errors.GoodEnding ? 'text-error' : ''}
                className={!isCurrentUserOwner() ? 'disabled' : ''}
              >
                Good Ending*
              </CustomInputText>
              <label className="radio-container">
                <span
                  className={
                    errors.GoodEnding
                      ? 'text-error__value'
                      : !isCurrentUserOwner()
                      ? 'disabled'
                      : ''
                  }
                >
                  Yes
                </span>
                <input
                  type="radio"
                  name="GoodEnding"
                  value="Yes"
                  ref={register({ required: 'This field must be selected!' })}
                />
                <span
                  className={`radio-container__circle ${
                    !isCurrentUserOwner() ? 'disabled-border' : ''
                  }`}
                ></span>
              </label>
              <label className="radio-container">
                <span
                  className={
                    errors.GoodEnding
                      ? 'text-error__value'
                      : !isCurrentUserOwner()
                      ? 'disabled'
                      : ''
                  }
                >
                  Depends
                </span>
                <input
                  type="radio"
                  name="GoodEnding"
                  value="Depends"
                  ref={register({ required: 'This field must be selected!' })}
                />
                <span
                  className={`radio-container__circle ${
                    !isCurrentUserOwner() ? 'disabled-border' : ''
                  }`}
                ></span>
              </label>
              <label className="radio-container">
                <span
                  className={
                    errors.GoodEnding
                      ? 'text-error__value'
                      : !isCurrentUserOwner()
                      ? 'disabled'
                      : ''
                  }
                >
                  No
                </span>
                <input
                  type="radio"
                  name="GoodEnding"
                  value="No"
                  ref={register({ required: 'This field must be selected!' })}
                />
                <span
                  className={`radio-container__circle ${
                    !isCurrentUserOwner() ? 'disabled-border' : ''
                  }`}
                ></span>
              </label>
              {errors.GoodEnding && (
                <CustomErrorMessage style={{ marginTop: '10px' }}>
                  {errors.GoodEnding.message}
                </CustomErrorMessage>
              )}
            </div>
            <div className="margin-bottom">
              <CustomInputText
                className={!isCurrentUserOwner() ? 'disabled' : ''}
              >
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
              {errors.Description && (
                <CustomErrorMessage>
                  {errors.Description.type === 'required' &&
                    'This field cannot be empty!'}
                  {errors.Description.type === 'minLength' &&
                    'You must enter minimum 250 characters!'}
                </CustomErrorMessage>
              )}
              <div className="description">“No spoilers please”</div>
            </div>

            <div className="margin-bottom">
              <CustomInputText
                className={!isCurrentUserOwner() ? 'disabled' : ''}
              >
                Need storyteller*
              </CustomInputText>
              <label className="checkbox-container">
                <span
                  className={
                    errors.NeedStoryteller
                      ? 'text-error__value'
                      : !isCurrentUserOwner()
                      ? 'disabled'
                      : ''
                  }
                >
                  Yes
                </span>
                <input
                  type="checkbox"
                  name="NeedStoryteller"
                  checked={isNeedStorytellerChecked}
                  onChange={handleChangeNeedStoryTeller}
                  ref={register({ required: 'This field must be selected!' })}
                />

                <span
                  className={`checkbox-container__circle ${
                    errors.NeedStoryteller
                      ? 'error'
                      : !isCurrentUserOwner()
                      ? 'disabled-border'
                      : ''
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
                <CustomInputText
                  className={!isCurrentUserOwner() ? 'disabled' : ''}
                >
                  Storyteller*
                </CustomInputText>
                <CustomFormInput
                  placeholder="Storyteller"
                  width="100%"                  
                  className={errors.Storyteller ? 'error' : ''}
                  type="text"
                  name="Storyteller"
                  ref={register({ required: 'This field cannot be empty!' })}
                />
                {errors.Storyteller && (
                  <CustomErrorMessage>
                    {errors.Storyteller.message}
                  </CustomErrorMessage>
                )}
              </div>
            )}

            <input hidden name="Status" />

            <div className="margin-bottom">
              <CustomInputText
                className={!isCurrentUserOwner() ? 'disabled' : ''}
              >
                Deadline
              </CustomInputText>
              <CustomDatePicker value={getValues().Deadline} register={register} name="Deadline" />
            </div>

            <div className="margin-bottom">
              <CustomInputText
                className={!isCurrentUserOwner() ? 'disabled' : ''}
              >
                Budget*
              </CustomInputText>
              <CustomFormInput
                placeholder="Budget"
                width="50%"
                className={errors.Budget ? 'error' : ''}
                ref={register({ required: true, min: 250000 })}
                name="Budget"
                type="number"
              />
              {errors.Budget && (
                <CustomErrorMessage>
                  {errors.Budget.type === 'required' &&
                    'This field cannot be empty!'}
                  {errors.Budget.type === 'min' &&
                    'You must enter minimum 250000 Dollars (FBD)!'}
                </CustomErrorMessage>
              )}
              <div className="description">
                “In Fable Dollars (FBD), no less than 250000”
              </div>
            </div>

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
