import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addMatter } from '../store/actions';

const CustomDiv = styled.div`
    padding: 10px;
    background: #DDD;
    color: #111;
    font-weight: bold;
    border-radius: 3px;
`;
const CustomButton = styled.button`
  padding: 10px;
  border: 1px solid #069;
  background: #FFF;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  margin-top: 10px;
  &:hover {
    background: #069;
    color: #FFF;
  }
`;

export default function Test() {
  const text = useSelector(state => state.name);
  const dispatch = useDispatch();
  const handleChangeValue = (e) => {
    e.preventDefault();
    dispatch(addMatter('New Value'));
  };

  return (
    <div>
      <CustomDiv>{text}</CustomDiv>
      <CustomButton onClick={handleChangeValue}>Change value</CustomButton>
    </div>
  );
}
