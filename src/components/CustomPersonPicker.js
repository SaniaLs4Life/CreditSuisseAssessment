import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CustomFormInput, CustomErrorMessage } from './CustomComponents';
import { AiTwotoneDelete, AiOutlineMail } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa';
import people from '../people.json';

export default function CustomPersonPicker({
  register,
  errors,
  setValue,
  isCurrentUserOwner
}) {
  const [search, setSearch] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const handleSearch = e => {
    setSearch(e.currentTarget.value);
  };
  useEffect(() => {
    if (search.toString().length > 0) {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  }, [search]);

  const newResults = people.people.filter(e => {
    return (
      e
        .toString()
        .toLowerCase()
        .indexOf(search.toLowerCase()) !== -1
    );
  });

  const handleRequestor = data => {
    setValue('Requestor', data);
    setShowOptions(false);
  };
  const handleRemovePerson = () => {
    if (isCurrentUserOwner) {
      setSearch('');
      setValue('Requestor', '');
    }
  };
  return (
    <div>
      <div className="requestor-container">
        <AiTwotoneDelete
          className="requestor-remove"
          onClick={handleRemovePerson}
        />
        <AiOutlineMail className="requestor-mail" />
        <FaRegCommentAlt className="requestor-comment" />
        <CustomFormInput
          placeholder="Requestor"
          width="100%"
          onChange={handleSearch}
          type="text"
          className={errors.Requestor ? 'error' : ''}
          ref={register({ required: 'This field cannot be empty!' })}
          name="Requestor"
        />
        {showOptions && (
          <div className="requestor-results">
            {newResults && newResults.length > 0 ? (
              newResults.slice(0, 5).map((e, i) => (
                <div
                  key={i}
                  onClick={() => handleRequestor(e)}
                  className="requestor-result"
                >
                  {e}
                </div>
              ))
            ) : (
              <div className="requestor-result">No user found</div>
            )}
          </div>
        )}
      </div>

      <CustomErrorMessage>
        {errors.Requestor && errors.Requestor.message}
      </CustomErrorMessage>
    </div>
  );
}

CustomPersonPicker.propTypes = {
  register: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  errors: PropTypes.object,
  setValue: PropTypes.func,
  isCurrentUserOwner: PropTypes.bool
};
