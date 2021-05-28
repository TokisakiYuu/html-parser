/**
 * 标记
 * @example
 * ```html
 * <div data-role="text">hello</div>
 * ```
 */
interface Token {
  type: TokenKind,
  data: string
}

enum TokenKind {
  OPEN_TAG_NAME,  // div
  CLOSE_TAG_NAME, // /div
  ATTR_NAME,      // data-role
  ATTR_VALUE,     // "text"
  TEXT            // hello
}

/**
 * 词法分析器
 * @param content html字符流
 * @example
 * ```html
 * <div data-role="text">hello</div>
 * ```
 */
export function tokenizer(content: string) {
  const tokens: Token[] = [];
  const len = content.length;
  let i = 0;
  function getChar() {
    return content[i++];
  }
  function look() {
    return content[i+1];
  }
  while(i < len) {
    let char = getChar();
    if(char === "<") {
      char = getChar();
      let tag = "";
      while(char !== " ") {
        tag += char;
      }
      tokens.push({ type: TokenKind.OPEN_TAG_NAME, data: tag });
      continue;
    }
    if(char === ">") {

    }
    if(char === "=") {

    }
  }
}
