# Code Quality Standards — Gramcor (ALL PROJECTS)

MANDATORY rules for every line of code generated. No exceptions.

## Structure Rules
- Max 15 lines of real code per function (blank lines and comments excluded)
- Max cyclomatic complexity 5 per function (each if/else/for/while/case counts as +1)
- Max 150 lines per file/component — if exceeded, split into subcomponents or helpers
- Max 3 parameters per function — use options object pattern if more needed
- Max 2 levels of nesting (if/for/while) — use early return to reduce nesting

## TypeScript Rules
- NEVER use any — always type correctly
- Union types for finite states: type GameState = 'home' | 'playing' | 'result'
- Interface for all props and function parameters
- useEffect always with cleanup function

## React Rules
- useEffect cleanup: always return () => clearInterval/removeEventListener/etc
- List keys: never use array index — use stable unique id
- No direct state mutation — always use setter with spread/functional update
- No prop drilling more than 2 levels — use Context or composition

## Naming Rules
- No abbreviations — full descriptive names
- Components: PascalCase
- Hooks: camelCase starting with 'use'
- Constants: UPPER_SNAKE_CASE
- No comments explaining "what" — code must be readable
- Only comment "why" when truly non-obvious

## Error Handling
- Always explicit try/catch for localStorage, fetch, JSON.parse
- Never silent errors
- Always return safe default on error (empty array, null, 0)

## TDD Process (MANDATORY for new features)
Step 1: Write Gherkin scenarios (Given-When-Then) — user approves
Step 2: Write QA manual procedure — user approves
Step 3: Write unit tests (min 95% line + branch coverage)
Step 4: Write production code that passes all tests

## Unit Test Rules
- Independent (no dependency on order or other tests)
- Fast (< 100ms each)
- Deterministic (same result always)
- Descriptive names: 'should award speed bonus when answer is correct with time remaining'
- AAA pattern: Arrange / Act / Assert
- No trivial tests (no getter/setter-only tests)

## Gherkin Format
Feature: [name]
  As a [user role]
  I want [action]
  So that [benefit]

  Scenario: [description]
    Given [initial context]
    When [user action]
    Then [expected result]
    And [additional result]

## Pre-Commit Checklist
[ ] No function exceeds 15 lines
[ ] No unused variables or imports
[ ] No console.log left in code
[ ] No 'any' in TypeScript
[ ] useEffect has cleanup where applicable
[ ] List keys are unique and stable
[ ] Descriptive names (no abbreviations)
[ ] Max 2 nesting levels
[ ] Explicit error handling (try/catch)
[ ] No commented-out dead code
