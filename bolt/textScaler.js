/**
 * Initialize the text scaler functionality
 */
export function initTextScaler()
{
    const textContent = document.getElementById('text-content');
    const textContainer = document.getElementById('text-container');

    // Initial placeholder text
    const defaultText = '';
    textContent.textContent = defaultText;

    // Set up event listeners
    textContent.addEventListener('input', updateTextSize);
    window.addEventListener('resize', updateTextSize);

    // Initial sizing
    updateTextSize();

    /**
     * Update the text size to fit the container
     */
    function updateTextSize()
    {
        // Reset font size to recalculate
        textContent.style.fontSize = '100px';

        // Start the binary search to find the optimal font size
        const maxSize = binarySearchFontSize(10, 500);

        // Apply the calculated font size with a slight reduction for safety
        textContent.style.fontSize = `${Math.floor(maxSize * 0.95)}px`;
    }

    /**
     * Binary search to find the optimal font size
     * @param {number} min - Minimum font size to try
     * @param {number} max - Maximum font size to try
     * @returns {number} - The optimal font size
     */
    function binarySearchFontSize(min, max)
    {
        // Base case for recursion
        if (max - min <= 1)
        {
            return min;
        }

        const mid = Math.floor((min + max) / 2);
        textContent.style.fontSize = `${mid}px`;

        // Check if the text fits within the container
        if (isTextOverflowing())
        {
            return binarySearchFontSize(min, mid);
        }
        else
        {
            return binarySearchFontSize(mid, max);
        }
    }

    /**
     * Check if the text is overflowing its container
     * @returns {boolean} - True if overflowing, false otherwise
     */
    function isTextOverflowing()
    {
        return (
            textContent.scrollWidth > textContainer.clientWidth ||
            textContent.scrollHeight > textContainer.clientHeight
        );
    }
}