export function delayedRefresh(timeout) {
    setTimeout(() => {
        location.reload()
    }, timeout || 1000)
}