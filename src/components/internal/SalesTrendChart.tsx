import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const overviewData = [
  { name: 'Jan', sales: 8000 },
  { name: 'Feb', sales: 1000 },
  { name: 'Mar', sales: 12000 },
  { name: 'Apr', sales: 1000 },
  { name: 'May', sales: 11000 },
  { name: 'June', sales: 1000 },
  { name: 'Jul', sales: 6000 },
  { name: 'Aug', sales: 7000 },
  { name: 'Oct', sales: 25000 },
  { name: 'Nov', sales: 8000 },
  { name: 'DEc', sales: 3000 }
]

export const SaleTrendChart = () => {
  return (
    <motion.div
      className='bg-white-800 bg-opacity-800 backdrop-blur-md shadow-lg rounded-xl p-6 border border-white-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className='text-lg font-medium mb-4 text-green-800'>Sales Overview</h2>

      <div className='h-80'>
        <ResponsiveContainer width={'100%'} height={'100%'}>
          <LineChart data={overviewData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#047857' />
            <XAxis dataKey='name' />
            <YAxis stroke='#047857' />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgb(255, 255, 255)',
                borderColor: 'rgb(4, 120, 87)',
                color: 'rgb(4, 120, 87)'
              }}
              itemStyle={{ color: '#047857' }}
            />
            <Line
              type='natural'
              dataKey='sales'
              stroke='#047857'
              strokeWidth={3}
              dot={{ fill: '#047857', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
