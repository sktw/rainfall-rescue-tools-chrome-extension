import {initializeTotalCalculator} from './totalRainfall';
import {initializeKeyBindings} from './keyBindings';
import {initializeHighlighter} from './highlighter';
import {initializeInputValidation} from './inputValidation';
import {startsWith} from './utils';

function isRainfallTask(questions) {
    // check if questions are from a rainfall task
    const text = questions[0].textContent;

    return startsWith(text, 'Which year on this sheet ends in');
}

function isSingleRainfallTask(questions) {
    // check if task has all questions on single page, or whether they are
    // split between two pages with a 'Next' button between
    
    return questions.length === 14; // year plus 12 months plus total
}

// add namespacing class to the main container

function initializeStyles(mainContainer) {
    mainContainer.classList.add('rainfall-rescue-tools');

    // return teardown function

    return () => {
        mainContainer.classList.remove('rainfall-rescue-tools');
    }
}

// grab top-level container that is present on page-load

const mainContainer = document.getElementById('panoptes-main-container');

// functions to register callbacks for removing handlers etc

let pageInititialized = false;
let teardownCallbacks = [];

function register(callback) {
    teardownCallbacks.push(callback);
}

function teardownClassifyPage() {
    console.log('teardown page');
    for (const cb of teardownCallbacks) {
        cb();
    }

    teardownCallbacks = [];
    pageInititialized = false;
}

// add appropriate tools depending on whether this is a rainfall task 
// (single or split) or a locations task

function initializeClassifyPage() {
    const taskContainer = mainContainer.querySelector('.task-container');

    if (taskContainer) {
        const questions = taskContainer.querySelectorAll('.question');
        if (questions) {
            console.log('initialize page');
            pageInititialized = true;

            register(initializeStyles(mainContainer));
            register(initializeKeyBindings(mainContainer));

            if (isRainfallTask(questions)) {
                register(initializeHighlighter(mainContainer));
                register(initializeInputValidation(mainContainer));

                if (isSingleRainfallTask(questions)) {
                    console.log('single rainfall task');
                    register(initializeTotalCalculator(mainContainer));
                }
                else {
                    console.log('split rainfall task');
                }
            }
            else {
                console.log('locations task');
            }
        }
    }
}

/*
 * Extension content is only injected into the page when the user navigates
 * directly to the classify page.
 *
 * Since Zooniverse is implemented as a single-page app, clicking an internal
 * link to another Zooniverse page does not unload the content, even though the
 * icon in the toolbar shows the extension to be inactive.
 *
 * Use a mutation observer to watch for changes in the structure of the page.
 *
 * If the pathname indicates that this is the classify page and the extension
 * features have not been added (pageInitialized === false), initialize the
 * page.
 *
 * If the pathname indicates that this is not the classify page and extension
 * features have been added (pageInititialized === true), remove features from
 * the page.
*/

const classifyPagePath = '/projects/edh/rainfall-rescue/classify';

if (MutationObserver) {

    const observer = new MutationObserver(() => {
        if (!pageInititialized && window.location.pathname === classifyPagePath) {
            initializeClassifyPage();
        }
        else if (pageInititialized && window.location.pathname !== classifyPagePath) {
            teardownClassifyPage();
        }
    });

    observer.observe(mainContainer, {
        childList: true,
        subtree: true,
        characterData: false
    });
}
else {
    console.error('MutationObserver not available');
}
