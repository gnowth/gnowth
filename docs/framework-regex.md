---
title: Regex
category: framework
---

# Regex

```
  class Regex {
    // Components: CharacterClass, Anchor, Lookahead, NegativeLookahead, ChoiceOf
    // Quantifiers: One, Optionally, ZeroOrMore, Repeat, Locally
    // Captures: Capture, TryCapture, Reference
    // Builders: RegexComponentBuilder, AlternationBuilder
    // Operators
  }

  export default Regex

  // const t = [Regex.components.Start, Regex.components.End]

  // character classes
  // . - any
  // \w \d \s - word, digit, whitespace
  // \W \D \S - wordNot, digitNot, whitespaceNot
  // [abc] - any of
  // [^abc] - not of
  // [a-g] - between

  // anchors
  // ^ $ - start, end
  // \b \B - word, wordNot
  // \A	Returns a match if the specified characters are at the beginning of the string
  // \Z	Returns a match if the specified characters are at the end of the string
  // \z An anchor that matches at the end of the input string.

  // escape
  // \. \* \\ \t \n \r
  // \+ - reserve word
  // \000 - octal escape
  // \xFF - hexa escape
  // \uFFFF - unicode escape
  // \u{FFFF} - extended unicode escape
  // \f - form feed
  // \v - vertical tab
  // \cI - control character escape

  // group lookaround
  // (abc) - capture group
  // (?<name>abc) - named capturegroup
  // \1 - backreference to group 1
  // (?:abc) - non capturing group
  // (?=abc) - lookahead
  // (?!abc) - negative lookahead
  // (?<=abc) - lookbehind
  // (?<!abc) - negative lookbehind

  // quantifier alteration
  // a*a+a? - 0 or more, 1 or more, 0 or 1
  // a{5}a{2,} - exactly five, two or more
  // a{1,3} - between one & three
  // a+?a{2,}? - match as few as possible
  // ab|cd - match ab or cd
  // ? - lazy / optional
  // | - alteration

  // substitution
  // $& - match
  // $1 - capture group
  // $` - before match
  // $' - after match
  // $$ - escaped $$

  // flags
  // i - ignore case
  // g - global
  // m - multiline
  // u - unicode
  // y - sticky
  // s - dotall

  // reg.ANY: .
  // reg.DIGIT: \d
  // reg.START: ^
  // reg.END: $
  // reg.ALPHANUM: \w
  // reg.NOT_ALPHANUM: \W
  // reg.WHITESPACE: \s
  // reg.NOT_WHITESPACE: \S
  // reg.WORD_BOUND: \b
  // reg.IN_WORD: \B
  // Flags
  // reg.f.GLOBAL: the g flag
  // reg.f.IGNORE_CASE: the i flag
  // reg.f.MULTILINE: the m flag
  // reg.f.UNICODE: the u flag
  // reg.f.STICKY: the y flag

  // reg(Array<string|RegExp>|string|RegExp[, Array<Flag>|Flag flags]): constructs a new regular expression by concatenating the component(s). If there is only one component, it doesn't need to be wrapped in an Array. Strings are interpreted as literal text and will be properly escaped (e.g. '\n[abc]' will become /(?:\n\[abc\])/). Flags are values of the object reg.f (global, case-insensitive, etc.).
  // reg.times(RegExp, boolean notGreedy, number min[, number max]): matches the regular expression at least min times and at most max times, if a max is passed in. Making it not greedy will cause it to try to capture as few occurences as possible.
  // reg.any(RegExp[, boolean notGreedy]): matches 0 or more occurences of the regular expression
  // reg.some(RegExp[, boolean notGreedy]): matches 1 or more occurences of the regular expression
  // reg.maybe(RegExp[, boolean notGreedy]): matches 0 or 1 occurences of the regular expression
  // reg.thisMany(RegExp, number times): matches times occurences of the regular expression
  // reg.capture(RegExp, string name): wraps the regular expression in a capturing group that can be referred to by name
  // reg.charIn(char|[char, char] ...chars): matches any of the specified characters. Individual characters specify a single character, whereas Arrays of 2 of them specify a range of characters.
  // reg.charNotIn(char|[char, char] ...chars): matches any character besides the specified characters. Individual characters specify a single character, whereas Arrays of 2 of them specify a range of characters.
  // reg.or(RegExp ...res): matches any instance of exactly one of the specified regular expressions
```
