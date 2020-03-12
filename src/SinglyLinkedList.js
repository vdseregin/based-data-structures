  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }


  class SinglyLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }

    push(value) {
      const newNode = new Node(value);

      if (!this.head) {
        this.head = newNode;
        this.tail = this.head;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
      }
      
      this.length++;
      return this;
    }

    pop() {
      if (!this.head) {
        return undefined;
      }

      let current = this.head;
      let prev = null;

      while(current.next) {
        prev = current;
        current = current.next;
      }

      this.tail = prev;
      this.tail.next = null;
      this.length--;

      if (this.length === 0) {
        this.head = null;
        this.tail = null;
      }

      return current.value;
    }

    shift() {
      if (!this.head) {
        return undefined;
      }

      const current = this.head;

      this.head = current.next;
      this.length--;

      return current.value;
    }

    unshift(value) {
      const newNode = new Node(value);

      if (this.head) {
        newNode.next = this.head;
      } else {
        this.tail = newNode;
      }
      this.head = newNode;
      this.length++;

      return this;
    }

    get(index) {
      if (index < 0 || index >= this.length) {
        return null;
      }

      let temp = this.head;
      for (let i = 0; i < index; i++) {
        temp = temp.next
      }

      return temp;
    }

    set(index, value) {
      const node = this.get(index);

      if (!node) {
        return false;
      }

      node.value = value;
      return true;
    }

    insert(index, value) {
      if (index < 0 || index > this.length) {
        return false;
      }

      if (index === this.length) {
        this.push(value);
      } else if (index === 0) {
        this.unshift(value);
      } else {
        const prev = this.get(index - 1);
        const newNode = new Node(value);
        newNode.next = prev.next;
        prev.next = newNode;
        this.length++;
      }
      
      return true;
    }

    remove(index) {
      if (index < 0 || index > this.length) {
        return undefined;
      }

      if (index === this.length - 1) {
        return this.pop();
      }

      if (index === 0) {
        return this.shift();
      }

      const prev = this.get(index - 1);
      const removed = prev.next;
      prev.next = removed.next;

      this.length--;
      return removed;
    }

    reverse() {
      let node = this.head;
      this.head = this.tail;
      this.tail = node;
      
      let prev = null,
          next = null;

      for (let i = 0; i < this.length; i++) {
        next = node.next;
        node.next = prev;
        prev = node;
        node = next;
      }

      return this;
    }
  }


  let list = new SinglyLinkedList();
  list.push(1)
  list.push(2)
  list.push(3)
  list.push(4)
  list.reverse()
  console.log(list)