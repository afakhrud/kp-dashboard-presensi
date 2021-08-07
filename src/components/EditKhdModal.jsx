import React, { useState, useCallback, useEffect } from 'react';
import Alert from './Alert';
import { ModalContext, editKehadiran } from './MiddleBoy';


function EditKhdModal(props) {
    const [tanggal, setTanggal] = useState(ModalContext.tanggal);
    const changeTanggal = useCallback((e) => setTanggal(e.target.value), []);
    const [ket, setKet] = useState(ModalContext.ket);
    const changeKet = useCallback((e) => setKet(e.target.value), []);
    const [message, setMessage] = useState('');
    const [alert, showAlert] = useState(false);

    useEffect(() => {
        let titl = document.title;
        document.title = 'Ubah data';
        return (() => {
            document.title = titl;
        })
    }, [])

    const handleEdit = (data) => {
        console.log(data);
        showAlert(true);
        editKehadiran(null, data)
        .then((res) => {
            setMessage(res.message);
            props.refresh();
        })
        .catch((err) => {
            if (err.message) {
                setMessage(err.message);
            } else {
                setMessage('Error!');
            }
        });
    }
    useEffect(() => {
        if (message.length) {
            showAlert(true);
            let timer = setTimeout(() => {
                showAlert(false);
                setMessage(() => '');
            }, 5000);
            // return clearTimeout(timer);        
        }
    }, [message])

    return (
        <div>
            <div className="post-modal-body" style={{fontWeight: 500}}>
                <div className="form-group">
                    <label for="id">ID:</label>
                    <input type="text" className="form-control styled" id="id" value={ModalContext.id} disabled/>
                </div>
                <div className="form-group">
                    <label for="nama">Nama:</label>
                    <input type="text" className="form-control styled" id="nama" value={ModalContext.nama} disabled/>
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
                alert &&
                <Alert text={message} close={(e) => {showAlert(false)}} />
            }
            <div class="modal-footer">
                {/* {processing ? <p>Loading..</p> : null}
                {successStat ? <p>Success</p> : null}
                {errorStat ? <p>Error</p> : null}
                <button type="submit" class="btn btn-primary" onClick={() => { 
                    (props.act === 'put') ? EditMahasiswa(props.placeholders.id) : 
                    AddMahasiswa();  
                }}>Apply</button>
                <button onClick={showAddModal}>
                    Klik
                </button> */}
                <button
                    onClick={(e) => {
                        handleEdit({
                            kehadiran_id: ModalContext.id,
                            kehadiran_tanggal: tanggal,
                            kehadiran_ket: ket,
                            kehadiran_nama: ModalContext.nama,
                            'access-key': 'user_1'
                        });
                    }
                }>Apply</button>
            </div>
        </div>
    )
}

export default EditKhdModal
