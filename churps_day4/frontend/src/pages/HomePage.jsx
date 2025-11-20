import React, { useState } from 'react'
import Navbar from '../homePageComponents/Navbar'
import UpperHomePage from '../homePageComponents/UpperHomePage'
import MiddleHomePage from '../homePageComponents/MiddleHomePage'
import AuthModal from '../components/AuthModal'

const HomePage = () => {
  const [authModal, setAuthModal] = useState(null); 
  // null | "login" | "signup"

  return (
    <>
      <Navbar setAuthModal={setAuthModal} />

      <UpperHomePage />
      <MiddleHomePage />

      {/* STEP 3: show modal if authModal is not null */}
      {authModal && (
        <AuthModal
          type={authModal} 
          close={() => setAuthModal(null)} 
        />
      )}
    </>
  )
}

export default HomePage
