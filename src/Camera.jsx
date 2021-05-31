import React, { useState, useEffect } from 'react';
import './Camera.css';

function Camera() {
    const [loading, setLoads] = useState(true);
    const imgLoaded = () => {setLoads(!loading)};

    const [isError, setError] = useState(false);
     

    useEffect(() => {
        document.title = 'Camera';
    });

    function getInputId() {
        return `/input/${document.getElementById('id').value}`;
    }
    
    const imgError = () => {
        document.getElementById('keterangan').innerHTML = 'Error! Camera server not found';
    }
    
    return (
        <div className='content'>
            <h1>Camera</h1>
            <div class="opencv">
                <div class="card-wrapper shadow">
                    <img src="http://localhost:5000/video_rec" onload={imgLoaded}  alt="none" />

                    <img src="http://localhost:5000/video_in" onload={imgLoaded}  alt="none" />
                
                </div>
                <div class="control-bar card-wrapper">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        fetch('/recognize', {
                            method: 'POST'
                        }).then(console.log('success'))
                        .catch(err => console.log(err));
                    }}>
                        <button class="btn btn-secondary btn-sm mx-2">Restart Recognition</button>
                    </form>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        fetch(getInputId(), {
                            method: 'POST'
                        }).then(console.log('success'))
                        .catch(err => console.log(err));
                    }}>
                        <input type="text" id="id" name="id" placeholder="Masukkan ..." />
                        <button type="submit" className="btn btn-secondary btn-sm mx-2">Face Input</button>
                    </form>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        fetch('/train', {
                            method: 'POST'
                        }).then(console.log('success'))
                        .catch(err => console.log(err));
                    }}>
                        <button type="submit" className="btn btn-secondary btn-sm mx-2">Train</button>
                    </form>
                </div>
                </div>
            </div>
    )
}

export default Camera