import Node from "./node";

export default class TextNode extends Node {
  content: string;

  constructor(content: string) {
    super("text");
    this.content = content;
  }
}
