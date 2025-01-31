// Update gallery.js
class GalleryLightbox {
    constructor() {
        this.modal = document.getElementById('lightbox-modal');
        this.initGallery();
    }

    initGallery() {
        document.querySelectorAll('.lightbox').forEach(item => {
            item.addEventListener('click', e => this.handleClick(e));
        });
    }

    handleClick(e) {
        e.preventDefault();
        const isVideo = e.target.href.includes('.mp4');
        this.showMedia(e.target.href, isVideo ? 'video' : 'image');
    }

    showMedia(src, type) {
        const content = this.modal.querySelector('.modal-content');
        content.innerHTML = type === 'video' 
            ? `<video controls autoplay><source src="${src}" type="video/mp4"></video>`
            : `<img src="${src}" alt="Enlarged gallery content">`;
        
        this.modal.style.display = 'flex';
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => new GalleryLightbox());