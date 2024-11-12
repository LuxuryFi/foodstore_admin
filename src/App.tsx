import { Routes, Route } from 'react-router-dom'
import { Sidebar } from './components/sidebar'
import { OverviewPage } from './pages/OverviewPage'
import { ProductPages } from './pages/product/ProductPage'
import { BannerPages } from './pages/banner/BannerPage'
import { DiscountPages } from './pages/discount/DiscountPage'
import { AddProductPages } from './pages/product/AddProductPage'
import { UpdateProductPages } from './pages/product/UpdateProductPage'
import { InternalPages } from './pages/internal/InternalPage'
import { AddInternalPages } from './pages/internal/AddInternalPage'
import { UpdateInternalPages } from './pages/internal/UpdateInternalPage'
import { UserPages } from './pages/user/UserPage'
import { AddUserPages } from './pages/user/AddUserPage'
import { UpdateUserPages } from './pages/user/UpdateUserPage'

function App() {
  console.log(name)
  return (
    <>
      <div className='flex h-screen bg-white-900 overflow-hidden text-red-50'>
        {/* BG */}

        <div className='fixed inset-0 z-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-white-900 via-white-800 to-white-900 opacity-80'></div>
          <div className='absolute inset-0 backdrop-blur-sm'></div>
        </div>

        <Sidebar />
        <Routes>
          <Route path='/' element={<OverviewPage />} />

          <Route path='/product' element={<ProductPages />} />
          <Route path='/addProduct' element={<AddProductPages />} />
          <Route path='/productUpdate/:id' element={<UpdateProductPages />} />

          <Route path='/internal' element={<InternalPages />} />
          <Route path='/addInternal' element={<AddInternalPages />} />
          <Route path='/internalUpdate/:id' element={<UpdateInternalPages />} />

          <Route path='/user' element={<UserPages />} />
          <Route path='/addUser' element={<AddUserPages />} />
          <Route path='/userUpdate/:id' element={<UpdateUserPages />} />

          <Route path='/banner' element={<BannerPages />} />
          <Route path='/discount' element={<DiscountPages />} />
        </Routes>
      </div>
    </>
  )
}

export default App
