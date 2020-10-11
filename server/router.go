package main

import (
	"encoding/json"
	"net/http"

	mux "github.com/gorilla/mux"
)

// Router - struct for router and DB
type Router struct {
	router *mux.Router
	db     *Database
}

// NewRouter - setup routes and return the router
func NewRouter(db *Database) (*Router, error) {
	router := mux.NewRouter()

	r := &Router{
		router: router,
		db:     db,
	}

	router.HandleFunc("/api/users/", notImplemented)
	router.HandleFunc("/", r.Info)
	router.HandleFunc("/api/users/me/", notImplemented)
	router.HandleFunc("/api/users/:id", notImplemented)
	router.HandleFunc("/api/users/totalPoints/", notImplemented)

	router.HandleFunc("/api/bounty", r.Bounty)
	router.HandleFunc("/api/status", r.Status)

	return r, nil
}

// notImplemented - stub out the api
func notImplemented(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("not implemented"))
}

// Info -- Handler that serves up gameInfo
func (r *Router) Info(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	j, _ := json.Marshal(struct{ Message string }{
		Message: "hello, world!",
	})
	w.Write(j)
}
