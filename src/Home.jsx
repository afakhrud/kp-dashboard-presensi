import React, { useState, useEffect, useRef } from 'react'
import Modal from './components/Modal';
import {DataKehadiran, Calendarized, getVisitor, isKhdReady, getKehadiran, toShortMonth} from './components/MiddleBoy';
import {XYPlot, LineSeries, HorizontalGridLines, XAxis,YAxis, VerticalGridLines, VerticalBarSeries} from 'react-vis';
import '../node_modules/react-vis/dist/style.css';


function Home() {
    const now = new Date();
    const [modal, setModal] = useState(false);
    const showModal = () => {setModal(!modal)};

    const [isLoading, setLoading] = useState(true);
    const [isLoadError, setLoadError] = useState(false);
    const defaultList = {
        status: false,
        data: []
    }
    const [list, setList] = useState(defaultList);
    const [isStackReady, setStackReady] = useState(false);
    const [visitorStat, setVisitorStat] = useState();  
    const defaultCalendar = [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 3, y: 0},
        {x: 4, y: 0},
        {x: 5, y: 0},
        {x: 6, y: 0},
    ]
    const [calendar, setCalendar] = useState(defaultCalendar);

    const [tMode1, setTMode1] = useState('y');
    const [tMode2, setTMode2] = useState(now.getFullYear());
    const [tMode3, setTmode3] = useState(now.getMonth());

    const takeDataTable = async () => {
        try {
            setLoading(true);
            var res = await getKehadiran({'access-key': 'user_1'});
            if (!res) {
                setLoadError(true);
                setLoading(false);
            } else {
                if (!res.status) {
                    setLoadError(true);
                    setLoading(false);
                } else {
                    setLoadError(false); 
                    setList(() => {
                        return {
                            ...res
                        }
                    });
                    setLoading(false);
                    return true;
                }
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
            setLoadError(true);
        }
    }

    useEffect(() => {
        document.title = 'Home';
        setPlotWidth(refPlot.current.clientWidth - 20);
        takeDataTable();
        DataKehadiran.refreshKhd().then((res) => {
            if (res === 'success') {
                setStackReady(true);
            }
            console.log(DataKehadiran);
        })
    }, [])

    
    useEffect(() => {
        setVisitorStat(getVisitor(DataKehadiran));
        if (isStackReady) {
            setCalendar(() => mapToVis(Calendarized(DataKehadiran)));
        }
        // console.log(mapToVis(Calendarized(DataKehadiran)));
    }, [isStackReady, isLoading]);
    useEffect(() => {

        setCalendar(() => mapToVis(Calendarized(DataKehadiran, tMode1, tMode2, tMode3)));
    }, [tMode1, tMode2, tMode3]);
    
    const refPlot = useRef();
    const [plotWidth, setPlotWidth] =useState(600);
    useEffect(() => {
        window.addEventListener('resize', () => {
            setPlotWidth((last) => {
                // console.log(last);
                if (refPlot.current.clientWidth != null) {
                    return refPlot.current.clientWidth - 20;
                } else {
                    return last;
                }
            });
        });
        const value = document.getElementById('tmode');
        console.log(value.value);
        console.log(tMode2, tMode3);
    })

    return (
        <div className='content'>
            <div class="" id="dashboard-nav">
                <div id="content-property" class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 border-bottom">
                    <h1 class="h3 ml-1">Daftar kehadiran</h1>
                    <div class="btn-toolbar mb-2 mb-md-0"> 
                    <p id="date" class="btn-sm btn-outline-secondary disabled"></p>
                    </div>
                </div>
            </div>

            <main class="row mt-3" dashboard="main">
                <div class=" mx-auto">
                    <div className="card-wrapper shadow timestamp">
                        <h4>Newest update</h4>
                        <div className='card-wrapper db'>
                            <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Waktu</th>
                                    <th scope="col">Nama</th>
                                    <th scope="col">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody class="scrollable" id="data-table">
                                {   isLoading ? <tr><td colSpan="3">Loading..</td></tr> : isLoadError ? <tr><td colSpan="3" style={{textAlign: 'center'}} className="heading">OOPS!</td></tr> :
                                    list.data.slice(0).reverse().slice(0, 5).map((item, index) => {
                                        return(
                                        <tr key={index}>
                                            <td>{item.kehadiran_tanggal}</td>
                                            <td>{item.kehadiran_nama}</td>
                                            <td>{item.kehadiran_ket}</td>
                                        </tr>)
                                    } )
                                }
                            </tbody>
                            </table>
                        </div>
                    </div>
                    <div class=" mx-auto ">
                        <div className="card-wrapper shadow summary" id="info">
                            <h4>Summary - Jumlah kehadiran</h4>
                            <div className='card-wrapper db'>
                                <table class="table table-borderless mt-3">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Jam terakhir</th>
                                            <th>Hari ini</th>
                                            <th>Minggu ini</th>
                                            <th>Bulan ini</th>
                                            <th>Tahun ini</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={statusNumber}>
                                            <th>Jumlah :</th>
                                            {isKhdReady() ? <>
                                                <td>{getVisitor(DataKehadiran).lastHourVisits.length}</td>
                                                <td>{getVisitor(DataKehadiran).todayVisits.length}</td>
                                                <td>{getVisitor(DataKehadiran).weekVisits.length}</td>
                                                <td>{getVisitor(DataKehadiran).monthVisits.length}</td>
                                                <td>{getVisitor(DataKehadiran).yearVisits.length}</td></>
                                                : <><td></td><td></td><td></td><td></td><td></td></>   
                                            }
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="card-wrapper shadow statistics" id="chart" style={{overflow: 'scroll'}}>
                        <div className="header">
                            <h4>Statistics</h4>
                            <div className="selectT">
                                <label style={{fontWeight: 500, fontSize: 14, fontFamily: 'arial'}}>
                                    Mode:
                                    <select style={{marginRight: 5}}value={tMode1} id="tmode" className="selector" onChange={(e) => setTMode1(e.target.value)}>
                                        <option value="y">Tahunan</option>
                                        <option value="m">Bulanan</option>
                                        <option value="d">Harian</option>
                                        <option value="r">Range</option>
                                    </select>
                                </label>
                                {(tMode1 === 'm') && 
                                <select className='selector' value={tMode2} onChange={(e) => setTMode2(e.target.value)}>
                                    {
                                        Object.keys(Calendarized(DataKehadiran, 'y', null, null)).map((y, index) => {
                                            return (
                                                <option key={index} value={y} >{y}</option>
                                            );
                                        })
                                    } 
                                </select>} 
                                {(tMode1 === 'd') && 
                                <>
                                <select className='selector' value={tMode2} onChange={(e) => setTMode2(e.target.value)}>
                                {
                                    Object.keys(Calendarized(DataKehadiran, 'y', null, null)).map((y, index) => {
                                        return (
                                            <option key={index} value={y} >{y}</option>
                                        );
                                    })
                                } 
                                </select>
                                <select className='selector' value={tMode3} onChange={(e) => {setTmode3(e.target.value)}} >
                                    {
                                        // console.log(tMode2)
                                        Object.keys(Calendarized(DataKehadiran, 'm', tMode2, null)).map((m, index) => {
                                            return (
                                                <option key={index} value={m}>{toShortMonth(index)}</option>
                                            )
                                        })
                                    }
                                        {/* <option value="0">Jan</option>
                                        <option value="1">Feb</option>
                                        <option value="2">Mar</option>
                                        <option value="3">Apr</option>
                                        <option value="4">Mei</option>
                                        <option value="5">Jun</option>
                                        <option value="6">Jul</option>
                                        <option value="7">Agu</option>
                                        <option value="8">Sep</option>
                                        <option value="9">Okt</option>
                                        <option value="10">Nov</option>
                                        <option value="11">Des</option>                                       */}
                                    </select>
                                    </>}
                            </div>
                            
                        </div>
                        <div 
                            ref={refPlot} 
                            className="card-wrapper" 
                            style={
                                {
                                overflow: 'scroll', 
                                display: 'flex', 
                                justifyContent: 'center'
                                }
                            }
                        >
                            <XYPlot height={600} width={plotWidth} Type="ordinal" >
                                <VerticalGridLines />
                                <HorizontalGridLines />
                                <XAxis 
                                    title='Tahun'
                                    tickFormat={(v) => {
                                        return handleTick(v, tMode1);
                                    }} 
                                    tickLabelAngle={-60} 
                                    tickTotal={calendar.length} />
                                <YAxis 
                                    title='Jumlah kedatangan' 
                                    orientation='left'/>
                                <VerticalBarSeries data={calendar}  />
                            </XYPlot>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}



const statusNumber = {
    fontWeight: 600
};

// target = {date1: [{}, {}], date2: [{}]}
const mapToVis = (target) => {    
    if (target) {
        const key = Object.keys(target);
        let xValue = [];
        let yValue = [];
        let xyVal = []
        if (key.length) {
            key.map((item, index) => {
                // yValue[index] = target[item].length;
                // xValue[index] = item.parseInt();
                xyVal[index] = {x: parseInt(item), y: target[item].length};
            });
            return xyVal;
        } else {
            return [{x: 0, y: 0}];    
        }
    } else {
        return [{x: 0, y: 0}];
    }
}

const handleTick = (value, option) => {
    const handleTahun = (y) => {
        return y;
    }
    const handleBulan = (m) => {
        return toShortMonth(parseInt(m));
    }
    const handleHari = (d) => {
        return parseInt(d) + 1;
    }
    let ans;
    switch (option) {
        case 'y':
            ans = handleTahun(value);
            break;
        case 'm':
            ans = handleBulan(value);
            break;
        case 'd':
            ans = handleHari(value);
            break;
        default:
            ans = 'undef';
    }
    return ans;
}
           
const handleCalendar = (mode1, mode2, mode3) => {
    return mapToVis(Calendarized(DataKehadiran, mode1, mode2, mode3)); 
}
                
                
                


export default Home