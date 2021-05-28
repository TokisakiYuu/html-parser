import Node from "./node";

export default class Element extends Node {
  name: string;
  attrs: Record<string, unknown>;
  children: Node[];

  constructor(name: string, attrs: Record<string, unknown>, children: Node[]) {
    super("element");
    this.name = name;
    this.attrs = attrs;
    this.children = children;
  }
}
