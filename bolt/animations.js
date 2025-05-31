/**
 * Apply smooth entry animation to text
 * @param {HTMLElement} element - The element to animate
 */
export function applyEntryAnimation(element)
{
    element.style.opacity = '0';
    element.style.transform = 'scale(0.95)';

    // Force reflow
    void element.offsetWidth;

    // Apply transition
    element.style.transition = 'opacity 500ms ease, transform 500ms ease';

    // Trigger animation
    setTimeout(() =>
    {
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
    }, 50);
}

/**
 * Apply subtle pulse animation to indicate text size change
 * @param {HTMLElement} element - The element to animate
 */
export function applyTextChangeAnimation(element)
{
    // Remove any existing animation
    element.style.animation = 'none';

    // Force reflow
    void element.offsetWidth;

    // Apply new animation
    element.style.animation = 'textPulse 300ms ease-out';
}

/**
 * Add necessary CSS keyframes to document
 */
export function injectAnimationStyles()
{
    if (!document.getElementById('animation-styles'))
    {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'animation-styles';
        styleSheet.textContent = `
      @keyframes textPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
      }
    `;
        document.head.appendChild(styleSheet);
    }
}