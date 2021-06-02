function getKehadiran(params) {
    let sparam = []; 
    let endpoint = '/kehadiran';
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
    return fetch(endpoint)
    .then(response => response.json())
    .then(result => {return result})
    .catch(err => console.log(err));
}

async function postMahasiswa() {
    const data = captureValues();
    const status = Validator(data);
    function doPost() {
        fetch('/mahasiswa', {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(
        
        ).catch(e => {
            console.log('error posting mahasiswa', e);
        })
    }
    status ? doPost() : console.log('all input is required!')
}

async function putMahasiswa(id) {
    const data = captureValues();
    fetch(`/mahasiswa${id}`, {
        method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
    }).then(
    ).catch(e => {
        console.log('error putting mahasiswa', e);
    })
}

async function removeKehadiran(id) {
    fetch(`/mahasiswa/${id}`,
    {
        method: 'DELETE'
    }).then(
    )
    .catch( e => {
        console.log('error deleting mahasiswa', e);
    })
}

export { getMahasiswa, postMahasiswa, putMahasiswa, removeMahasiswa};
