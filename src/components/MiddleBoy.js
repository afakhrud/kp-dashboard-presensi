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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
    let url = '/mahasiswa';
    const endpoint = url.concat(param);
    return GET(endpoint);
}

const getKehadiran = (params) => {
    const param = multipleParams(params);
    let url = '/kehadiran';
    const endpoint = url.concat(param);
    return GET(endpoint);
}

const deleteMahasiswa = (params, data) => {
    const param = multipleParams(params);
    let url = '/mahasiswa';
    const endpoint = url.concat(param);
    return DELETE(endpoint, data);
}

const deleteKehadiran = (params, data) => {
    const param = multipleParams(params);
    let url = '/kehadiran';
    const endpoint = url.concat(param);
    return DELETE(endpoint, data);
}

const editMahasiswa = (params, data) => {
    const param = multipleParams(params);
    let url = '/mahasiswa';
    const endpoint = url.concat(param);
    return PUT(endpoint, data);
}

const editKehadiran = (params, data) => {
    const param = multipleParams(params);
    let url = '/kehadiran';
    const endpoint = url.concat(param);
    return PUT(endpoint, data);
}

const addMahasiswa = (params, data) => {
    const param = multipleParams(params);
    let url = '/mahasiswa';
    const endpoint = url.concat(param);
    return POST(endpoint, data);
}

const addKehadiran = (params, data) => {
    const param = multipleParams(params);
    let url = '/kehadiran';
    const endpoint = url.concat(param);
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
        this.dataReady = false;
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
            // if (this.items.length) {
            //     resolve('true');
            // } else {
            //     reject('ew failed');
            // }
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
                return 'ew failed'
            } else {
                res.data.map((item, index) => {
                    DataKehadiran.push(item);
                });
                currState.setKhdReady(true);
                return 'true'
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

const Calendarized = () => {
    
}
const getVisitorMatrix = (stack) => {
    
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
    addKehadiran
};