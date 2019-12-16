import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Pagination, CustomInput } from './CustomComponents';
import PropTypes from 'prop-types';

export default function CustomPagination({
  changePageNumber,
  handleChangePagination,
  total,
  page
}) {
  return (
    <div>
      <Pagination>
        Page
        <FaAngleLeft
          onClick={() => changePageNumber('decrement')}
          cursor="pointer"
          size="20"
          style={{ verticalAlign: 'middle' }}
        />
        {page}
        <FaAngleRight
          onClick={() => changePageNumber('increment')}
          cursor="pointer"
          size="20"
          style={{ verticalAlign: 'middle' }}
        />
        of {Math.ceil(total / 10)}. Go to Page
      </Pagination>
      <CustomInput onChange={handleChangePagination} />
    </div>
  );
}

CustomPagination.propTypes = {
  changePageNumber: PropTypes.func,
  handleChangePagination: PropTypes.func,
  total: PropTypes.number,
  page: PropTypes.number
};
