import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';

interface StatCardProps {
  name: string;
  icon: typeof DollarSign;
  color: string;
  value: number;
}

export const StatCard = ({ name, icon: Icon, color, value }: StatCardProps) => {
  return (
    <motion.div
      className="bg-green-800 backdrop-blur-md border border-green-800 rounded-xl shadow-[0_4px_10px_rgba(34,197,94,0.5)]"
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(34, 197, 94, 0.5)' // Custom green shadow on hover
      }}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center text-sm font-medium text-white-300">
          <Icon size={20} className="mr-2" style={{ color }} />
          {name}
        </span>
        <div className="text-white-300 text-2xl font-semibold">{value}</div>
      </div>
    </motion.div>
  );
};
