import React, { useState, useCallback, useEffect } from 'react';
import { ModalContext, addKehadiran } from './MiddleBoy';


function AddKhdModal() {
    const [tanggal, setTanggal] = useState();
    const changeTanggal = useCallback((e) => setTanggal(e.target.value), []);
    const [ket, setKet] = useState();
    const changeKet = useCallback((e) => setKet(e.target.value), []);
    const [nama, setNama] = useState();
    const changeNama = useCallback((e) => setNama(e.target.value), []);

    useEffect(() => {
        // console.log(tanggal);
    }, [tanggal])
    return (
        <div>
            <div class="post-modal-body">
                {/* <div class="form-group">
                    <label for="id">ID:</label>
                    <input type="text" class="form-control styled" id="id" value={ModalContext.id} disabled/>
                </div> */}
                <div class="form-group">
                    <label for="nama">Nama:</label>
                    <input type="text" class="form-control styled" id="nama" value={nama} onChange={changeNama}/>
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
                <button
                    onClick={(e) => {
                        addKehadiran(null, {
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
