import '../css/output.css';

// Function to get the full popup content.
const popupContent = 
    `
        <div class="w-full">
            <h1 class="text-xl font-semibold mb-3 select-none">Welcome! (DEVELOPMENT BUILD)</h1>
            <p class="mb-4 select-none">Press and drag to pan around.</p>
            <button 
                    class="close-btn text-xl"
            >
                Great!
            </button>
        </div>
    `;

// Function to get the minimized popup content.
const minimizedPopupContent =
    `
        <button class="help-icon close-btn text-xl w-10 h-10 bg-gray-200 text-black flex items-center justify-center rounded-full cursor-pointer">
            ?
        </button>
    `;

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
    popup.innerHTML = popupContent;

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
        minimizePopup(popup);
    });
}

// Function to hide the popup.
export function hidePopup(popup) {
    minimizePopup(popup); // Minimize instead of removing
    popup.style.display = 'block';
}

// Function to minimize the popup to a small help icon.
function minimizePopup(popup) {
    popup.innerHTML = minimizedPopupContent;
    popup.classList.remove('p-5', 'text-black', 'bg-white', 'rounded-lg');
    popup.classList.add('w-12', 'h-12', 'flex', 'items-center', 'justify-center');
    popup.style.display = 'block';
    popup.style.opacity = '1';

    const helpIcon = popup.querySelector('.help-icon');
    helpIcon.addEventListener('click', () => {
        restorePopup(popup);
    });
}

// Function to restore the popup to its full size.
function restorePopup(popup) {
    popup.classList.remove('w-12', 'h-12', 'flex', 'items-center', 'justify-center');
    popup.classList.add('p-5', 'text-black', 'bg-white', 'rounded-lg');
    popup.innerHTML = popupContent; // Restore the original content

    const closeButton = popup.querySelector('.close-btn');
    closeButton.addEventListener('click', () => {
        minimizePopup(popup);
    });
}