const dropInput = document.querySelector('#drop-input');
const dropTable = document.querySelector('#drop-table');

const reader = new FileReader();

dropInput.onchange = (event) => {
    dropTable.innerHTML = '';

    const file = event.target.files[0];

    reader.readAsText(file, 'UTF-8');
}

reader.onload = () => {
    const input = JSON.parse(reader.result);

    processDropInput(input);
}

function processDropInput(input) {
    const ids = Object.keys(input);

    ids.forEach((id) => {
        const drop = input[id];

        const name = drop['name'];
        const quantity = formatNumeric(drop['quantity']);
        const average = formatNumeric(drop['averageValue']);
        const total = formatNumeric(drop['totalValue']);

        const row = createRow([name, quantity, average, total]);

        dropTable.append(row);
    });
}

function createRow(cols) {
    const row = document.createElement('tr');

    cols.forEach((col) => {
        const column = document.createElement('td');
        column.innerHTML = col;

        row.append(column);
    });

    return row;
}

function formatNumeric(value) {
    return value.toLocaleString('en-US', {
        maximumFractionDigits: 0,
    });
}