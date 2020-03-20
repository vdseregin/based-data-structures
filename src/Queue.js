class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (!this.size) {
      this.first = newNode;
      this.last = this.first;
    } else {
      this.last.next = newNode
      this.last = newNode;
    }

    return ++this.size;
  }

  dequeue() {
    if (!this.size) {
      return null;
    }

    let temp = this.first;

    if (this.size === 1) {
      this.last = null;
    }

    this.first = this.first.next;
    this.size--;

    return temp.value;
  }
}