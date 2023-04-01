import React, { useContext } from 'react';
import { UserContext } from '../App';


function Home()  {
  const { userName } = useContext(UserContext);

  return (
    <div>
      <p>Home</p>
      {userName ? <div>Hello {userName}</div> : <div>no one logged in</div>}
    </div>
  )
}

export default Home;
