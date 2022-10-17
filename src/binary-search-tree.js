const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }
  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addWithin(this.rootNode, data);

    function addWithin(node, data) {
      if (!node) {
        return new Node(data);
      }
      if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data)
      }
      return node;
    }
  }

  find(data) {
    return findNode(this.rootNode, data);

    function findNode(node, data) {
      if (!node) {
        return null;
      }
      if (node.data === data) {
        return node;
      }
      return data < node.data? 
          findNode(node.left, data):
          findNode(node.right, data);
    }
  }

  has(data) {
    if (this.find(data) === null) {
      return false;
    }
    else return true;
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data)
    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else { // нашли тот node, который хотим удалить
        if (!node.left && !node.right) { // проверка: это лист? (т.е. без потомков)
          return null;
        }

        if (!node.left) { // если нет левого (меньшего) потомка, то заменяем его правым
          node = node.right;
          return node;
        }
        if (!node.right) { // если нет правого (меньшего) потомка, то заменяем его правым
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while (minFromRight.left)  {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min(node) {
    if (!this.rootNode) {
      return;
    }
    if (node === undefined) {
      node = this.rootNode;
    }
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max(node) {
    if (node === undefined) {
      node = this.rootNode;
    }
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};