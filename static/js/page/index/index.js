// Форма загрузки CSV
const downloadCsvForm = document.querySelector('#download-csv');
const fileInputCsv = downloadCsvForm.querySelector('#csv-file');

// Форма получения JSON
const getJsonForm = document.querySelector('#get-json');

// Инфо блок
const infoBlock = document.querySelector('#info-block #info');


/**
 * Обработка загрузки CSV.
 */
downloadCsvForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  fetch(`${window.location.origin}/api/download-csv/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: fileInputCsv.files[0],
  })
    .then((response) => response.json())
    .then((success) => infoBlock.innerText = success.msg)
    .catch((err) => console.log(err.message));
});

/**
 * Обработка получения JSON.
 */
getJsonForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  fetch(`${window.location.origin}/api/get-json/`, { method: 'GET' })
    .then((response) => response.json())
    .then((success) => infoBlock.innerText = JSON.stringify(success))
    .catch((err) => console.log(err.message()));
});
