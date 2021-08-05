// function getKehadiran(params) {
//     let sparam = []; 
//     let endpoint = '/kehadiran';
//     if(params) {
//         Object.entries(params).map((obj, index) => {
//             if (index === 0){
//                 sparam.push(`?${obj[0]}=${obj[1]}`);
//             } else {
//                 sparam.push(`&${obj[0]}=${obj[1]}`);
//             }
//         });
//         for (var point in sparam){
//             endpoint += sparam[point];
//         }; 
//     } 
//     return fetch(endpoint)
//     .then(response => response.json())
//     .then(result => {return result})
//     .catch(err => console.log(err));
// }

// async function postKehadiran(data) {
//     // const data = captureValues();
//     // const status = Validator(data);
//     // function doPost() {
//     //     fetch('/kehadiran', {
//     //     method: 'POST',
//     //         headers: {
//     //             'Content-Type': 'application/json'
//     //         },
//     //         body: JSON.stringify(data)
//     //     }).then(
        
//     //     ).catch(e => {
//     //         console.log('error posting data', e);
//     //     })
//     // }
//     // status ? doPost() : console.log('all input is required!')
//     return fetch('/kehadiran', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json' 
//         },
//         body: JSON.stringify(data)
//     });
// }

// async function putKehadiran(data) {
//     // const data = captureValues();
//     // fetch(`/kehadiran${id}`, {
//     //     method: 'PUT',
//     //         headers: {
//     //             'Content-Type': 'application/json'
//     //         },
//     //         body: JSON.stringify(data)
//     // }).then(
//     // ).catch(e => {
//     //     console.log('error putting data', e);
//     // })
//     return fetch('/kehadiran', {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     });
// }

// async function removeKehadiran(id) {
//     fetch(`/kehadiran/${id}`,
//     {
//         method: 'DELETE'
//     }).then(
//     )
//     .catch( e => {
//         console.log('error deleting mahasiswa', e);
//     })
// }

// export { getKehadiran, postKehadiran, putKehadiran, removeKehadiran};
