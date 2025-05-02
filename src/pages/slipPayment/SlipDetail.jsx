import React, { useState, useEffect } from 'react'
import { getSlipPaymentDetail } from '../../services/slippayment.service';
import { useParams } from 'react-router-dom';
import { img_path } from '../../store/setting';

export default function SlipDetail() {
  const { id } = useParams();
  const [payment, setPayment] = useState([]);
  const [mangaVol, setMangaVol] = useState([]);

  useEffect(( ) => {
    const fetchData = async() => {
      const res = await getSlipPaymentDetail(id);
      setPayment(res.slipDetail)
      setMangaVol(Array.isArray(res.listPayment) ? res.listPayment : [res.listPayment]);
    }
    
    fetchData()
  }, [])

  useEffect(() => {
    console.log(mangaVol)

  }, [mangaVol])
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">ใบเสร็จการชำระเงิน #{payment.id}</h1>
          <p className="text-gray-500 mt-1">
            วันที่ซื้อ: {new Date(payment.created_at).toLocaleDateString('th-TH', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </p>
        </div>
        <div className="bg-blue-100 px-4 py-2 rounded-lg">
          <span className="text-xl font-semibold text-blue-800">
            ฿{payment?.total_price?.toLocaleString('th-TH')}
          </span>
        </div>
      </div>
  
      {/* Payment Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">รายละเอียดการซื้อ</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">ร้านที่ขาย:</span>
              <span className="font-medium">{payment.store_sell}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ขนส่ง:</span>
              <span className="font-medium">{payment.transport}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='flex gap-4'>
        <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-3 w-full">หลักฐานการชำระเงิน</h2>
          <img 
            className="w-full max-w-xs h-auto border rounded-lg object-cover shadow-sm" 
            src={img_path + payment.slip_image || "/images/noimage.jpeg"} 
            alt="Slip Image" 
            onError={(e) => {
              e.target.src = "/images/noimage.jpeg";
            }}
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-3 w-full">รูปหนังสือทั้งหมด</h2>
          <img 
            className="w-full max-w-xs h-auto border rounded-lg object-cover shadow-sm" 
            src={img_path + payment.image_product || "/images/noimage.jpeg"} 
            alt="Slip Image" 
            onError={(e) => {
              e.target.src = "/images/noimage.jpeg";
            }}
          />
        </div>
      </div>
  

      {/* Divider */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-lg font-semibold text-gray-700">
            รายการหนังสือ
          </span>
        </div>
      </div>
  
      {/* Manga List */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">หนังสือทั้งหมด ({mangaVol.length} เล่ม)</h2>
        
        {mangaVol.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mangaVol.map((vol) => (
              <div key={vol.volume_id} className="group hover:shadow-md transition-shadow duration-200">
                <div className="relative pb-[140%] overflow-hidden rounded-t-lg">
                  <img 
                    className="absolute w-full h-full object-cover border group-hover:opacity-90 transition-opacity"
                    src={img_path + vol.front_cover} 
                    alt={vol.title_TH}
                    onError={(e) => {
                      e.target.src = "/images/noimage.jpeg";
                    }}
                  />
                </div>
                <div className="p-2 border-l border-r border-b rounded-b-lg">
                  <p className="font-medium text-gray-800 truncate">{vol.title_TH}</p>
                  <p className="text-sm text-gray-500">{vol.vol_title}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-red-600 font-semibold">
                      ฿{vol.unit_price}
                    </span>
                    {vol.unit_discount > 0 && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        ลด {vol.unit_discount}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500">ไม่มีข้อมูลหนังสือ</p>
          </div>
        )}
      </div>
    </div>
  )
}

