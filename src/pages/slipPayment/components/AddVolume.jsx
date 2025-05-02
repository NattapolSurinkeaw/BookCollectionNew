import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { img_path } from '../../../store/setting';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
};

export default function AddVolume({openVol, handleCloseVol, volumes, handleSelectVolume}) {
    const [mode, setMode] = useState(1);
    const [searchTitle, setSearchTitle] = useState("");
    console.log(volumes)

    const filterManga = Array.isArray(volumes)
    ? volumes.filter((vol) => {
        const matchTitle =
            searchTitle === "" ||
            [vol.title_TH, vol.title_EN, vol.title_AT]
            .filter(Boolean) // กัน null หรือ undefined
            .some((title) =>
                title.toLowerCase().includes(searchTitle.toLowerCase())
            );

        return matchTitle;
        })
    : [];

  return (
    <Modal
      open={openVol} // Pass boolean instead of function
      onClose={handleCloseVol}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <div>
                <button
                    className='bg-gray-300 w-20 rounded-l border'
                    onClick={() => setMode(0)}
                >เพิ่มใหม่</button>
                <button
                    className='bg-gray-300 w-20 rounded-r border'
                    onClick={() => setMode(1)}
                >ค้นหา</button>
            </div>
            {
                mode === 0 ? (
                <div className='flex flex-col gap-4 p-4'>
                    <div>
                        <label htmlFor="">ชื่อไทย</label>
                        <input type="text" className='border ml-4' />
                    </div>
                    <div>
                        <label htmlFor="">ชื่ออังกฤษ</label>
                        <input type="text" className='border ml-4' />
                    </div>
                    <div>
                        <label htmlFor="">ชื่ออื่นๆ</label>
                        <input type="text" className='border ml-4' />
                    </div>
                    <div>
                        <label htmlFor="">สำนักพิมพ์</label>
                        <select name="" id="">
                            <option value="1">สยามอินเตอร์</option>
                        </select>
                    </div>
                </div> 
            ) : ( 
                    <div>
                        <input
                            type="text"
                            id="first_name"
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            className="bg-gray-50 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 [#34495e]:bg-gray-700 [#34495e]:border-gray-600 [#34495e]:placeholder-gray-400 [#34495e]:text-white [#34495e]:focus:ring-blue-500 [#34495e]:focus:border-blue-500"
                            placeholder="ค้นหามังงะ"
                            required
                        />

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            {
                                filterManga.map((vol) => (
                                    <div
                                        onClick={() => handleSelectVolume(vol)}
                                    >
                                        <img
                                            className="h-44 w-full rounded-lg"
                                            src={ img_path + vol.front_cover }
                                            alt="Manga Cover 1"
                                        />
                                        <p>{`${vol.title_TH} ${vol.vol_title}`}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
            <button 
                className='bg-blue-500 text-white rounded p-1 w-14 mt-1 ml-auto block'
                onClick={handleCloseVol}
            >เพิ่ม</button>
        </Box>
    </Modal>
  )
}
