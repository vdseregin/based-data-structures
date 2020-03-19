class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const newNode = new Node(value);

    if (this.head) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
    } else {
      this.head = newNode;
    }
    
    this.tail = newNode;
    this.length++;
    return this;
  }

  pop() {
    if (!this.head) {
      return undefined;
    }

    const prevTail = this.tail;
    
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
      prevTail.prev = null;
    }

    this.length--;
    return prevTail;
  }

  shift() {
    if (!this.head) {
      return undefined;
    }

    let removedElement = this.head;
    
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = removedElement.next;
      this.head.prev = null;
      removedElement.next = null;
    }
    
    this.length--;
    return removedElement;
  }

  unshift(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
    }

    this.head = newNode;
    this.length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    const halfOfLength = Math.floor((this.length - 1) / 2);
    let returnElement = null;

    if (index <= halfOfLength) {
      let i = 0;
      returnElement = this.head;
      while (i !== index) {
        returnElement = returnElement.next;
        i++;
      }
    } else {
      let i = this.length - 1;
      returnElement = this.tail;
      while (i !== index) {
        returnElement = returnElement.prev;
        i--;
      }
    }

    return returnElement;
  }

  set(index, value) {
    const currentNode = this.get(index);
    if (currentNode !== null) {
      currentNode.value = value;
      return true
    }

    return false;
  }

  insert(index, value) {
    if (index < 0 || index > this.length) {
      return false
    }

    if (index === 0) {
      this.unshift(value);
      return true;
    }
    if (index === this.length) {
      this.push(value);
      return true;
    }
    
    const prevNode = this.get(index - 1);
    const {next} = prevNode;
    
    const newNode = new Node(value);
    newNode.prev = prevNode;
    newNode.next = next;

    prevNode.next = newNode;
    next.prev = newNode;

    this.length++;
    return true;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      return undefined;
    }

    if (index === 0) {
      return this.shift()
    }

    if (index === this.length - 1) {
      return this.pop();
    }

    const removedNode = this.get(index);
    removedNode.prev.next = removedNode.next;
    removedNode.next.prev = removedNode.prev;
    
    removedNode.next = null;
    removedNode.prev = null;

    this.length--;
    return removedNode;
  }

  reverse() {
    const tempHead = this.head;
    this.head = this.tail;
    this.tail = tempHead;

    let current = this.head;

    while(current.prev) {
      const {prev, next} = current;
      current.prev = next;
      current.next = prev;

      current = prev;
    }

    return this;
  }
}