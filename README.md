# 🎉 **Welcome to Syntaxia open stack** 🎉

🔧 Underlying Tech Stack of Syntaxia | A comprehensive mono repo demonstrating the foundation of Syntaxia's architecture, featuring tools and frameworks like React, TypeScript, NestJS, Drizzle ORM, Redux, and TailwindCSS. Includes demo app, sharing a unified backend. 🚀 Showcasing modern full-stack development practices with CI/CD, testing, and mono repo management.

---

## 🌟 **Features**

- **Interactive Diagram Builder**: Create flow-based diagrams using React Flow.  
- **State Management**: Fully managed state with Redux for predictable application behavior.  
- **Monorepo Architecture**: Unified monorepo hosting frontend, backend, and shared libraries for seamless integration.  
- **Type-Safe Data Access**: Leverage Drizzle ORM for robust and type-safe database interactions.  

---

## 🛠️ **Tech Stack**

### 🎨 **Frontend**

- ⚛️ **React**: Modern UI development.
- 🌀 **Next.js**: Powerful React framework for SSR and routing.
- 🌟 **TailwindCSS**: Utility-first CSS for fast and responsive design.
- 🖍️ **React Flow**: Interactive flow-based diagram creation.

### 🔧 **Backend**

- 🖥️ **Node.js**: Server-side runtime.
- 🍹 **NestJS**: Modular and scalable backend framework.
- 💾 **Drizzle ORM**: Type-safe and modern ORM for database interactions.
- 📜 **TypeScript**: Strongly typed language for consistent code.

### 📂 **Monorepo Management**

- 🛠️ **Turborepo**: High-performance monorepo setup.

### 🛢️ **Database**

- 🐘 **PostgreSQL**: Reliable and scalable relational database.
- 🗃️ **Drizzle ORM**: Simplified and type-safe database layer.

### 🛠️ **Developer Experience**

- 💅 **ESLint**: Linting for clean and consistent code.
- ✨ **Prettier**: Automatic code formatting.
---
### TODO List

#### Authentication
- [ ] Implement **NextAuth.js** integration for secure login.

#### Testing
- [ ] Set up **Jest** for backend testing.
- [ ] Configure **React Testing Library** for unit testing of React components.
- [ ] Add **Supertest** for API testing.

#### DevOps & CI/CD
- [ ] Configure **GitHub Actions** for automated testing and deployment.
- [ ] Deploy frontend using **Vercel** (Pending).

#### Developer Experience
- [ ] 🐾Integrate **Husky** for Git hooks.
- [ ] 🚦Set up **Commitlint** to enforce conventional commits. 

Feel free to create pull request with your wishlist

---

## 🚀 **Getting Started**

### Prerequisites

- **Node.js** (>=16.x)
- **PostgreSQL** (latest version recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/syntaxia-baas/syntaxia-open-stack.git

## Navigate to the project root directory
cd syntaxia-open-stack

# Install Turbo globally (if you dont have turbo mono not installed)
yarn global add turbo

# Install Nodemon globally
yarn global add nodemon

# Install project dependencies
yarn install

##### SERVER ####
## Navigate to the server directory
cd apps/server

# Database Setup
# Install PostgreSQL and ensure it is running.

# Create a `.env` file in the root directory at server (../apps/server/) and 
# add your PostgreSQL database URL.
# Example:
DATABASE_URL=postgres://your_username:your_password@localhost:5432/your_database_name

# This project uses Drizzle ORM for database operations.
# Learn more about Drizzle ORM: https://orm.drizzle.team/docs/overview
# You can refer to the documentation and switch to 
# a database of your choice (if supported by Drizzle).

# Generate Drizzle migrations and schema
yarn db:generate

# Push the schema to the database (tables will be created in the database)
yarn db:push

#### WEB APP ####
## Navigate to the web app directory
cd apps/web

# Create a .env.development file in the root at web app (../apps/web/) and server url 
# as env variable. It should be something like below
NEXT_PUBLIC_AWS_API_GATEWAY_URL=http://localhost:8080

## Navigate back to the project root directory and run below commands
cd syntaxia-open-stack

# Build the entire monorepo (shared packages, frontend, and backend).
# This step is necessary before running the application.
turbo run build

# Run the development servers for both frontend and backend.
# Backend will run at: http://localhost:8080/
# Frontend will run at: http://localhost:3000/
yarn dev [or] turbo run dev

```

---

## 🛡️ **Contributing**

We welcome contributions! Please check the [Contributing Guide](CONTRIBUTING.md) for more details.

---

## 📜 **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🤝 **Connect With Us**

- 🌐 [Website](https://syntaxia.io)
- 🐦 [Twitter](https://x.com/SyntaxiaBaaS)
- 📧 [Email Us](mailto:murali@syntaxia.io)

---

### **🚀 Happy Coding!**
