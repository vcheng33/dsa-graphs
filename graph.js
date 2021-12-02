/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) { 
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) { 
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) { 
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
   }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) { 
    // for (let node of this.nodes) {
      // if (node.adjacent.has(vertex)) {
        // node.adjacent.delete(vertex)
      // }
    // }
    // this.nodes.delete(vertex);

    for (let v of vertex.adjacent) {
      v.adjacent.delete(vertex);
    }

    this.nodes.delete(vertex);
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start, seen = [start.value]) { 
    for (let vertex of start.adjacent) {
      if (!seen.includes(vertex.value)) {
        seen.push(vertex.value);
        this.depthFirstSearch(vertex, seen);
      }
    }
    return seen;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let seen = [start.value];

    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();

      for (let vertex of current.adjacent) {
        if (!seen.includes(vertex.value)) {
          seen.push(vertex.value);
          toVisitQueue.push(vertex);
        }
      }
    }
    return seen;
   }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {
      if (start === end) return 0;
      let visited = new Set ();
      let toVisitQueue = [[start, 0]];

      while (toVisitQueue.length) {
        let [vertex, distance] = toVisitQueue.shift();

        if (vertex === end) return distance;

        for (let v of vertex.adjacent) {
          if (!visited.has(v)) {
            visited.add(v);
            toVisitQueue.push([v, distance + 1]);
          }
        }
      }
   }
}

module.exports = { Graph, Node }
