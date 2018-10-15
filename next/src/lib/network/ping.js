const ping = () => {
  return new Promise(resolve => {
    const isOnline = () => resolve(true)
    const isOffline = () => resolve(false)

    const xhr = new window.XMLHttpRequest()

    xhr.onerror = isOffline
    xhr.ontimeout = isOffline
    xhr.onload = () => {
      const response = xhr.responseText.trim()
      if (!response) {
        isOffline()
      }
      else {
        isOnline()
      }
    }

    xhr.open('GET', 'https://ipv4.icanhazip.com/')
    xhr.timeout = 500
    xhr.send()
  })
}

export default ping
