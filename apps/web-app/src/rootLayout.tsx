import Sidebar from './components/common/sidebar'
import { Outlet } from 'react-router'

const RootLayout = () => {
  return (
    <div className='flex bg-gray-100'>
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default RootLayout
