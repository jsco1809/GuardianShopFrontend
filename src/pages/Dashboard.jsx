import CardHome from '../components/Cards/CardHome'
import Average from '../components/Cards/Average'
import Maps from '../components/Cards/Maps'

const Dashboard = () => {
  return (
    <div className=' w-full h-[2000px] bg-gray-100 flex-col anyBox justify-center dark:bg-darkBg dark:text-white'>
      <CardHome className="mb-10"/>
      <Average/>
      <Maps/>
    </div>
  )
}

export default Dashboard
