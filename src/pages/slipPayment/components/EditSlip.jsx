import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import AddVolume from './AddVolume';
import { getVolumeAll } from '../../../services/manga.service';
import { img_path } from '../../../store/setting';
import { getCreatePayment } from '../../../services/slippayment.service';

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


export default function EditSlip({ open, handleClose, setRefresh }) {
  const [volumes, setVolumes] = useState([]);
  const [modalVolume, setModalVolume] = useState(false);
  const [slcVolume, setSlcVolume] = useState([]);
  const [slipImage, setSlipImage] = useState(null);
  const [imageProduct, setImageProduct] = useState(null);
  const [store, setStore] = useState("");
  const [price, setPrice] = useState("");
  const [transport, setTransport] = useState("");
  const [numberPacel, setNumberPacel] = useState("");
  const [fileSlip, setFileSlip] = useState(null);
  const [fileProduct, setFileProduct] = useState(null);
  const [createAt, setCreateAt] = useState(null);

  const openModal = () => setModalVolume(true);
  const closeModal = () => setModalVolume(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getVolumeAll();
      setVolumes(res.volumes);
    }

    fetchData()
  }, [])

  const handleSelectVolume = (vol) => {
    setSlcVolume(prev => {
      const isExist = prev.some(item => item.volume_id === vol.volume_id);
      console.log(vol)
      if (isExist) return prev;
      return [
        ...prev,
        {
          ...vol,
          price_per_vol: vol.price,
          discount_per_vol: '',
          quantity: 1,
        },
      ];
    });
  };

  const updateVolumeField = (volume_id, field, value) => {
    setSlcVolume(prev =>
      prev.map(item =>
        item.volume_id === volume_id
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const handleRemove = (vol) => {
    setSlcVolume(prev => {
      const isExist = prev.some(item => item.volume_id === vol.volume_id);

      if (isExist) {
        // ถ้ามีอยู่แล้ว ให้ลบออก
        return prev.filter(item => item.volume_id !== vol.volume_id);
      } else {
        // ถ้ายังไม่มี ให้เพิ่มเข้าไป
        return [...prev, vol];
      }
    });
  }

  const handleSlipChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFileSlip(file);
      setSlipImage(imageUrl);

      // 👉 ถ้าคุณจะอัปโหลดขึ้นเซิร์ฟเวอร์ ให้เก็บ file ไว้ด้วย
      // setSlipFile(file);
    }
  };

  const handleProductImage = (e) => {
    const file1 = e.target.files[0];
    if (file1) {
      setFileProduct(file1)
      const imageUrl1 = URL.createObjectURL(file1);
      setImageProduct(imageUrl1);

      // 👉 ถ้าคุณจะอัปโหลดขึ้นเซิร์ฟเวอร์ ให้เก็บ file ไว้ด้วย
      // setSlipFile(file);
    }
  };

  const onSubmit = () => {
    console.log(slcVolume)
    

    const formData = new FormData();
    formData.append('store_sell', store);
    formData.append('total_price', price);
    formData.append('transport', transport);
    formData.append('pacel_number', numberPacel);
    formData.append('slip_image', fileSlip);
    formData.append('image_product', fileProduct);
    formData.append('productList', JSON.stringify(slcVolume))
    formData.append('create_at', createAt)
    // formData.forEach((value, key) => {
    //   console.log(value + " : " + key)  
    // });

    getCreatePayment(formData).then((res) => {
      // console.log(res)
      handleClose()
      setRefresh(prev => !prev)
    })
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="overflow-auto w-[800px] max-sm:w-[90%] h-[80%]">
        <Typography id="modal-modal-title" variant="h5" component="h2" className="mb-4 font-semibold">
          เพิ่มข้อมูลการชำระเงิน (Pay Slip)
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ฝั่งซ้าย */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">ร้านค้า</label>
              <input 
              onChange={(e) => setStore(e.target.value)}
              value={store}
              type="text" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ราคาทั้งหมด</label>
              <input 
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              type="text" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">วันที่ซื้อ</label>
              <input 
              onChange={(e) => setCreateAt(e.target.value)}
              value={createAt}
              type="date" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            <div>
              <p className="text-sm font-medium mb-1">รูปสลิป</p>
              <label
                htmlFor="slipImg"
                className="block cursor-pointer p-1 w-54 h-80 border-2 border-dashed border-gray-400 rounded overflow-hidden hover:opacity-80 bg-gray-100"
              >
                {slipImage ? (
                  <img className="object-cover rounded w-full h-full" src={slipImage} alt="สลิปที่อัปโหลด" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                    คลิกเพื่ออัปโหลด
                  </div>
                )}
              </label>
              <input
                id="slipImg"
                type="file"
                accept="image/*"
                onChange={(e) => handleSlipChange(e)}
                className="hidden"
              />
            </div>
          </div>

          {/* ฝั่งขวา */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">ขนส่ง</label>
              <input 
              onChange={(e) => setTransport(e.target.value)}
              value={transport}
              type="text" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">เลขพัสดุ</label>
              <input 
              value={numberPacel}
              onChange={(e) => setNumberPacel(e.target.value)}
              type="text" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">จำนวนเล่มหนังสือ</label>
              <input 
              value={slcVolume.length || 0}
              type="text" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" disabled />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">รูปหนังสือ</p>
              <label
                htmlFor="bookImg"
                className="block cursor-pointer p-1 w-54 h-80 border-2 border-dashed border-gray-400 rounded overflow-hidden hover:opacity-80 bg-gray-100"
              >
                {imageProduct ? (
                  <img className="object-cover rounded w-full h-full" src={imageProduct} alt="สลิปที่อัปโหลด" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                    คลิกเพื่ออัปโหลด
                  </div>
                )}
              </label>
              <input
                id="bookImg"  
                type="file"
                accept="image/*"
                onChange={(e) => handleProductImage(e)}
                className="hidden"
              />
            </div>
          </div>
        </div>

        <hr className="my-6" />

        {/* เลือก Volume */}
        <div>
          <p className="text-lg font-semibold mb-2">รายการหนังสือ</p>
          <div className="flex flex-col gap-4 h-80 overflow-auto border rounded p-3">
            <div
              className="w-40 h-10 flex justify-center items-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer text-3xl text-gray-500 hover:bg-gray-100 transition"
              onClick={openModal}
            >
              +
            </div>

            {slcVolume.map((slcVol) => (
              <div key={slcVol.volume_id} className="w-40 h-60 flex gap-4 w-full">
                <img
                  className="w-44 h-50 object-cover rounded shadow"
                  src={img_path + slcVol.front_cover}
                  alt=""
                />
                <div className='w-full'>
                  <input
                    placeholder='ราคาต่อเล่ม'
                    type="text"
                    value={slcVol.price_per_vol}
                    onChange={(e) => updateVolumeField(slcVol.volume_id, 'price_per_vol', e.target.value)}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <input
                    placeholder='ส่วนลดต่อเล่ม'
                    type="text"
                    value={slcVol.discount_per_vol}
                    onChange={(e) => updateVolumeField(slcVol.volume_id, 'discount_per_vol', e.target.value)}
                    className="w-full mt-2 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <input
                    placeholder='จำนวนเล่ม'
                    type="text"
                    value={slcVol.quantity}
                    onChange={(e) => updateVolumeField(slcVol.volume_id, 'quantity', e.target.value)}
                    className="w-full mt-2 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <button
                    onClick={() => handleRemove(slcVol)}
                    className="bg-red-500 mt-2 w-10 h-7 text-white text-xs rounded flex items-center justify-center shadow-md hover:bg-red-600 transition"
                  >
                    ลบ
                  </button>
                </div>
              </div>
            ))}
          </div>

          {modalVolume && (
            <AddVolume
              openVol={modalVolume}
              handleCloseVol={closeModal}
              volumes={volumes}
              handleSelectVolume={handleSelectVolume}
            />
          )}

          {/* ปุ่มดำเนินการ */}
          <div className="mt-6 flex justify-end space-x-3">
            <button 
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              ยกเลิก
            </button>
            <button 
            onClick={onSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              ยืนยันการชำระเงิน
            </button>
          </div>
        </div>
      </Box>
    </Modal>

  )
}
