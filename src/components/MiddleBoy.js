import Stack from './Stack';
import config from './Config';

// HTTP
const GET = async (endpoint) => {
    try {
        const response = await fetch(endpoint);
        return await response.json();
    } catch (err) {
        throw new Error(err);
    }
}
const POST = async (link, data) => {
    try {
        const response = await fetch(link, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (err) {
        throw new Error(err);
    }
}
const PUT = async (link, data) => {
    try {
        const response = await fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (err) {
        throw new Error(err);
    }
}
const DELETE = async (link, data) => {
    try {
        const response = await fetch(link, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
        return await response.json();
    } catch (err) {
        throw new Error(err);
    }
}

const multipleParams = (params) => {
    const sparams = [];
    let param = [];
    if (params) {
        Object.entries(params).map((obj, index) => {
            if (index === 0) {
                sparams.push(`?${obj[0]}=${obj[1]}`);
            } else {
                sparams.push(`&${obj[0]}=${obj[1]}`);
            }
        });
        param = sparams.join('');
    };
    return param;
}

function getMahasiswa(params) {
    const param = multipleParams(params);
    let base_url = '/api/mahasiswa';
    const endpoint = base_url.concat(param);
    return GET(endpoint);
}

const getKehadiran = (params) => {
    const param = multipleParams(params);
    let base_url = '/api/kehadiran';
    const endpoint = base_url.concat(param);
    return GET(endpoint);
}

const deleteMahasiswa = (params) => {
    const param = multipleParams(params);
    const par = [...param];
    par.shift();
    const pars = par.join('');
    let base_url = '/api/mahasiswa';
    // const endpoint = url.concat(param);
    return DELETE(base_url, pars);
}

const deleteKehadiran = (params) => {
    const param = multipleParams(params);
    const par = [...param];
    par.shift();
    const pars = par.join('');
    let base_url = '/api/kehadiran';
    // const endpoint = url.concat(param);
    return DELETE(base_url, pars);
}

const editMahasiswa = (params, data) => {
    const param = multipleParams(params);
    let base_url = '/api/mahasiswa';
    const endpoint = base_url.concat(param);
    return PUT(endpoint, data);
}

const editKehadiran = (params, data) => {
    const param = multipleParams(params);
    let base_url = '/api/kehadiran';
    const endpoint = base_url.concat(param);
    return PUT(endpoint, data);
}

const addMahasiswa = (params, data) => {
    const param = multipleParams(params);
    let base_url = '/api/mahasiswa';
    const endpoint = base_url.concat(param);
    return POST(endpoint, data);
}

const addKehadiran = (params, data) => {
    const param = multipleParams(params);
    let base_url = '/api/kehadiran';
    const endpoint = base_url.concat(param);
    return POST(endpoint, data);
}

const defaultState = {
    stackMhs: false,
    stackKhd: false
}
// const [readyStatus, setReadyStatus] = useState(defaultState);
class StackState {
    constructor(){
        this.isMhsReady = false;
        this.isKhdReady = false;
    }
    setMhsReady(status){
        if (typeof status === 'boolean'){
            this.isMhsReady = status;
        }
    }
    setKhdReady(status){
        if (typeof status === 'boolean'){
            this.isKhdReady = status;
        }
    }
}

const currState = new StackState();
const key = 'user_1';

// container
// let DataMahasiswa = new Stack();
// let DataKehadiran = new Stack();

class BufferData extends Stack {
    constructor () {
        super();
    }
    refreshKhd () {
        return new Promise ((resolve, reject) => {
            this.void();
            pullDataKhd().then((resp) => {
                if (resp === 'true') {
                    resolve('success');
                } else {
                    resolve('ew failed 2');
                }
            });
        })
    }
    // isDataReady() {
    //     return new Promise((resolve, reject) => {
    //         this.pullDataKhd()
    //     })
    // }
}

const DataMahasiswa = new BufferData();
const DataKehadiran = new BufferData();


async function pullDataMhs(){ 
    try{
        const res = await getMahasiswa({'access-key': key});
        if (res){
            if (!res.status){
                throw new Error('Invalid request');
            } else {
                res.data.map((item, index) => {
                    DataMahasiswa.push(item);
                });
                currState.setMhsReady(true);
                
            }
        } else {
            console.log('something went wrong');
        }
    } catch (err){
        console.log(err);
    } 
}


// pullDataMhs();

async function pullDataKhd(){ 
    try{
        const res = await getKehadiran({'access-key': key});
        if (res){
            if (!res.status){
                throw new Error('Invalid request');
                return 'ew failed';
            } else {
                res.data.map((item, index) => {
                    DataKehadiran.push(item);
                });
                currState.setKhdReady(true);
                return 'true';
            }
        } else {
            console.log('something went wrong');
        }
    } catch (err){
        console.log(err);
    } 
}

// pullDataKhd();

class pagedList extends Stack {
    constructor(arr) {
        super();
        this.items = arr;
    }
}
const paged = new pagedList(DataKehadiran.items);

// 
const dateObj = (target) => {
    if (Object.prototype.toString.call(target) === '[object Date]') {
        return target;
    } else {
        const date = new Date(target);
        if (Object.prototype.toString.call(date) === '[object Date]') {
            return date;
        } else {
            return 'Invalid Input';
        }
    }
}
const yearMatching = (target, key) => {
    if (target.getFullYear() === key) {
        return true;
    } else {
        return false;
    }
}
const monthMatching = (target, key) => {
    if (target.getMonth() === key) {
        return true;
    } else {
        return false;
    }
}
const dateMatching = (target, key) => {
    if ((target.getDate() - 1) === key) {
        return true;
    } else {
        return false;
    }
}

const toDateObj = (stack) => {
    let obj = stack.items.map((item, index) => {
        return {
            kehadiran_id: item.kehadiran_id,
            kehadiran_nama: item.kehadiran_nama,
            kehadiran_tanggal: new Date(item.kehadiran_tanggal),
            kehadiran_ket: item.kehadiran_ket
        }
    });
    return obj;
}

const yearify = (list) => {
    const allYear = list.map((item) => {
        return item.kehadiran_tanggal.getFullYear()
    });
    const maxYear = Math.max(...allYear);
    const minYear = Math.min(...allYear);
    const yearSpan = [];
    for (let i = minYear; i <= maxYear; i++) {
        yearSpan.push(i);
    }
    if (yearSpan.length === 0) {
        yearSpan.push(maxYear);
    }
    // console.log(yearSpan, maxYear);
    let obj = {};
    yearSpan.map((year) => {
        obj[`${year}`] = list.filter((d) => {
            if (yearMatching(d.kehadiran_tanggal, year)) {
                return d;
            } else {
                return null;
            }
        })
        
    })
    if (yearSpan.length === 1) {
        obj = list.filter((d) => {
            if (yearMatching(d.kehadiran_tanggal, yearSpan[0])) {
                return d;
            } else {
                return null;
            }
        })
    }
    return obj;
}

const toShortMonth = (number) => {
    let month;
    switch(number){
        case 0:
            month = 'Jan';
            break;
        case 1:
            month = 'Feb';
            break;
        case 2: 
            month = 'Mar';
            break;
        case 3: 
            month = 'Apr';
            break;
        case 4:
            month = 'May';
            break;
        case 5:
            month = 'Jun';
            break;
        case 6:
            month = 'Jul';
            break;
        case 7:
            month = 'Aug';
            break;
        case 8:
            month = 'Sep';
            break;
        case 9:
            month = 'Oct';
            break;
        case 10:
            month = 'Nov';
            break;
        case 11:
            month = 'Dec';
            break;
        default:
            month = 'undef';
    }
    return month;
}

const monthify = (list) => {
    if (list) {
        const defaultMonth = {
            0: [], 1: [], 2: [], 3: [],
            4: [], 5: [], 6: [], 7: [],
            8: [], 9: [], 10: [], 11: []
        };
        const key = Object.keys(defaultMonth);
        let obj = {};
        key.map((item, index) => {
            defaultMonth[index] = list.filter((d) => {
                if (monthMatching(d.kehadiran_tanggal, index)) {
                    return d;
                } else {
                    return null;
                }
            });
        });
        return defaultMonth;
    } else {
        return [];
    }
}

const dailyFullMonth = (list) => {
    if (list) {
        if (list.length) {
            let defaultDay = {};
            function daysInMonth (month, year) {
                return new Date(year, month, 0).getDate();
            }
            const bulan = list[0].kehadiran_tanggal.getMonth() + 1;
            const tahun = list[0].kehadiran_tanggal.getFullYear();
            const jmlHari = daysInMonth(bulan, tahun);
            for (let i = 0; i < jmlHari; i++) {
                defaultDay[i] = list.filter((d) => {
                    if (dateMatching(d.kehadiran_tanggal, i)) {
                        return d;
                    } else {
                        return null;
                    }
                });
            }
            return defaultDay;
        }
    } else {
        return [];
    }
}

const Calendarized = (stack, mode1, mode2, mode3) => {
    const allYear = yearify(toDateObj(stack));
    const yearKey = Object.keys(allYear);
    if ((mode1 == null) || mode1 === 'y') {
        return allYear;
    } else if (mode1 === 'm') {
        // let allMonth = {}
        // yearKey.map((i) => {
        //     allMonth[i] = monthify(allYear[i]);
        // });
        return monthify(allYear[mode2]);
    } else if (mode1 === 'd') {
        const mon = monthify(allYear[mode2]);
        return dailyFullMonth(mon[mode3]);
    } else {
        return allYear;
    }
    // let allDay = {}
    // const obj = {
    //     tahunan: allYear,
    //     bulanan: allMonth,
    //     harian: allDay
    // };
    // const month = monthify(allYear[2021]);
    // console.log(dailyFullMonth(month[2]));
    // console.log(allMonth);
    // console.log(allYear)
    // return allYear;
}


const getVisitor = (stack) => {
    let visiting = [];
    stack.items.map((item, index) => {
        // visiting[index].name = item.kehadiran_nama;
        // visiting[index].date = new Date(item.kehadiran_tanggal); 
        visiting[index] = {
            nama: item.kehadiran_nama,
            date: new Date(item.kehadiran_tanggal)
        }
        //format dari pandega
        //format date obj Sun Mar 28 2021 07:30:50 GMT+0700 (Western Indonesia Time)
    });
    // const thisDay = new Date('2021-03-28 07:10:50');
    const thisDay = new Date();
    const yearVisits = visiting.filter((item) => item.date.toString().match(thisDay.toString().slice(11,15)));
    const monthVisits = yearVisits.filter((item) => item.date.toString().match(thisDay.toDateString().slice(4,7)));
    const weekVisits = monthVisits.filter((item) => {
        if((item.date.getDate()-thisDay.getDate()) < 7){
            if((item.date.getDay()+1) <= (thisDay.getDay()+1)){
                return item;
            }
        }
    });
    const todayVisits = monthVisits.filter(item => item.date.getDate() === thisDay.getDate());
    const lastHourVisits = todayVisits.filter((item) => { 
        if(thisDay.getHours() === item.date.getHours()){
            return item;
        }
        if((thisDay.getHours() - 1) === item.date.getHours()){
            if(item.date.getMinutes() > thisDay.getMinutes()){
                return item;
            }
        }
    })
    return {
        lastHourVisits,
        todayVisits,
        weekVisits,
        monthVisits,
        yearVisits
    }
}


const isMhsReady = () => {
    return currState.isMhsReady;
}
const isKhdReady = async () => {
    return await currState.isKhdReady;
}

class ModalState {
    constructor(){
        this.isOn = false;
        this.nama = 'John Doe';
        this.id = '0';
        this.nim = '00/00000/TK/0000';
        this.tanggal = '...';
        this.ket = '...';
        this.jurusan = '...';
        this.angkatan = '00';
    }
    clear() {
        this.isOn = false;
        this.nama = '';
        this.id = '';
        this.nim = '';
        this.tanggal = null;
        this.ket = '';
        this.jurusan = '';
        this.angkatan = '';
    }
}


const ModalContext = new ModalState();


export {isMhsReady, 
    isKhdReady, 
    DataMahasiswa, 
    DataKehadiran, 
    getVisitor, 
    ModalContext, 
    getMahasiswa, 
    getKehadiran, 
    deleteMahasiswa, 
    deleteKehadiran,
    editMahasiswa,
    editKehadiran,
    addMahasiswa,
    addKehadiran,
    Calendarized,
    toShortMonth
};