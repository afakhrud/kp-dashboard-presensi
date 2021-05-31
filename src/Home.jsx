import React, { useState, useEffect } from 'react'
import Modal from './components/Modal';

function Home() {
    const [modal, setModal] = useState(false);
    const showModal = () => {setModal(!modal)};

    const [isHomeLoading, setHomeLoading] = useState(true);



    const defaultList = {
        data: []
    }
    const [list, setList] = useState(defaultList);

    // const link = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=6d9def1a3b264e08b85e4af29ea37950';
    const linkKehadiran = '/kehadiran'
    // let dataKehadiran = new URLSearchParams();
    // dataKehadiran.append('access-key','user_1');
    const params = {
        'access-key' : 'user_1'
    }
    let options = {
        method: 'GET',
        body: JSON.stringify(params)
    }
    // const searchKey = 'access-key';
    // const searchValue = 'user_1';
    // const linkful = `/kp-rest-api/api/mahasiswa?${searchKey}=${searchValue}`;

    useEffect(() => {
        document.title = 'Home';
        
        var checkUpdate = () => {
            let waktu;
            setInterval( () => {
            //   (waktu = document.getElementById('date')) ? waktu.innerHTML = getDate() : null;
              // getData();

            }, 1000);
        }
        // fetch data
        const fetchData = async() => {
            setHomeLoading(true);
            try {
                var response = await fetch(linkKehadiran);
                // full
                // var response = await fetch('/kp-rest-api/api/mahasiswa?access-key=user_1');
                var result = await response.json();
                setList((current) => {
                    return (
                       {
                           ...result
                       } 
                    )
                })
            } catch { 
                console.log('error');
            }
            console.log(JSON.stringify(result))
            setHomeLoading(false); 
        }
        fetchData();
    }, [])
   


    return (
        <div className='content'>
            <div class="" id="dashboard-nav">
                <div id="content-property" class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 border-bottom">
                    <h1 class="h3 ml-1">Daftar kehadiran</h1>
                    <div class="btn-toolbar mb-2 mb-md-0"> 
                    {/* <div class="dropdown">
                        <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle mr-2" type="button" id="view-mode" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="bi bi-eye"></i>
                            Default
                        </button>
                        <div class="dropdown-menu" aria-labelledby="view-mode">
                            <a class="dropdown-item d-none vmode" id="vmode-default" href="#">Default</a>
                            <a class="dropdown-item vmode" id="vmode-cards" href="#">Cards</a>
                            <a class="dropdown-item vmode" id="vmode-statistics" href="#">Statistics</a>
                            <a class="dropdown-item vmode" id="vmode-table" href="#">Table</a>
                        </div>
                    </div>*/}
                    <p id="date" class="btn-sm btn-outline-secondary disabled"></p>
                    </div>
                </div>
            </div>

            <main class="row mt-3" dashboard="main">
                <div class=" mx-auto">
                    <div className="card-wrapper shadow timestamp">
                        <h4>Newest update</h4>
                        <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Waktu</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Keterangan</th>
                            </tr>
                        </thead>
                        <tbody class="scrollable" id="data-table">
                            {isHomeLoading ? null : list.data.slice(0).reverse().map((item, index) => {
                                return(<tr key={index}>
                                    <td>{item.kehadiran_tanggal}</td>
                                    <td>{item.kehadiran_nama}</td>
                                    <td>{item.kehadiran_ket}</td>
                                </tr>)
                            })}
                        </tbody>
                        </table>
                    {isHomeLoading && <p> Loading.. </p>}
                    </div>
                </div>
                <div class=" mx-auto ">
                    <div className="card-wrapper shadow summary" id="info">
                        <h4>Summary</h4>
                        <table class="table table-borderless mt-3">
                            <tbody>
                                <tr>
                                    <th>Jumlah masuk:</th>
                                    <td>9</td>
                                </tr>
                                <tr>
                                    <th>Jumlah sekarang:</th>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <th>Kapasitas:</th>
                                    <td>20%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="card-wrapper shadow statistics" id="chart">
                        <div className="header">
                            <h4>Statistics</h4>
                            <select name="select" id="tmode">
                                <option value="e">Default</option>
                                <option value="d">Default1</option>
                            </select>
                        </div>
                        <canvas id="myChart" width="400px" height="400px"></canvas>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home
