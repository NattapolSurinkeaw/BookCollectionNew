import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getMangaAndVolumeByMangaId } from '../../services/manga.service';
import { img_path } from '../../store/setting';
import CreateVolume from './components/CreateVolume';

export default function MangaDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true); // เพิ่ม state สำหรับโหลดข้อมูล
  const [openModel, setOpenModel] = useState(false);

  const handleClose = () => setOpenModel(false);

  const [mangaData, setMagaData] = useState(null);
  const [volumeData, setVolumeData] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [slcFrontCover, setSlcFrontCover] = useState("");
  const [slcSideCover, setSlcSideCover] = useState("");
  const [slcBackCover, setSlcBackCover] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [slcVolume, setSlcVolume] = useState(null);

  useEffect(() => {
    if (!id) return; // ป้องกันการเรียก API ถ้า id ไม่มีค่า

    const fetchData = async () => {
      try {
        setLoading(true); // เริ่มโหลดข้อมูล
        const res = await getMangaAndVolumeByMangaId(id);
        console.log(res);
        setMagaData(res.manga);
        setVolumeData(res.volume);
        handleSelectVol(res.volume[0])
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // หยุดโหลดข้อมูล
      }
    };

    fetchData();
  }, [id, refresh]); // ใส่ id ใน dependency array
  // console.log(mangaData)

  const handleSelectVol = (vol) => {
    // console.log(vol)
    setPreviewImage(vol.front_cover ? img_path + vol.front_cover : "/images/noimage.jpeg");
    setSlcFrontCover(vol.front_cover ? img_path + vol.front_cover : "/images/noimage.jpeg");
    setSlcSideCover(vol.side_cover ? img_path + vol.side_cover : "/images/noimage.jpeg");
    setSlcBackCover(vol.back_cover ? img_path + vol.back_cover : "/images/noimage.jpeg");
    setSlcVolume(vol);
  }

  const handleDelete = () => {
    console.log("delete")
  }

  return (
    <div className="max-w-6xl px-4 py-8">
      {/* Manga Header Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {/* Manga Cover Gallery */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            <img
              className="w-64 h-96 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
              src={previewImage}
              alt="Manga Cover Preview"
            />
            <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Available
            </span>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex gap-3 mt-4">
            <img
              onClick={() => setPreviewImage(slcFrontCover)}
              className="w-12 h-16 cursor-pointer object-cover rounded border-2 border-transparent hover:border-blue-500 transition-all"
              src={slcFrontCover}
              alt="Front Cover"
            />
            <img
              onClick={() => setPreviewImage(slcSideCover)}
              className="w-12 h-16 cursor-pointer object-cover rounded border-2 border-transparent hover:border-blue-500 transition-all"
              src={slcSideCover}
              alt="Side Cover"
            />
            <img
              onClick={() => setPreviewImage(slcBackCover)}
              className="w-12 h-16 cursor-pointer object-cover rounded border-2 border-transparent hover:border-blue-500 transition-all"
              src={slcBackCover}
              alt="Back Cover"
            />
          </div>
        </div>

        {/* Manga Info */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          {/* Title Section */}
          <div className="mb-6 border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              <span className='text-gray-500 italic'>มังงะเรื่อง : </span> {mangaData?.title_TH}
            </h1>
          </div>

          {/* Volume Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">
              ข้อมูลเล่ม
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="bg-blue-100 text-blue-800 p-2 rounded mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm text-gray-500">ชื่อเล่ม</p>
                  <p className="font-medium text-gray-800">{slcVolume?.title}</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="bg-purple-100 text-purple-800 p-2 rounded mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm text-gray-500">รายละเอียด</p>
                  <p className="font-medium text-gray-800">{slcVolume?.detail}</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="bg-green-100 text-green-800 p-2 rounded mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm text-gray-500">ราคา</p>
                  <p className="font-medium text-gray-800">{slcVolume?.price} บาท</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="bg-yellow-100 text-yellow-800 p-2 rounded mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm text-gray-500">วันที่ออก</p>
                  <p className="font-medium text-gray-800">{slcVolume?.release}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">รายละเอียด</h2>
            <div className="prose max-w-none text-gray-600 bg-gray-50 rounded-lg p-4">
              {/* Add manga description here if available */}
              <p className="text-gray-500 italic">ไม่มีข้อมูลเรื่องย่อ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-8"></div>

      {/* Volumes Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-gray-800">All Volumes</h2>
          <button
            onClick={(e) => setOpenModel(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium rounded-lg px-5 py-2.5 transition-all shadow-md hover:shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Volume
          </button>
          {openModel && (
            <CreateVolume
              open={openModel}
              handleClose={handleClose}
              mangaId={mangaData.id}
              setRefresh={setRefresh}
            />
          )}
        </div>

        {/* Volumes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {volumeData.map((vol) => (
            <div
              key={vol.id}
              className={`relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${vol?.already_exists ? 'ring-2 ring-green-500' : 'ring-1 ring-gray-200'
                }`}
              onClick={() => handleSelectVol(vol)}
            >
              {/* Volume Cover */}
              <div className="aspect-[3/4] relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={img_path + vol.front_cover || "/images/noimage.jpeg"}
                  alt={`Volume ${vol.title}`}
                />

                {/* Edit Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(vol.id);
                  }}
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-sm transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Edit volume"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>

              {/* Volume Title */}
              <div className="p-3 bg-white">
                <p className="text-sm font-medium text-gray-900 truncate text-center">
                  {vol.title}
                </p>
                <p className="text-xs text-green-600 text-center mt-1"><strong>{vol.price}</strong> THB</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
