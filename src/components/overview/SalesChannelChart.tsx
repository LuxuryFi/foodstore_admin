import React from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const SALLES_CHANNEL_DATA = [
  { name: 'Web', value: 3123 },
  { name: 'Mobile', value: 3123 },
  { name: 'Market place', value: 3123 },
  { name: 'Social', value: 3123 },
  { name: 'Media', value: 3123 }
]

const COLORS = ['#6366F1', '#3266F1', '#De66F1', '#DA23F1', '#EE66F1']

const SalesChannelChart = () => {
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
          <BarChart data={SALLES_CHANNEL_DATA}>
            <CartesianGrid strokeDasharray='3 3' stroke='#4b5563' />
            <YAxis stroke='9CA3AF' />
            <XAxis dataKey='name' stroke='#9CA3AF' />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(31,41,55,0.8)',
                borderColor: '#4B5563'
              }}
              itemStyle={{ color: '#ESE7EB' }}
            />{' '}
            <Legend />
            <Bar dataKey={'value'} fill='#8884d8'>
              {SALLES_CHANNEL_DATA.map((entry, index) => {
                return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default SalesChannelChart
