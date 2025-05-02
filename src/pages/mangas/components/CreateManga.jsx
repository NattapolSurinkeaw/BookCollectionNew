import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { getCreateManga } from '../../../services/manga.service';

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

export default function CreateManga({ open, handleClose, setRefresh, publish }) {
    const [titleTH, setTitleTH] = useState("");
    const [titleEN, setTitleEN] = useState("");
    const [titleAT, setTitleAT] = useState("");
    const [publisher, setPublisher] = useState(null);
    const [statusFinish, setStatusFinish] = useState(1);
    const [lcRelease, setLcRelease] = useState(null);

    const onSubmit = () => {

        const formData = new FormData();
        formData.append('title_TH', titleTH);
        formData.append('title_EN', titleEN);
        formData.append('title_AT', titleAT);
        formData.append('publish_id', publisher);
        formData.append('finished_status', statusFinish);
        formData.append('lc_release', lcRelease);

        getCreateManga(formData).then((res) => {
            if (res.status == 'success') {
                handleClose()
                setRefresh(prev => !prev)
            }
        })

    }
    return (
        <Modal
            open={open} // Pass boolean instead of function
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Add New Manga</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title TH */}
                    <div className="col-span-1">
                        <label htmlFor="title_TH" className="block text-sm font-medium text-gray-700 mb-1">
                            Title (TH) <span className="text-red-500">*</span>
                        </label>
                        <input
                            value={titleTH}
                            onChange={(e) => setTitleTH(e.target.value)}
                            type="text"
                            id="title_TH"
                            className="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Thai title"
                            required
                        />
                    </div>

                    {/* Title EN */}
                    <div className="col-span-1">
                        <label htmlFor="title_EN" className="block text-sm font-medium text-gray-700 mb-1">
                            Title (EN)
                        </label>
                        <input
                            value={titleEN}
                            onChange={(e) => setTitleEN(e.target.value)}
                            type="text"
                            id="title_EN"
                            className="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="English title"
                        />
                    </div>

                    {/* Title AT */}
                    <div className="col-span-1">
                        <label htmlFor="title_AT" className="block text-sm font-medium text-gray-700 mb-1">
                            Title (AT)
                        </label>
                        <input
                            value={titleAT}
                            onChange={(e) => setTitleAT(e.target.value)}
                            type="text"
                            id="title_AT"
                            className="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Alternative title"
                        />
                    </div>

                    {/* Publisher */}
                    <div className="col-span-1">
                        <label htmlFor="publisher" className="block text-sm font-medium text-gray-700 mb-1">
                            Publisher <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={publisher}
                            onChange={(e) => setPublisher(e.target.value)}
                            id="publisher"
                            className="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                        >
                            <option value="" disabled selected>Select publisher</option>
                            {publish.map((ph) => (
                                <option key={ph.id} value={ph.id}>{ph.title_TH}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status */}
                    <div className="col-span-1">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                            Status <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={statusFinish}
                            onChange={(e) => setStatusFinish(e.target.value)}
                            id="status"
                            className="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                        >
                            <option value="" disabled selected>Select status</option>
                            <option value="1">Ongoing</option>
                            <option value="2">Completed</option>
                        </select>
                    </div>

                    {/* Release Date */}
                    <div className="col-span-1">
                        <label htmlFor="release_date" className="block text-sm font-medium text-gray-700 mb-1">
                            Release Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            value={lcRelease}
                            onChange={(e) => setLcRelease(e.target.value)}
                            type="date"
                            id="release_date"
                            className="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end mt-8">
                    <button
                        onClick={onSubmit}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add Manga
                    </button>
                </div>
            </Box>
        </Modal>
    )
}
