# Methali Game - Clean Architecture

A Swahili riddles and proverbs game built with React and TypeScript following Clean Architecture principles.

## 🏗️ Architecture

This project follows **Clean Architecture** with clear separation of concerns:

### Layer Structure

```
src/
├── domain/              # Business logic layer (innermost)
│   ├── entities/        # Core business entities
│   ├── valueObjects/    # Immutable value objects
│   ├── repositories/    # Repository interfaces
│   └── services/        # Domain services (business rules)
│
├── application/         # Use cases layer
│   └── useCases/        # Application-specific business rules
│
├── infrastructure/      # External interfaces layer
│   ├── data/            # Data sources
│   └── repositories/    # Repository implementations
│
├── presentation/        # UI layer (outermost)
│   ├── components/      # React components
│   └── viewModels/      # View logic (hooks)
│
└── di/                  # Dependency injection container
```

### Key Principles Applied

1. **Dependency Rule**: Dependencies point inward. Domain has no dependencies.
2. **Separation of Concerns**: Each layer has a single responsibility.
3. **Dependency Inversion**: High-level modules don't depend on low-level modules.
4. **Interface Segregation**: Repository interfaces defined in domain layer.
5. **Single Responsibility**: Each class/module has one reason to change.

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure Details

### Domain Layer (`src/domain/`)
- Pure business logic
- No framework dependencies
- Contains entities, value objects, and interfaces
- Defines repository contracts

### Application Layer (`src/application/`)
- Use cases orchestrate business logic
- Implements application-specific rules
- Depends only on domain layer

### Infrastructure Layer (`src/infrastructure/`)
- Implements repository interfaces
- Handles external data sources (LocalStorage, API)
- Contains data transformation logic

### Presentation Layer (`src/presentation/`)
- React components and hooks
- View models manage UI state
- Depends on application layer through DI

### Dependency Injection (`src/di/`)
- Wires up all dependencies
- Creates concrete implementations
- Provides use case instances

## 🎮 Features

- 46 Swahili riddles and proverbs
- Timer-based gameplay
- Hint system
- Scoring with streak multipliers
- Persistent leaderboard
- Responsive design

## 🛠️ Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide Icons

## 📝 License

MIT
