const remoteURL = "http://localhost:5002"

export default {
    get(id) {
        return fetch(`${remoteURL}/migJobs/${id}`).then(result => result.json())
    },
    getUsersMigJobs(id){
        return fetch(`${remoteURL}/migJobs/?userId=${id}&_sort=date`).then(result => result.json())
    },
    getAll() {
        return fetch(`${remoteURL}/migJobs?_sort=date`).then(result => result.json())
    },
    delete(id) {
        return fetch(`${remoteURL}/migJobs/${id}`, {
            method: "DELETE",
        })
            .then(result => result.json())
    },
    post(newJob) {
        return fetch(`${remoteURL}/migJobs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newJob)
        }).then(data => data.json())
    },
    update(editedJob) {
        return fetch(`${remoteURL}/migJobs/${editedJob.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedJob)
        }).then(data => data.json());
    }
}