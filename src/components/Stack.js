import config from'./Config';

export default class Stack {
    constructor(){
        this.items = [];
    }
    push(item){
        this.items.push(item);
    }
    pop(){
        this.items.pop();
    }
    peek(){
        return this.items.[this.items.length - 1];
    }
    getSize(){
        return this.items.length;
    }
    isEmpty(){
        return this.getSize() === 0;
    }
    void(){
        this.items = [];
    }
    takeSome(first, last){
        return this.items.slice(first, last);
    }
    pages(){
        return Math.ceil(this.getSize()/config.maxDataTake);
    }
    getPage(page){
        const first = (page-1)*config.maxDataTake;
        const last = page*config.maxDataTake;
        return this.items.slice(first, last);
    }
}