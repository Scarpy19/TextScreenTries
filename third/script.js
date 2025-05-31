const inputText = document.getElementById('input-text');
const textContainer = inputText.parentElement;

// Focus the text element on page load
inputText.focus();

// Function to calculate and set the optimal font size
function updateFontSize()
{
    // Reset font size to measure the text naturally
    inputText.style.fontSize = '16px';

    // Get container dimensions with padding consideration
    const containerWidth = textContainer.clientWidth - 40; // 20px padding on each side
    const containerHeight = textContainer.clientHeight - 40;

    // Get the current text content
    // const text = inputText.textContent || inputText.innerText || 'Type something...';
    const text = inputText.textContent || inputText.innerText;

    // Create a test element to measure text dimensions
    const testElement = document.createElement('div');
    testElement.style.position = 'absolute';
    testElement.style.top = '0'; // Move off-screen for measurement
    testElement.style.visibility = 'hidden';
    testElement.style.whiteSpace = 'pre-wrap';
    testElement.style.overflowWrap = 'break-word';
    testElement.style.lineHeight = '1.2';
    testElement.style.fontFamily = window.getComputedStyle(inputText).fontFamily;
    testElement.textContent = text;
    document.body.appendChild(testElement);

    // Start with a low font size and increase until it doesn't fit
    let fontSize = 16;
    let increment = 1;
    let maxFontSize = 500; // Upper limit to prevent infinite loops
    let minFontSize = 16; // Lower limit for very long text

    while (increment > 0.1 && fontSize < maxFontSize)
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
    inputText.style.fontSize = `${Math.max(fontSize * 0.95, minFontSize)}px`;

    // Clean up
    document.body.removeChild(testElement);
}

// Update font size on text input
inputText.addEventListener('input', updateFontSize);

// Update font size on window resize
window.addEventListener('resize', updateFontSize);

// Update font size when the page loads
updateFontSize();

// Fullscreen functionality
const fullscreenBtn = document.getElementById('fullscreen-btn');
fullscreenBtn.addEventListener('click', function()
{
    const docElm = document.documentElement;
    if (docElm.requestFullscreen)
    {
        docElm.requestFullscreen();
    }
});
document.addEventListener('fullscreenchange', function()
{
    fullscreenBtn.style.display = document.fullscreenElement ? 'none' : '';
});