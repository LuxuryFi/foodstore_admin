import { Sidebar } from './components/sidebar'

function App({ }) {
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
       
      </div>
    </>
  )
}

export default App
