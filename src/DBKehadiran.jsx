import React, { useState, useEffect, useContext, useCallback } from 'react';
import Modal from './components/Modal';
import { getKehadiran, removeKehadiran } from './components/APIKehadiran';
import DBModal from './components/DBModal';
import { FaSearch } from 'react-icons/fa';
import { IoCloseCircleSharp } from "react-icons/io5";
import Search from './components/Search';
import { isKhdReady, DataKehadiran, deleteKehadiran, ModalContext } from './components/MiddleBoy';
import EditKhdModal from './components/EditKhdModal';
import { ModalState } from './Database';
import AddKhdModal from './components/AddKhdModal';
import pagedView from './components/Pagination';

function search(straws) {

}


function DBKehadiran() {

    

    useEffect(() => {
        // console.log(DataKehadiran.items);
        // console.log(listData);
        // console.log(DataKehadiran.refreshKhd());
        DataKehadiran.refreshKhd().then((res) => {
            console.log(res);
            if (res === 'success') {
                setReady(true);
                setTotalPage(Math.ceil(Search(DataKehadiran.items, searchQuery).length/5));
                console.log(DataKehadiran.items);
            } else {
                setReady(false);
            }
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
    
    // useEffect(() => {
    //     // totalPage = Math.ceil(pagedView(Search(DataKehadiran.items, searchQuery)).length/5);
    //     setTimeout(() => {
    //         setListData(() => {return Search(DataKehadiran.items, searchQuery)});
    //         setTotalPage(() => { return Math.ceil(listData.length/5)});
    //     }, 100);
        
    //     console.log(listData);
        
    // }, [searchQuery])
    useEffect(() => {
        setTotalPage(Math.ceil(Search(DataKehadiran.items, searchQuery).length/5));
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
                            {isDataReady ?  
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
                                                (e) => deleteKehadiran({'access-key': 'user_1', 'kehadiran_id': item.kehadiran_id}, null)
                                                // (e) => deleteKehadiran({'access-key': 'user_1'}, {'access-key': 'user_1', kehadiran_nama: item.kehadiran_nama})
                                            }>Delete</button>
                                        </td>
                                    </tr>
                                )
                            }) : listData.map((item, index) => {
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
                                })
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