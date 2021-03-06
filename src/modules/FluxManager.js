const remoteURL = "http://localhost:5002"

export default {
    get(id) {
        return fetch(`${remoteURL}/fluxJobs/${id}`).then(result => result.json())
    },
    getUsersFluxJobs(id){
        return fetch(`${remoteURL}/fluxJobs/?userId=${id}&_sort=date`).then(result => result.json())
    },
    getAll() {
        return fetch(`${remoteURL}/fluxJobs?_sort=date`).then(result => result.json())
    },
    delete(id) {
        return fetch(`${remoteURL}/fluxJobs/${id}`, {
            method: "DELETE",
        })
            .then(result => result.json())
    },
    post(newJob) {
        return fetch(`${remoteURL}/fluxJobs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newJob)
        }).then(data => data.json())
    },
    update(editedJob) {
        return fetch(`${remoteURL}/fluxJobs/${editedJob.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedJob)
        }).then(data => data.json());
    }
}