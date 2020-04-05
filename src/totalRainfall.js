import {startsWith} from './utils';

function parseRainfallValue(string) {
    const floatValue = parseFloat(string);

    if (isNaN(floatValue)) {
        return 0;
    }
    else {
        return floatValue;
    }
}

function getRainfallTotal(taskTextAreas) { 
    let total = 0;

    // iterate over all textareas except the last
    // the last textarea is the entered total from the sheet

    for (let i = 0; i < taskTextAreas.length - 1; i++) {
        total += parseRainfallValue(taskTextAreas[i].value);
    }

    return total;
}

function getRainfallTotalLabel(label, total) {
    const prefix = label.split(' (')[0];
    return prefix + ' (calculated: ' + total.toFixed(2) + ')';
}

function showRainfallTotal(totalLabel, total) {
    const text = totalLabel.textContent;

    if (startsWith(text, 'Total for')) { // double check that this is a rainfall task
        totalLabel.textContent = getRainfallTotalLabel(text, total);
    }
}

export function initializeTotalCalculator(mainContainer) {
    /* add calculated total to rainfall total label
     * calculated total updates after each textarea's change event fires
     * when the user clicks done, the task is re-rendered for the next 
     * subject so no need to clear the old total
    */

    mainContainer.addEventListener('change', function() {
        const taskTextAreas = mainContainer.querySelectorAll('.task-container textarea.standard-input');
        const total = getRainfallTotal(taskTextAreas);

        const taskLabels =  mainContainer.querySelectorAll('.task-container .question strong');
        const totalLabel = taskLabels[taskLabels.length - 1];

        showRainfallTotal(totalLabel, total);
    });
}
