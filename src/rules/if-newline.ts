import { createEslintRule } from '../utils'

export const RULE_NAME = 'if-newline'
export type MessageIds = 'extranousIfNewline'
export type Options = []

export default createEslintRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'layout',
    docs: {
      description: 'No newline after braceless if',
    },
    fixable: 'whitespace',
    schema: [],
    messages: {
      extranousIfNewline: 'Expected no newline after braceless if',
    },
  },
  defaultOptions: [],
  create: (context) => {
    return {
      IfStatement(node) {
        if (!node.consequent) return
        if (node.consequent.type === 'BlockStatement') return
        if (node.test.loc.end.line !== node.consequent.loc.start.line) {
          context.report({
            node,
            loc: {
              start: node.test.loc.end,
              end: node.consequent.loc.start,
            },
            messageId: 'extranousIfNewline',
            fix(fixer) {
              const sourceCode = context.sourceCode
              const tokenAfterTest = sourceCode.getTokenAfter(node.test)
              return fixer.replaceTextRange([tokenAfterTest!.range[1], node.consequent.range[0]], ' ')
            },
          })
        }
      },
    }
  },
})
