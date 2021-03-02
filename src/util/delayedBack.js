export function delayedBack(timeout) {
    setTimeout(() => {
        history.go(-1)
    }, timeout || 1000)
}