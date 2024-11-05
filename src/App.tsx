import { Routes, Route } from 'react-router-dom'
import { Sidebar } from './components/sidebar'
import { OverviewPage } from './pages/OverviewPage'
import { User } from './components/user'
import { ProductComponent } from './pages/ProductPage'

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
          <Route path='/product' element={<ProductComponent />} />
        </Routes>
      </div>
    </>
  )
}

export default App
