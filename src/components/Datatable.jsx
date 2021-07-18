import React from 'react';

function Datatable({list}) {
    return(
        <table>
            <thead>
                <th scope="col" className="tooltip">Id</th>
                <th scope="col">Nama</th>
                <th scope="col">Angkatan</th>
                <th scope="col">Prodi</th>
                <th scope="col">NIM</th>
                <th >Actions</th>
            </thead>
            <tbody>

                {list.data.map((item, index) => {
                        <tr key={index}>
                            <td>{item.mahasiswa_id}</td>
                            <td>{item.mahasiswa_nama}</td>
                            <td>{item.mahasiswa_angkatan}</td>
                            <td>{item.mahasiswa_jurusan}</td>
                            <td>{item.mahasiswa_nim}</td>
                            <td>
                                <button onClick={
                                    () => {
                                        showEditModal();
                                        setPlaceholders({
                                            'id': item.mahasiswa_id,
                                            'nama': item.mahasiswa_nama,
                                            'angkatan': item.mahasiswa_angkatan,
                                            'nim': item.mahasiswa_nim,
                                            'jurusan': item.mahasiswa_jurusan
                                        });
                                    }
                                }>Edit</button>
                                <button onClick={
                                    () => {
                                        removeMahasiswa(item.mahasiswa_id);
                                        setUserInput(true);
                                    }
                                }>Delete</button>
                            </td>
                        </tr>
                })}
                <tr style={{verticalAlign: 'middle'}} className="table-footer">
                    <td colSpan="6">
                        <span style={{paddingRight: 5}}>Page {currentPage} of {currentPage}</span>
                        <button onClick={
                            prevPage
                        }>Prev</button>
                        <button onClick={
                            nextPage
                        }>Next</button>
                    </td>
                </tr>
            </tbody>
        </table>

    )
}