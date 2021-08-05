import React, { useState, useEffect, useContext, useCallback } from 'react';
import Modal from './components/Modal';
// import { getKehadiran, removeKehadiran } from './components/APIKehadiran';
import { FaSearch } from 'react-icons/fa';
import { maxDataTake } from './components/Config';
import Search from './components/Search';
import { isKhdReady, DataKehadiran, deleteKehadiran, ModalContext, Calendarized, getKehadiran, normalizeDate } from './components/MiddleBoy';
import EditKhdModal from './components/EditKhdModal';
import AddKhdModal from './components/AddKhdModal';
import pagedView from './components/Pagination';


function DBKehadiran() {
    
    const takeDataTable = async () => {
        try {
            setLoadingData(true);
            var res = await getKehadiran({'access-key': 'user_1'});
            if (!res) {
                setLoadError(true);
                setLoadingData(false);
            } else {
                if (!res.status) {
                    setLoadError(true);
                    setLoadingData(false);
                } else {
                    setLoadError(false); 
                    setListData(() => {
                        return {
                            ...res
                        }
                    });
                    setLoadingData(false);
                    return true;
                }
            }
        } catch (err) {
            console.log(err);
            setLoadingData(false);
            setLoadError(true);
        }
    }
    // function fetchData() {
    //     setLoadingData(true);
    //     DataKehadiran.refreshKhd().then((res) => {
    //         if (res === 'success') {
    //             setTimeout(() => {
    //                 setReady(true);
    //                 setLoadingData(false);
    //                 setTotalPage(Math.ceil(Search(DataKehadiran.items, searchQuery).length/5));
    //                 console.log(DataKehadiran.items);
    //             }, 800)
    //         } else {
    //             setTimeout(() => {
    //                 setReady(false);
    //                 setLoadingData(false);
    //             }, 50);
    //         }
    //     });
    // } 
    

    useEffect(() => {
        document.title= 'Database';
        takeDataTable();
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
    
    const defaultList = {
        status: false,
        data: []
    }
    const [listData, setListData] = useState(defaultList);
    // const changeListData = useCallback(() => setListData(Search(DataKehadiran.items, searchQuery)), []);

    const [isLoadingData, setLoadingData] = useState(true);
    const [userInput, setUserInput] = useState(false);
    const [isLoadError, setLoadError] = useState(false);
    const [totalPage, setTotalPage] = useState(1);
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

    const [notif, setNotif] = useState(false);
    const [message, setMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState([]);
    const changeSearchQuery = useCallback((e) => setSearchQuery(e.target.value), []);


    // useEffect(() => {
    //     console.log(Calendarized(DataKehadiran));
    // }, [searchQuery])
    useEffect(() => {
        if (!isLoadingData) {
            setTotalPage(() => {
                return (Math.ceil(Search(listData.data, searchQuery).length/maxDataTake))
            });
        }
        // console.log(listData.data)
    }, [isLoadingData, currentPage, searchQuery]);

    useEffect(() => {
        if (currentPage > totalPage) {
            setCurrentPage(() => { return (1); });
        }
    });

    const handleDelete = (data) => {
        deleteKehadiran(data)
        .then((res) => {
            setMessage(res.message);
            setNotif(true);
            takeDataTable();
        })
        .catch((err) => {
            setMessage('Failed!')
            setNotif(true);
        })
    }

    useEffect(() => {
        if (notif) {
            alert(message);
            setNotif(()=> false);
        }
    }, [notif])

    return (
    
            <div className='content'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <h1>Database - Kehadiran</h1>
                    <div className={(searchQuery.length) ? 'card-wrapper searchbar active' : 'card-wrapper searchbar'}>
                        <input type="text" placeholder="Type to search" value={searchQuery} onChange={changeSearchQuery}/>
                        <FaSearch style={{marginBottom:0}} />   
                    </div>
                </div>
                <div className='shadow card-wrapper db'>
                    <table class="table table-hover table-bordered">

                        <thead>
                            <th scope="col" className="tooltip">Id
                                {/* <span className="tooltip-text">Click to filter</span> */}
                            </th>
                            <th scope="col">Nama</th>
                            <th scope="col">Tanggal</th>
                            <th scope="col">Keterangan</th>
                            <th >Actions</th>
                        </thead>

                        <tbody id="table-mahasiswa-content">
                            {isLoadingData ? <tr><td colSpan="5">Loading..</td></tr> : isLoadError ? <tr><td colSpan="5" style={{textAlign: 'center'}} className="heading">OOPS!</td></tr> :  
                            pagedView(Search(listData.data, searchQuery), currentPage).listed.map((item, index) => {
                                // listData.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.kehadiran_id}</td>
                                        <td>{item.kehadiran_nama}</td>
                                        <td>{normalizeDate(item.kehadiran_tanggal)}</td>
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
                                                    handleDelete({'access-key': 'user_1', 'kehadiran_id': item.kehadiran_id});
                                                }
                                                // (e) => deleteKehadiran({'access-key': 'user_1'}, {'access-key': 'user_1', kehadiran_nama: item.kehadiran_nama})
                                            }>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                           
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
                    <AddKhdModal refresh={takeDataTable}/>
                    
                </Modal>}

                {editModal && <Modal title="Edit Data Kehadiran" click={showEditModal}>
                    <EditKhdModal refresh={takeDataTable}/>

                </Modal>}
            </div>
     
    )
}



export default DBKehadiran;