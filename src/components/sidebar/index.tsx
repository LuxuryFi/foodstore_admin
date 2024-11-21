import { BarChart, CoinsIcon, Drumstick, LogOut, Menu, ShoppingBag, User2Icon, UserSquare2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { isLogin } from '../../helpers/isLogin'

const SIDEBAR_ITEMS = [
  { name: 'Homepage', icon: BarChart, color: '#F232ff', path: '/' },
  { name: 'User', icon: User2Icon, color: '#B32A12', path: '/user' },
  { name: 'Internal User', icon: UserSquare2, color: '#23EA12', path: '/internal' },
  { name: 'Category', icon: User2Icon, color: '#EC4899', path: '/category' },
  { name: 'Product', icon: User2Icon, color: '#F59E0B', path: '/product' },
  { name: 'Order', icon: ShoppingBag, color: '#6EE7B7', path: '/order' },
  { name: 'Banner', icon: CoinsIcon, color: '#3b82f6', path: '/banner' },
  { name: 'Discount', icon: Drumstick, color: '#B32AD4', path: '/discount' },
  // { name: 'Order', icon: Drumstick, color: '#285cf6', path: '/order' }
]


export const Sidebar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    const logged = isLogin();

    console.log('logged', logged)

    if (logged) {
      console.log('test', window.localStorage.getItem('accessToken'))
      window.localStorage.removeItem('accessToken');
      navigate('/login');
    }
  }

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSideBarOpen ? 'w-64' : 'w-20'}`}
      animate={{ width: isSideBarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-green-800 p-4 flex flex-col border-r border-green-800">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="p-2 rounded-full hover:bg-green-400 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.path} to={item.path}>
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-green-400">
                {/* Render the icon and text */}
                <item.icon size={20} style={{ color: item.color, minWidth: '20px' }} />

                <AnimatePresence>
                  {isSideBarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
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
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-green-400" onClick={logout}>
                {/* Render the icon and text */}
                {/* <item.icon size={20} style={{ color: item.color, minWidth: '20px' }} /> */}
                <LogOut onClick={logout}/>
                <AnimatePresence>
                  {isSideBarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      Logout
                    </motion.span>
                  )}
                  {/* Show text only when sidebar is open */}
                </AnimatePresence>
              </motion.div>
        </nav>
      </div>
    </motion.div>
  )
}
