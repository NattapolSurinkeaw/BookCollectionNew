import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { getCreatePublisher } from '../../../services/publish.service';

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


export default function CreatePublish({open, handleClose, setRefresh}) {
    const [titleTH, setTitleTH] = useState("");
    const [titleEN, setTitleEN] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const [inputFile, setInputFile] = useState(null);

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        setInputFile(file)
        if (file) {
          const preview = URL.createObjectURL(file);
          setPreviewImage(preview)
        }
    };

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('title_TH', titleTH);
        formData.append('title_EN', titleEN);
        formData.append('thumbnail', inputFile);

        formData.forEach((key, value) => {
            console.log(value + " : " + key)
        });
        getCreatePublisher(formData).then((res) => {
            if(res.status == 'success') {
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
        <Box sx={style}>
            <div className='w-full flex justify-center mb-4'>
                <div className="image-input p-4 border">
                    <label>Front Cover</label>
                    <label className='block w-40 h-60' htmlFor="inpFrontCover"><img className='w-40 h-60' src={previewImage || "/public/images/noimage.jpeg"} alt="Front Cover Preview" width="100" /></label>
                    <input type="file" className='hidden' id='inpFrontCover' name="inpFrontCover" accept="image/*" onChange={(e) => handleFileChange(e, "front")} />
                </div>
            </div>

            <div>
                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 [#34495e]:text-white">Title TH</label>
                <input 
                    value={titleTH}
                    onChange={(e) => setTitleTH(e.target.value)}
                    type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 [#34495e]:bg-gray-700 [#34495e]:border-gray-600 [#34495e]:placeholder-gray-400 [#34495e]:text-white [#34495e]:focus:ring-blue-500 [#34495e]:focus:border-blue-500" placeholder="John" required />
            </div>

            <div>
                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 [#34495e]:text-white">Title EN</label>
                <input 
                    value={titleEN}
                    onChange={(e) => setTitleEN(e.target.value)}
                    type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 [#34495e]:bg-gray-700 [#34495e]:border-gray-600 [#34495e]:placeholder-gray-400 [#34495e]:text-white [#34495e]:focus:ring-blue-500 [#34495e]:focus:border-blue-500" placeholder="John" required />
            </div>

        <button 
            onClick={onSubmit}
            type="button" 
            className="mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 [#34495e]:bg-green-600 [#34495e]:hover:bg-green-700 [#34495e]:focus:ring-green-800">บันทึก</button>
        </Box>
    </Modal>
  )
}
