package main

import (
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

func main() {
	var err error

	// setup database connection
	db, err := NewDB()

	if err != nil {
		log.Fatal(err)
	}

	// setup router
	router, err := NewRouter(db)

	if err != nil {
		log.Fatal(err)
	}

	s := &http.Server{
		Addr:    ":8000",
		Handler: router.router,
	}

	println("serving up hackpoints")

	log.Fatal(s.ListenAndServe())
}
