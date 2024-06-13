document.addEventListener('DOMContentLoaded', function() {
    fetch('Table_Input.csv')
    .then(response => response.text())
    .then(data => {
        let rows = data.split('\n');
        let table = document.getElementById('table1');
        rows.forEach((row, index) => {
            if (index === 0) { // Assuming first row is headers
                let headerRow = document.createElement('tr');
                row.split(',').forEach(header => {
                    let headerCell = document.createElement('th');
                    headerCell.textContent = header;
                    headerRow.appendChild(headerCell);
                });
                table.appendChild(headerRow);
            } else {
                let dataRow = document.createElement('tr');
                let cells = row.split(',');
                cells.forEach(cell => {
                    let cellElement = document.createElement('td');
                    cellElement.textContent = cell;
                    dataRow.appendChild(cellElement);
                });
                table.appendChild(dataRow);
            }
        });

        // Calculate values
        let values = {};
        rows.slice(1).forEach(row => {
            let [label, value] = row.split(',');
            values[label] = parseFloat(value);
        });

        document.getElementById('alpha').textContent = values['A5'] + values['A20'];
        document.getElementById('beta').textContent = values['A15'] / values['A7'];
        document.getElementById('charlie').textContent = values['A13'] * values['A12'];
    });
});
