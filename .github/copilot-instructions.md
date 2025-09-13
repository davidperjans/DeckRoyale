# Copilot Instructions for DeckRoyale

## Project Overview

- **Language:** Go
- **Main entrypoint:** `cmd/server/main.go`
- **Architecture:** Modular, with clear separation between API, business logic, AI, and middleware.
- **Key directories:**
  - `cmd/server/`: Application entrypoint
  - `internal/api/`: HTTP API endpoints and routing
  - `internal/ai/`: AI advisor logic
  - `internal/clash/`: Game logic/services
  - `internal/deck/`: Deck generation and strategies
  - `internal/middleware/`: HTTP middleware (e.g., normalization)
  - `internal/responses/`: Standardized API responses
  - `internal/types/`: Shared type definitions
  - `internal/tests/`: Unit and integration tests

## Developer Workflows

- **Build:**
  - Standard Go build: `go build ./cmd/server`
- **Run server:**
  - `go run ./cmd/server`
- **Test:**
  - All tests: `go test ./internal/...`
  - Specific test: `go test ./internal/tests/unit/normalize_test.go`
- **Dependencies:**
  - Managed via Go modules (`go.mod`, `go.sum`). Use `go mod tidy` to update.

## Project-Specific Patterns

- **API Routing:**
  - Defined in `internal/api/routes.go`.
  - Handlers are grouped by resource (e.g., deck, player).
- **AI Integration:**
  - AI logic is isolated in `internal/ai/advisor.go`.
  - Deck generation strategies in `internal/deck/strategies.go`.
- **Middleware:**
  - All HTTP middleware in `internal/middleware/`.
  - Example: `normalize.go` for request normalization.
- **Testing:**
  - Unit tests in `internal/tests/unit/`, integration tests in `internal/tests/integration/`.
  - Use table-driven tests for most logic.
- **Responses:**
  - Standardized response helpers in `internal/responses/responses.go`.

## Conventions

- **File organization:**
  - Keep business logic out of API handlers; use service and strategy layers.
  - Use `types.go` for shared structs and interfaces.
- **Error handling:**
  - Prefer returning errors up the stack; handle and log at API layer.
- **Naming:**
  - Use descriptive, domain-specific names for services and strategies.

## Integration Points

- **No external services hardcoded.**
- **All configuration via environment or flags (see `main.go`).**

---

For more details, see the respective files in each directory. When in doubt, follow the structure and patterns established in the `internal/` submodules.
