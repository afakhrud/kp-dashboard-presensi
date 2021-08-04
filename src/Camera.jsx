import React, { useState, useEffect } from 'react';
import './Camera.css';

function Camera() {
 
    useEffect(() => {
        document.title = 'Camera';
    }, []);

    function getInputId() {
        return `/vision/input/${document.getElementById('id').value}`;
    }
    
    
    return (
        <div className='content'>
            <h1>Camera</h1>
            <div className="opencv">
                <div className="card-wrapper shadow screen">
                    <img src="/vision/video_rec" alt="none" />
                    <img src="/vision/video_in"  alt="none" />
                </div>
                <div class="control-bar card-wrapper">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        fetch('/vision/recognize', {
                            method: 'GET'
                        }).then(console.log('success'))
                        .catch(err => console.log(err));
                    }}>
                        <button class="btn btn-secondary btn-sm mx-2">Restart Recognition</button>
                    </form>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        fetch(getInputId(), {
                            method: 'GET'
                        }).then(console.log('success'))
                        .catch(err => console.log(err));
                    }}>
                        <input type="text" id="id" name="id" placeholder="Masukkan ..." />
                        <button type="submit" className="btn btn-secondary btn-sm mx-2">Face Input</button>
                    </form>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        fetch('/vision/train', {
                            method: 'GET'
                        }).then((res) => console.log(res))
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