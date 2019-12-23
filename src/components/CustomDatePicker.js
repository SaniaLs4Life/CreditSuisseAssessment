import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdClose,
  IoMdCalendar
} from 'react-icons/io';
import { CustomFormInput } from './CustomComponents';
import Popover from 'react-popover';
import './CustomDatePicker.scss';

export default function CustomDatePicker({
  register,
  name,
  value,
  isCurrentUserOwner
}) {
  const [day, setDay] = useState(
    moment()
      .date()
      .toString()
  );
  const [month, setMonth] = useState(
    moment()
      .month()
      .toString()
  );
  const [year, setYear] = useState(
    moment()
      .year()
      .toString()
  );

  const [toggleDate, setToggleDate] = useState(false);

  const [Deadline, setDeadline] = useState('');

  useEffect(() => {
    setDeadline(
      `${moment()
        .month(month)
        .format('MM')}/${moment()
        .date(day)
        .format('DD')}/${moment()
        .year(year)
        .format('YYYY')}`
    );
  }, [day, month, year]);

  useEffect(() => {
    setDeadline(moment(value).format('L'));
  }, [value]);

  const handleGoToToday = () => {
    setDay(moment().date());
    setMonth(moment().month());
    setYear(moment().year());
  };

  const handleChangeMonth = isNext => {
    if (isNext) {
      setMonth(
        moment(month)
          .add(1, 'month')
          .format('M')
      );
    } else {
      setMonth(
        moment(month)
          .add(-1, 'month')
          .format('M')
      );
    }
  };

  const handleNextYear = value => {
    setYear(prevState =>
      moment()
        .year(prevState)
        .add(value, 'year')
        .format('YYYY')
    );
  };

  const getYear = () => {
    return moment()
      .year(year)
      .format('YYYY');
  };

  const handleSetMonth = month => {
    setMonth(month);
  };

  const handleSetDay = day => {
    let dayString = day.toString();
    toggleDatePicker();
    setDay(dayString);
  };

  const toggleDatePicker = () => {
    if (isCurrentUserOwner) {
      setToggleDate(prevState => !prevState);
    }
  };

  return (
    <Popover
      isOpen={toggleDate}
      body={
        <div className="date-container">
          <div className="date-container__close">
            <IoMdClose size="32px" onClick={toggleDatePicker} />
          </div>
          <div className="date-container__header">
            <div className="date-container__header--month">
              <IoIosArrowBack
                onClick={() => handleChangeMonth(false)}
                style={{
                  verticalAlign: 'middle',
                  marginRight: '15px',
                  cursor: 'pointer'
                }}
              />
              {moment()
                .month(month)
                .format('MMMM')}
              <IoIosArrowForward
                onClick={() => handleChangeMonth(true)}
                style={{
                  verticalAlign: 'middle',
                  marginLeft: '15px',
                  cursor: 'pointer'
                }}
              />
            </div>
            <div className="date-container__header--year">
              <IoIosArrowBack
                onClick={() => handleNextYear(-1)}
                style={{
                  verticalAlign: 'middle',
                  marginRight: '15px',
                  cursor: 'pointer'
                }}
              />
              {getYear()}
              <IoIosArrowForward
                onClick={() => handleNextYear(1)}
                style={{
                  verticalAlign: 'middle',
                  marginLeft: '15px',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>
          <div className="date-container__days">
            {moment.weekdaysShort().map((e, i) => (
              <div key={i} className="date-container__days--day">
                {e}
              </div>
            ))}
          </div>
          <div className="date-container__days--numbers">
            {[
              ...Array(
                moment()
                  .days(month)
                  .daysInMonth()
              ).keys()
            ].map((e, i) => {
              return (
                <div
                  onClick={() => handleSetDay(i + 1)}
                  key={i}
                  className={`date-container__days--numbers-number ${
                    i == day - 1 ? 'selected' : ''
                  }`}
                >
                  {e + 1}
                </div>
              );
            })}
          </div>
          <div className="date-container__months">
            {moment.monthsShort().map((e, i) => {
              return (
                <div
                  onClick={() => handleSetMonth(i.toString())}
                  key={i}
                  className={`date-container__months--month ${
                    String(i) == month ? 'selected' : ''
                  }`}
                >
                  {e}
                </div>
              );
            })}
          </div>
          <div className="date-container__button" onClick={handleGoToToday}>
            Go to today
          </div>
        </div>
      }
    >
      <div className="datepicker-container">
        <IoMdCalendar className="datepicker-icon" onClick={toggleDatePicker} />
        <CustomFormInput
          width="100%"
          type="text"
          onClick={toggleDatePicker}
          value={Deadline === 'Invalid date' ? '' : Deadline}
          onChange={() => {}}
          name={name}
          ref={register}
          placeholder="DD/MM/YYYY"
        />
      </div>
    </Popover>
  );
}

CustomDatePicker.propTypes = {
  setDeadline: PropTypes.func,
  toggleDatePicker: PropTypes.func,
  value: PropTypes.any,
  isCurrentUserOwner: PropTypes.bool
};
