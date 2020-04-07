function addMouseHandlers(highlighter) {
    let isMoving = false;
    let offsetX = 0;

    const handleMouseMove = (e) => {
        e.preventDefault();

        if (isMoving) {
            highlighter.style.left = event.clientX + offsetX + 'px';
        }
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        highlighter.classList.remove('highlighter-moving');

        isMoving = false;
        offsetX = 0;
    };

    const handleMouseDown = (e) => {
        isMoving = true;
        offsetX = highlighter.offsetLeft - e.clientX;
        highlighter.classList.add('highlighter-moving');

        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);
    };

    highlighter.addEventListener('mousedown', handleMouseDown);
}

export function initializeHighlighter(mainContainer) {
    const classifier = mainContainer.querySelector('.classifier');

    if (classifier) {
        const highlighter = document.createElement('div');
        highlighter.classList.add('highlighter', 'highlighter-vertical');
        classifier.appendChild(highlighter);

        addMouseHandlers(highlighter);
    }
    else {
        console.error('could not find classifier element');
    }

    // return teardown function

    return () => {
        const highlighter = mainContainer.querySelector('.highlighter');
        if (highlighter) {
            highlighter.remove();
        }
    };
}
