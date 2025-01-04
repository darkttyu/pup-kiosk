// JavaScript to handle location clicks and fetch data
document.querySelectorAll('area').forEach(area => {
  area.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action (navigation)

    // Fetch the data-file from the clicked area
    const filePath = area.getAttribute('data-file');
    
    // Fetch the content from the file
    fetch(filePath)
      .then(response => response.text())
      .then(data => {
        // Display the fetched content inside the modal
        document.getElementById('modalContent').innerHTML = data;
        document.getElementById('infoModal').style.display = 'block';
      })
      .catch(error => {
        console.error('Error fetching content:', error);
      });
  });
});

// Close the modal when the close button is clicked
document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('infoModal').style.display = 'none';
});