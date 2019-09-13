const remoteURL = "http://localhost:5002"

export default {
    get(id) {
        return fetch(`${remoteURL}/tigJobs/${id}`).then(result => result.json())
    },
    getFriendsmigJobs(id){
        return fetch(`${remoteURL}/tigJobs/?userId=${id}&_sort=date`).then(result => result.json())
    },
    getAll() {
        return fetch(`${remoteURL}/tigJobs?_sort=date`).then(result => result.json())
    },
    delete(id) {
        return fetch(`${remoteURL}/tigJobs/${id}`, {
            method: "DELETE",
        })
            .then(result => result.json())
    },
    post(newJob) {
        return fetch(`${remoteURL}/tigJobs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newJob)
        }).then(data => data.json())
    },
    update(editedJob) {
        return fetch(`${remoteURL}/tigJobs/${editedJob.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedJob)
        }).then(data => data.json());
    }
}