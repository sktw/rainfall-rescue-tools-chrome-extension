// https://gist.github.com/IgnoredAmbience/800b38847f881d5592e2148fbc3d4bda

export function initializeKeyBindings(mainContainer) {
    mainContainer.addEventListener('keydown', function(e) {

        const active = document.activeElement;
        const textareas = mainContainer.querySelectorAll('textarea');
        const button = mainContainer.querySelector('.task-nav > span > button');

        if (e.key == 'Enter' && active && active.nodeName == 'TEXTAREA') {
            e.preventDefault();
            let activateNext = false;

            // find active textarea, and move focus to the next one

            for (const ta of textareas) {
                if (activateNext) {
                    ta.focus();
                    return;
                }
                if (ta === active) {
                    activateNext = true;
                }
            }

            // active was last textarea, so instead move to first button

            if (button) {
                button.focus();
            } 
            else {
                console.error('no element to move to');
            }
        }
    });
}
