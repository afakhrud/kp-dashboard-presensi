import React, { useState, useCallback, useEffect } from 'react';
import { addMahasiswa } from './MiddleBoy';


function AddMhsModal() {
    const [nama, setNama] = useState();
    const changeNama = useCallback((e) => setNama(e.target.value), []);
    const [angkatan, setAngkatan] = useState();
    const changeAngkatan = useCallback((e) => setAngkatan(e.target.value), []);
    const [jurusan, setJurusan] = useState('Teknik Informatika');
    const changeJurusan = useCallback((e) => setJurusan(e.target.value), []);
    const [nim, setNim] = useState();
    const changeNim = useCallback((e) => setNim(e.target.value), []);
    const [message, setMessage] = useState('');
    const [alertMhs, showAlertMhs] = useState(false);

    useEffect(() => {
        let titl = document.title;
        document.title = 'Tambah Mahasiswa';
        return (() => {
            document.title = titl;
        })
    }, [])

    const handleAddMhs = (data) => {
        showAlertMhs(true);
        addMahasiswa(null, data)
        .then((res) => {
            setMessage(res.message);
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
            showAlertMhs(true);
            let timer = setTimeout(() => {
                showAlertMhs(false);
                setMessage(() => '');
            }, 5000);
            // return clearTimeout(timer);        
        }
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
                    <input type="text" class="form-control styled" id="nama" value={nama} onChange={changeNama}/>
                </div>
                <div className="form-group">
                    <label for="nim">NIM:</label>
                    <input type="text" class="form-control styled" id="nim" value={nim} onChange={changeNim} />
                </div>
                <div className="form-group">
                    <label for="jurusan">Jurusan:</label>
                    <select className="form-control styled" id="jurusan" value={jurusan} onChange={changeJurusan}>
                        <option value="Teknik Informatika" id="te">Teknik Informatika</option>
                        <option value="Teknik Elektro" id="ti">Teknik Elektro</option>
                        <option value="Teknik Biomedis" id="tb">Teknik Biomedis</option>
                    </select>
                </div>
                <div className="form-group">
                    <label for="angkatan">Angkatan:</label>
                    <input type="number" class="form-control styled" id="angkatan" value={angkatan} onChange={changeAngkatan} />
                </div>
            </div>
            {
                alertMhs &&
                <div className='card-wrapper' style={{
                    backgroundColor: 'rgb(200,200,200)',
                    marginTop: 15,
                    // width: '100%',
                    // height: '100%',
                    display: 'grid',
                    gridTemplateColumns: '8fr 1fr'
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
                        onClick={(e) => {showAlertMhs(false)}}
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
                        handleAddMhs({
                            'access-key': 'user_1',
                            mahasiswa_nama: nama,
                            mahasiswa_nim: nim,
                            mahasiswa_jurusan: jurusan,
                            mahasiswa_angkatan: angkatan
                        });
                    }
                }>Apply</button>
            </div>
        </div>
    )
}


export default AddMhsModal
