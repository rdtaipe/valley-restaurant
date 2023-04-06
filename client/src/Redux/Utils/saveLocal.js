// save local storage
export const saveLocal = (key,v) => {
    try {
        const data = JSON.stringify(v)
        localStorage.setItem(key, data)
    } catch (e) {
        console.log(e)
    }
}
export const getLocal = (key) => {
    try {
        const data = localStorage.getItem(key)
        return JSON.parse(data)
    } catch (e) {
        console.log(e)
    }
}

//save cookien for 24 hours
export const saveCookie = (key,v) => {
    try {
        const data = JSON.stringify(v)
        document.cookie = `${key}=${data};max-age=86400`
    } catch (e) {
        console.log(e)
    }
}
export const getCookie = (key) => {
    try {
        const data = document.cookie.split(';').find(c => c.trim().startsWith(`${key}=`))
        return JSON.parse(data.split('=')[1])
    } catch (e) {
        console.log(e)
    }
}