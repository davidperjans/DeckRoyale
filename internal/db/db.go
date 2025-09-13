package db

import (
	"log"

	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/jmoiron/sqlx"
)

func Connect(dbURL string) *sqlx.DB {
	db, err := sqlx.Open("pgx", dbURL)
	if err != nil {
		log.Fatalf("failed to connect to db: %v", err)
	}
	return db
}
