// Listen for the DOM to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', function () {

    // Fetch the CSV file from the server
    fetch('Table_Input.csv')
    .then(response => response.text())  // Extract the text from the response
    .then(data => {
        let rows = data.split('\n');  // Split the CSV text into an array of rows
        
        // Get the table element from the document
        let table = document.getElementById('table1');
        // Iterate over each row in the CSV data
        rows.forEach((row, index) => {
            
            // Check if the current row is the header
            if (index === 0) {
                // Create a table row for the headers
                let headerRow = document.createElement('tr');
                // Split the header row into individual headers
                row.split(',').forEach(header => {
                    // Create a table header cell for each header
                    let headerCell = document.createElement('th');
                    headerCell.textContent = header;  // Set the text of the header cell
                    headerRow.appendChild(headerCell);  // Add the header cell to the header row
                });
                table.appendChild(headerRow);  // Add the header row to the table
            } else {
                // Create a table row for the data
                let dataRow = document.createElement('tr');
                // Split the data row into individual cells
                let cells = row.split(',');
                cells.forEach(cell => {
                    // Create a table data cell for each piece of data
                    let cellElement = document.createElement('td');
                    cellElement.textContent = cell;  // Set the text of the data cell
                    dataRow.appendChild(cellElement);  // Add the data cell to the data row
                });
                table.appendChild(dataRow);  // Add the data row to the table
            }
        });

        // Calculate values from the data
        let values = {};
        // Process each row starting from the second row (skipping the header)
        rows.slice(1).forEach(row => {
            let [label, value] = row.split(',');  // Split the row into label and value
            values[label] = parseFloat(value);  // Convert the value to a float and store it in an object
        });

        // Display the calculated values in specific elements
        document.getElementById('alpha').textContent = values['A5'] + values['A20'];
        document.getElementById('beta').textContent = values['A15'] / values['A7'];
        document.getElementById('charlie').textContent = values['A13'] * values['A12'];
    });
});
