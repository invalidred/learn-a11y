var modal        = document.querySelector('.focus-modal');
var modalButton  = document.querySelector('.focus-modal-button');
var modalOverlay = document.querySelector('.focus-modal-overlay');
var cancelButton = document.querySelector('.focus-modal-cancel');

modalButton.addEventListener('click', open);
cancelButton.addEventListener('click', close);

// Get a list of tabbable elements here:
// https://github.com/jkup/focusable
const focusableElementsRaw = modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls], summary')
const focusableElements = [...focusableElementsRaw]
const firstElement = focusableElements[0]
const lastElement = focusableElements[focusableElements.length - 1]

function open() {
  // Show the modal and overlay
  const previouslyActive = document.activeElement
  modal.addEventListener('keydown', trap)
  modal.addEventListener('keydown', closeOnEscacpe)
  modal.style.display = 'block';
  modalOverlay.style.display = 'block';

  function closeOnEscacpe(event) {
    const { key } = event
    if (key === 'Escape') {
      close()
    }
  }

  function trap(event) {
    const { key } = event
    const { activeElement } = document

    if (key !== 'Tab') {
      return
    }

    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault()
      focusableElements[focusableElements.length - 1].focus()
    }

    if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault()
      focusableElements[0].focus()
    }
  }
}

function close() {
  // Hide the modal and overlay
  modal.style.display = 'none';
  modalOverlay.style.display = 'none';
}
