document.addEventListener('DOMContentLoaded', () =>
{
    const scalingText = document.getElementById('scaling-text');
    const textContainer = document.getElementById('text-container');

    // Focus the text element on page load
    scalingText.focus();

    // Function to calculate and set the optimal font size
    function updateFontSize()
    {
        // Reset font size to measure the text naturally
        scalingText.style.fontSize = '16px';

        // Get container dimensions with padding consideration
        const containerWidth = textContainer.clientWidth - 40; // 20px padding on each side
        const containerHeight = textContainer.clientHeight - 40;

        // Get the current text content
        const text = scalingText.textContent || scalingText.innerText || 'Type something...';

        // Create a test element to measure text dimensions
        const testElement = document.createElement('div');
        testElement.style.position = 'absolute';
        testElement.style.visibility = 'hidden';
        testElement.style.whiteSpace = 'pre-wrap';
        // testElement.style.wordWrap = 'break-word';
        testElement.style.lineHeight = '1.2';
        testElement.style.fontFamily = window.getComputedStyle(scalingText).fontFamily;
        testElement.textContent = text;
        document.body.appendChild(testElement);

        // Start with a low font size and increase until it doesn't fit
        let fontSize = 16;
        let increment = 16;
        let maxFontSize = 500; // Upper limit to prevent infinite loops
        let minFontSize = 16; // Lower limit for very long text

        while (increment > 0.5 && fontSize < maxFontSize)
        {
            fontSize += increment;
            testElement.style.fontSize = `${fontSize}px`;

            // Check if the test element fits within the container
            if (testElement.offsetWidth > containerWidth || testElement.offsetHeight > containerHeight)
            {
                fontSize -= increment;
                increment /= 2;
            }
        }

        // Apply the calculated font size with a slight reduction to ensure it fits
        scalingText.style.fontSize = `${Math.max(fontSize * 0.95, minFontSize)}px`;

        // Clean up
        document.body.removeChild(testElement);
    }

    // Update font size on text input
    scalingText.addEventListener('input', updateFontSize);

    // Update font size on window resize
    window.addEventListener('resize', updateFontSize);

    // Update font size when the page loads
    updateFontSize();

    // Keep focus on the text element
    document.addEventListener('click', (e) =>
    {
        if (e.target !== scalingText)
        {
            scalingText.focus();

            // Place cursor at the end of text
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(scalingText);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);

            e.preventDefault();
        }
    });
});