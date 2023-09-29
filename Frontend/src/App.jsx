import { useState } from 'react'


function App() {

  const [tValue, setTValue] = useState('')
  const [dValue, setDValue] = useState('')
  const [yValue, setYValue] = useState('')


  const prodBackendURL = 'https://movie-server-production-c9ad.up.railway.app';

  const localBackendURL = 'http://localhost:3000'

  

  function handleClick() {
    fetch(`${prodBackendURL}/submit`,  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         title: tValue,
         director : dValue,
         year : yValue
        
        }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => console.log(data))
      .catch(error => {
        console.error('Error:', error);
      });
}
  

  return (
    <>

      <h1>what to do</h1>

      <form
        onSubmit={event => {
          event.preventDefault()
          handleClick()
        }
        }
      >
        <input
          type="text"
          placeholder="add the movie title"
          value={tValue}
          onChange={event => setTValue(event.target.value)}
        />
        <input
          type="text"
          placeholder="add the director"
          value={dValue}
          onChange={event => setDValue(event.target.value)}
        />
        <input
          type="integer"
          placeholder="add the year"
          value={yValue}
          onChange={event => setYValue(event.target.value)}
        />
        <button
          type="submit"
        >
          Submit
        </button>
      </form>

    </>
  )
}

export default App

