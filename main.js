const form = document.getElementById("urlForm")
const urlInput = document.getElementById("urlInput")
const formBtn = document.querySelector("form button")
let loading = false, fetch_error = false, data;
/* Event listeners */

form.addEventListener('submit', (e) => {
    e.preventDefault()
    // formBtn.setAttribute("disabled", true)
    getData(urlInput.value)
    urlInput.value = ''
})

// function definitions
function getData(url) {
    if (navigator.onLine) {
        try {
            fetch(url)
                .then(res => res.json())
                .then(result => convertToFile(result))
            formBtn.removeAttribute("disabled")
        } catch (error) {
            fetch_error = true
            alert("there is something wrong ")
        } finally {
            formBtn.removeAttribute("disabled")
        }
    } else {
        alert("Looks like your internet connection is turned off, turn it on amd then try again")
    }
}


// function is responsible for converting the received data into a file 
function convertToFile(data) {
    // asking user to set the file name 
    const user_fileName = prompt("Enter file name: ")

    // creating a new file with received data and user defined file naming
    const newFile = new File([JSON.stringify(data)], `${user_fileName.trim().split(".")[0]}.json`, { type: "application/json" })

    // creating a new invisible anchor tag to inject download url into it 
    const fileLinkEl = document.createElement('a')
    fileLinkEl.href = URL.createObjectURL(newFile)
    fileLinkEl.download = newFile.name
    document.body.appendChild(fileLinkEl)

    // finally clicking on the invisible url to download the file on the users system
    fileLinkEl.click()

    // lastly, removing the download url from the DOM
    fileLinkEl.remove()
}