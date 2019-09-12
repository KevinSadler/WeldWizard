const remoteURL = "http://localhost:5002"

export default {
    get(id) {
        return fetch(`${remoteURL}/users/${id}`).then(result => result.json())
    },
    getOneEntry(id, path) {
        return fetch(`${remoteURL}/${path}/${id}`)
            .then(e => e.json())
    },
    getAll() {
        return fetch(`${remoteURL}/users`).then(result => result.json())
    },
    post(newUser) {
        return fetch(`${remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        }).then(data => data.json())
    },
    deleteItem(path, id) {
        return fetch(`${remoteURL}/${path}/${id}`, {
            method: "DELETE"
        })
    },
    postItem(path, object) {
        return fetch(`${remoteURL}/${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        }).then(data => data.json())
    },
}