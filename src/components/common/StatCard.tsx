import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';

interface StatCardProps {
  name: string;
  icon: typeof DollarSign; // Type for Lucide icon component
  color: string;
  value: number;
}

export const StatCard = ({ name, icon: Icon, color, value }: StatCardProps) => {
  return (
    <motion.div
      className='bg-white-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-white-700 rounded-xl border'
      whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0,0,0, 0.5)' }}
    >
      <div className='px-4 py-5 sm:p-6'>
        <span className='flex items-center text-sm font-medium text-white-400'>
          <Icon size={20} className='mr-2' style={{ color }} />
          {name}
        </span>
        <div className='text-white text-2xl font-semibold'>{value}</div>
      </div>
    </motion.div>
  );
};
