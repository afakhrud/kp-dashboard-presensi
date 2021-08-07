import React, { useState, useCallback, useEffect } from 'react';
import Alert from './Alert';
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
               <Alert text={message} close={(e) => {showAlertMhs(false)}} />
            }
            <div className="modal-footer">
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
