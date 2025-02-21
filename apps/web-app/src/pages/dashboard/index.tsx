import Card from './components/card'

const Dashboard = () => {
  return (
    <div className='w-full p-3'>
      <section className='flex gap-x-3'>
        <Card/>
        <Card/>
        <Card/>
      </section>
    </div>
  )
}

export default Dashboard
