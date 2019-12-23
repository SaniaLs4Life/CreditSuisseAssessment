import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Faker from 'faker';
import { CustomFormInput } from './CustomComponents';

export default function CustomMultichoice({
  register,
  setValue,
  getValues,
  isCurrentUserOwner
}) {
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [allWantedCharacters, setAllWantedCharacters] = useState([]);
  const handleSearch = e => {
    setSearch(e.currentTarget.value);
  };
  useEffect(() => {
    let allUsers = [];
    for (let i = 0; i < 100; i++) {
      allUsers = [Faker.name.firstName(), ...allUsers];
    }
    setOptions(allUsers);
  }, []);
  useEffect(() => {
    if (search.toString().length > 0) {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  }, [search]);

  const newResults = options.filter(e => {
    return e.toString().toLowerCase() !== -1;
  });

  const handleCloseOptions = () => {
    if (isCurrentUserOwner) {
      setShowOptions(!showOptions);
    }
  };

  useEffect(() => {
    let setWantedCharacters = [
      allWantedCharacters,
      getValues().WantedCharacters
    ];
    setValue('WantedCharacters', setWantedCharacters);
  }, [options]);

  const handleWantedCharacters = data => {
    let wantedCharacters = [data, ...allWantedCharacters];
    setAllWantedCharacters(wantedCharacters);
    let newOptions = options.filter(e => e !== data);
    setOptions(newOptions);
  };

  return (
    <div className="requestor-container">
      <CustomFormInput
        onChange={handleSearch}
        onClick={handleCloseOptions}
        width="100%"
        placeholder="Wanted characters"
        ref={register}
        name="WantedCharacters"
      />

      {showOptions && (
        <div className="requestor-results">
          {newResults.slice(0, 5).map((e, i) => (
            <div
              className="requestor-result"
              key={i}
              onClick={() => handleWantedCharacters(e)}
            >
              {e}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

CustomMultichoice.propTypes = {
  getValues: PropTypes.func,
  register: PropTypes.func,
  setValue: PropTypes.func,
  isCurrentUserOwner: PropTypes.bool
};
