class Node {
  constructor(value) {
    this.value = value;
    this.next = null
  }
}


class Stack {
  constructor(value) {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  push(value) {
    const newNode = new Node(value);

    if (!this.size) {
      this.first = newNode;
      this.last = this.first;
    } else {
      const temp = this.first;
      this.first = newNode;
      this.first.next = temp;
    }

    return ++this.size;
  }

  pop() {
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