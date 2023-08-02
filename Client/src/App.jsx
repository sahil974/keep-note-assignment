import React from 'react'

import Header from './component/Header'
import Footer from './component/Footer'
import CreateNote from './component/CreateNote'
// import Note from './component/Note'
// import { useEffect } from 'react'

// import axios from 'axios'
// import BASE_URL from './url'
const App = () => {

  return (
    <div>

      <Header />

      <CreateNote />

      <Footer />
    </div>
  )

}
export default App