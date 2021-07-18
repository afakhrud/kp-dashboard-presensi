// import { useState, useContext } from 'react'
import { getMahasiswa, postMahasiswa, putMahasiswa, deleteMahasiswa } from './APIMahasiswa';
import { getKehadiran } from './APIKehadiran';
import Stack from './Stack';
import config from './Config';


// const getMahasiswa = async() => {
//     try {
        
//     }
// }

// export const ContextMhs = React.createContext;

const defaultState = {
    stackMhs: false,
    stackKhd: false
}
// const [readyStatus, setReadyStatus] = useState(defaultState);
class State{
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
            this.isMhsReady = status;
        }
    }
}

const currState = new State();
const key = 'user_1';

// container
let DataMahasiswa = new Stack();
let DataKehadiran = new Stack();




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

// pullDataMhs().then(console.log(DataMahasiswa.getPage(1)));

pullDataMhs();

async function pullDataKhd(){ 
    try{
        const res = await getKehadiran({'access-key': key});
        if (res){
            if (!res.status){
                throw new Error('Invalid request');
            } else {
                res.data.map((item, index) => {
                    DataKehadiran.push(item);
                });
                currState.setKhdReady(true);
            }
        } else {
            console.log('something went wrong');
        }
    } catch (err){
        console.log(err);
    } 
}

pullDataKhd();

const getVisitor = (stack) => {
    const visiting = [];
    stack.items.map((item, index) => {
        visiting[index] = new Date(item.kehadiran_tanggal); //format dari pandega
        //format date obj Sun Mar 28 2021 07:30:50 GMT+0700 (Western Indonesia Time)
    });
    const thisDay = new Date('2021-03-28 07:10:50');
    const yearVisits = visiting.filter((item) => item.toString().match(thisDay.toString().slice(11,15)));
    const monthVisits = yearVisits.filter((item) => item.toString().match(thisDay.toDateString().slice(4,7)));
    const weekVisits = monthVisits.filter((item) => {
        if((item.getDate()-thisDay.getDate()) < 7){
            if((item.getDay()+1) <= (thisDay.getDay()+1)){
                return item;
            }
        }
    });
    const todayVisits = monthVisits.filter(item => item.getDate() === thisDay.getDate());
    const lastHourVisits = todayVisits.filter((item) => { 
        if(thisDay.getHours() === item.getHours()){
            return item;
        }
        if((thisDay.getHours() - 1) === item.getHours()){
            if(item.getMinutes() > thisDay.getMinutes()){
                return item;
            }
        }
    })
    return {
        lastHourVisits : lastHourVisits,
        todayVisits : todayVisits,
        weekVisits: weekVisits,
        monthVisits : monthVisits,
        yearVisits : yearVisits
    }
}

const ass = () => {
    return currState.isMhsReady;
}
export {ass, DataMahasiswa, DataKehadiran, getVisitor};