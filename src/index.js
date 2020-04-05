import {initializeTotalCalculator} from './totalRainfall';
import {initializeKeyBindings} from './keyBindings';
import {startsWith} from './utils';

function isRainfallTask(questions) {
    // check if questions are from a rainfall task
    const text = questions[0].textContent;

    return startsWith(text, 'Please enter the rainfall amounts for');
}

/*
 * Initialize page
*/

// grab top-level container that is present on page-load

const mainContainer = document.getElementById('panoptes-main-container');

// add key bindings

initializeKeyBindings(mainContainer);

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
