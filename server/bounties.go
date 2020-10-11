package main
import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
)

// Bounty - http handler for bounties
func (r *Router) Bounty(w http.ResponseWriter, req *http.Request) {
	var jsonResponse []byte
	var bounties []Bounty
	var err error

	id := req.URL.Query().Get("id")
	w.Header().Set("Content-Type", "application/json")

	if req.Method == http.MethodGet {
		err = r.db.GetBounty(id, &bounties)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		if len(bounties) == 1 {
			jsonResponse, err = json.Marshal(bounties[0])
		} else {
			jsonResponse, err = json.Marshal(bounties)
		}

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	if req.Method == http.MethodPatch {
		operation := req.URL.Query().Get("operation")

		if len(operation) == 0 || len(id) == 0 {
			http.Error(w, `no query params`, http.StatusInternalServerError)
			return
		}

		var b Bounty
		var updatedBounty Bounty

		err := decodeJSONBody(w, req, &b)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		switch op := OperationType(operation); op {
		case Update:
			updatedBounty, err = r.db.UpdateBounty(id, &b)
		case Create:
			updatedBounty, err = r.db.CreateBounty(&b)
		case Endorse:
			updatedBounty, err = r.db.EndorseBounty(id)
		case RemoveEndorsement:
			updatedBounty, err = r.db.RemoveEndorseBounty(id)
		default:
			println("other")
		}
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		jsonResponse, err = json.Marshal(updatedBounty)
		if err != nil {
			var mr *malformedRequest
			if errors.As(err, &mr) {
				http.Error(w, mr.msg, mr.status)
			} else {
				log.Println(err.Error())
				http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			}
		}

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}

	if req.Method == http.MethodDelete {
		r.db.DeleteBounty(id)
	}

	w.Write(jsonResponse)
}

// Status - return list of possible statuses
func (r *Router) Status(w http.ResponseWriter, req *http.Request) {
	statusList := r.db.GetStatuses()

	w.Header().Set("Content-Type", "application/json")

	j, _ := json.Marshal(statusList)
	w.Write(j)
}
