import React, { useState, useEffect, useContext, useCallback } from 'react';
import Modal from './components/Modal';
import { getKehadiran, removeKehadiran } from './components/APIKehadiran';
import DBModal from './components/DBModal';
import { FaSearch } from 'react-icons/fa';
import { IoCloseCircleSharp } from "react-icons/io5";
import Search from './components/Search';
import { isKhdReady, DataKehadiran, deleteKehadiran, ModalContext, Calendarized } from './components/MiddleBoy';
import EditKhdModal from './components/EditKhdModal';
import { ModalState } from './Database';
import AddKhdModal from './components/AddKhdModal';
import pagedView from './components/Pagination';


function DBKehadiran() {
    function fetchData() {
        setLoadingData(true);
        DataKehadiran.refreshKhd().then((res) => {
            if (res === 'success') {
                setTimeout(() => {
                    setReady(true);
                    setLoadingData(false);
                    setTotalPage(Math.ceil(Search(DataKehadiran.items, searchQuery).length/5));
                    console.log(DataKehadiran.items);
                }, 800)
            } else {
                setTimeout(() => {
                    setReady(false);
                    setLoadingData(false);
                }, 50);
            }
        });
    } 
    

    useEffect(() => {
        // console.log(DataKehadiran.items);
        // console.log(listData);
        // console.log(DataKehadiran.refreshKhd());

        setLoadingData(true);
        DataKehadiran.refreshKhd().then((res) => {
            console.log(res);
            if (res === 'success') {
                setReady(true);
                setLoadingData(false);
                setTotalPage(Math.ceil(Search(DataKehadiran.items, searchQuery).length/5));
                console.log(DataKehadiran.items);
                console.log(Calendarized(DataKehadiran));
            } else {
                setReady(false);
                setLoadingData(false);
            }
            // setLoadingData(false);
            console.log(isLoadingData);
        });

    }, [])

    const [addModal, setAddModal] = useState(false);
    const showAddModal = () => {
        setAddModal(!addModal);
    };
    const [editModal, setEditModal] = useState(false);
    const showEditModal = () => {
        setEditModal(!editModal);
    };
    const [isDataReady, setReady] = useState(isKhdReady());
    // setTimeout(() => {
    //     setReady(isKhdReady());
    //     setTotalPage(Math.ceil(Search(DataKehadiran.items, searchQuery).length/5));
    // }, 1500);

    const [listData, setListData] = useState(DataKehadiran.items);
    const changeListData = useCallback(() => setListData(Search(DataKehadiran.items, searchQuery)), []);

    const [isLoadingData, setLoadingData] = useState(true);
    const [userInput, setUserInput] = useState(false);
    const [isLoadError, setLoadError] = useState(false);
    const [totalPage, setTotalPage] = useState(1);
    // let totalPage = Math.ceil(listData.length/5) || 1;
    const [currentPage, setCurrentPage] = useState(1);
    const nextPage = () => {
        if (totalPage <= currentPage) {
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
        setTotalPage(Math.ceil(Search(DataKehadiran.items, searchQuery).length/5));
        console.log(Calendarized(DataKehadiran));
    }, [searchQuery])
    // useEffect(() => {
    //     setTimeout(() => {
    //         setListData(DataKehadiran.items);
    //     }, 1200);
    // })
    // setTimeout(() => {
    //     setListData(DataKehadiran.items);
    // }, 1200);
    useEffect(() => {
        // set document title
        document.title = 'Database';
    });

   

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
                            {isLoadingData ? <tr><td colSpan="5">Loading..</td></tr> : isDataReady ?  
                            pagedView(Search(DataKehadiran.items, searchQuery), currentPage).listed.map((item, index) => {
                                // listData.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.kehadiran_id}</td>
                                        <td>{item.kehadiran_nama}</td>
                                        <td>{item.kehadiran_tanggal}</td>
                                        <td>{item.kehadiran_ket}</td>
                                        <td>
                                            <button onClick={
                                                (e) => {
                                                    showEditModal();
                                                    ModalContext.clear();
                                                    ModalContext.nama = item.kehadiran_nama;
                                                    ModalContext.id = item.kehadiran_id;
                                                    ModalContext.tanggal = item.kehadiran_tanggal;
                                                    ModalContext.ket = item.kehadiran_ket;
                                                }
                                            }>Edit</button>
                                            <button onClick={
                                                (e) => {
                                                    deleteKehadiran({'access-key': 'user_1', 'kehadiran_id': item.kehadiran_id});
                                                    fetchData();
                                                }
                                                // (e) => deleteKehadiran({'access-key': 'user_1'}, {'access-key': 'user_1', kehadiran_nama: item.kehadiran_nama})
                                            }>Delete</button>
                                        </td>
                                    </tr>
                                )
                            }) : 
                            <tr><td colSpan="5" style={{textAlign: 'center'}} className="heading">OOPS!</td></tr>
                            }
                            {/* {   () => {
                                    setTimeout(() => {
                                        setListData(pagedView(Search(DataKehadiran.items, searchQuery), currentPage).listed)
                                        if (listData.length) {listData.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.kehadiran_id}</td>
                                                    <td>{item.kehadiran_nama}</td>
                                                    <td>{item.kehadiran_tanggal}</td>
                                                    <td>{item.kehadiran_ket}</td>
                                                    <td>
                                                        <button onClick={
                                                            (e) => {
                                                                showEditModal();
                                                                ModalContext.clear();
                                                                ModalContext.nama = item.kehadiran_nama;
                                                                ModalContext.id = item.kehadiran_id;
                                                                ModalContext.tanggal = item.kehadiran_tanggal;
                                                                ModalContext.ket = item.kehadiran_ket;
                                                            }
                                                        }>Edit</button>
                                                        <button onClick={
                                                            (e) => deleteKehadiran({'access-key': 'user_1', 'kehadiran_id': item.kehadiran_id}, null)
                                                            // (e) => deleteKehadiran({'access-key': 'user_1'}, {'access-key': 'user_1', kehadiran_nama: item.kehadiran_nama})
                                                        }>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })};
                                    }, 1000);
                                }
                            } */}

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

                {addModal && <Modal title="Add Data Kehadiran" click={showAddModal}>
                    {/* <DBModal act='post' /> */}
                    <AddKhdModal />
                    
                </Modal>}

                {editModal && <Modal title="Edit Data Kehadiran" click={showEditModal}>
                    <EditKhdModal />

                </Modal>}
            </div>
     
    )
}



export default DBKehadiran;