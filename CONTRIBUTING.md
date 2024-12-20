

# Contributing to Syntaxia's Tech Stack Repo 🎉

Thank you for considering contributing to this project! We welcome contributions from everyone. Whether it's fixing a bug, improving documentation, or suggesting new features, your efforts help improve the project for everyone.

---

## Getting Started 🚀

### 1. Fork the Repository
- Click the **Fork** button at the top-right of this repository.
- Clone your fork locally:
  ```bash
  git clone https://github.com/<your-username>/<repo-name>.git
  cd <repo-name>
  ```

### 2. Install Dependencies
- Install [pnpm](https://pnpm.io/) (recommended for managing dependencies):
  ```bash
  npm install -g pnpm
  ```
- Install all dependencies:
  ```bash
  pnpm install
  ```

### 3. Start the Development Environment
- Run both the backend and frontend:
  ```bash
  pnpm run dev
  ```

- The frontend will be available at `http://localhost:3000`.
- The backend will run on `http://localhost:4000`.

---

## How to Contribute 🛠️

### 1. Open an Issue
- If you spot a bug or have a feature request, please open an [issue](https://github.com/Syntaxia/architecture-diagram-builder/issues).
- Provide as much detail as possible.

### 2. Create a Branch
- Always create a branch for your work:
  ```bash
  git checkout -b feature/<short-description>
  ```
- Use meaningful branch names like `feature/add-dark-mode` or `fix/navbar-bug`.

### 3. Make Your Changes
- Follow coding guidelines:
  - Use **TypeScript** for type safety.
  - Use **ESLint** and **Prettier** for consistent formatting:
    ```bash
    pnpm lint
    pnpm format
    ```
  - Ensure tests are written for new features or bug fixes.

### 4. Run Tests
- Use **Jest** to ensure your changes don’t break anything:
  ```bash
  pnpm test
  ```

### 5. Commit Your Changes
- Write clear, concise commit messages following [Conventional Commits](https://www.conventionalcommits.org/):
  ```bash
  git commit -m "feat: add drag-and-drop functionality to React Flow editor"
  ```

### 6. Push and Create a Pull Request
- Push your branch to your fork:
  ```bash
  git push origin feature/<short-description>
  ```
- Create a pull request (PR) to the `main` branch of the original repository.
- In your PR description:
  - Link the issue your PR addresses.
  - Explain what you changed and why.

---

## Code of Conduct ❤️
By contributing, you agree to adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md). Please respect others and collaborate positively.

---

## Contribution Tips 📝
- **First-timers**: Look for issues labeled `good first issue`.
- **Discussion**: Feel free to ask for help or guidance by commenting on issues or PRs.
- **Documentation**: Contributions to improve the README or other documentation files are always welcome.

---

## Thank You! 🙌
Every contribution matters, and we deeply appreciate your effort and time. Let’s build something amazing together!

