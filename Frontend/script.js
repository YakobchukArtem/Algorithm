document.getElementById('okButton').removeEventListener('click', sendDataToServer);

document.getElementById('okButton').addEventListener('click', function() {
    var tableData = getTableData();
    sendDataToServer(tableData);
});

function createTable() {
    var rows = document.getElementById('rows').value;
    var columns = document.getElementById('columns').value;
    var table = document.getElementById('table');

    table.innerHTML = '';
    
    for (var i = 0; i < rows; i++) {
        var row = document.createElement('div');
        row.classList.add('row');
        for (var j = 0; j < columns; j++) {
            var cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.column = j;
            cell.addEventListener('click', toggleCell);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    selectAllCells(); 
}

function toggleCell() {
    this.classList.toggle('selected');
}

function selectAllCells() {
    var cells = document.querySelectorAll('.cell');
    cells.forEach(function(cell) {
        cell.classList.add('selected');
    });
}

function getTableData() {
    var rows = document.getElementById('rows').value;
    var columns = document.getElementById('columns').value;
    var tableData = [];

    for (var i = 0; i < rows; i++) {
        var rowData = [];
        for (var j = 0; j < columns; j++) {
            var cell = document.querySelector('.cell[data-row="' + i + '"][data-column="' + j + '"]');
            if (cell.classList.contains('selected')) {
                rowData.push(1);
            } else {
                rowData.push(0); 
            }
        }
        tableData.push(rowData);
    }
    return tableData;
}

document.addEventListener('DOMContentLoaded', createTable);
document.getElementById('rows').addEventListener('input', createTable);
document.getElementById('columns').addEventListener('input', createTable);

function sendDataToServer(data) {
    var formattedData = {
        nodes: data
    };
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://localhost:7027/api/Graph', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var responseNumber = parseInt(xhr.responseText);
                displayResponse(responseNumber); 
            } else {
                console.error('Something went');
            }
        }
    };
    xhr.send(JSON.stringify(formattedData));
}

function displayResponse(number) {
    var responseContainer = document.getElementById('responseContainer');
    responseContainer.innerHTML = '';
    var responseElement = document.createElement('div');
    responseElement.textContent = number;
    responseElement.style.fontSize = '24px'; 
    responseElement.style.fontWeight = 'bold'; 
    responseContainer.appendChild(responseElement); 
}