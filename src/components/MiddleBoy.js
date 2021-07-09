import React, { useState, useContext } from 'react'
import { getMahasiswa, postMahasiswa, putMahasiswa, deleteMahasiswa } from './APIMahasiswa';
import Stack from './Stack';
import config from './Config';

// export const ContextMhs = React.createContext;



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
            }
        } else {
            console.log('something went wrong');
        }
    } catch (err){
        console.log(err);
    } 
}

pullDataMhs().then(console.log(DataMahasiswa.getPage(3)));



