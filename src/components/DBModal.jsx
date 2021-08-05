// import React, { useState, useCallback, useContext } from 'react';
// import { postMahasiswa, putMahasiswa } from './APIMahasiswa';
// import captureInputMahasiswa from './Capturer';
// import { ModalState } from '../DBMahasiswa';


// function DBModal(props) {

//     const {addModal, showAddModal} = useContext(ModalState);

//     const [processing, setLoading] = useState(false);
//     const [successStat, setSuccessStat] = useState(false);
//     const [errorStat, setErrorStat] = useState(false);

//     const defData = {
//         dataNama: props.placeholders ? props.placeholders.nama : '',
//         dataAngkatan: props.placeholders ? props.placeholders.angkatan : '',
//         dataNim: props.placeholders ? props.placeholders.nim : '',
//         dataJurusan: props.placeholders ? props.placeholders.jurusan : ''
//     };


//     const [nama, setNama] = useState(defData.dataNama);
//     const changeNama = useCallback((e) => setNama(e.target.value), []);

//     const [angkatan, setAngkatan] = useState(defData.dataAngkatan);
//     const changeAngkatan = useCallback((e) => setAngkatan(e.target.value), []);

//     const [jurusan, setJurusan] = useState(defData.dataJurusan);
//     const changeJurusan = useCallback((e) => setJurusan(e.target.value), []);

//     const [nim, setNim] = useState(defData.dataNim);
//     const changeNim = useCallback((e) => setNim(e.target.value), []);

//     function AddMahasiswa(){
//         const data = captureInputMahasiswa();
//         data['access-key'] = 'user_1';
//         setLoading(true);
//         postMahasiswa(data).then(
//             (response) => {
//                 setSuccessStat(true);
//             }
//         ).catch(
//             (err) => {
//                 setErrorStat(true);
//                 console.log(err);
//             }
//         );
//         setLoading(false);
//         setTimeout(() => {
//             setSuccessStat(false);
//             setErrorStat(false);
//         }, 3000);
//     }
    
//     function EditMahasiswa() {
//         const data = captureInputMahasiswa();
//         data['access-key'] = 'user_1';
//         data['mahasiswa_id'] = props.placeholders.id;
//         setLoading(true);
//         putMahasiswa(data).then(
//             (response) => {
//                 setSuccessStat(true);
//             }
//         ).catch(
//             (err) => {
//                 setErrorStat(true);
//                 console.log(err);
//             }
//         );
//         setLoading(false);
//         setTimeout(() => {
//             setSuccessStat(false);
//             setErrorStat(false);
//         }, 3000);
//     }
    

//     return (

//         <div>
//             <div class="post-modal-body ml-3 mr-3 mb-3 mt-2">
//                 <div class="form-group">
//                     <label for="nama">Nama:</label>
//                     <input type="text" class="form-control" id="nama" value={nama} onChange={changeNama}
//                     placeholder={props.placeholders ? props.placeholders.nama : 'Nama'} />
//                 </div>
//                 <div class="form-group">
//                     <label for="angkatan">Angkatan:</label>
//                     <input type="number" class="form-control" id="angkatan" value={angkatan} onChange={changeAngkatan} placeholder={props.placeholders ? props.placeholders.angkatan : '2018'} />
//                 </div>
//                 <div class="form-group">
//                     <label for="jurusan">Jurusan:</label>
//                     <select class="form-control" id="jurusan" value={jurusan} onChange={changeJurusan}>
//                         <option value="Teknik Informatika" id="te">Teknik Informatika</option>
//                         <option value="Teknik Elektro" id="ti">Teknik Elektro</option>
//                         <option value="Teknik Biomedis" id="tb">Teknik Biomedis</option>
//                     </select>
//                 </div>
//                 <div class="form-group">
//                     <label for="nim">NIM:</label>
//                     <input type="text" class="form-control" id="nim" value={nim} onChange={changeNim} placeholder={props.placeholders ? props.placeholders.nim : '22/666666/TK/55555'}/>
//                 </div>
//             </div>
//             <div class="modal-footer">
//                 {processing ? <p>Loading..</p> : null}
//                 {successStat ? <p>Success</p> : null}
//                 {errorStat ? <p>Error</p> : null}
//                 <button type="submit" class="btn btn-primary" onClick={() => { 
//                     (props.act === 'put') ? EditMahasiswa(props.placeholders.id) : 
//                     AddMahasiswa();  
//                 }}>Apply</button>
//                 <button onClick={showAddModal}>
//                     Klik
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default DBModal
