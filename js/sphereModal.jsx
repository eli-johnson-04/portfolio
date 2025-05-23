import Modal from 'react-modal';
import { gsap } from 'gsap';
import '../css/output.css';
import '../css/SphereModal.css'

// Set the modal's app element.
Modal.setAppElement('#root');

const SphereModal = ({ isOpen, onRequestClose, label, content }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => {
                // Fade-out animations.
                gsap.to('.ReactModal__Content', { opacity: 0, duration: 0.2, ease: 'easeOut' });
                gsap.to('.ReactModal__Overlay', { opacity: 0, duration: 0.2, ease: 'easeIn' });
                // Only close the modal when the animation completes.
                setTimeout(() => {onRequestClose(); }, 200);
            }}
            onAfterOpen={() => {
                // Fade-in animations.
                gsap.to('.ReactModal__Content', { opacity: 1, duration: 0.2, ease: 'easeOut' });
                gsap.to('.ReactModal__Overlay', { opacity: 1, duration: 0.2, ease: 'easeIn' });
            }}
            overlayClassName="sphere-modal-overlay"
            shouldCloseOnOverlayClick={true}
            className="sphere-modal-content"
            contentLabel={label}
        >
            <div className="flex items-center w-full pb-2">
                <span className="ml-4 mt-2 flex-grow font-gentilis font-medium text-5xl text-neutral-900 pb-1 truncate select-none">
                    {label}
                </span>
                <button 
                    className="ml-4 close-btn"
                    onClick={() => {
                        // Start the fade-out before closing the modal.
                        gsap.to('.ReactModal__Content', { opacity: 0, duration: 0.2, ease: 'easeOut' });
                        gsap.to('.ReactModal__Overlay', { opacity: 0, duration: 0.2, ease: 'easeIn'  });
                        // Delay the closing until the animations complete.
                        setTimeout(() => onRequestClose(), 200);
                    }}
                >
                    Close
                </button>
            </div>
            <div className="w-full overflow-y-auto rounded-lg p-0 flex-grow scrollbar-thin scrollbar-webkit">
                {content}
            </div>
        </Modal>
    );
};

export default SphereModal;