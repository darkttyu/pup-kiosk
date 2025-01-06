const areas = document.querySelectorAll("area");
const modal = document.getElementById("infoModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

// Flag to track modal interaction
let isMouseOverModal = false;

// Function to load location information
const showLocationInfo = async (file) => {
  try {
    const response = await fetch(file);
    if (response.ok) {
      const content = await response.text();
      modalContent.innerHTML = content;
      modal.style.display = "block";
    } else {
      modalContent.innerHTML = `<p>Error loading location content.</p>`;
    }
  } catch (error) {
    console.error("Error loading file:", error);
    modalContent.innerHTML = `<p>Error loading locaiton content.</p>`;
  }
};

// Show modal on hover
areas.forEach((area) => {
  area.addEventListener("mouseover", () => {
    const file = area.dataset.file;
    if (file) {
      showLocationInfo(file);
    }
  });

  // Use a delay to avoid instant disappearance
  area.addEventListener("mouseout", () => {
    setTimeout(() => {
      if (!isMouseOverModal) {
        modal.style.display = "none";
        modalContent.innerHTML = "";
      }
    }, 100);
  });
});

// Prevent modal from closing when hovered
modal.addEventListener("mouseover", () => {
  isMouseOverModal = true;
});

modal.addEventListener("mouseout", () => {
  isMouseOverModal = false;

  // Use a delay to ensure smoother user interaction
  setTimeout(() => {
    if (!modal.matches(":hover")) {
      modal.style.display = "none";
      modalContent.innerHTML = "";
    }
  }, 100);
});

// Close modal when clicking the close button
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  modalContent.innerHTML = "";
});
