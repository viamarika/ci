# Software testing assignment

## Setup

1. Install Node.js v26
2. Clone the repository
3. Install dependencies: `npm install`
4. Run the tests: `npm test`
5. Run the tests with coverage: `npm run coverage`

Coverage is measured with v8 and reported to Coveralls by the GitHub Actions
pipeline on each push.

> **Nix users:** `flake.nix` and `.envrc` provide Node.js v26 through
> `nix develop` or direnv.

## Purpose of this repository

This repository was forked from the repository for students participating in Software Testing course
at Tampere University.

The original template contained only the source code to be tested, a `package.json` skeleton and a LICENSE file.

Source code folder contains a separate license file that must **NOT** be removed under any circumstances!
Removing this license file directly violates terms and conditions of the software under testing.
Individuals who remove or modify the license file will also carry the consequences.
