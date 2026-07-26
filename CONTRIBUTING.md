# Contributing

This repository includes an `instruction-manager` agent policy for coordinating tool use, tests, and commits.

## Agent workflow

- Prefer small, self-contained changes.
- Run project-local tests, linters, and build commands before committing.
- Do not modify system-level packages or run `sudo` without explicit approval.
- When in doubt, ask the maintainer before making broad changes.

## Git hook setup

This repository includes a sample pre-commit hook at `.githooks/pre-commit`.

To enable it for your local clone:

```bash
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit
```

The hook will:

- run `npm run lint` if `package.json` exists and `npm` is available
- run `npm test` if `package.json` exists and `npm` is available

If you do not use Node tooling, the hook exits successfully.

## Commit message guidance

Use clear, conventional-style commit messages for agent-related updates:

- `chore(agent): update .agent.md — record allowed tools and commit policy`
- `fix(agent): clarify tool limits for system package installation`
- `docs(agent): add example prompts and next-step suggestions`
- `test(agent): run lint and fix minor style issues`

## Notes

This repository does not enforce a specific package manager or language tooling.
The agent policy is intentionally conservative about system package installation.
