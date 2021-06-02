
function Validator(data) {
    // handler sederahana
    let status = true;
    if (data.mahasiswa_nama === '' || data.mahasiswa_nama === null){
        status = false;
    }

    if (data.mahasiswa_angkatan === '' || data.mahasiswa_angkatan === null){
        status = false;
    }

    if (data.mahasiswa_nim === '' || data.mahasiswa_nim === null){
        status = false;
    }

    return status;
}

async function getMahasiswa(params) {
    let sparam = []; 
    let endpoint = '/mahasiswa';
    var result;
    if(params) {
        Object.entries(params).map((obj, index) => {
            if (index === 0){
                sparam.push(`?${obj[0]}=${obj[1]}`);
            } else {
                sparam.push(`&${obj[0]}=${obj[1]}`);
            }
        });
        for (var point in sparam){
            endpoint += sparam[point];
        }; 
    } 
    // try{
    //     var response = await fetch(endpoint);
    //     var result = await response.json();
    //     return result;
    // } catch (err) {
    //     console.log('error getting mahasiswa');
    //     console.log(err);
    // }
    return fetch(endpoint)
    .then(response => response.json())
    .then(result => {return result})
    .catch(err => {
        console.log(err);
        // throw new Error('Fetch failed');
    });
}

function postMahasiswa(data) {
    return fetch('/mahasiswa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
    });
}

function putMahasiswa(data) {
    return fetch('/mahasiswa', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
// PR
function removeMahasiswa(id) {
    fetch('/mahasiswa',
    {
        method: 'DELETE'
    }).then(
    )
    .catch( e => {
        console.log('error deleting mahasiswa', e);
    })
}

export { getMahasiswa, postMahasiswa, putMahasiswa, removeMahasiswa};
