export default function Search(list, query) {
    let q;
    if (query == null) {
        q = null;
    }else{
        q = query.toString().toLowerCase();
    }
    if (!list.length) {
        return [];
    }
    const columns = Object.keys(list[0]);
    return list.filter((rows) => 
        columns.some(column => 
            rows[column].toString().toLowerCase().indexOf(q) > -1)
    )
}