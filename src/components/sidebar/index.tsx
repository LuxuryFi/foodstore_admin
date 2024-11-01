import { BarChart, Menu, User2Icon, UserSquare2 } from "lucide-react";
import { Link, Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import Homepage from "../homepage";

const SIDEBAR_ITEMS = [
  { name: 'Homepage', icon: BarChart, color: '#ffffff', path: '/' }, 
  { name: 'User', icon: User2Icon, color: '#ffffff', path: '/user' }, 
  { name: 'Internal User', icon: UserSquare2, color: '#ffffff', path: '/internal' }, 
  { name: 'Product', icon: User2Icon, color: '#ffffff', path: '/category' }, 
];

export const Sidebar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSideBarOpen ? 'w-64' : 'w-20'}`}
      animate={{ width: isSideBarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <motion.button 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }} 
          onClick={() => setIsSideBarOpen(!isSideBarOpen)} 
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.path} to={item.path}>
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-400">
                {/* Render the icon and text */}
                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                {isSideBarOpen && <span className="ml-2">{item.name}</span>} {/* Show text only when sidebar is open */}
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};
