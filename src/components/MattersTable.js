import React from 'react';
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
import PropTypes from 'prop-types';
import { truncate } from '../utils/index';
import CustomTooltip from './CustomTooltip';

export default function MattersTable({ matters, handleSortBy, sortBy }) {
  return (
    <CustomTable>
      <CustomTableHeader style={{ borderBottom: '1px solid #000' }}>
        <tr>
          <CustomTableHeaderColumn>
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
              <CustomTableBodyColumn>{item.Id}</CustomTableBodyColumn>
              <CustomTableBodyColumn>
                <CustomTooltip
                  message={truncate(item.RequestName, 500)}
                  position="top"
                  key="tooltip-1"
                >
                  {truncate(item.RequestName, 50)}
                </CustomTooltip>
              </CustomTableBodyColumn>
              <CustomTableBodyColumn>
                {truncate(item.Requestor, 50)}
              </CustomTableBodyColumn>
              <CustomTableBodyColumn>
                {truncate(item.GoodEnding, 50)}
              </CustomTableBodyColumn>
              <CustomTableBodyColumn>
                <CustomTooltip
                  message={truncate(item.Description, 500)}
                  position="top"
                  key="tooltip-2"
                >
                  {truncate(item.Description, 50)}
                </CustomTooltip>
              </CustomTableBodyColumn>
              <CustomTableBodyColumn>
                {item.NeedStoryteller === true ? 'Yes' : 'No'}
              </CustomTableBodyColumn>
              <CustomTableBodyColumn>{item.Storyteller}</CustomTableBodyColumn>
              <CustomTableBodyColumn title={item.WantedCharacters}>
                {truncate(item.WantedCharacters, 50)}
              </CustomTableBodyColumn>
              <CustomTableBodyColumn>
                {moment(item.Deadline).format('LLL')}
              </CustomTableBodyColumn>
              <CustomTableBodyColumn title={item.Budget}>
                {truncate(item.Budget, 50)}
              </CustomTableBodyColumn>
              <CustomTableBodyColumn title={item.Status}>
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
