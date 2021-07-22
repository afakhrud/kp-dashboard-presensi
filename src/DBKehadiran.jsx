import React, { useState, useEffect, useContext, useCallback } from 'react';
import Modal from './components/Modal';
import { getKehadiran, removeKehadiran } from './components/APIKehadiran';
import DBModal from './components/DBModal';
import { FaSearch } from 'react-icons/fa';
import { IoCloseCircleSharp } from "react-icons/io5";
import Search from './components/Search';
import { isKhdReady, DataKehadiran, deleteKehadiran } from './components/MiddleBoy';
import EditKhdModal from './components/EditKhdModal';

function search(straws) {

}


function DBKehadiran() {



    useEffect(() => {
        console.log(DataKehadiran.items);
    }, [isKhdReady()])

    const [addModal, setAddModal] = useState(false);
    const showAddModal = () => {
        setAddModal(!addModal);
    };
    const [editModal, setEditModal] = useState(false);
    const showEditModal = () => {
        setEditModal(!editModal);
    };


    const [listMhs, setListMhs] = useState([]);
    const [isLoadingMhs, setLoadingMhs] = useState(true);
    const [userInput, setUserInput] = useState(false);
    const [isLoadError, setLoadError] = useState(false);
    let totalPage = DataKehadiran.pages() || 1;
    const [currentPage, setCurrentPage] = useState(totalPage);
    const nextPage = () => {
        if (totalPage >= currentPage) {
            setCurrentPage(totalPage);
        } else {
            setCurrentPage(currentPage+1);
        }
    }
    const prevPage = () => {
        if (currentPage < 2) {
            setCurrentPage(1);
        } else {
            setCurrentPage(currentPage-1);
        }
    }

    const [searchQuery, setSearchQuery] = useState([]);
    const changeSearchQuery = useCallback((e) => setSearchQuery(e.target.value), []);
    


    useEffect(() => {
        // set document title
        document.title = 'Database';
    });

    // useEffect(() => {
    //     const fetchMhs = async() => {
    //         setLoadingMhs(true);
    //         try {
    //             var response = await fetch('/mahasiswa');
    //             var result = await response.json();
    //             setListMhs(() => {
    //                 return {
    //                     ...result
    //                 }
    //             })
    //         } catch { 
    //             console.log('error');
    //         }
    //         setLoadingMhs(false);
    //     }
    //     fetchMhs();
    //     setUserInput(false);
    // }, [userInput]);

    // useEffect(async () => {
    //     setLoadingMhs(true);
    //     var res = await getKehadiran({'access-key': 'user_1'});
    //     if (!res) {
    //         setLoadError(true);
    //     } else {
    //         setLoadError(false);
    //     }
    //     setListMhs(() => {
    //         return {
    //             ...res
    //         }
    //     });
    //     setLoadingMhs(false);
    //     // console.log(search(listMhs));
    // }, [])


    return (
    
            <div className='content'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <h1>Database - Kehadiran</h1>
                    {/* {!isLoadingMhs && <h4>Page : {currentPage} of {listMhs.meta.pages}</h4>} */}
                    <div className={(searchQuery.length) ? 'card-wrapper searchbar active' : 'card-wrapper searchbar'}>
                        <input type="text" placeholder="Type to search" value={searchQuery} onChange={changeSearchQuery}/>
                        <FaSearch style={{marginBottom:0}} />   
                    </div>
                </div>
                <div className='shadow card-wrapper db'>
                    <table class="table table-hover table-bordered">

                        <thead>
                            <th scope="col" className="tooltip">Id
                                <span className="tooltip-text">Click to filter</span>
                            </th>
                            <th scope="col">Nama</th>
                            <th scope="col">Tanggal</th>
                            <th scope="col">Keterangan</th>
                            <th >Actions</th>
                        </thead>

                        <tbody id="table-mahasiswa-content">
                            {isKhdReady() ?  
                            Search(DataKehadiran.getPage(currentPage), searchQuery).map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.kehadiran_id}</td>
                                        <td>{item.kehadiran_nama}</td>
                                        <td>{item.kehadiran_tanggal}</td>
                                        <td>{item.kehadiran_ket}</td>
                                        <td>
                                            <button onClick={
                                                (e) => console.log(DataKehadiran.pages())
                                            }>Edit</button>
                                            <button onClick={
                                                (e) => deleteKehadiran({'access-key': 'user_1', 'kehadiran_id': item.kehadiran_id})
                                            }>Delete</button>
                                        </td>
                                    </tr>
                                )
                            }) : null}
                            

                            <tr style={{verticalAlign: 'middle'}} className="table-footer">
                                <td colSpan="6">
                                    <span style={{paddingRight: 5}}>Page {currentPage} of {currentPage}</span>
                                    <button onClick={
                                        prevPage
                                    }>Prev</button>
                                    <button onClick={
                                        nextPage
                                    }>Next</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button type="button" class="btn btn-primary" onClick={() => {
                    showEditModal();
                    
                }}>ADD</button>

                {addModal && <Modal title="Add Data Kehadiran" click={showAddModal}>
                    <DBModal act='post' />
                    
                </Modal>}

                {editModal && <Modal title="Edit Data Kehadiran" click={showEditModal}>
                    <EditKhdModal />

                </Modal>}
            </div>
     
    )
}



export default DBKehadiran