// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function startDownload() {
  const button = document.querySelector('.download-buttons button:nth-child(2)');
  button.classList.add('downloading');
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';

  fetch('.link.conf')
    .then(response => response.text())
    .then(url => {
      window.open(url.trim(), '_blank');
    })
    .catch(error => {
      console.error('Error fetching download link:', error);
      alert('حدث خطأ أثناء محاولة التحميل. يرجى المحاولة مرة أخرى.');
    })
    .finally(() => {
      button.classList.remove('downloading');
      button.innerHTML = '<i class="fas fa-download"></i> تنزيل مباشرة';
    });
}

// Get the popup elements
const popup = document.getElementById('popup');
const popupImg = document.getElementById('popup-img');
const closeBtn = document.querySelector('.close-btn');

// Get navigation buttons
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Add click event to all images
const images = document.querySelectorAll('img');
let currentImageIndex = 0;

// Function to update popup image
function updatePopupImage(index) {
  popupImg.src = images[index].src;
  currentImageIndex = index;
}

// Add navigation functionality
prevBtn.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updatePopupImage(currentImageIndex);
});

nextBtn.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updatePopupImage(currentImageIndex);
});

images.forEach((img, index) => {
  img.addEventListener('click', () => {
    popup.style.display = 'block';
    updatePopupImage(index);
  });
});

// Close popup when close button is clicked
closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Close popup when clicking outside the image
popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.style.display = 'none';
  }
});

document.head.appendChild(style);
