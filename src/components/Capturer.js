export default function captureInputMahasiswa() {
    const mahasiswa_nama = document.getElementById('nama').value;
    const mahasiswa_angkatan = document.getElementById('angkatan').value;
    const mahasiswa_jurusan = document.getElementById('jurusan').value;
    const mahasiswa_nim = document.getElementById('nim').value;
    return  {
        'mahasiswa_nama': mahasiswa_nama,
        'mahasiswa_angkatan': mahasiswa_angkatan,
        'mahasiswa_jurusan': mahasiswa_jurusan,
        'mahasiswa_nim': mahasiswa_nim
    }
}
