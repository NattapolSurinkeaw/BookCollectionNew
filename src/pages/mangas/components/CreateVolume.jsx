import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { getCreateVolume } from '../../../services/manga.service';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
};

export default function CreateVolume({ open, handleClose, mangaId, setRefresh }) {
    const [frontCover, setFrontCover] = useState({ file: null, preview: null });
    const [sideCover, setSideCover] = useState({ file: null, preview: null });
    const [backCover, setBackCover] = useState({ file: null, preview: null });
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [release, setRelease] = useState(null);
    const [priority, setPriority] = useState(0);
    const [detail, setDetail] = useState("");

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const preview = URL.createObjectURL(file);

            if (type === "front") {
                setFrontCover({ file, preview });
            } else if (type === "side") {
                setSideCover({ file, preview });
            } else if (type === "back") {
                setBackCover({ file, preview });
            }
        }
    };

    const onSubmit = () => {
        const formData = new FormData();
        if (frontCover.file) formData.append("front_cover", frontCover.file);
        if (sideCover.file) formData.append("side_cover", sideCover.file);
        if (backCover.file) formData.append("back_cover", backCover.file);
        formData.append("manga_id", mangaId);
        formData.append("title", title);
        formData.append("price", price);
        formData.append("release", release);
        formData.append("priority", priority);
        formData.append("detail", detail);

        getCreateVolume(formData).then((res) => {
            console.log(res)
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
            <Box sx={style} className="h-[90%] p-6 w-[800px] max-sm:w-[90%] mx-auto overflow-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Volume</h2>

                <div className="flex flex-col gap-6">
                    {/* Cover Images Section */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-700 mb-3">Volume Covers</h3>
                        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                            {/* Front Cover */}
                            <div className="image-input group">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Front Cover*</label>
                                <label
                                    htmlFor="inpFrontCover"
                                    className="block w-48 h-64 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden cursor-pointer hover:border-blue-500 transition-all relative"
                                >
                                    <img
                                        className="w-full h-full object-cover group-hover:opacity-90"
                                        src={frontCover.preview || "/images/noimage.jpeg"}
                                        alt="Front Cover Preview"
                                    />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white font-medium">Click to upload</span>
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    className="hidden"
                                    id="inpFrontCover"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, "front")}
                                />
                            </div>

                            {/* Side Cover */}
                            <div className="image-input group">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Side Cover</label>
                                <label
                                    htmlFor="inpSideCover"
                                    className="block w-48 h-64 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden cursor-pointer hover:border-blue-500 transition-all relative"
                                >
                                    <img
                                        className="w-full h-full object-cover group-hover:opacity-90"
                                        src={sideCover.preview || "/images/noimage.jpeg"}
                                        alt="Side Cover Preview"
                                    />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white font-medium">Click to upload</span>
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    className="hidden"
                                    id="inpSideCover"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, "side")}
                                />
                            </div>

                            {/* Back Cover */}
                            <div className="image-input group">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Back Cover</label>
                                <label
                                    htmlFor="inpBackCover"
                                    className="block w-48 h-64 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden cursor-pointer hover:border-blue-500 transition-all relative"
                                >
                                    <img
                                        className="w-full h-full object-cover group-hover:opacity-90"
                                        src={backCover.preview || "/images/noimage.jpeg"}
                                        alt="Back Cover Preview"
                                    />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white font-medium">Click to upload</span>
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    className="hidden"
                                    id="inpBackCover"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, "back")}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title_TH" className="block mb-2 text-sm font-medium text-gray-700">
                                Title*
                            </label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                id="title_TH"
                                className="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Volume title"
                                required
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700">
                                Price*
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <span className="text-gray-500">฿</span>
                                </div>
                                <input
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    type="number"
                                    id="price"
                                    className="w-full pl-8 px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="release_date" className="block mb-2 text-sm font-medium text-gray-700">
                                ลำดับ
                            </label>
                            <input
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                type="number"
                                id="release_date"
                                className="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                                required
                            />
                        </div>
                        {/* Release Date */}
                        <div>
                            <label htmlFor="release_date" className="block mb-2 text-sm font-medium text-gray-700">
                                Release Date*
                            </label>
                            <input
                                value={release}
                                onChange={(e) => setRelease(e.target.value)}
                                type="date"
                                id="release_date"
                                className="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="release_date" className="block mb-2 text-sm font-medium text-gray-700">
                            detail
                        </label>
                        <textarea 
                        onChange={(e) => setDetail(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                        name="" id="">{detail}</textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={onSubmit}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Add Volume
                        </button>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}
