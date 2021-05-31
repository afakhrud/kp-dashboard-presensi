



export class EditMahasiswa extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div class="post-modal-body ml-3 mr-3 mb-3 mt-2">
                    <div class="from-group">
                        <label for="nama">Nama</label>
                        <input type="text" class="form-control" id="nama" name="mahasiswa_nama" value={this.props.placeholders.nama}/>
                    </div>
                    <div class="from-group mt-3">
                        <label for="angkatan">Angkatan</label>
                        <input type="number" class="form-control" id="angkatan" name="mahasiswa_angkatan" value={this.props.placeholders.angkatan} />
                    </div>
                    <div class="form-group mt-3">
                        <label for="jurusan">Jurusan</label>
                        <select class="form-control" id="jurusan" name="mahasiswa_jurusan">
                            <option value="Teknik Informatika">Teknik Informatika</option>
                            <option value="Teknik Elektro">Teknik Elektro</option>
                            <option value="Teknik Biomedis">Teknik Biomedis</option>
                        </select>
                    </div>
                    <div class="from-group">
                        <label for="nim">NIM</label>
                        <input type="text" class="form-control" id="nim" name="mahasiswa_nim" value={this.props.placeholders.nim} />
                    </div>
                </div>
                <div class="modal-footer">
                    
                    <button type="submit" class="btn btn-primary" onClick={putMahasiswa}>Apply</button>
                </div>
            </div>
        )
    }
}

export default EditMahasiswa
