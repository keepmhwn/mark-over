# Contributing to @your-org/package-name

Thank you for your interest in contributing! We welcome contributions from everyone.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/package-name.git`
3. Install dependencies: `npm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Development Workflow

1. Make your changes
2. Run tests: `npm run type-check`
3. Run linter: `npm run lint`
4. Format code: `npm run format`
5. Build the package: `npm run build`

## Code Style

- We use ESLint and Prettier for code formatting
- Run `npm run lint:fix` to automatically fix linting issues
- Run `npm run format` to format your code

## Commit Messages

We follow conventional commits format:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build process or auxiliary tool changes

Example:
```
feat: add new validation function
fix: resolve issue with type exports
docs: update README with new examples
```

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the CHANGELOG.md following the Keep a Changelog format
3. Ensure all tests pass and code is properly formatted
4. Create a pull request with a clear title and description
5. Wait for review and address any feedback

## Testing

Before submitting a PR, make sure:

- [ ] Code passes type checking (`npm run type-check`)
- [ ] Code passes linting (`npm run lint`)
- [ ] Code is properly formatted (`npm run format:check`)
- [ ] Build succeeds (`npm run build`)

## Questions?

Feel free to open an issue if you have any questions or need help!
