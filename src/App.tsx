import { Routes, Route } from 'react-router-dom'
import { Sidebar } from './components/sidebar'
import { OverviewPage } from './components/overview'
import { User } from './components/user'

function App() {
  console.log(name)
  return (
    <>
      <div className='flex h-screen bg-gray-900 overflow-hidden text-red-50'>
        {/* BG */}

        <div className='fixed inset-0 z-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80'></div>
          <div className='absolute inset-0 backdrop-blur-sm'></div>
        </div>

        <Sidebar />
        <Routes>
          <Route path='/' element={<OverviewPage />} />
          <Route path='/user' element={<User />} />
        </Routes>
      </div>
    </>
  )
}

export default App
