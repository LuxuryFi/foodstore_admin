import { BarChart, CoinsIcon, Drumstick, Menu, ShoppingBag, User2Icon, UserSquare2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const SIDEBAR_ITEMS = [
  { name: 'Homepage', icon: BarChart, color: '#ffffff', path: '/' },
  { name: 'User', icon: User2Icon, color: '#ffffff', path: '/user' },
  { name: 'Internal User', icon: UserSquare2, color: '#ffffff', path: '/internal' },
  { name: 'Category', icon: User2Icon, color: '#EC4899', path: '/category' },
  { name: 'Product', icon: User2Icon, color: '#F59E0B', path: '/product' },
  { name: 'Order', icon: ShoppingBag, color: '#6EE7B7', path: '/order' },
  { name: 'Banner', icon: CoinsIcon, color: '#3b82f6', path: '/banner' },
  { name: 'Discount', icon: Drumstick, color: '#8b5cf6', path: '/discount' }
]

export const Sidebar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true)

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSideBarOpen ? 'w-64' : 'w-20'}`}
      animate={{ width: isSideBarOpen ? 256 : 80 }}
    >
      <div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
        >
          <Menu size={24} />
        </motion.button>

        <nav className='mt-8 flex-grow'>
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.path} to={item.path}>
              <motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-400'>
                {/* Render the icon and text */}
                <item.icon size={20} style={{ color: item.color, minWidth: '20px' }} />
                <AnimatePresence>
                  {isSideBarOpen && (
                    <motion.span
                      className='ml-4 whitespace-nowrap'
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                  {/* Show text only when sidebar is open */}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  )
}
