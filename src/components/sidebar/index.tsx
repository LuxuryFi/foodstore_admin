import { BarChart, MenuIcon, User, User2, User2Icon, UserSquare2 } from "lucide-react"
import { Route, Routes } from "react-router-dom"
import Homepage from "../homepage"
import { motion } from "framer-motion"
import { useState } from "react"

const SIDEBAR_ITEMS = [
  { name: 'Homepage', icon: BarChart, color: '#ffffff', path: '/' }, 
  { name: 'User', icon: User2Icon, color: '#ffffff', path: '/user' }, 
  { name: 'Internal User', icon: UserSquare2, color: '#ffffff', path: '/internal' }, 
  { name: 'Product', icon: User2, color: '#ffffff', path: '/category' }, 
]

export const Sidebar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true)

  return (
    <div>
       {/* <Routes>
            {SIDEBAR_ITEMS.length > 0 && SIDEBAR_ITEMS.map((item) => {
              <Route path={item.path} element={/>
            })}

        </Routes> */}
        <motion.div
          className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSideBarOpen ? 'w-64' : 'w-20'}`}
          animate={{ width: isSideBarOpen ?  256 : 80}}
        >

        <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
          <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} onClick={() => setIsSideBarOpen(!isSideBarOpen)} className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit">

          <MenuIcon></MenuIcon>
          </motion.button>
        </div>

        </motion.div>
    </div>  
  )
}
