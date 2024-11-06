import { motion } from 'framer-motion'
import { PieChart, Cell, Pie, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const categoryData = [
  { name: 'Test', value: 7123 },
  { name: 'Test', value: 2123 },
  { name: 'Test', value: 3123 },
  { name: 'Test', value: 31123 },
  { name: 'Test', value: 5123 }
]

const COLORS = ['#6366F1', '#3266F1', '#De66F1', '#DA23F1', '#EE66F1']

const CategoryDistributionChart = () => {
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
          <PieChart>
            <Pie
              data={categoryData}
              cx={'50%'}
              cy={'50%'}
              labelLine={false}
              outerRadius={80}
              fill='#8884d8'
              dataKey='value'
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)} %`}
            >
              {categoryData.map((entry, index) => {
                return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              })}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgb(255, 255, 255)',
                borderColor: 'rgb(4, 120, 87)',
                color: 'rgb(4, 120, 87)'
              }}
              itemStyle={{ color: '#ESE7EB' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default CategoryDistributionChart
