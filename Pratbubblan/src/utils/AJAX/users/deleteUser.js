export async function deleteUser(obj) {
    const baseUrl = `/api/auth/delete-user/${obj.uuid}`

    // console.log('OBEJTKT : ', obj)

    let options = {
        method: 'DELETE',
        headers: {"Content-Type": "application/json", "authorization": obj.token}
    }

    document.cookie = "user_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

    await fetch(baseUrl, options)
}