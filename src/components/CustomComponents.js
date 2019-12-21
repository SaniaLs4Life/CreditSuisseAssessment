import styled from 'styled-components';

const CustomHeader = styled.div`
  color: #000;
  font-size: 23px;
  margin-bottom: 30px;
`;

const CustomButton = styled.button`
  color: #fff;
  background: #000;
  height: 40px;
  font-weight: bold;
  text-align: center;
  margin: 60px 15px 60px 0;
  padding: 0 15px 0 15px;
  border: none;
  outline: none;
  user-select: none;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background: #575756;
  }
`;

const CustomSortButton = styled.button`
  font-size: 14px;
  color: #000;
  text-align: center;
  padding: 0 15px 0 15px;
  border: 1px solid #000;
  outline: none;
  background: #fff;
  height: 40px;
  cursor: pointer;
  display: block;
  font-weight: bold;
  display: ${props => (props.inline ? 'inline-block' : 'block')};
  border-right: ${props => props.noRightBorder && 'none'};
  user-select: none;
  &:hover {
    background: #000;
    color: #fff;
  }
`;

const Pagination = styled.div`
  color: #000;
  display: inline-block;
  margin: 30px 0 30px 0;
`;

const Divider = styled.div`
  background: #000;
  height: 1px;
  width: 60px;
  margin-top: 60px;
  margin-bottom: 30px;
`;

const CustomInput = styled.input.attrs({ type: 'input' })`
  border: 1px solid #000;
  padding: 10px;
  outline: none;
  display: inline-block;
  width: 50px;
  text-align: center;
  margin-left: 10px;
`;

const CustomTable = styled.table`
  width: 100%;
  box-sizing: border-box;
  border-collapse: collapse;
`;

const CustomTableHeader = styled.thead`
  border-bottom: 1px solid #000;
`;

const CustomTableHeaderColumn = styled.th`
  text-align: left;
  padding: 0 0 10px 10px;
`;

const CustomTableBodyRow = styled.tr`
  &:hover {
    background: #f1f2f2;
  }
`;

const CustomTableBodyColumn = styled.td`
  text-align: left;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  padding: 20px 10px 20px 10px;
`;

const CustomEmptyData = styled.td`
  width: 100%;
  font-weight: bold;
  color: #000;
`;

const CustomSearchInput = styled.input.attrs({ type: 'text' })`
  border: 1px solid #000;
  padding: 10px;
  outline: none;
  width: 50%;
  margin: 10px 0 30px 0;
`;

const CustomModal = styled.div`
  position: fixed;
  right: 10px;
  top: 10px;
  background: #fff;
  border: 1px solid #000;
  color: #000;
  padding: 10px 30px 30px 30px;
`;

const CustomCloseButton = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  text-align: center;
  font-weight: bold;
`;

const CustomNavbar = styled.div`
  width: 100%;
  height: 30px;
  background: #000;
  color: #fff;
  display: flex;
  flex-direction: row-reverse;
  box-sizing: border-box;
  padding: 5px 30px 5px 0;
`;

const CustomImage = styled.img`
  width: 200px;
  margin: 30px 30px 30px 0;
  float: right;
`;

const CustomFormButton = styled.div`
  background: ${props => (props.inverse ? '#FFF' : '#000')};
  color: ${props => (props.inverse ? '#7c7c7b' : '#FFF')};
  border: 1px solid #000;
  width: 150px;
  height: 40px;
  font-size: 14px;
  text-align: center;
  display: inline-block;
  margin: ${props => !props.inverse && '0 0 30px 0'};
  user-select: none;
  padding: 10px;
  box-sizing: border-box;
  font-weight: bold;
  cursor: pointer;
`;

const CustomFormHeader = styled.div`
  font-size: 30px;
  color: #000;
  margin-bottom: 80px;
`;

const CustomFormInput = styled.input.attrs({ type: 'text' })`
  width: ${props => props.width && props.width};
  display: ${props => (props.isInline ? 'inline-block' : 'block')};
  outline: none;
  height: 46px;
  box-sizing: border-box;
  padding: 15px 10px 15px 10px;
  border: 1px solid #a8a8a7;
  margin-bottom: 10px;
  font-size: 16px;
  &:disabled {
    color: #a8a8a7;
    border: 1px solid #dadada;
    background: #FFF;
  }
  &:active {
    border: 1px solid #000;
  }
  &:focus {
    color: #000;
    border: 1px solid #000;
  }
`;

const CustomInputText = styled.div`
  color: ${props => props.isDisabled ? '#a8a8a7' : '#000'};
  font-size: 14px;
  margin-bottom: 15px;
  font-weight: bold;
`;

const CustomTextArea = styled.textarea`
  width: 100%;
  border: 1px solid #a8a8a7;
  outline: none;
  resize: none;
  margin-bottom: 10px;
  min-height: 131px;
  padding: 15px 20px 4px 10px;
  box-sizing: border-box;
  &:active {
    border: 1px solid #000;
  }
  &:focus {
    color: #000;
    border: 1px solid #000;
  }
  &:disabled {
    color: #a8a8a7;
    border: 1px solid #dadada;
    background: #FFF;
  }
`;

const CustomErrorMessage = styled.div`
  color: #d91e19;
  font-size: 14px;
  font-weight: bold;
`;


export {
  CustomHeader,
  CustomButton,
  Divider,
  CustomSortButton,
  Pagination,
  CustomInput,
  CustomTable,
  CustomTableHeader,
  CustomTableHeaderColumn,
  CustomTableBodyColumn,
  CustomTableBodyRow,
  CustomEmptyData,
  CustomSearchInput,
  CustomModal,
  CustomCloseButton,
  CustomNavbar,
  CustomImage,
  CustomFormButton,
  CustomFormHeader,
  CustomFormInput,
  CustomInputText,
  CustomTextArea,
  CustomErrorMessage
};
