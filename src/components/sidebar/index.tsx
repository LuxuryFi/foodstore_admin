import { BarChart, Link, Menu, MenuIcon, User, User2, User2Icon, UserSquare2 } from "lucide-react"
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
        <motion.div
          className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSideBarOpen ? 'w-64' : 'w-20'}`}
          animate={{ width: isSideBarOpen ?  256 : 80}}
        >
          
        <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
          <motion.button 
          whileHover={{scale: 1.1}} 
          whileTap={{scale: 0.9}} 
          onClick={() => setIsSideBarOpen(!isSideBarOpen)} 
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit">

          <Menu size={24}/>
          </motion.button>

          {/* <Routes> */}
        <nav className="mt-8 flex-grow">
            {SIDEBAR_ITEMS.map((item, index )=> (
            <Link key={item.path} to={item.path}>
              <motion.div className="flex p-4 text-sm font-medium rounded-lg hover:bg-gray-400">

                    <item.icon size={20} style={{color: item.color, minWidth: "20px"}}/> 

              </motion.div>
            </Link>

            ))}
        </nav>
{/* <AnimatePresence>
                      {isSideBarOpen && (
                        <motion.span initial={{ opacity: 0, width: 0}} animate={{ opacity: 0, width: 0}} exit={{ opacity: 0, width: 0}}>

                        </motion.span>
                      )}
                    </AnimatePresence> */}
        {/* <Route element='' path={item.path}> {item.name} </Route> */}
          {/* </Routes> */}
        </div>
        
        </motion.div>
  )
}
