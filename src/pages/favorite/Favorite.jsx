import React, { useState, useEffect } from 'react'
import { getVolumeFavoriteAll } from '../../services/manga.service'
import { img_path } from '../../store/setting';

export default function Favorite() {
  const [volumes, setVolumes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getVolumeFavoriteAll();
      console.log(res);
      setVolumes(res.volume);
    }

    fetchData()
  }, [])

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-gray-300">Favorite</h1>

      {volumes.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {volumes.map((vol) => (
            <div
              key={vol.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={vol.front_cover ? img_path + vol.front_cover : "/images/noimage.jpeg"}
                  alt={vol.title_TH || vol.title_EN}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 truncate">
                  {vol.title_TH || vol.title_EN}
                </h3>
                <p className="text-sm text-gray-600 mb-1 truncate">{vol.vol_title}</p>
                <p className="text-lg font-bold text-indigo-600">
                  {vol.price}฿
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xl text-gray-600">ไม่พบข้อมูล</p>
          <p className="text-gray-500 mt-2">คุณยังไม่มีรายการโปรด</p>
        </div>
      )}
    </div>
  )
}
