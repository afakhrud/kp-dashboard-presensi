import config from'./Config';

export default function pagedView (arr, page) {
    const pages = Math.ceil(arr.length/config.maxDataTake);
    const first = (page-1)*config.maxDataTake;
    const last = page*config.maxDataTake;
    const listed = arr.slice(first, last);
    return {
        pages,
        listed
    }
}




