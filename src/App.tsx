import { Routes, Route } from 'react-router-dom'
import { Sidebar } from './components/sidebar'
import { OverviewPage } from './pages/OverviewPage'
import { User } from './components/user'
import { ProductPages } from './pages/product/ProductPage'
import { BannerPages } from './pages/banner/BannerPage'
import { DiscountPages } from './pages/discount/DiscountPage'
import { AddProductPages } from './pages/product/AddProductPage'
import { UpdateProductPages } from './pages/product/updateProductPage'

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
          <Route path='/user' element={<User />} />
          <Route path='/product' element={<ProductPages />} />
          <Route path='/addProduct' element={<AddProductPages />} />
          <Route path='/productUpdate/:id' element={<UpdateProductPages />} />
          <Route path='/banner' element={<BannerPages />} />
          <Route path='/discount' element={<DiscountPages />} />
        </Routes>
      </div>
    </>
  )
}

export default App
