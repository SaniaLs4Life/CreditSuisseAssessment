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
  CustomCloseButton
};
