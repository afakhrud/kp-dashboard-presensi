export default function Search(list, query) {
    let q;
    if (query == null) {
        q = null;
    }else{
        q = query.toString().toLowerCase();
    }
    const columns = Object.keys(list.data[0]);
    return list.data.filter((rows) => 
        columns.some(column => 
            rows[column].toString().toLowerCase().indexOf(q) > -1)
    )
}