import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa';
const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg';
function App() {
  const [title, setTitle] = useState('name');
  const [value, setValue] = useState('random person');

  const getPerson = async () => {
    const { data } = await axios.get('https://randomuser.me/api/');
    const person = data.results[0];
    const { email, phone } = person;
    const { large: image } = person.picture;
    const {
      login: { password },
    } = person;
    const { first, last } = person.name;
    const { age } = person.dob;
    const {
      street: { number, name },
    } = person.location;

    const newPerson = {
      phone,
      email,
      image,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    };
    setTitle('name');
    setValue(newPerson.name);
    return newPerson;
  };

  const { data, isLoading, isError, error, refetch } = useQuery(
    'random-person',
    getPerson,
    {
      refetchOnWindowFocus: false,
    }
  );

  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label;

      setTitle(newValue);
      setValue(data[newValue]);
    }
  };
  return (
    <main>
      <div className='block bcg-black'></div>
      <div className='block'>
        <div className='container'>
          <img
            src={(data && data.image) || defaultImage}
            alt='random user'
            className='user-img'
          />
          <p className='user-title'>my {title} is </p>
          <p className='user-value'>{value}</p>
          <div className='values-list'>
            <button className='icon' data-label='name' onMouseOut={handleValue}>
              <FaUser />
            </button>

            <button
              className='icon'
              data-label='email'
              onMouseOut={handleValue}>
              <FaEnvelopeOpen />
            </button>

            <button className='icon' data-label='age' onMouseOut={handleValue}>
              <FaCalendarTimes />
            </button>

            <button
              className='icon'
              data-label='street'
              onMouseOut={handleValue}>
              <FaMap />
            </button>

            <button
              className='icon'
              data-label='phone'
              onMouseOut={handleValue}>
              <FaPhone />
            </button>

            <button
              className='icon'
              data-label='password'
              onMouseOut={handleValue}>
              <FaLock />
            </button>
          </div>
          <button className='btn' type='button' onClick={refetch}>
            {isLoading ? 'Loading...' : 'Random User'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
