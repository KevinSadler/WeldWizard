const remoteURL = "http://localhost:5002"

export default {
    get(id) {
        return fetch(`${remoteURL}/stickJobs/${id}`).then(result => result.json())
    },
    getUsersStickJobs(id){
        return fetch(`${remoteURL}/stickJobs/?userId=${id}&_sort=date`).then(result => result.json())
    },
    getAll() {
        return fetch(`${remoteURL}/stickJobs?_sort=date`).then(result => result.json())
    },
    delete(id) {
        return fetch(`${remoteURL}/stickJobs/${id}`, {
            method: "DELETE",
        })
            .then(result => result.json())
    },
    post(newJob) {
        return fetch(`${remoteURL}/stickJobs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newJob)
        }).then(data => data.json())
    },
    update(editedJob) {
        return fetch(`${remoteURL}/stickJobs/${editedJob.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedJob)
        }).then(data => data.json());
    }
}