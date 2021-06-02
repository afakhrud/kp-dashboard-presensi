export default class Stack {
    constructor(){
        this.items = [];
    }
    push(item) {
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
        return this.getSize === 0;
    }
    takeSome(first, last){
        return this.items.slice(first, last);
    }
}