import styled from 'styled-components';

const CustomHeader = styled.div`
  color: #000;
  font-size: 23px;
  margin-bottom: 30px;
`;

const CustomButton = styled.button`
  color: #FFF;
  background: #000;
  height: 40px;
  font-weight: bold;
  text-align: center;
  padding: 0 15px 0 15px;
  border: none;
  outline: none;
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
  background: #FFF;
  height: 40px;
  cursor: pointer;
  display: block;
  font-weight: bold;
  display: ${props => (props.inline ? 'inline-block' : 'block')};
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
  border-bottom: 1px solid #DDD;
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
  CustomSearchInput
};
