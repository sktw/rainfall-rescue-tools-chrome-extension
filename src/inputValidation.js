const rainfallValueRe = /^\d*\.\d\d$/

export function isValidRainfallValue(string) {
    const trimmed = string.trim();
    return trimmed === '' || rainfallValueRe.test(trimmed);
}

function validateInput(textArea) {
    const label = textArea.parentElement;

    if (isValidRainfallValue(textArea.value)) {
        label.classList.remove('value-warning');
    }
    else {
        label.classList.add('value-warning');
    }
}

export function initializeInputValidation(mainContainer) {
    const handleChange = (e) => {
        const taskTextAreas = mainContainer.querySelectorAll('.task-container textarea.standard-input');

        // first text area is year - don't validate
        
        for (let i = 1; i < taskTextAreas.length; i++) {
            const ta = taskTextAreas[i];

            if (ta === e.target) {
                validateInput(ta);
                return;
            }
        }
    };
    
    mainContainer.addEventListener('change', handleChange);

    return () => {
        mainContainer.removeEventListener('change', handleChange);
    }
}
