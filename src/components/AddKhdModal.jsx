import React, { useState, useCallback, useEffect } from 'react';
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
    const [bridge, setBridge] = useState()
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
                <div className='card-wrapper' style={{
                    backgroundColor: 'rgb(200,200,200)',
                    marginTop: 15,
                    // width: '100%',
                    // height: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr 0.1fr'
                    }}>
                    <span style={{width: '90%'}}>{message}</span>
                    <span style={{width: '10%', float:'right'}}>
                        <button style={{
                            width: 28, 
                            height: 28,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onClick={(e) => {showAlertKhd(false)}}
                        >
                            <span style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 0,
                                fontWeight: 800,
                                fontSize: 24,
                                position: 'relative',
                                top: -2
                                }}>
                                <p>&times;</p>
                            </span>
                        </button>
                    </span>
                </div>
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
