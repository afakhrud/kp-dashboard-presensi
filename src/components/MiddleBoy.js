import { getMahasiswa, postMahasiswa, putMahasiswa, deleteMahasiswa } from './APIMahasiswa';
import Stack from './Stack';

const key = 'user_1';

const config = {
    'maxDataTake': 2
}

// container
let DataMahasiswa = new Stack();
let DataKehadiran = new Stack();

async function pullDataDB(){ 
    try{
        const res = await getMahasiswa({'access-key': key});
        if (!res.status){
            throw new Error('Invalid request');
        } else {
            res.data.map((item, index) => {
                DataMahasiswa.push(item);
            });
        }
    } catch (err){
        console.log(err);
    } 
}


function takeListPerPage(data, page) {
    const starts = (page-1)*config.maxDataTake;
    const ends = page*config.maxDataTake;
    return data.sclice(starts, ends);
}

async function pagedList(arr, page) {
    let arrays = await arr;
    let res = {};
    const pages = Math.ceil(arrays.length/config.maxDataTake);
    res.meta.totalMahasiswa = arrays.length;
    res.meta.pages = pages;
    res.meta.page = page;
    res.data = takeListPerPage(arrays, page)
    return res;
}
// const pages = Math.ceil(DataDB.length/config.maxDataTake);
//     const currentPage = 



// async function initMiddle() {
//     container =  await pullDataDB();
    
// }
// initMiddle();
// let ls = takeListPerPage([1,2,3,4,5,6], 1);
// console.log(ls);
pullDataDB();