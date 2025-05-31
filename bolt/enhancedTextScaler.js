import
{
    applyTextChangeAnimation,
    injectAnimationStyles
}
from './animations.js';

/**
 * Enhanced text scaler with better performance and animations
 */
export function initEnhancedTextScaler()
{
    const textContent = document.getElementById('text-content');
    const textContainer = document.getElementById('text-container');

    // Setup animations
    injectAnimationStyles();

    // Variables for debouncing
    let resizeTimeout;
    let previousText = '';
    let previousWidth = window.innerWidth;
    let previousHeight = window.innerHeight;

    // Set up event listeners
    textContent.addEventListener('input', debounceTextUpdate);
    window.addEventListener('resize', debounceResize);

    // Initial sizing
    updateTextSize();

    /**
     * Debounce text update events
     */
    function debounceTextUpdate()
    {
        // Only update if text content has changed
        const currentText = textContent.textContent;
        if (currentText !== previousText)
        {
            previousText = currentText;

            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() =>
            {
                updateTextSize();
                applyTextChangeAnimation(textContent);
            }, 100);
        }
    }

    /**
     * Debounce resize events
     */
    function debounceResize()
    {
        // Only update if window dimensions have changed
        if (window.innerWidth !== previousWidth || window.innerHeight !== previousHeight)
        {
            previousWidth = window.innerWidth;
            previousHeight = window.innerHeight;

            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() =>
            {
                updateTextSize();
            }, 100);
        }
    }

    /**
     * Update the text size to fit the container with improved algorithm
     */
    function updateTextSize()
    {
        // If empty content, no need to calculate
        if (!textContent.textContent.trim())
        {
            textContent.style.fontSize = '100px';
            return;
        }

        // Use more efficient font size calculation
        const optimalSize = calculateOptimalFontSize(10, 500, 8);
        textContent.style.fontSize = `${optimalSize}px`;
    }

    /**
     * Calculate optimal font size using binary search with a limited number of iterations
     * @param {number} min - Minimum font size
     * @param {number} max - Maximum font size
     * @param {number} iterations - Maximum number of iterations
     * @returns {number} - Optimal font size
     */
    function calculateOptimalFontSize(min, max, iterations)
    {
        let currentMin = min;
        let currentMax = max;

        for (let i = 0; i < iterations; i++)
        {
            const mid = Math.floor((currentMin + currentMax) / 2);
            textContent.style.fontSize = `${mid}px`;

            if (isTextOverflowing())
            {
                currentMax = mid;
            }
            else
            {
                currentMin = mid;
            }

            // If we're down to a difference of 1px, we're done
            if (currentMax - currentMin <= 1)
            {
                break;
            }
        }

        // Apply a safety factor to ensure text fits
        return Math.floor(currentMin * 0.95);
    }

    /**
     * Check if text is overflowing with improved accuracy
     * @returns {boolean} - True if overflowing
     */
    function isTextOverflowing()
    {
        // Account for potential margin/padding
        const containerWidth = textContainer.clientWidth;
        const containerHeight = textContainer.clientHeight;

        // Check both scrollWidth/Height and offsetWidth/Height for accuracy
        return (
            textContent.scrollWidth > containerWidth ||
            textContent.scrollHeight > containerHeight ||
            textContent.offsetWidth > containerWidth ||
            textContent.offsetHeight > containerHeight
        );
    }
}