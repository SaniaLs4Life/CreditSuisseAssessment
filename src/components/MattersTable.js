import React from 'react';
import PropTypes from 'prop-types';
import {
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortNumericDown,
  FaSortNumericUp,
  FaSortAmountUp,
  FaSortAmountDown
} from 'react-icons/fa';
import {
  CustomTableBodyRow,
  CustomTableBodyColumn,
  CustomTable,
  CustomTableHeaderColumn,
  CustomTableHeader
} from './CustomComponents';
import moment from 'moment';
import { truncate } from '../utils/index';
import CustomTooltip from './CustomTooltip';
import './MattersTable.scss';

export default function MattersTable({ matters, handleSortBy, sortBy }) {
  return (
    <CustomTable>
      <CustomTableHeader style={{ borderBottom: '1px solid #000' }}>
        <tr>
          <CustomTableHeaderColumn scope="col">
            ID
            {sortBy.type === 'asc' ? (
              <FaSortNumericDown
                onClick={() => handleSortBy('Id', 'desc')}
                style={{
                  verticalAlign: 'middle',
                  cursor: 'pointer',
                  marginLeft: '10px'
                }}
              />
            ) : (
              <FaSortNumericUp
                onClick={() => handleSortBy('Id', 'asc')}
                style={{
                  verticalAlign: 'middle',
                  cursor: 'pointer',
                  marginLeft: '10px'
                }}
              />
            )}
          </CustomTableHeaderColumn>
          <CustomTableHeaderColumn>
            Request Name
            {sortBy.type === 'asc' ? (
              <FaSortAlphaDown
                onClick={() => handleSortBy('RequestName', 'desc')}
                style={{
                  verticalAlign: 'middle',
                  cursor: 'pointer',
                  marginLeft: '10px'
                }}
              />
            ) : (
              <FaSortAlphaUp
                onClick={() => handleSortBy('RequestName', 'asc')}
                style={{
                  verticalAlign: 'middle',
                  cursor: 'pointer',
                  marginLeft: '10px'
                }}
              />
            )}
          </CustomTableHeaderColumn>
          <CustomTableHeaderColumn>Requestor</CustomTableHeaderColumn>
          <CustomTableHeaderColumn>Good encoding</CustomTableHeaderColumn>
          <CustomTableHeaderColumn>Description</CustomTableHeaderColumn>
          <CustomTableHeaderColumn>Need storyteller</CustomTableHeaderColumn>
          <CustomTableHeaderColumn>Storyteller</CustomTableHeaderColumn>
          <CustomTableHeaderColumn>Wanted Characters</CustomTableHeaderColumn>
          <CustomTableHeaderColumn>
            Deadline
            {sortBy.type === 'asc' ? (
              <FaSortNumericDown
                onClick={() => handleSortBy('Deadline', 'desc')}
                style={{
                  verticalAlign: 'middle',
                  cursor: 'pointer',
                  marginLeft: '10px'
                }}
              />
            ) : (
              <FaSortNumericUp
                onClick={() => handleSortBy('Deadline', 'asc')}
                style={{
                  verticalAlign: 'middle',
                  cursor: 'pointer',
                  marginLeft: '10px'
                }}
              />
            )}
          </CustomTableHeaderColumn>
          <CustomTableHeaderColumn>
            Budget
            {sortBy.type === 'asc' ? (
              <FaSortAmountDown
                onClick={() => handleSortBy('Budget', 'desc')}
                style={{
                  verticalAlign: 'middle',
                  cursor: 'pointer',
                  marginLeft: '10px'
                }}
              />
            ) : (
              <FaSortAmountUp
                onClick={() => handleSortBy('Budget', 'asc')}
                style={{
                  verticalAlign: 'middle',
                  cursor: 'pointer',
                  marginLeft: '10px'
                }}
              />
            )}
          </CustomTableHeaderColumn>
          <CustomTableHeaderColumn>
            Status
            {sortBy.type === 'asc' ? (
              <FaSortAlphaDown
                onClick={() => handleSortBy('Status', 'desc')}
                style={{
                  verticalAlign: 'middle',
                  cursor: 'pointer',
                  marginLeft: '10px'
                }}
              />
            ) : (
              <FaSortAlphaUp
                onClick={() => handleSortBy('Status', 'asc')}
                style={{
                  verticalAlign: 'middle',
                  cursor: 'pointer',
                  marginLeft: '10px'
                }}
              />
            )}
          </CustomTableHeaderColumn>
        </tr>
      </CustomTableHeader>
      <tbody>
        {matters.length > 0 ? (
          matters &&
          matters.map((item, i) => (
            <CustomTableBodyRow key={i}>
              <CustomTableBodyColumn data-label="ID">{item.Id}</CustomTableBodyColumn>
              <CustomTableBodyColumn data-label="Request Name">
                <CustomTooltip
                  message={truncate(item.RequestName, 500)}
                  position="top"
                  key="tooltip-1"
                >
                  {truncate(item.RequestName, 50)}
                </CustomTooltip>
              </CustomTableBodyColumn>
              <CustomTableBodyColumn data-label="Requestor">
                {truncate(item.Requestor, 50)}
              </CustomTableBodyColumn>
              <CustomTableBodyColumn data-label="Good Ending">
                {truncate(item.GoodEnding, 50)}
              </CustomTableBodyColumn>
              <CustomTableBodyColumn data-label="Description">
                <CustomTooltip
                  message={truncate(item.Description, 500)}
                  position="top"
                  key="tooltip-2"
                >
                  {truncate(item.Description, 50)}
                </CustomTooltip>
              </CustomTableBodyColumn>
              <CustomTableBodyColumn data-label="Need Story Teller">
                {item.NeedStoryteller === true ? 'Yes' : 'No'}
              </CustomTableBodyColumn>
              <CustomTableBodyColumn data-label="Storyteller">{item.Storyteller}</CustomTableBodyColumn>
              <CustomTableBodyColumn data-label="Wanted Characters">
                {truncate(item.WantedCharacters, 50)}
              </CustomTableBodyColumn>
              <CustomTableBodyColumn data-label="Deadline">
                {moment(item.Deadline).format('LLL')}
              </CustomTableBodyColumn>
              <CustomTableBodyColumn data-label="Budget">
                {truncate(item.Budget, 50)}
              </CustomTableBodyColumn>
              <CustomTableBodyColumn data-label="Status">
                {truncate(item.Status, 50)}
              </CustomTableBodyColumn>
            </CustomTableBodyRow>
          ))
        ) : (
          <tr>
            <td colSpan="11" style={{ textAlign: 'center', padding: '10px' }}>
              No matters found!
            </td>
          </tr>
        )}
      </tbody>
    </CustomTable>
  );
}

MattersTable.propTypes = {
  matters: PropTypes.array,
  handleSortBy: PropTypes.func,
  sortBy: PropTypes.object
};
