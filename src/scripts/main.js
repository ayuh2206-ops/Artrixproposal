/**
 * Artrix × Vero Media - Slide Navigation System
 */

class SlidePresentation {
  constructor() {
    this.currentSlide = 1;
    this.totalSlides = 13;
    this.isAnimating = false;
    this.animationDuration = 1000;
    
    this.indicator = document.getElementById('slide-indicator');
    this.slides = document.querySelectorAll('.slide');
    this.btnPrev = document.getElementById('btn-prev');
    this.btnNext = document.getElementById('btn-next');
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateSlides();
    this.preloadImages();
    this.setupTouchEvents();
  }

  bindEvents() {
    // Button navigation
    this.btnPrev?.addEventListener('click', () => this.prev());
    this.btnNext?.addEventListener('click', () => this.next());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeydown(e));

    // Prevent context menu on long press (mobile)
    document.addEventListener('contextmenu', (e) => {
      if (e.target.closest('.nav-controls')) return;
      e.preventDefault();
    });
  }

  handleKeydown(e) {
    switch(e.key) {
      case 'ArrowRight':
      case ' ':
      case 'Enter':
        e.preventDefault();
        this.next();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.prev();
        break;
      case 'Home':
        e.preventDefault();
        this.goTo(1);
        break;
      case 'End':
        e.preventDefault();
        this.goTo(this.totalSlides);
        break;
      default:
        // Number keys 1-9 for quick navigation
        if (e.key >= '1' && e.key <= '9') {
          const slideNum = parseInt(e.key);
          if (slideNum <= this.totalSlides) {
            this.goTo(slideNum);
          }
        }
    }
  }

  setupTouchEvents() {
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
          this.prev();
        } else {
          this.next();
        }
      }
    }, { passive: true });
  }

  next() {
    if (this.isAnimating || this.currentSlide >= this.totalSlides) return;
    this.currentSlide++;
    this.updateSlides();
  }

  prev() {
    if (this.isAnimating || this.currentSlide <= 1) return;
    this.currentSlide--;
    this.updateSlides();
  }

  goTo(slideNum) {
    if (this.isAnimating || slideNum === this.currentSlide) return;
    if (slideNum < 1 || slideNum > this.totalSlides) return;
    this.currentSlide = slideNum;
    this.updateSlides();
  }

  updateSlides() {
    this.isAnimating = true;

    this.slides.forEach(slide => {
      const idx = parseInt(slide.dataset.index);
      slide.classList.remove('active');
      
      if (idx === this.currentSlide) {
        slide.classList.add('active');
      }
    });

    // Update indicator
    if (this.indicator) {
      this.indicator.innerHTML = `${this.currentSlide.toString().padStart(2, '0')}<span class="text-sm opacity-50 font-normal mx-2">/</span>${this.totalSlides}`;
    }

    // Update button states
    this.btnPrev?.classList.toggle('opacity-30', this.currentSlide === 1);
    this.btnPrev?.classList.toggle('pointer-events-none', this.currentSlide === 1);
    this.btnNext?.classList.toggle('opacity-30', this.currentSlide === this.totalSlides);
    this.btnNext?.classList.toggle('pointer-events-none', this.currentSlide === this.totalSlides);

    // Reset animation lock
    setTimeout(() => {
      this.isAnimating = false;
    }, this.animationDuration);
  }

  preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }

    // Preload all slide background images
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
      if (img.src) {
        const preload = new Image();
        preload.src = img.src;
      }
    });
  }
}

// Progress bar for presentation
class ProgressBar {
  constructor() {
    this.bar = document.getElementById('progress-bar');
    if (this.bar) {
      this.update();
    }
  }

  update(current, total) {
    if (!this.bar) return;
    const progress = (current / total) * 100;
    this.bar.style.width = `${progress}%`;
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.presentation = new SlidePresentation();
  window.progressBar = new ProgressBar();
});

// Export for module usage
export { SlidePresentation, ProgressBar };
