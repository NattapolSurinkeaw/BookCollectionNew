import React, { useState, useEffect} from 'react'
import { getMangaAll } from '../../services/manga.service';
import { Link } from 'react-router-dom';
import CreateManga from './components/CreateManga';
import { getPublishAll } from '../../services/publish.service';
import { img_path } from '../../store/setting';

export default function Mangas() {
    const [mangas, setMangas] = useState([]);
    const [publish, setPublish] = useState([]);
    const [createModal, setCreateModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [selectPublish, setSelectPublish] = useState("");
    const [searchtitle, setSearchTitle] = useState("");

    const handleClose = () => setCreateModal(false);

    useEffect(() => {
      getMangaAll().then((res) => {
        setMangas(res.mangas)
      })
    }, [refresh])

    useEffect(() => {
      getPublishAll().then((res) => {
        setPublish(res.publish)
      })
    }, [])

    const filterManga = Array.isArray(mangas)
    ? mangas.filter((manga) => {
        const matchPublish =
          selectPublish === "" || manga.publish_id === parseInt(selectPublish);

        const matchTitle =
          searchtitle === "" ||
          [manga.title_TH, manga.title_EN, manga.title_AT]
            .filter(Boolean) // กัน null หรือ undefined
            .some((title) =>
              title.toLowerCase().includes(searchtitle.toLowerCase())
            );

        return matchPublish && matchTitle;
      })
    : [];


  return (
    <div>
      <div>

      </div>

      <div className='flex justify-between'>
        <h1 className='text-2xl font-bold'>Manga</h1>
        <div className='flex gap-4 h-10'>
          <div className='flex gap-4'>
            <div className="flex w-72">
              <input 
              value={searchtitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              type="text" placeholder="Search manga..." 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-primary" />
              <button className="bg-[#3498db] text-white px-4 py-2 rounded-r hover:bg-blue-600 transition">
                <i className="fas fa-search"></i>
              </button>
            </div>

            <select 
              onChange={(e) => setSelectPublish(e.target.value)}
              value={selectPublish}
              id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 [#34495e]:bg-gray-700 [#34495e]:border-gray-600 [#34495e]:placeholder-gray-400 [#34495e]:text-white [#34495e]:focus:ring-blue-500 [#34495e]:focus:border-blue-500">
              <option value="">เลือกสำนักพิมพ์</option>
              {
                publish?.map((ph) => (
                  <option value={ph.id}>{ph.title_TH}</option>

                ))
              }
            </select>
          </div>

          <button 
            onClick={(e) => setCreateModal(true)}
            type="button" className="h-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 [#34495e]:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          > 
          <i className="fas fa-plus mr-2"></i>Create</button>
        </div>
      </div>
      {
        createModal && (
          <CreateManga 
            open={createModal} 
            handleClose={handleClose} 
            setRefresh={setRefresh}  
            publish={publish}
          />
        )
      }
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {
          filterManga && filterManga.length > 0 ? (
            filterManga.map((mg) => (
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 transition-transform">
                <div className="relative">
                  <img src={img_path + mg.thumbnail || "/images/noimage.jpeg"} alt="Manga Cover" className="w-full h-60 object-cover" />
                  <span className="absolute top-2 right-2 bg-blue-100 text-info px-2 py-1 rounded text-xs font-medium">
                    Ongoing
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 truncate">{mg.title_TH}</h3>
                  <p className="text-gray-600 text-sm mb-1">{mg.title_EN || "null"}</p>
                  <p className="text-gray-500 text-xs">LC Date: {mg.lc_release}</p>
                </div>
                <div className="flex justify-between p-3 border-t border-gray-200">
                  <button className="text-primary hover:text-blue-600">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="text-danger hover:text-red-600">
                    <i className="fas fa-trash"></i>
                  </button>
                  <Link to={`/manga/${mg.id}`} className="text-gray-600 hover:text-gray-800">
                    <i className="fas fa-eye mr-1"></i> View
                  </Link>
                </div>
              </div>
            ))
          ) : (
              <p>ไม่มีข้อมูล Manga</p>
        )}
      </div>
    </div>
  )
}
