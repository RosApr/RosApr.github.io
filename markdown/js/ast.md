### AST 是什么

> AST 是抽象语法树(Abstract Syntax Tree)的缩写

它是编程语言中的一个概念，用于表示代码的结构和语法。抽象语法书是源代码经过词法分析和语法分析后生成的一种树形结构，其中每个节点表示代码中的一个语法结构，例如函数、循环、条件语句等。每个节点包含了相关的信息，如语法类型、标识符、操作符等，以及它们之间的关系。

抽象语法树在编译器、解释器和静态代码分析工具中广泛使用。

- 编译器使用抽象语法树进行语义分析和代码生成
- 解释器使用它来执行代码
- 静态代码分析工具使用它来检查代码的正确性、执行路径等

通过分析和遍历抽象语法树，可以进行代码转换、优化、重构以及生成文档、代码着色等操作它是理解代码的重要工具，提供了对代码结构和语义的抽象表示。

```js
function greet(name) {
    console.log("Hello, " + name + "!");
}
greet("Alice");
```

```html
Program (程序)
  └── FunctionDeclaration (函数声明)
        ├── Identifier: greet
        ├── FunctionExpression (函数表达式)
        │     ├── Identifier: name
        │     └── BlockStatement (代码块)
        │           └── ExpressionStatement (表达式语句)
        │                 └── CallExpression (函数调用)
        │                       ├── MemberExpression (成员表达式)
        │                       │     ├── Identifier: console
        │                       │     └── Identifier: log
        │                       └── BinaryExpression (二元表达式)
        │                             ├── BinaryExpression
        │                             │     ├── Literal: "Hello, "
        │                             │     └── Identifier: name
        │                             └── Literal: "!"
        └── ExpressionStatement
              └── CallExpression
                    ├── Identifier: greet
                    └── Literal: "Alice"

```