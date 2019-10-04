downloadForm = document.querySelector('#download-csv-form');
fileInput = downloadForm.querySelector('#csv-file');

const upload = (file) => {
    fetch(`${window.location.origin}/api/download/`, {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: file
    }).then(
        response => response.json()
    ).then(
        success => console.log(success)
    ).catch(
        error => console.log(error)
    );
};

downloadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    upload(fileInput.files[0])
});
