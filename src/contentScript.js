function startsWith(string, prefix) {
    return string.lastIndexOf(prefix, 0) === 0;
}

function isRainfallTask(questions) {
    // check if questions are from a rainfall task
    const text = questions[0].textContent;

    return startsWith(text, 'Please enter the rainfall amounts for');
}

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

function initializeTotalCalculator(mainContainer) {
    /* add calculated total to rainfall total label
     * calculated total updates after each textarea's change event fires
     * when the user clicks done, the task is re-rendered for the next 
     * subject so no need to clear the old total
    */

    mainContainer.addEventListener('change', function(e) {
        const taskTextAreas = mainContainer.querySelectorAll('.task-container textarea.standard-input');
        const total = getRainfallTotal(taskTextAreas);

        const taskLabels =  mainContainer.querySelectorAll('.task-container .question strong');
        const totalLabel = taskLabels[taskLabels.length - 1];

        showRainfallTotal(totalLabel, total);
    });
}


// grab top-level container that is present on page-load

const mainContainer = document.getElementById('panoptes-main-container');

/*
 * Before adding the rainfall tools, need to check that this is a rainfall
 * task rather than a locations task. Since the task loads asynchronously,
 * use a mutation observer to watch for the task container element to be added.
*/

if (MutationObserver) {

    const observer = new MutationObserver(function() {
        const taskContainer = document.getElementsByClassName('task-container')[0];

        if (taskContainer) {
            const questions = taskContainer.getElementsByClassName('question');
            if (questions) {
                if (isRainfallTask(questions)) {
                    console.log('rainfall task - adding total calculator');
                    initializeTotalCalculator(mainContainer);
                }
                else {
                    console.log('locations task');
                }

                observer.disconnect();
            }
        }
    });

    observer.observe(mainContainer, {
        childList: true,
        subtree: true
    });
}
else {
    console.error('MutationObserver not available');
}
