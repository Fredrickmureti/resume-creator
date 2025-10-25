// Performance optimizations for CreateResume.tech SEO
// This file contains performance enhancements for better Core Web Vitals

// Image optimization utility
export const optimizeImageLoading = () => {
  // Preload critical images
  const criticalImages = [
    '/hero-resume.jpg',
    '/template-preview.jpg',
    '/resume-work.jpg'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Lazy loading for non-critical images
export const setupLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Critical CSS for above-the-fold content
export const inlineCriticalCSS = () => {
  const criticalCSS = `
    /* Critical CSS for hero section */
    .hero-section {
      background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
      min-height: 60vh;
    }
    
    .hero-title {
      font-size: clamp(2rem, 5vw, 4rem);
      font-weight: 700;
      line-height: 1.2;
    }
    
    .cta-button {
      background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
      border-radius: 0.75rem;
      padding: 1rem 2rem;
      font-weight: 600;
      color: white;
      transition: transform 0.2s ease;
    }
    
    .cta-button:hover {
      transform: translateY(-2px);
    }
  `;

  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
};

// Web Vitals optimization
export const optimizeWebVitals = () => {
  // Reduce Cumulative Layout Shift (CLS)
  const addImageDimensions = () => {
    document.querySelectorAll('img:not([width]):not([height])').forEach(img => {
      if (img instanceof HTMLImageElement) {
        // Set aspect ratio to prevent layout shift
        img.style.aspectRatio = '16/9';
        img.style.width = '100%';
        img.style.height = 'auto';
      }
    });
  };

  // Optimize Largest Contentful Paint (LCP)
  const optimizeLCP = () => {
    // Preload hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage instanceof HTMLImageElement) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = heroImage.src;
      document.head.appendChild(link);
    }
  };

  addImageDimensions();
  optimizeLCP();
};

// Initialize all performance optimizations
export const initPerformanceOptimizations = () => {
  // Run on DOM content loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      optimizeImageLoading();
      setupLazyLoading();
      optimizeWebVitals();
    });
  } else {
    optimizeImageLoading();
    setupLazyLoading();
    optimizeWebVitals();
  }
};

// SEO-specific performance metrics
export const trackSEOMetrics = () => {
  // Track page load time for SEO
  window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    
    // Log performance metrics (can be sent to analytics)
    console.log('SEO Performance Metrics:', {
      pageLoadTime: loadTime,
      domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
      firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime,
      firstContentfulPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime
    });
  });
};

// Mobile-first responsive images
export const setupResponsiveImages = () => {
  const images = document.querySelectorAll('img[data-responsive]');
  
  images.forEach(img => {
    if (img instanceof HTMLImageElement) {
      const srcset = [
        `${img.dataset.src}-320w.webp 320w`,
        `${img.dataset.src}-640w.webp 640w`,
        `${img.dataset.src}-1024w.webp 1024w`,
        `${img.dataset.src}-1280w.webp 1280w`
      ].join(', ');
      
      img.srcset = srcset;
      img.sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    }
  });
};