import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';


function Home()  {
  const { userName } = useContext(UserContext);
  let welcome;
  if (userName) {
    welcome = (
      <>
      <div className='welcome'> Welcome back, {userName}!</div>
      <Link to='/updatePassword' className='center'><div className='update'>Update Password</div></Link>
      </>
    )
  } else {
    welcome = (
      <>
        <div className='welcome'>Welcome to Recipe-Share!</div>
        <div className='center'>
          <div className='home'>
            <p>Please login or create an account in order to get full experience from this website.<br />
              A test account is available to allow you to explore the features without needing to create an account. </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <div>
      {welcome}

      <div className='center'>
        <div className='home'>
          <p>This website is designed in order to allow easy sharing or recipes in a simple format.<br />
            Anyone can view any recipes. However, when logged in Users can create new recipes,
            as well as edit and delete of their recipes.</p>
          <p><br />This website is made with a MERN (MongoDB, Express.js, React.js, Node.js) stack. <br />
            The data about recipes and users are stored on MongoDB. <br />
            The back-end is controlled by Express and Node.js with a REST API. <br /> 
            The front-end uses React to render content and sends requests to the back-end. </p>
        </div>
      </div>
    </div>
  )
}

export default Home;