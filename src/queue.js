const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  rootNode = null;
  getUnderlyingList() {
    return this.rootNode;
  }

  findLast(rootNode) {
    let node = rootNode;
    while (node.next != null) {
      node = node.next;
    }
    return node;
  }
  enqueue(value) {
    if (this.rootNode == null) {
      this.rootNode = new ListNode(value);
      return this.rootNode;
    }
    let last = this.findLast(this.rootNode);
    last.next = new ListNode(value);
    return last.next;
  }

  dequeue() {
    let rootLast = this.rootNode.value;
    this.rootNode = this.rootNode.next;
    return rootLast;
  }
}

module.exports = {
  Queue
};
