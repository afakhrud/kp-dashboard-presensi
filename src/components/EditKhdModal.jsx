import React, { useState, useCallback, useEffect } from 'react';
import { ModalContext } from './MiddleBoy';


function EditKhdModal() {
    const [tanggal, setTanggal] = useState(ModalContext.tanggal);
    const changeTanggal = useCallback((e) => setTanggal(e.target.value), []);
    const [ket, setKet] = useState(ModalContext.ket);
    const changeKet = useCallback((e) => setKet(e.target.value), []);

    useEffect(() => {
        console.log(tanggal);
    }, [tanggal])
    return (
        <div>
            <div class="post-modal-body">
                <div class="form-group">
                    <label for="id">ID:</label>
                    <input type="text" class="form-control styled" id="id" value={ModalContext.id} disabled/>
                </div>
                <div class="form-group">
                    <label for="nama">Nama:</label>
                    <input type="text" class="form-control styled" id="nama" value={ModalContext.nama} disabled/>
                </div>
                <div class="form-group">
                    <label for="tanggal">Tanggal:</label>
                    <input type="datetime-local" class="form-control" id="tanggal" value={tanggal} onChange={changeTanggal} />
                </div>
                <div class="form-group">
                    <label for="ket">Keterangan:</label>
                    <input type="text" class="form-control styled" id="ket" value={ket} onChange={changeKet} />
                </div>
            </div>
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
            </div>
        </div>
    )
}

export default EditKhdModal
