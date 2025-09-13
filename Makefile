APP_NAME=deckroyale

include .env
export

DB_URL?=$(DATABASE_URL)

.PHONY: run build test db-up db-down db-migrate db-reset

run:
	go run ./cmd/server/main.go

build:
	go build -o bin/$(APP_NAME) ./cmd/$(APP_NAME)

test:
	go test ./...

db-up:
	docker compose --env-file .env up -d

db-down:
	docker compose down

db-migrate:
	migrate -path migrations -database "$(DB_URL)" up

db-reset:
	migrate -path migrations -database "$(DB_URL)" down -all
	migrate -path migrations -database "$(DB_URL)" up
