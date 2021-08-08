import React, { useState, useCallback, useEffect } from 'react';
import Alert from './Alert';
import { ModalContext, addKehadiran } from './MiddleBoy';


function AddKhdModal(props) {
    const [tanggal, setTanggal] = useState();
    const changeTanggal = useCallback((e) => setTanggal(e.target.value), []);
    const [ket, setKet] = useState();
    const changeKet = useCallback((e) => setKet(e.target.value), []);
    const [nama, setNama] = useState();
    const changeNama = useCallback((e) => setNama(e.target.value), []);
    const [message, setMessage] = useState('');
    const [alertKhd, showAlertKhd] = useState(false);
    // const [bridge, setBridge] = useState();
    useEffect(() => {
        // console.log(tanggal);
        let titl = document.title;
        document.title = 'Tambah Kehadiran'
        return(() => {
            document.title = titl;
        })
    }, [])

    const handleAddKhd = (data) => {
        showAlertKhd(true);
        addKehadiran(null, data).then((res) => {
            setMessage(res.message);
            props.refresh();
        })
        .catch((err) => {
            if (err.message) {
                setMessage(err.message);
                
            } else {
                setMessage('Error!');
                
            }
        })
    }
    useEffect(() => {
        if (message.length) {
            showAlertKhd(true);
            let timer = setTimeout(() => {
                showAlertKhd(false);
                setMessage(() => '');
            }, 5000);
            // return clearTimeout(timer);        
        }
        console.log('alert');
    }, [message])


    return (
        <div>
            <div className="post-modal-body" style={{fontWeight: 500}}>
                {/* <div class="form-group">
                    <label for="id">ID:</label>
                    <input type="text" class="form-control styled" id="id" value={ModalContext.id} disabled/>
                </div> */}
                <div className="form-group">
                    <label for="nama">Nama:</label>
                    <input type="text" className="form-control styled" id="nama" value={nama} onChange={changeNama}/>
                </div>
                <div className="form-group">
                    <label for="tanggal">Tanggal:</label>
                    <input type="datetime-local" className="form-control styled" id="tanggal" value={tanggal} onChange={changeTanggal} />
                </div>
                <div className="form-group">
                    <label for="ket">Keterangan:</label>
                    <input type="text" className="form-control styled" id="ket" value={ket} onChange={changeKet} />
                </div>
            </div>
            {
                alertKhd &&
                <Alert text={message} close={(e) => {showAlertKhd(false)}} />
            }
            <div className="modal-footer">
                <button
                    onClick={(e) => {
                        handleAddKhd({
                            'access-key': 'user_1',
                            kehadiran_tanggal: tanggal,
                            kehadiran_ket: ket,
                            kehadiran_nama: nama
                        });
                    }
                }>Apply</button>
            </div>
        </div>
    )
}

export default AddKhdModal
