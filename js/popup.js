import '../css/output.css';

// Show a popup in the corner. 
export function showPopup() {
    // Tailwind classes to be applied to the popup. 
    const classes = [
        'fixed',
        'bottom-5',
        'left-5',
        'p-5',
        'bg-white',
        'text-black',
        'rounded-lg',
        'opacity-0',
        'transition-all',
        'duration-500',
        'font-gentilis',
    ];
    
    // Create the popup element. 
    const popup = document.createElement('div');
    popup.classList.add(...classes);
    popup.innerHTML = `
        <div class="w-full">
            <h1 class="text-xl font-semibold mb-3">Welcome!</h1>
            <p class="mb-4">You can use the mouse and arrow keys to interact with this world.</p>
            <button 
                    class="close-btn text-xl"
            >
                Great!
            </button>
        </div>
    `;

    // Add the popup to the DOM. 
    document.body.appendChild(popup);

    // Fade-in the popup. 
    setTimeout(() => {
        popup.classList.remove('opacity-0');
        popup.classList.add('opacity-100');
    }, 10);

    // Close the popup when the button is clicked. 
    const closeButton = popup.querySelector('.close-btn');
    closeButton.addEventListener('click', () => {
        hidePopup(popup);
    });
}

// Function to hide the popup.
export function hidePopup(popup) {
    popup.classList.remove('opacity-100');
    popup.classList.add('opacity-0');
    setTimeout(() => {
        popup.remove();
    }, 300); // Wait for the hide animation
}