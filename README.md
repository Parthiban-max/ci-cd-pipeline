# Task Management Application with Automated CI Pipeline

A sample React + TypeScript application bundled with Vite, featuring an automated Continuous Integration (CI) pipeline powered by GitHub Actions.

This project demonstrates how code changes are automatically validated—enforcing code style (ESLint), regression testing (Vitest), security auditing (`npm audit`), and type/build integrity (`tsc` + Vite)—before any Pull Request can be merged into protected branches.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18 | Declarative component UI |
| **Language** | TypeScript 5.6 | Static typing & interface definitions |
| **Bundler & Dev Server** | Vite 8 | Fast HMR & production asset packaging |
| **Styling** | Modern CSS | Responsive, CSS variables, dark/light tones |
| **Unit Testing** | Vitest 5 + Testing Library | Automated component & state validation |
| **Linting & Code Quality** | ESLint 9 (Flat Config) | Static analysis & code consistency |
| **Dependency Security** | npm audit | Vulnerability scanning & policy enforcement |
| **CI Automation** | GitHub Actions | Automated quality gates on pull requests & pushes |

---

## 📂 Project Structure

```text
task-management-ci/
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI workflow pipeline definition
├── src/
│   ├── components/
│   │   ├── TaskList.tsx         # Task list rendering, toggling & deletion
│   │   └── TaskStats.tsx        # Dashboard metric cards (Total, Completed, Pending)
│   ├── types/
│   │   └── task.ts              # TypeScript interfaces for tasks & dashboard metrics
│   ├── test/
│   │   └── setup.ts             # Vitest DOM environment setup & cleanup
│   ├── App.tsx                  # Core state management & layout
│   ├── App.css                  # Responsive design styles & theme tokens
│   ├── App.test.tsx             # Comprehensive Vitest unit test suite
│   └── main.tsx                 # Application entrypoint
├── index.html                   # HTML template
├── package.json                 # Project dependencies, scripts & overrides
├── package-lock.json            # Deterministic dependency lockfile for npm ci
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite & Vitest configuration
└── eslint.config.js             # Modern ESLint 9 flat configuration
```

---

## 🚀 Local Development & Validation Commands

All commands can be executed locally and match the exact steps triggered inside GitHub Actions:

### 1. Install Dependencies
```bash
npm install
# or strictly adhere to lockfile (used in CI):
npm ci
```

### 2. Start Local Development Server
```bash
npm run dev
```

### 3. Run ESLint (Static Analysis)
```bash
npm run lint
```
*Validates syntax, catches unused variables, and verifies React Hooks rules.*

### 4. Run Vitest Unit Tests
```bash
npm test
```
*Executes all test suites in headless JSDOM environment and exits with status code.*

### 5. Run Security Vulnerability Audit
```bash
npm run audit
# or directly:
npm audit --audit-level=high
```
*Scans dependencies against GitHub Advisory Database and fails if high or critical vulnerabilities exist.*

### 6. Run Production Build & Type Check
```bash
npm run build
```
*Runs `tsc -b` to type-check all TypeScript files and `vite build` to output production assets to `dist/`.*

---

## 🛡️ CI Pipeline Stages (`.github/workflows/ci.yml`)

The GitHub Actions workflow triggers on:
- **Push events** to `main`, `master`, or `develop`.
- **Pull Request events**: `opened`, `synchronize` (new commits pushed), and `reopened`.

The pipeline executes the following 7 stages strictly in sequence:

```mermaid
flowchart LR
    A[1. Checkout Repo] --> B[2. Setup Node.js 20]
    B --> C[3. npm ci]
    C --> D[4. ESLint]
    D --> E[5. Vitest Tests]
    E --> F[6. npm audit]
    F --> G[7. Production Build]
    G --> H[✅ Status Check: SUCCESS]
```

1. **Checkout Repository**: Fetches source code via `actions/checkout@v4`.
2. **Setup Node.js Runtime**: Configures Node.js 20 LTS with npm dependency caching via `actions/setup-node@v4`.
3. **Clean Installation**: Executes `npm ci` for fast, reproducible, and deterministic builds.
4. **Code Quality Linting**: Executes `npm run lint` (`eslint .`).
5. **Automated Unit Testing**: Executes `npm test` (`vitest run`).
6. **Security Scanning**: Executes `npm audit --audit-level=high`.
7. **Production Build**: Executes `npm run build` (`tsc -b && vite build`).

> **Note on Permissions & Security**: The workflow runs with `permissions: contents: read` (least privilege) and includes a concurrency canceler to abort stale in-flight builds when newer commits are pushed to the same Pull Request.
