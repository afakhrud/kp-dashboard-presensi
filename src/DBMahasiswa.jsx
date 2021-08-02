import React, { useState, useEffect, useContext, useCallback } from 'react';
import { maxDataTake } from './components/Config';
import Modal from './components/Modal';
import DBModal from './components/DBModal';
import { FaSearch } from 'react-icons/fa';
import { IoCloseCircleSharp } from "react-icons/io5";
import Search from './components/Search';
import { getMahasiswa, getKehadiran, editMahasiswa, deleteMahasiswa } from './components/MiddleBoy';
import pagedView from './components/Pagination';
export const ModalState = React.createContext();



function DBMahasiswa() {

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
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
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


    const defaultPlaceholders = {
        'id': null,
        'nama': '',
        'angkatan': '',
        'nim': ''
    }
    const [placeholders, setPlaceholders] = useState(defaultPlaceholders);
    
    useEffect(() => {
        // set document title
        document.title = 'Database';
    }, []);

    const takeDataTable = async () => {
        setLoadingMhs(true);
        var res = await getMahasiswa({'access-key': 'user_1'});
        if (!res) {
            setLoadError(true);
            setLoadingMhs(false);
        } else {
            if (!res.status) {
                setLoadError(true);
                setLoadingMhs(false);
            } else {
                setLoadError(false); 
                setListMhs(() => {
                    return {
                        ...res
                    }
                });
                setLoadingMhs(false);
                return true;
            }
        }
    }
    useEffect(() => {
        if (!isLoadingMhs) {
            setTotalPage(() => {
                return (Math.ceil(Search(listMhs.data, searchQuery).length/maxDataTake))
            });
        }
    }, [isLoadingMhs, currentPage, searchQuery]);

    useEffect(() => {
        takeDataTable().then((res) => {
            if (res) {            
                console.log('loaded from database');
            }
        });
    }, [])

    useEffect(() => {
        if (currentPage > totalPage) {
            setCurrentPage(() => { return (1); });
        }
    });

    return (
        <ModalState.Provider value={{addModal, showAddModal}}>
            <div className='content'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <h1>Database - Mahasiswa</h1>
                    {/* {!isLoadingMhs && <h4>Page : {currentPage} of {listMhs.meta.pages}</h4>} */}
                    <div className="card-wrapper searchbar">
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
                            <th scope="col">Angkatan</th>
                            <th scope="col">Prodi</th>
                            <th scope="col">NIM</th>
                            <th >Actions</th>
                        </thead>

                        <tbody id="table-mahasiswa-content">
                            {isLoadingMhs ? <tr><td colSpan="6">Loading..</td></tr> : isLoadError ? <tr><td colSpan="6" style={{textAlign: 'center'}} className="heading">OOPS!</td></tr> :  
                            pagedView(Search(listMhs.data, searchQuery), currentPage).listed.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.mahasiswa_id}</td>
                                        <td>{item.mahasiswa_nama}</td>
                                        <td>{item.mahasiswa_angkatan}</td>
                                        <td>{item.mahasiswa_jurusan}</td>
                                        <td>{item.mahasiswa_nim}</td>
                                        <td>
                                            <button 
                                            >Details</button>
                                            <button onClick={
                                                (e) => {
                                                    showEditModal();
                                                    setPlaceholders({
                                                        'id': item.mahasiswa_id,
                                                        'nama': item.mahasiswa_nama,
                                                        'angkatan': item.mahasiswa_angkatan,
                                                        'nim': item.mahasiswa_nim,
                                                        'jurusan': item.mahasiswa_jurusan
                                                    });
                                                }
                                            }>Edit</button>
                                            <button onClick={
                                                (e) => {
                                                    deleteMahasiswa({'access-key': 'user_1', 'mahasiswa_id': item.mahasiswa_id});
                                                    takeDataTable();
                                                }
                                            }>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                            
                            
                            <tr style={{verticalAlign: 'middle'}} className="table-footer">
                                <td colSpan="6">
                                    <span style={{paddingRight: 5}}>Page {currentPage} of {totalPage}</span>
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
                    showAddModal();
                    
                }}>ADD</button>

                {addModal && <Modal title="Add Mahasiswa" click={showAddModal}>
                    <DBModal act='post' />
                    
                </Modal>}

                {editModal && <Modal title="Edit Mahasiswa" click={showEditModal}>
                    <DBModal act='put' placeholders={placeholders} />

                </Modal>}
            </div>
        </ModalState.Provider>
    )
}



export default DBMahasiswa