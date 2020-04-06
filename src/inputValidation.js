const rainfallValueRe = /^\d*\.\d\d$/

export function isValidRainfallValue(string) {
    const trimmed = string.trim();
    return trimmed === '' || rainfallValueRe.test(trimmed);
}

function validateInput(textArea) {
    const label = textArea.parentElement;

    if (isValidRainfallValue(textArea.value)) {
        label.classList.remove('rrt-value-warning');
    }
    else {
        label.classList.add('rrt-value-warning');
    }
}

export function initializeInputValidation(mainContainer) {
    mainContainer.addEventListener('change', function(e) {
        const taskTextAreas = mainContainer.querySelectorAll('.task-container textarea.standard-input');
        
        for (const ta of taskTextAreas) {
            if (ta === e.target) {
                validateInput(ta);
                return;
            }
        }
    });
}

