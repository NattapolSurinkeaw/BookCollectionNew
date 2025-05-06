import React, { useState, useEffect } from 'react'
import { getPublishAll } from '../../services/publish.service';
import CreatePublish from './components/CreatePublish';
import { img_path } from '../../store/setting';

export default function Publisher() {
  const [publisher, setPublisher] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [openCreateModel, setOpenCreateModal] = useState(false);

  const handleClose = () => setOpenCreateModal(false)

  useEffect(() => {
    const fetchData = async() => {
      const res = await getPublishAll()
      setPublisher(res.publish);
    }

    fetchData()
  }, [refresh])
  return (
    <div className='p-6 max-w-6xl max-sm:p-0'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Publisher</h1>
        <button
          onClick={() => setOpenCreateModal(true)}
          className='px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all'
        >
          Create
        </button>
      </div>

      {openCreateModel && (
        <CreatePublish open={openCreateModel}  handleClose={handleClose} setRefresh={setRefresh} />
      )}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-sm:mb-[40px]'>
        {publisher?.length > 0 ? (
          publisher.map((publish) => (
            <div key={publish.id} className='rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all'>
              <img className='w-full h-40 object-cover' src={img_path + publish.thumbnail} alt={publish.title_TH || publish.title_EN} />
              <div className='p-4'>
                <h2 className='text-lg font-semibold text-center text-gray-800'>{publish.title_TH || publish.title_EN}</h2>
                <p className='text-center text-sm text-gray-600 mt-2'>{publish.description || 'ไม่มีคำอธิบาย'}</p>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-gray-500 col-span-full'>ไม่พบข้อมูล</p>
        )}
      </div>
    </div>
  )
}
