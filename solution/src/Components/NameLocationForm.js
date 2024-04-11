import React, { useEffect, useState } from 'react';
import InputName from './InputName';
import InputLocations from './InputLocation';
import NameLocationTable from './NameLocationTable';
import { isNameValid } from '../mock-api/apis';
import { getLocations } from '../mock-api/apis';

function NameLocationForm() {
    const [nameValue, setNameValue] = useState("");
    const [validName, setValidName] = useState(true);
    const [selectLocations, setSelectLocations] = useState([]);
    const [formSelect, setFormSelect] = useState('');
    const [nameLocation, setNameLocation] = useState([])

    useEffect(() => {
      const fetchLocations = async () => {
          try {
              const locations = await getLocations();
              setSelectLocations([...locations]);
              setFormSelect(locations[0]);
          } catch (error) {
              setSelectLocations(["Locations error"])
          }
      };
      fetchLocations();
    }, [])

    const buttonIsEnabled = nameValue !== '' && validName;

    const validateName = async (e) => {
      const isValidName = await isNameValid(e);
      setValidName(isValidName);

      setNameValue(e);
    };

    const handleNameValueUpdate = (e) => {
      validateName(e);
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      if (validName) {
        setNameLocation([
            ...nameLocation,
            { name: nameValue, location: formSelect }
        ])

        // Clear form, also clear state of name.
        e.target.reset();
        setNameValue('')
      }
    }

    // Empty table on clear.
    const handleClear = (e) => {
      e.preventDefault();

      setNameLocation([]);
    }
    
    return (
      <div className="container">
          <form onSubmit={handleSubmit} className="form">
              <InputName
                  error={!validName}
                  onChange={handleNameValueUpdate}
              />
              <InputLocations
                  selectLocations={selectLocations}
                  onChange={(val) => setFormSelect(val)}
              />
              <div className="buttongroup">
                  <button onClick={handleClear}>Clear</button>
                  <button disabled={!buttonIsEnabled} type="submit">Add</button>
              </div>
          </form>
          <div className='table'>
              <NameLocationTable
                  nameLocation={nameLocation}
              />
          </div>
      </div>
    )
}

export default NameLocationForm;