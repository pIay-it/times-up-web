module.exports = {
    root: true,
    env: { node: true },
    extends: [
        "plugin:vue/base",
        "eslint:recommended",
    ],
    parserOptions: { ecmaVersion: 2021 },
    rules: {
        /*
         * ---- ESLint Rules -----
         * Possible Problems (https://eslint.org/docs/rules/#possible-problems)
         */
        "array-callback-return": "error",
        "constructor-super": "error",
        "for-direction": "error",
        "getter-return": "error",
        "no-async-promise-executor": "error",
        "no-await-in-loop": "off",
        "no-class-assign": "error",
        "no-compare-neg-zero": "error",
        "no-cond-assign": "error",
        "no-const-assign": "error",
        "no-constant-condition": "error",
        "no-constructor-return": "error",
        "no-control-regex": "error",
        "no-debugger": process.env.nodeEnv === "production" ? "error" : "warn",
        "no-dupe-args": "error",
        "no-dupe-class-members": "error",
        "no-dupe-else-if": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-duplicate-imports": "error",
        "no-empty-character-class": "error",
        "no-empty-pattern": "error",
        "no-ex-assign": "error",
        "no-fallthrough": "error",
        "no-func-assign": "error",
        "no-import-assign": "error",
        "no-inner-declarations": "error",
        "no-invalid-regexp": "error",
        "no-irregular-whitespace": "error",
        "no-loss-of-precision": "error",
        "no-misleading-character-class": "error",
        "no-new-symbol": "error",
        "no-obj-calls": "error",
        "no-promise-executor-return": "error",
        "no-prototype-builtins": "error",
        "no-self-assign": "error",
        "no-self-compare": "error",
        "no-setter-return": "error",
        "no-sparse-arrays": "error",
        "no-template-curly-in-string": "error",
        "no-this-before-super": "error",
        "no-undef": "error",
        "no-unexpected-multiline": "error",
        "no-unmodified-loop-condition": "error",
        "no-unreachable": "warn",
        "no-unreachable-loop": "error",
        "no-unsafe-finally": "error",
        "no-unsafe-negation": "error",
        "no-unsafe-optional-chaining": "error",
        "no-unused-private-class-members": "error",
        "no-unused-vars": "error",
        "no-use-before-define": "error",
        "no-useless-backreference": "error",
        "require-atomic-updates": "off",
        "use-isnan": "error",
        "valid-typeof": "error",
        /*
         * ---- ESLint Rules -----
         * Suggestions (https://eslint.org/docs/rules/#suggestions)
         */
        "accessor-pairs": "error",
        "arrow-body-style": ["error", "as-needed"],
        "block-scoped-var": "error",
        "camelcase": "error",
        "capitalized-comments": "error",
        "class-methods-use-this": "error",
        "complexity": "error",
        "consistent-return": "off",
        "consistent-this": "error",
        "curly": "error",
        "default-case": "error",
        "default-case-last": "error",
        "default-param-last": "error",
        "dot-notation": "error",
        "eqeqeq": "error",
        "func-name-matching": "off",
        "func-names": "error",
        "func-style": ["error", "declaration", { allowArrowFunctions: true }],
        "grouped-accessor-pairs": "error",
        "guard-for-in": "error",
        "id-denylist": "off",
        "id-length": "off",
        "id-match": "off",
        "init-declarations": "off",
        "max-classes-per-file": "error",
        "max-depth": "off",
        "max-lines": "off",
        "max-lines-per-function": ["error", { max: 30, skipComments: true }],
        "max-nested-callbacks": ["error", 5],
        "max-params": ["error", 6],
        "max-statements": "off",
        "multiline-comment-style": "error",
        "new-cap": "error",
        "no-alert": "warn",
        "no-array-constructor": "error",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-case-declarations": "error",
        "no-confusing-arrow": "off",
        "no-console": process.env.nodeEnv === "production" ? "error" : "warn",
        "no-continue": "error",
        "no-delete-var": "error",
        "no-div-regex": "error",
        "no-else-return": "error",
        "no-empty": "error",
        "no-empty-function": "error",
        "no-eq-null": "error",
        "no-eval": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-extra-boolean-cast": "error",
        "no-extra-label": "error",
        "no-extra-semi": "error",
        "no-floating-decimal": "error",
        "no-global-assign": "error",
        "no-implicit-coercion": ["error", { allow: ["!!"] }],
        "no-implicit-globals": "error",
        "no-implied-eval": "error",
        "no-inline-comments": "error",
        "no-invalid-this": "off",
        "no-iterator": "error",
        "no-label-var": "error",
        "no-labels": "error",
        "no-lone-blocks": "error",
        "no-lonely-if": "error",
        "no-loop-func": "error",
        "no-magic-numbers": "off",
        "no-mixed-operators": "off",
        "no-multi-assign": "error",
        "no-multi-str": "off",
        "no-negated-condition": "off",
        "no-nested-ternary": "error",
        "no-new": "error",
        "no-new-func": "error",
        "no-new-object": "error",
        "no-new-wrappers": "error",
        "no-nonoctal-decimal-escape": "error",
        "no-octal": "error",
        "no-octal-escape": "error",
        "no-param-reassign": "off",
        "no-plusplus": "off",
        "no-proto": "error",
        "no-redeclare": "error",
        "no-regex-spaces": "error",
        "no-restricted-exports": "off",
        "no-restricted-globals": "off",
        "no-restricted-imports": "off",
        "no-restricted-properties": "off",
        "no-restricted-syntax": ["error", "SwitchStatement", "SwitchCase", "DoWhileStatement"],
        "no-return-assign": "error",
        "no-return-await": "error",
        "no-script-url": "error",
        "no-sequences": "error",
        "no-shadow": ["error", { hoist: "never" }],
        "no-shadow-restricted-names": "error",
        "no-ternary": "off",
        "no-throw-literal": "error",
        "no-undef-init": "error",
        "no-undefined": "off",
        "no-underscore-dangle": "off",
        "no-unneeded-ternary": "error",
        "no-unused-expressions": "error",
        "no-unused-labels": "error",
        "no-useless-call": "error",
        "no-useless-catch": "error",
        "no-useless-computed-key": "error",
        "no-useless-concat": "error",
        "no-useless-constructor": "error",
        "no-useless-escape": "error",
        "no-useless-rename": "error",
        "no-useless-return": "error",
        "no-var": "error",
        "no-void": "error",
        "no-warning-comments": "off",
        "no-with": "error",
        "object-shorthand": "error",
        "one-var": ["error", "never"],
        "one-var-declaration-per-line": ["error", "initializations"],
        "operator-assignment": ["error", "always"],
        "prefer-arrow-callback": "error",
        "prefer-const": "error",
        "prefer-destructuring": "off",
        "prefer-exponentiation-operator": "error",
        "prefer-named-capture-group": "error",
        "prefer-numeric-literals": "error",
        "prefer-object-spread": "error",
        "prefer-promise-reject-errors": "error",
        "prefer-regex-literals": "error",
        "prefer-rest-params": "error",
        "prefer-spread": "error",
        "prefer-template": "error",
        "quote-props": ["error", "consistent-as-needed"],
        "radix": ["error", "as-needed"],
        "require-await": "error",
        "require-unicode-regexp": "error",
        "require-yield": "error",
        "sort-imports": "off",
        "sort-keys": "off",
        "sort-vars": "off",
        "spaced-comment": ["error", "always"],
        "strict": "off",
        "symbol-description": "error",
        "vars-on-top": "error",
        "yoda": "error",
        /*
         * ---- ESLint Rules -----
         * Layout & Formatting (https://eslint.org/docs/rules/#layout-formatting)
         */
        "array-bracket-newline": ["error", { multiline: true }],
        "array-bracket-spacing": ["error", "never"],
        "array-element-newline": ["error", "consistent"],
        "arrow-parens": ["error", "as-needed"],
        "arrow-spacing": "error",
        "block-spacing": "error",
        "brace-style": "error",
        "comma-dangle": ["error", "always-multiline"],
        "comma-spacing": ["error", { before: false, after: true }],
        "comma-style": "error",
        "computed-property-spacing": "error",
        "dot-location": ["error", "property"],
        "eol-last": ["error", "never"],
        "func-call-spacing": ["error", "never"],
        "function-call-argument-newline": ["error", "consistent"],
        "function-paren-newline": ["error", "never"],
        "generator-star-spacing": [
            "error", {
                before: false,
                after: true,
            },
        ],
        "implicit-arrow-linebreak": "error",
        "indent": "error",
        "jsx-quotes": ["error", "prefer-double"],
        "key-spacing": ["error", { mode: "strict" }],
        "keyword-spacing": "error",
        "line-comment-position": "error",
        "linebreak-style": "error",
        "lines-around-comment": "off",
        "lines-between-class-members": "error",
        "max-len": ["error", { code: 150, ignoreTemplateLiterals: true, ignoreComments: true }],
        "max-statements-per-line": ["error", { max: 1 }],
        "multiline-ternary": ["error", "never"],
        "new-parens": "error",
        "newline-per-chained-call": "off",
        "no-extra-parens": ["error", "all", { returnAssign: false }],
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
        "no-multi-spaces": "error",
        "no-multiple-empty-lines": ["error", { max: 1 }],
        "no-tabs": "off",
        "no-trailing-spaces": ["error", { skipBlankLines: true }],
        "no-whitespace-before-property": "error",
        "nonblock-statement-body-position": ["error", "below"],
        "object-curly-newline": ["error", { multiline: true }],
        "object-curly-spacing": ["error", "always"],
        "object-property-newline": "off",
        "operator-linebreak": ["error", "after"],
        "padded-blocks": ["error", "never"],
        "padding-line-between-statements": [
            "error", {
                blankLine: "always",
                prev: "import",
                next: "*",
            }, {
                blankLine: "never",
                prev: "import",
                next: "import",
            }, {
                blankLine: "always",
                prev: "*",
                next: "export",
            },
        ],
        "quotes": ["error", "double", { allowTemplateLiterals: true }],
        "rest-spread-spacing": "error",
        "semi": ["error", "always"],
        "semi-spacing": "error",
        "semi-style": ["error", "last"],
        "space-before-blocks": ["error", { functions: "always", keywords: "always", classes: "always" }],
        "space-before-function-paren": ["error", "never"],
        "space-in-parens": ["error", "never"],
        "space-infix-ops": "error",
        "space-unary-ops": [
            "error", {
                words: true,
                nonwords: false,
            },
        ],
        "switch-colon-spacing": "error",
        "template-curly-spacing": "error",
        "template-tag-spacing": "error",
        "unicode-bom": "error",
        "wrap-iife": "error",
        "wrap-regex": "error",
        "yield-star-spacing": "error",

        /*
         * ---- Vue Rules -----
         * Base Rules (Enabling Correct ESLint Parsing) (https://eslint.vuejs.org/rules/#base-rules-enabling-correct-eslint-parsing)
         */
        "vue/comment-directive": ["error", { reportUnusedDisableDirectives: true }],
        "vue/jsx-uses-vars": "error",
        "vue/script-setup-uses-vars": "error",
        /*
         * ---- Vue Rules -----
         * Priority A: Essential (Error Prevention) for Vue.js 3.x (https://eslint.vuejs.org/rules/#priority-a-essential-error-prevention-for-vue-js-3-x)
         */
        "vue/multi-word-component-names": "error",
        "vue/no-arrow-functions-in-watch": "error",
        "vue/no-async-in-computed-properties": "error",
        "vue/no-computed-properties-in-data": "error",
        "vue/no-deprecated-data-object-declaration": "error",
        "vue/no-deprecated-destroyed-lifecycle": "error",
        "vue/no-deprecated-dollar-listeners-api": "error",
        "vue/no-deprecated-dollar-scopedslots-api": "error",
        "vue/no-deprecated-events-api": "error",
        "vue/no-deprecated-filter": "error",
        "vue/no-deprecated-functional-template": "error",
        "vue/no-deprecated-html-element-is": "error",
        "vue/no-deprecated-inline-template": "error",
        "vue/no-deprecated-props-default-this": "error",
        "vue/no-deprecated-router-link-tag-prop": "error",
        "vue/no-deprecated-scope-attribute": "error",
        "vue/no-deprecated-slot-attribute": "error",
        "vue/no-deprecated-slot-scope-attribute": "error",
        "vue/no-deprecated-v-bind-sync": "error",
        "vue/no-deprecated-v-is": "error",
        "vue/no-deprecated-v-on-native-modifier": "error",
        "vue/no-deprecated-v-on-number-modifiers": "error",
        "vue/no-deprecated-vue-config-keycodes": "error",
        "vue/no-dupe-keys": "error",
        "vue/no-dupe-v-else-if": "error",
        "vue/no-duplicate-attributes": "error",
        "vue/no-export-in-script-setup": "error",
        "vue/no-lifecycle-after-await": "error",
        "vue/no-mutating-props": "error",
        "vue/no-parsing-error": "error",
        "vue/no-ref-as-operand": "error",
        "vue/no-reserved-keys": "error",
        "vue/no-reserved-props": "error",
        "vue/no-setup-props-destructure": "error",
        "vue/no-shared-component-data": "error",
        "vue/no-side-effects-in-computed-properties": "error",
        "vue/no-template-key": "error",
        "vue/no-textarea-mustache": "error",
        "vue/no-unused-components": "error",
        "vue/no-unused-vars": "error",
        "vue/no-use-v-if-with-v-for": "error",
        "vue/no-useless-template-attributes": "error",
        "vue/no-v-for-template-key-on-child": "error",
        "vue/no-watch-after-await": "error",
        "vue/require-component-is": "error",
        "vue/require-prop-type-constructor": "error",
        "vue/require-render-return": "error",
        "vue/require-slots-as-functions": "error",
        "vue/require-toggle-inside-transition": "error",
        "vue/require-v-for-key": "error",
        "vue/require-valid-default-prop": "error",
        "vue/return-in-computed-property": "error",
        "vue/return-in-emits-validator": "error",
        "vue/use-v-on-exact": "error",
        "vue/valid-define-emits": "error",
        "vue/valid-define-props": "error",
        "vue/valid-next-tick": "error",
        "vue/valid-template-root": "error",
        "vue/valid-v-bind-sync": "error",
        "vue/valid-v-bind": "error",
        "vue/valid-v-cloak": "error",
        "vue/valid-v-else-if": "error",
        "vue/valid-v-else": "error",
        "vue/valid-v-for": "error",
        "vue/valid-v-html": "error",
        "vue/valid-v-if": "error",
        "vue/valid-v-is": "error",
        "vue/valid-v-memo": "error",
        "vue/valid-v-model": "error",
        "vue/valid-v-on": "error",
        "vue/valid-v-once": "error",
        "vue/valid-v-pre": "error",
        "vue/valid-v-show": "error",
        "vue/valid-v-slot": "error",
        "vue/valid-v-text": "error",
        /*
         * ---- Vue Rules -----
         * Priority B: Strongly Recommended (Improving Readability) for Vue.js 3.x (https://eslint.vuejs.org/rules/#priority-b-strongly-recommended-improving-readability-for-vue-js-3-x)
         */
        "vue/attribute-hyphenation": "error",
        "vue/component-definition-name-casing": "error",
        "vue/first-attribute-linebreak": ["error", { singleline: "beside", multiline: "beside" }],
        "vue/html-closing-bracket-newline": ["error", { singleline: "never", multiline: "never" }],
        "vue/html-closing-bracket-spacing": ["error", { startTag: "never", endTag: "never", selfClosingTag: "never" }],
        "vue/html-end-tags": "error",
        "vue/html-indent": [
            "error", 4, {
                attribute: 0,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ],
        "vue/html-quotes": "error",
        "vue/html-self-closing": [
            "error", {
                html: {
                    void: "always",
                    normal: "always",
                    component: "always",
                },
                svg: "always",
                math: "always",
            },
        ],
        "vue/max-attributes-per-line": "off",
        "vue/multiline-html-element-content-newline": ["error", { ignoreWhenEmpty: true, ignores: [], allowEmptyLines: false }],
        "vue/mustache-interpolation-spacing": "error",
        "vue/no-multi-spaces": "error",
        "vue/no-spaces-around-equal-signs-in-attribute": "error",
        "vue/no-template-shadow": "error",
        "vue/one-component-per-file": "error",
        "vue/prop-name-casing": "error",
        "vue/require-default-prop": "error",
        "vue/require-explicit-emits": "error",
        "vue/require-prop-types": "error",
        "vue/singleline-html-element-content-newline": ["error", { ignoreWhenNoAttributes: false, ignoreWhenEmpty: true, ignores: [] }],
        "vue/v-bind-style": "error",
        "vue/v-on-event-hyphenation": "error",
        "vue/v-on-style": "error",
        "vue/v-slot-style": ["error", { atComponent: "shorthand", default: "shorthand", named: "shorthand" }],
        /*
         * ---- Vue Rules -----
         * Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead) https://eslint.vuejs.org/rules/#priority-c-recommended-minimizing-arbitrary-choices-and-cognitive-overhead-for-vue-js-3-x
         */
        "vue/attributes-order": "error",
        "vue/component-tags-order": ["error", { order: ["template", "script", "style"] }],
        "vue/no-lone-template": "error",
        "vue/no-multiple-slot-args": "error",
        "vue/no-v-html": "off",
        "vue/order-in-components": "error",
        "vue/this-in-template": "error",
        /*
         * ---- Vue Rules -----
         * Least Priority: Uncategorized (https://eslint.vuejs.org/rules/#uncategorized)
         */
        "vue/block-lang": ["error", { script: { lang: "js" } }],
        "vue/block-tag-newline": "error",
        "vue/component-api-style": "off",
        "vue/component-name-in-template-casing": "error",
        "vue/custom-event-name-casing": "error",
        "vue/html-button-has-type": "error",
        "vue/html-comment-content-newline": "error",
        "vue/html-comment-content-spacing": "error",
        "vue/html-comment-indent": "error",
        "vue/match-component-file-name": ["error", { extensions: ["vue"], shouldMatchCase: true }],
        "vue/new-line-between-multi-line-property": "off",
        "vue/next-tick-style": "error",
        "vue/no-bare-strings-in-template": "off",
        "vue/no-boolean-default": ["error", "default-false"],
        "vue/no-child-content": "error",
        "vue/no-duplicate-attr-inheritance": "error",
        "vue/no-empty-component-block": "error",
        "vue/no-expose-after-await": "error",
        "vue/no-invalid-model-keys": "error",
        "vue/no-multiple-objects-in-class": "error",
        "vue/no-potential-component-option-typo": "error",
        "vue/no-reserved-component-names": "error",
        "vue/no-restricted-block": "error",
        "vue/no-restricted-call-after-await": "error",
        "vue/no-restricted-class": "error",
        "vue/no-restricted-component-options": "error",
        "vue/no-restricted-custom-event": "error",
        "vue/no-restricted-props": "error",
        "vue/no-restricted-static-attribute": "error",
        "vue/no-restricted-v-bind": "error",
        "vue/no-static-inline-styles": "error",
        "vue/no-template-target-blank": "error",
        "vue/no-this-in-before-route-enter": "error",
        "vue/no-undef-properties": "error",
        "vue/no-unregistered-components": [
            "error", {
                ignorePatterns: [
                    "Metainfo",
                    "RouterView",
                    "RouterLink",
                    "VueGoodTable",
                    "VueFormToggleButton",
                    "ve-progress",
                    "VSelect",
                    "VForm",
                    "VField",
                    "VTooltip",
                    "VDropDown",
                    "VueCountdown",
                ],
            },
        ],
        "vue/no-unsupported-features": "error",
        "vue/no-unused-properties": "error",
        "vue/no-unused-refs": "error",
        "vue/no-use-computed-property-like-method": "error",
        "vue/no-useless-mustaches": "error",
        "vue/no-useless-v-bind": "error",
        "vue/no-v-text": "error",
        "vue/padding-line-between-blocks": "error",
        "vue/prefer-import-from-vue": "error",
        "vue/prefer-prop-type-boolean-first": "error",
        "vue/prefer-separate-static-class": "error",
        "vue/prefer-true-attribute-shorthand": "error",
        "vue/require-direct-export": "error",
        "vue/require-emit-validator": "error",
        "vue/require-expose": "off",
        "vue/require-name-property": "error",
        "vue/script-indent": "off",
        "vue/sort-keys": "off",
        "vue/static-class-names-order": "off",
        "vue/v-for-delimiter-style": ["error", "of"],
        "vue/v-on-function-call": "error",
        /*
         * ---- Vue Rules -----
         * Extension Rules (https://eslint.vuejs.org/rules/#extension-rules)
         */
        "vue/array-bracket-newline": ["error", { multiline: true }],
        "vue/array-bracket-spacing": "error",
        "vue/arrow-spacing": "error",
        "vue/block-spacing": "error",
        "vue/brace-style": "error",
        "vue/camelcase": "error",
        "vue/comma-dangle": ["error", "always-multiline"],
        "vue/comma-spacing": ["error", { before: false, after: true }],
        "vue/comma-style": "error",
        "vue/dot-location": ["error", "property"],
        "vue/dot-notation": "error",
        "vue/eqeqeq": "error",
        "vue/func-call-spacing": ["error", "never"],
        "vue/key-spacing": ["error", { mode: "strict" }],
        "vue/keyword-spacing": "error",
        "vue/max-len": ["error", { code: 150 }],
        "vue/no-constant-condition": "error",
        "vue/no-empty-pattern": "error",
        "vue/no-extra-parens": "error",
        "vue/no-irregular-whitespace": "error",
        "vue/no-loss-of-precision": "error",
        "vue/no-restricted-syntax": "error",
        "vue/no-sparse-arrays": "error",
        "vue/no-useless-concat": "error",
        "vue/object-curly-newline": ["error", { multiline: true }],
        "vue/object-curly-spacing": ["error", "always"],
        "vue/object-property-newline": "off",
        "vue/operator-linebreak": ["error", "after"],
        "vue/prefer-template": "error",
        "vue/space-in-parens": ["error", "never"],
        "vue/space-infix-ops": "error",
        "vue/space-unary-ops": "error",
        "vue/template-curly-spacing": "error",
    },
    overrides: [
        {
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)",
            ],
            env: { mocha: true },
        }, {
            files: [".eslintrc.js"],
            rules: {
                "max-len": "off",
                "vue/max-len": "off",
            },
        },
    ],
};