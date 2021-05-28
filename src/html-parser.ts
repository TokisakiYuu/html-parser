import Node from "./node/node";
import Element from "./node/element";
import TextNode from "./node/text";

const newObject = () => Object.create(null);

function parser(content: string) {
  let len = content.length,
      index = 0,
      currentChar = content[index];
  const next = () => currentChar = content[index += 1];
  const rollback = () => currentChar = content[index -= 1];

  // 吃掉任意长度的空字符
  function clearSpace() {
    let hasSpace = false;
    while(/\s/.test(currentChar)) {
      hasSpace = true;
      next();
    }
    return hasSpace;
  }

  // 自关闭标签
  function SelfCloseTag() {

  }

  // 标签属性
  // attr1="xxx" attr:zz="xxx" @attr="xxx" arr-t="xxx"
  function TagAttribute(): Record<string, unknown> {
    const map = newObject();
    while(index < len) {
      if(!(/[a-z0-9:@\-]/.test(currentChar))) return map;
      let buffer = "";
      while(!(/([a-z0-9:@\-]+)=("|')(.*)\2/g.test(buffer))) {
        buffer += currentChar;
        next();
      }
      map[RegExp.$1] = RegExp.$3;
      clearSpace();
    }
    return map;
  }

  // 文本节点
  function Text() {
    let text = "";
    while(!(/[<>]/.test(currentChar))) {
      text += currentChar;
      next();
    }
    return text ? new TextNode(text) : null;
  }

  // 普通标签
  function Tag(): Element | null {
    clearSpace();
    // 开始标志
    if(!(/[<]/.test(currentChar))) return null;
    next();
    let tagName = "";
    // 获取标签名
    while(/[a-z\-]/.test(currentChar)) {
      tagName += currentChar;
      next();
    }
    // 获取属性
    const attrs = TagAttribute();
    if(/[>]/.test(currentChar)) {
      next();
    } else {
      throw new Error(`不符合预期的字符 "${currentChar}" (1)`);
    }
    // 开标签至此结束
    // 子节点解析
    const children = Fragment();
    console.log(children);
    // 闭标签标志
    if(!(/[<]/.test(currentChar))) {
      throw new Error(`不符合预期的字符"${currentChar}" (2)`);
    }
    let buffer = "";
    while(buffer !== `</${tagName}>`) {
      buffer += currentChar;
      next();
    }
    return new Element(tagName, attrs, children);
  }

  // 元素列表
  function Fragment() {
    const document: Node[] = [];
    while(index < len) {
      const node = Text() || Tag();
      if(node) {
        document.push(node);
      }
    }
    return document;
  }

  return Fragment();
}

export default parser;
