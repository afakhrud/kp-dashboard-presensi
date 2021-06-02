import React, { useState } from 'react';
import { postMahasiswa, putMahasiswa } from './APIMahasiswa';
import captureInputMahasiswa from './Capturer';



function DBModal(props) {
    const [processing, setLoading] = useState(false);
    const [successStat, setSuccessStat] = useState(false);
    const [errorStat, setErrorStat] = useState(false);

    function AddMahasiswa(){
        const data = captureInputMahasiswa();
        data['access-key'] = 'user_1';
        setLoading(true);
        postMahasiswa(data).then(
            (response) => {
                setSuccessStat(true);
            }
        ).catch(
            (err) => {
                setErrorStat(true);
                console.log(err);
            }
        );
        setLoading(false);
        setTimeout(() => {
            setSuccessStat(false);
            setErrorStat(false);
        }, 3000);
    }
    
    function EditMahasiswa() {
        const data = captureInputMahasiswa();
        data['access-key'] = 'user_1';
        data['mahasiswa_id'] = props.placeholders.id;
        setLoading(true);
        putMahasiswa(data).then(
            (response) => {
                setSuccessStat(true);
            }
        ).catch(
            (err) => {
                setErrorStat(true);
                console.log(err);
            }
        );
        setLoading(false);
        setTimeout(() => {
            setSuccessStat(false);
            setErrorStat(false);
        }, 3000);
    }
    

    return (
        <div>
            <div class="post-modal-body ml-3 mr-3 mb-3 mt-2">
                <div class="from-group">
                    <label for="nama">Nama</label>
                    <input type="text" class="form-control" id="nama" name="mahasiswa_nama"
                    placeholder={props.placeholders ? props.placeholders.nama : 'Nama'} />
                </div>
                <div class="from-group mt-3">
                    <label for="angkatan">Angkatan</label>
                    <input type="number" class="form-control" id="angkatan" name="mahasiswa_angkatan" placeholder={props.placeholders ? props.placeholders.angkatan : '2018'} />
                </div>
                <div class="form-group mt-3">
                    <label for="jurusan">Jurusan</label>
                    <select class="form-control" id="jurusan" name="mahasiswa_jurusan">
                        <option value="Teknik Informatika">Teknik Informatika</option>
                        <option value="Teknik Elektro">Teknik Elektro</option>
                        <option value="Teknik Biomedis">Teknik Biomedis</option>
                    </select>
                </div>
                <div class="from-group">
                    <label for="nim">NIM</label>
                    <input type="text" class="form-control" id="nim" name="mahasiswa_nim" placeholder={props.placeholders ? props.placeholders.nim : '22/666666/TK/55555'}/>
                </div>
            </div>
            <div class="modal-footer">
                {processing ? <p>Loading..</p> : null}
                {successStat ? <p>Success</p> : null}
                {errorStat ? <p>Error</p> : null}
                <button type="submit" class="btn btn-primary" onClick={() => { 
                    (props.act === 'put') ? EditMahasiswa(props.placeholders.id) : 
                    AddMahasiswa();  
                }}>Apply</button>
            </div>
        </div>
    )
}

export default DBModal
