import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from 'react-icons/io';
import './CustomDatePicker.scss';

export default function DatePicker({register}) {
  const [days, setDays] = useState(moment());
  const [month, setMonth] = useState(moment());
  const [year, setYear] = useState(moment());
  const [date, setDate] = useState(`${days}/${month}/${year}`);
  // useEffect(() => {
  //   console.log('month days', moment(month).daysInMonth())
  //   setDays(moment(11).daysInMonth());
  // }, [month, days]);
  const nextMonth = () => {
    setMonth(moment(month).add(1, 'month'));
  };
  const nextYear = () => {
    setYear(moment(year).add(1, 'year'));
  };

  const handleSetMonth = (i, e) => {
    console.log('i', i);
    setMonth(i);
  };

  const handleSetDays = e => {
    console.log('selected day', e);
    setDays(e + 1);
  };
  // console.log("normal", date);
  // console.log(
  //   "current custom",
  //   moment(date, "DD/MM/YYYY")
  //     .utc()
  //     .format("LLL")
  // );
  // console.log(
  //   "current",
  //   moment(date, "DD/MM/YYYY")
  //     .utc()
  //     .format("LLL")
  // );

  const handleGoToToday = () => {
    setDays(days);
    setMonth(month);
    setYear(year);
    console.log(days.date(), month.month(), year.year());
  };

  const handleNextMonthName = () => {
    setMonth(prevState => prevState.add(1, 'month'));
    console.log(month.format('MMMM'));
  };

  const handleNextYear = () => {
    // setYear(prevState => prevState.add(1, 'year'));
    setYear(year.add(1, 'year'));
    console.log(year.format('YYYY'));
  };

  const getYear = () => {
    return year.format('YYYY');
  };

  console.log('date', date);
  return (
    <div>
      <input
        type="text"
        name="Deadline"
        ref={register({ required: true })}
        placeholder="DD/MM/YYYY"
      />
      <div className="date-container">
        <div className="date-container__close"><IoMdClose /></div>
        <div className="date-container__header">
          <div className="date-container__header--month">
            <IoIosArrowBack
              style={{
                verticalAlign: 'middle',
                marginRight: '15px',
                cursor: 'pointer'
              }}
            />
            {month.format('MMMM')}
            <IoIosArrowForward
              onClick={handleNextMonthName}
              style={{
                verticalAlign: 'middle',
                marginLeft: '15px',
                cursor: 'pointer'
              }}
            />
          </div>
          <div className="date-container__header--year">
            <IoIosArrowBack
              style={{
                verticalAlign: 'middle',
                marginRight: '15px',
                cursor: 'pointer'
              }}
            />
            {getYear()}
            <IoIosArrowForward
              onClick={() => handleNextYear()}
              style={{
                verticalAlign: 'middle',
                marginLeft: '15px',
                cursor: 'pointer'
              }}
            />
          </div>
        </div>
        <div className="date-container__days">
          {moment.weekdays().map((e, i) => (
            <div key={i} className="date-container__days--day">
              {e.toString().substring(0, 3)}
            </div>
          ))}
        </div>
        <div className="date-container__days--numbers">
          {[...Array(month.daysInMonth()).keys()].map((e, i) => {
            return (
              <div
                key={i}
                className={`date-container__days--numbers-number ${
                  i === days.date() - 1 ? 'selected' : ''
                }`}
              >
                {e + 1}
              </div>
            );
          })}
        </div>
        <div className="date-container__months">
          {moment.months().map((e, i) => {
            return (
              <div
                key={i}
                className={`date-container__months--month ${
                  i === month.month() ? 'selected' : ''
                }`}
              >
                {e.toString().substring(0, 3)}
              </div>
            );
          })}
        </div>
        <div className="date-container__button" onClick={handleGoToToday}>
          Go to today
        </div>
      </div>
    </div>
  );
}

