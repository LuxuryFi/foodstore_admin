
interface HeaderProps {
  title: string
}

export const Header = ({ title } : HeaderProps) => {
  return (
    <header className='bg-green-800 backdrop-blur-md shadow-lg border-b border-green-700'>
      <div className='max-w-7xl mx-auto py-4 px-4 lg:px-8'>
        <h1 className='text-2xl font-semibold text-green-100'>{title}</h1>
      </div>
    </header>
  )
}
