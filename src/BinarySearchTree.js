class Node {
  constructor(value) {
    this._value = value;
    this._left = null;
    this._right = null;
  }

  set value(value) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  set left(node) {
    this._left = node;
  }

  get left() {
    return this._left;
  }

  set right(node) {
    this._right = node;
  }

  get right() {
    return this._right;
  }

  removeChild(childToRemove) {
    if (this.left && Node.isEquals(this.left, childToRemove)) {
      this.left = null;
      return true;
    }

    if (this.right && Node.isEquals(this.right, childToRemove)) {
      this.right = null;
      return true;
    }

    return false;
  }

  replaceChild(child, replacement) {
    if (!child || !replacement) {
      return false;
    }
    if (this.left && Node.isEquals(this.left, child)) {
      this.left = replacement;
      return true;
    }

    if (this.right && Node.isEquals(this.right, child)) {
      this.right = replacement;
      return true;
    }

    return false;
  }
  

  static isEquals(currentNode, nodeToCompare) {
    return currentNode.value === nodeToCompare.value;
  }

  static findMin(node) {
    if (!node.left) {
      return node;
    }

    return Node.findMin(node.left);
  }

  static copyNode(node, copied) {
    node.value = copied.value;
    node.left = copied.left;
    node.right = copied.right;
  }

  static isValidValue(value) {
    return value !== null && value !== undefined && !isNaN(value);
  }
}


class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  isEmpty() {
    return this.root === null;
  }

  _findNode(value) {
    if (!Node.isValidValue(value)) {
      return null;
    }

    if (this.isEmpty()) {
      return null;
    }

    if (this.root.value === value) {
      return this.root;
    }

    const findRecursive = (current, value) => {
      if (!current) {
        return null;
      } else if (current.value === value) {
        return current;
      } else if (current.value > value) {
        return findRecursive(current.left, value)
      } else {
        return findRecursive(current.right, value);
      }
    }

    return findRecursive(this.root, value);
  }

  _findParent(value) {
    if (!Node.isValidValue(value)) {
      return null;
    }
    if (this.isEmpty()) {
      return null;
    }

    const findRecursive = (current, value) => {
      if (current.value === value) {
        return null;
      }

      if (current.value > value) {
        if (current.left.value === value) {
          return current;
        }
        return findRecursive(current.left, value);
      } else {
        if (current.right.value === value) {
          return current;
        }

        return findRecursive(current.right, value);
      }
    }

    return findRecursive(this.root, value);
  }

  search(value) {
    return this._findNode(value);
  }

  insert(value) {
    if (!Node.isValidValue(value)) {
      return false;
    }

    const newNode = new Node(value);

    if (this.isEmpty()) {
      this.root = newNode;
    } else {
      const insertRecursive = (current, value) => {
        if (current.value === value) {
          return false;
        }

        if (current.value > value) {
          if (current.left === null) {
            return current.left = newNode;
          }
          return insertRecursive(current.left, value);
        }

        if (current.value < value) {
          if (current.right === null) {
            return current.right = newNode;
          } 
          return insertRecursive(current.right, value);
        }
      }

      insertRecursive(this.root, value)
    }

    return this;
  }

  remove(value) {
    const nodeToRemove = this._findNode(value);
    if (nodeToRemove === null) {
      return false;
    }

    const parent = this._findParent(value);

    if (nodeToRemove.left === null && nodeToRemove.right === null) {
      // If node is leaf
      if (parent) {
        parent.removeChild(nodeToRemove);
      } else {
        nodeToRemove.value = null;
      }
    } else if (nodeToRemove.left !== null &&  nodeToRemove.right !== null) {
      // If node has two children
      // Need to find next biggest node (minimum value in the right branch)
      let next = Node.findMin(nodeToRemove.right);

      if (!Node.isEquals(next, nodeToRemove.right)) {
        this.remove(next.value);
        nodeToRemove.value = next.value;
      } else {
        nodeToRemove.value = next.value;
        nodeToRemove.right = nodeToRemove.right.right;
      }
    } else {
      // If node has only one children
      const childNode = nodeToRemove.left || nodeToRemove.right;
      if (parent) {
        parent.replaceChild(nodeToRemove, childNode);
      } else {
        Node.copyNode(nodeToRemove, childNode);
      }
    }

    return true;
  }
}

