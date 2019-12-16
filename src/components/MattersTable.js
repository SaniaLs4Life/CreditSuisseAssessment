import React from 'react';
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

export default function MattersTable({ matters }) {
  return (
    <CustomTable>
      <CustomTableHeader style={{ borderBottom: '1px solid #000' }}>
        <tr>
          <CustomTableHeaderColumn>ID</CustomTableHeaderColumn>
          <CustomTableHeaderColumn>Request Name</CustomTableHeaderColumn>
          <CustomTableHeaderColumn>Requestor</CustomTableHeaderColumn>
          <CustomTableHeaderColumn>Good encoding</CustomTableHeaderColumn>
          <CustomTableHeaderColumn>Description</CustomTableHeaderColumn>
          <CustomTableHeaderColumn>Need storyteller</CustomTableHeaderColumn>
          <CustomTableHeaderColumn>Storyteller</CustomTableHeaderColumn>
          <CustomTableHeaderColumn>Wanted Characters</CustomTableHeaderColumn>
          <CustomTableHeaderColumn>Deadline</CustomTableHeaderColumn>
          <CustomTableHeaderColumn>Budget</CustomTableHeaderColumn>
          <CustomTableHeaderColumn>Status</CustomTableHeaderColumn>
        </tr>
      </CustomTableHeader>
      <tbody>
        {matters.length > 0 ? (
          matters &&
          matters.map((item, i) => (
            <CustomTableBodyRow key={i}>
              <CustomTableBodyColumn>{item.Id}</CustomTableBodyColumn>
              <CustomTableBodyColumn title={item.RequestName}>
                {truncate(item.RequestName)}
              </CustomTableBodyColumn>
              <CustomTableBodyColumn title={item.Requestor}>
                {truncate(item.Requestor)}
              </CustomTableBodyColumn>
              <CustomTableBodyColumn title={item.GoodEnding}>
                {truncate(item.GoodEnding)}
              </CustomTableBodyColumn>
              <CustomTableBodyColumn title={item.Description}>
                {truncate(item.Description)}
              </CustomTableBodyColumn>
              <CustomTableBodyColumn>
                {item.NeedStoryteller === true ? 'Yes' : 'No'}
              </CustomTableBodyColumn>
              <CustomTableBodyColumn>{item.Storyteller}</CustomTableBodyColumn>
              <CustomTableBodyColumn title={item.WantedCharacters}>
                {truncate(item.WantedCharacters)}
              </CustomTableBodyColumn>
              <CustomTableBodyColumn>
                {moment(item.Deadline).format('LLL')}
              </CustomTableBodyColumn>
              <CustomTableBodyColumn title={item.Budget}>
                {truncate(item.Budget)}
              </CustomTableBodyColumn>
              <CustomTableBodyColumn title={item.Status}>
                {truncate(item.Status)}
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
  matters: PropTypes.array
};
