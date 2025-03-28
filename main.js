// DOM Elements
const header = document.querySelector('header');
const mobileToggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('nav');
const filterBtns = document.querySelectorAll('.filter-btn');
const faqItems = document.querySelectorAll('.faq-item');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');



// Sticky Header
window.addEventListener('scroll', function() {
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Mobile Navigation
if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        mobileToggle.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}

// Close mobile nav when clicking on links
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        if (mobileToggle) {
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Project Filter
if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter value
            const filterValue = btn.getAttribute('data-filter');
            
            // Get all project cards
            const projectCards = document.querySelectorAll('.project-card');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.classList.contains(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// FAQ Accordion
if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other open FAQ items
            faqItems.forEach(faqItem => {
                if (faqItem !== item) {
                    faqItem.classList.remove('active');
                }
            });
            
            // Toggle active class on current item
            item.classList.toggle('active');
        });
    });
}

// Project Modal Functions
function initProjectModals() {
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.project-modal');
    
    // Initialize modals only if triggers exist
    if (modalTriggers.length > 0) {
        console.log('Found', modalTriggers.length, 'modal triggers');
        
        // Open modal when clicking on project link
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = trigger.getAttribute('data-target');
                const targetModal = document.getElementById(targetId);
                
                if (targetModal) {
                    console.log('Opening modal:', targetId);
                    targetModal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                    
                    // Ensure close button is properly set up for this modal
                    setupModalCloseHandlers(targetModal);
                } else {
                    console.error('Modal not found with id:', targetId);
                }
            });
        });
        
        // Set up close handlers for all existing modals
        modals.forEach(modal => {
            setupModalCloseHandlers(modal);
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.project-modal.show');
                if (openModal) {
                    closeModal(openModal);
                }
            }
        });
    }
    
    // Function to set up all close handlers for a specific modal
    function setupModalCloseHandlers(modal) {
        // Get close button within this specific modal
        const closeBtn = modal.querySelector('.modal-close');
        const backdrop = modal.querySelector('.modal-backdrop');
        
        // Set up close button handler
        if (closeBtn) {
            // Remove any existing handlers to prevent duplicates
            closeBtn.removeEventListener('click', onCloseBtnClick);
            
            // Add fresh click handler
            closeBtn.addEventListener('click', onCloseBtnClick);
            console.log('Close button handler set up for modal:', modal.id);
        } else {
            console.warn('Modal is missing close button:', modal.id);
        }
        
        // Set up backdrop handler
        if (backdrop) {
            // Remove any existing handlers to prevent duplicates
            backdrop.removeEventListener('click', onBackdropClick);
            
            // Add fresh click handler
            backdrop.addEventListener('click', onBackdropClick);
        }
    }
    
    // Handle close button click
    function onCloseBtnClick(e) {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling
        
        const modal = this.closest('.project-modal');
        if (modal) {
            closeModal(modal);
        }
    }
    
    // Handle backdrop click
    function onBackdropClick(e) {
        // Only close if click was directly on backdrop (not on modal content)
        if (e.target === this) {
            const modal = this.closest('.project-modal');
            if (modal) {
                closeModal(modal);
            }
        }
    }
    
    // Centralized function to close modals
    function closeModal(modal) {
        console.log('Closing modal:', modal.id);
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    // Project Tab Navigation
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                const parent = btn.closest('.project-description');
                if (parent) {
                    parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                    parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                    
                    // Add active class to clicked button and corresponding content
                    btn.classList.add('active');
                    const tabId = btn.getAttribute('data-tab');
                    const tabContent = parent.querySelector(`#${tabId}`);
                    if (tabContent) {
                        tabContent.classList.add('active');
                    }
                }
            });
        });
    }
    
    // Project Thumbnail Gallery
    const thumbnails = document.querySelectorAll('.thumbnail');
    if (thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // Remove active class from all thumbnails
                const gallery = thumb.closest('.project-thumbnail-gallery');
                if (gallery) {
                    gallery.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                    
                    // Add active class to clicked thumbnail
                    thumb.classList.add('active');
                    
                    // Update main image
                    const mainImg = thumb.closest('.project-modal-gallery').querySelector('.project-cover-image img');
                    if (mainImg) {
                        mainImg.src = thumb.getAttribute('data-img');
                    }
                }
            });
        });
    }
    
    
    
    // Log modals status after initialization
    console.log('Modal initialization complete');
    console.log('Active modals:', document.querySelectorAll('.project-modal.show').length);
}

// Partner Modal Function
function initPartnerModals() {
    const partnerTriggers = document.querySelectorAll('.partner-trigger');
    const partnerModal = document.getElementById('partner-modal');
    
    if (!partnerModal || partnerTriggers.length === 0) {
        console.log('Partner modals not initialized - missing elements');
        return;
    }
    
    const modalClose = partnerModal.querySelector('.modal-close');
    const modalBackdrop = partnerModal.querySelector('.modal-backdrop');
    
    // Filter state
    let currentPartner = '';
    let selectedDepartment = '';
    let selectedYear = '';
    
    // Partner data - Data lebih lengkap
    // Partner data - Data lengkap untuk semua partner
const partnerData = {
    'kemenparekraf': {
        name: 'Kementerian Pariwisata dan Ekonomi Kreatif',
        logo: 'assets/images/partners/kemenparekraf.png',
        projects: [
            { name: 'Pengembangan Sistem Informasi Pariwisata', description: 'Pengembangan aplikasi web dan mobile untuk mendukung informasi pariwisata daerah', year: '2023', department: 'Bidang Teknologi Informasi' },
            { name: 'Pemetaan Destinasi Wisata Prioritas', description: 'Pemetaan kawasan strategis pariwisata menggunakan drone mapping', year: '2022', department: 'Bidang Pengembangan Destinasi' },
            { name: 'Kajian Kebijakan Ekonomi Kreatif', description: 'Penyusunan kajian dan rekomendasi kebijakan untuk ekonomi kreatif daerah', year: '2023', department: 'Bidang Ekonomi Kreatif' },
            { name: 'Pelatihan Digital Marketing Wisata', description: 'Program pelatihan pemasaran digital untuk pelaku industri pariwisata', year: '2024', department: 'Bidang Teknologi Informasi' },
            { name: 'Pengembangan Platform Marketplace UMKM', description: 'Pembuatan platform penjualan produk UMKM ekonomi kreatif', year: '2022', department: 'Bidang Ekonomi Kreatif' }
        ],
        departments: [
            { name: 'Bidang Teknologi Informasi', icon: 'fa-laptop-code' },
            { name: 'Bidang Pengembangan Destinasi', icon: 'fa-map-marked-alt' },
            { name: 'Bidang Ekonomi Kreatif', icon: 'fa-paint-brush' }
        ],
        years: ['2022', '2023', '2024'],
        additionalInfo: 'Kerjasama dengan Kemenparekraf telah berlangsung sejak tahun 2022 dengan fokus pada digitalisasi informasi pariwisata dan pemetaan kawasan strategis wisata untuk mendukung program pengembangan destinasi prioritas.'
    },
    'kemendikbud': {
        name: 'Kementerian Pendidikan dan Kebudayaan',
        logo: 'assets/images/partners/kemendikbud.png',
        projects: [
            { name: 'Digitalisasi Cagar Budaya', description: 'Pemodelan 3D situs cagar budaya untuk dokumentasi dan edukasi', year: '2023', department: 'Bidang Kebudayaan' },
            { name: 'Sistem Informasi Manajemen Sekolah', description: 'Pengembangan aplikasi untuk manajemen data sekolah dan murid', year: '2021', department: 'Bidang Teknologi Pendidikan' },
            { name: 'Pemetaan Sebaran Satuan Pendidikan', description: 'Pemetaan dan analisis sebaran sekolah untuk perencanaan pendidikan', year: '2022', department: 'Bidang Teknologi Pendidikan' },
            { name: 'Kajian Pelestarian Warisan Budaya', description: 'Penyusunan kajian dan rekomendasi untuk pelestarian situs bersejarah', year: '2023', department: 'Bidang Kebudayaan' },
            { name: 'Pengembangan Aplikasi Pembelajaran Daring', description: 'Pembuatan platform pembelajaran jarak jauh terintegrasi', year: '2022', department: 'Bidang Teknologi Pendidikan' }
        ],
        departments: [
            { name: 'Bidang Kebudayaan', icon: 'fa-monument' },
            { name: 'Bidang Teknologi Pendidikan', icon: 'fa-graduation-cap' }
        ],
        years: ['2021', '2022', '2023'],
        additionalInfo: 'Kerjasama dengan Kemendikbud berfokus pada pelestarian warisan budaya melalui teknologi digital dan pengembangan sistem informasi untuk menunjang administrasi pendidikan.'
    },
    'kominfo': {
        name: 'Kementerian Komunikasi dan Informatika',
        logo: 'assets/images/partners/kominfo.png',
        projects: [
            { name: 'Pengembangan Aplikasi Layanan Publik Digital', description: 'Sistem informasi terpadu untuk layanan masyarakat berbasis digital', year: '2023', department: 'Bidang Aplikasi Informatika' },
            { name: 'Peta Jaringan Telekomunikasi', description: 'Pemetaan infrastruktur telekomunikasi untuk pengembangan jaringan', year: '2022', department: 'Bidang Infrastruktur Digital' },
            { name: 'Kajian Transformasi Digital Daerah', description: 'Penyusunan roadmap dan strategi transformasi digital pemerintah daerah', year: '2023', department: 'Bidang Aplikasi Informatika' },
            { name: 'Sistem Monitoring Keamanan Siber', description: 'Pengembangan sistem pemantauan dan deteksi serangan siber', year: '2024', department: 'Bidang Keamanan Informasi' },
            { name: 'Pelatihan Digital Literacy', description: 'Program peningkatan kapasitas aparatur dalam literasi digital', year: '2022', department: 'Bidang Aplikasi Informatika' }
        ],
        departments: [
            { name: 'Bidang Aplikasi Informatika', icon: 'fa-mobile-alt' },
            { name: 'Bidang Infrastruktur Digital', icon: 'fa-network-wired' },
            { name: 'Bidang Keamanan Informasi', icon: 'fa-shield-alt' }
        ],
        years: ['2022', '2023', '2024'],
        additionalInfo: 'Kerjasama dengan Kominfo mencakup pengembangan aplikasi digital dan pemetaan infrastruktur telekomunikasi untuk mendukung program transformasi digital nasional.'
    },
    'pemprov-jateng': {
        name: 'Pemerintah Provinsi Jawa Tengah',
        logo: 'assets/images/partners/pemprov-jateng.png',
        projects: [
            { name: 'Perencanaan Tata Ruang Provinsi', description: 'Kajian dan penyusunan rencana tata ruang provinsi', year: '2022', department: 'Bappeda' },
            { name: 'Sistem Informasi Pembangunan Daerah', description: 'Pengembangan platform monitoring pembangunan daerah terintegrasi', year: '2023', department: 'Dinas Kominfo' },
            { name: 'Pemetaan Kawasan Rawan Bencana', description: 'Analisis dan pemetaan daerah rawan bencana untuk mitigasi', year: '2021', department: 'Dinas PUPR' },
            { name: 'Kajian Potensi Investasi Daerah', description: 'Identifikasi dan analisis peluang investasi strategis', year: '2024', department: 'Bappeda' },
            { name: 'Pengembangan Smart City', description: 'Implementasi teknologi smart city di kota-kota besar Jawa Tengah', year: '2023', department: 'Dinas Kominfo' }
        ],
        departments: [
            { name: 'Bappeda', icon: 'fa-building' },
            { name: 'Dinas PUPR', icon: 'fa-road' },
            { name: 'Dinas Kominfo', icon: 'fa-laptop' }
        ],
        years: ['2021', '2022', '2023', '2024'],
        additionalInfo: 'Kerjasama dengan Pemprov Jawa Tengah meliputi berbagai bidang strategis untuk mendukung pembangunan provinsi yang berkelanjutan dan berbasis digital.'
    },
    'pemkot-surakarta': {
        name: 'Pemerintah Kota Surakarta',
        logo: 'assets/images/partners/pemkot-surakarta.png',
        projects: [
            { name: 'Perencanaan Kawasan Heritage', description: 'Pemetaan dan perencanaan pengembangan kawasan cagar budaya', year: '2023', department: 'Dinas Kebudayaan' },
            { name: 'Sistem Drainase Perkotaan', description: 'Kajian dan perencanaan sistem drainase komprehensif', year: '2022', department: 'Dinas PUPR' },
            { name: 'Pemetaan 3D Situs Bersejarah', description: 'Pemodelan digital 3D situs dan bangunan bersejarah', year: '2020', department: 'Dinas Kebudayaan' },
            { name: 'Kajian Penataan RTH Kota', description: 'Analisis dan perencanaan ruang terbuka hijau perkotaan', year: '2021', department: 'Dinas Tata Ruang' },
            { name: 'Aplikasi Smart Tourism', description: 'Pengembangan aplikasi panduan wisata digital terintegrasi', year: '2024', department: 'Dinas Kebudayaan' }
        ],
        departments: [
            { name: 'Dinas Tata Ruang', icon: 'fa-map' },
            { name: 'Dinas PUPR', icon: 'fa-hard-hat' },
            { name: 'Dinas Kebudayaan', icon: 'fa-landmark' }
        ],
        years: ['2020', '2021', '2022', '2023', '2024'],
        additionalInfo: 'Kerjasama dengan Pemkot Surakarta telah berjalan sejak lama dengan fokus pada pengembangan tata kota yang memadukan aspek modern dan pelestarian warisan budaya.'
    },
    'pemkab-sragen': {
        name: 'Pemerintah Kabupaten Sragen',
        logo: 'assets/images/partners/pemkab-sragen.png',
        projects: [
            { name: 'RDTR Kawasan Strategis', description: 'Penyusunan rencana detail tata ruang kawasan ekonomi strategis', year: '2023', department: 'Bappeda' },
            { name: 'Pemetaan Potensi Desa', description: 'Identifikasi dan pemetaan potensi pengembangan desa', year: '2021', department: 'Bappeda' },
            { name: 'Kajian Pengembangan Kawasan Industri', description: 'Analisis dan perencanaan pengembangan kawasan industri terpadu', year: '2022', department: 'Dinas Perindustrian' },
            { name: 'Penyusunan Masterplan Agropolitan', description: 'Perencanaan kawasan pertanian terpadu berbasis ekonomi lokal', year: '2024', department: 'Bappeda' },
            { name: 'Sistem Informasi Manajemen Investasi', description: 'Pengembangan platform pengelolaan dan promosi investasi daerah', year: '2023', department: 'Dinas Perindustrian' }
        ],
        departments: [
            { name: 'Bappeda', icon: 'fa-chart-line' },
            { name: 'Dinas Perindustrian', icon: 'fa-industry' }
        ],
        years: ['2021', '2022', '2023', '2024'],
        additionalInfo: 'Kerjasama dengan Pemkab Sragen berfokus pada pengembangan ekonomi daerah dan perencanaan kawasan strategis untuk mendukung investasi dan pertumbuhan industri.'
    },
    'pemkab-klaten': {
        name: 'Pemerintah Kabupaten Klaten',
        logo: 'assets/images/partners/pemkab-klaten.png',
        projects: [
            { name: 'Kajian Sistem Drainase', description: 'Studi dan perencanaan sistem drainase kawasan rawan banjir', year: '2023', department: 'Dinas PUPR' },
            { name: 'Pemetaan Digital Desa', description: 'Digitalisasi dan pemetaan aset desa untuk pembangunan', year: '2022', department: 'Dinas Pemberdayaan Masyarakat' },
            { name: 'Sistem Informasi Pengelolaan Air Bersih', description: 'Pengembangan aplikasi monitoring dan distribusi air bersih', year: '2023', department: 'Dinas PUPR' },
            { name: 'Penyusunan Strategi Pemberdayaan Desa', description: 'Kajian dan perencanaan program pemberdayaan masyarakat desa', year: '2024', department: 'Dinas Pemberdayaan Masyarakat' },
            { name: 'Pemetaan Infrastruktur Perdesaan', description: 'Survei dan pemetaan kondisi infrastruktur di kawasan perdesaan', year: '2022', department: 'Dinas PUPR' }
        ],
        departments: [
            { name: 'Dinas PUPR', icon: 'fa-water' },
            { name: 'Dinas Pemberdayaan Masyarakat', icon: 'fa-users' }
        ],
        years: ['2022', '2023', '2024'],
        additionalInfo: 'Kerjasama dengan Pemkab Klaten difokuskan pada infrastruktur dan pemberdayaan masyarakat desa melalui pendekatan teknologi dan perencanaan terpadu.'
    },
    'pemkab-boyolali': {
        name: 'Pemerintah Kabupaten Boyolali',
        logo: 'assets/images/partners/pemkab-boyolali.png',
        projects: [
            { name: 'Sistem Informasi Manajemen Aset', description: 'Pengembangan sistem pengelolaan aset daerah terintegrasi', year: '2023', department: 'BPKAD' },
            { name: 'Perencanaan Kawasan Agrowisata', description: 'Masterplan pengembangan kawasan agrowisata terpadu', year: '2022', department: 'Dinas Pariwisata' },
            { name: 'Pemetaan Potensi Pertanian', description: 'Identifikasi dan pemetaan komoditas unggulan pertanian', year: '2021', department: 'Dinas Pertanian' },
            { name: 'Pengembangan Aplikasi E-Inventarisasi', description: 'Sistem pendataan dan pelaporan aset berbasis digital', year: '2024', department: 'BPKAD' },
            { name: 'Kajian Pengembangan Desa Wisata', description: 'Studi dan perencanaan pengembangan desa wisata berkelanjutan', year: '2023', department: 'Dinas Pariwisata' }
        ],
        departments: [
            { name: 'BPKAD', icon: 'fa-building' },
            { name: 'Dinas Pariwisata', icon: 'fa-tree' },
            { name: 'Dinas Pertanian', icon: 'fa-leaf' }
        ],
        years: ['2021', '2022', '2023', '2024'],
        additionalInfo: 'Kerjasama dengan Pemkab Boyolali meliputi manajemen aset dan pengembangan potensi agrowisata untuk meningkatkan perekonomian dan daya tarik wisata daerah.'
    },
    'pemkab-sukoharjo': {
        name: 'Pemerintah Kabupaten Sukoharjo',
        logo: 'assets/images/partners/pemkab-sukoharjo.png',
        projects: [
            { name: 'Survey Kondisi Jalan', description: 'Pendataan dan analisis kondisi infrastruktur jalan kabupaten', year: '2023', department: 'Dinas PUPR' },
            { name: 'Pemetaan Kawasan Industri', description: 'Perencanaan tata ruang untuk pengembangan kawasan industri', year: '2022', department: 'Dinas Perindustrian' },
            { name: 'Kajian Sistem Transportasi', description: 'Studi dan perencanaan sistem transportasi kabupaten', year: '2024', department: 'Dinas PUPR' },
            { name: 'Pemetaan Industri Kecil Menengah', description: 'Identifikasi dan pendataan sentra industri potensial', year: '2022', department: 'Dinas Perindustrian' },
            { name: 'Pengembangan Sistem Informasi Jalan', description: 'Aplikasi monitoring dan pelaporan kondisi infrastruktur jalan', year: '2023', department: 'Dinas PUPR' }
        ],
        departments: [
            { name: 'Dinas PUPR', icon: 'fa-road' },
            { name: 'Dinas Perindustrian', icon: 'fa-industry' }
        ],
        years: ['2022', '2023', '2024'],
        additionalInfo: 'Kerjasama dengan Pemkab Sukoharjo berfokus pada peningkatan kualitas infrastruktur jalan dan pengembangan kawasan industri untuk menarik investasi.'
    },
    'pemkab-demak': {
        name: 'Pemerintah Kabupaten Demak',
        logo: 'assets/images/partners/pemkab-demak.png',
        projects: [
            { name: 'Peta Digital Desa', description: 'Pembuatan peta digital seluruh desa di Kabupaten Demak', year: '2023', department: 'Bappeda' },
            { name: 'Kajian Mitigasi Banjir', description: 'Studi dan perencanaan penanganan kawasan rawan banjir', year: '2022', department: 'BPBD' },
            { name: 'Penyusunan Masterplan Tanggul Laut', description: 'Perencanaan sistem pengaman pantai dari abrasi dan banjir rob', year: '2021', department: 'BPBD' },
            { name: 'Pengembangan Sistem Peringatan Dini', description: 'Implementasi teknologi pemantauan dan peringatan bencana', year: '2024', department: 'BPBD' },
            { name: 'Pemetaan Kawasan Rawan Bencana', description: 'Identifikasi dan analisis daerah rawan bencana banjir dan longsor', year: '2022', department: 'Bappeda' }
        ],
        departments: [
            { name: 'Bappeda', icon: 'fa-map-marked-alt' },
            { name: 'BPBD', icon: 'fa-water' }
        ],
        years: ['2021', '2022', '2023', '2024'],
        additionalInfo: 'Kerjasama dengan Pemkab Demak berfokus pada pemetaan desa dan mitigasi bencana untuk mendukung pembangunan desa yang tangguh dan berkelanjutan.'
    },
    'pemkab-karanganyar': {
        name: 'Pemerintah Kabupaten Karanganyar',
        logo: 'assets/images/partners/pemkab-karanganyar.png',
        projects: [
            { name: 'Drone Mapping Kawasan Wisata', description: 'Pemetaan detail kawasan wisata dengan teknologi drone', year: '2023', department: 'Dinas Pariwisata' },
            { name: 'Perencanaan Kawasan Agropolitan', description: 'Masterplan pengembangan kawasan pertanian terpadu', year: '2022', department: 'Dinas Pertanian' },
            { name: 'Kajian Pengembangan Wisata Alam', description: 'Studi potensi dan strategi pengembangan ekowisata', year: '2024', department: 'Dinas Pariwisata' },
            { name: 'Pemetaan Komoditas Unggulan', description: 'Identifikasi dan pemetaan komoditas pertanian strategis', year: '2021', department: 'Dinas Pertanian' },
            { name: 'Pengembangan Aplikasi Promosi Wisata', description: 'Platform digital untuk promosi destinasi wisata daerah', year: '2023', department: 'Dinas Pariwisata' }
        ],
        departments: [
            { name: 'Dinas Pariwisata', icon: 'fa-mountain' },
            { name: 'Dinas Pertanian', icon: 'fa-seedling' }
        ],
        years: ['2021', '2022', '2023', '2024'],
        additionalInfo: 'Kerjasama dengan Pemkab Karanganyar berfokus pada pengembangan kawasan wisata dan agropolitan untuk meningkatkan ekonomi daerah.'
    },
    'pemkab-sorong-selatan': {
        name: 'Pemerintah Kabupaten Sorong Selatan',
        logo: 'assets/images/partners/pemkab-sorong-selatan.png',
        projects: [
            { name: 'Peta Tematik Potensi Daerah', description: 'Pemetaan potensi sumber daya alam dan ekonomi daerah', year: '2023', department: 'Bappeda' },
            { name: 'Masterplan Kawasan Perkantoran', description: 'Perencanaan pengembangan kompleks perkantoran pemerintah', year: '2022', department: 'Bagian Pemerintahan' },
            { name: 'Kajian Pembangunan Daerah Tertinggal', description: 'Analisis dan rekomendasi percepatan pembangunan daerah', year: '2024', department: 'Bappeda' },
            { name: 'Pemetaan Sumber Daya Hutan', description: 'Identifikasi dan pemetaan kawasan hutan dan potensinya', year: '2023', department: 'Bappeda' },
            { name: 'Perencanaan Tata Ruang Kabupaten', description: 'Penyusunan dokumen perencanaan tata ruang wilayah', year: '2022', department: 'Bagian Pemerintahan' }
        ],
        departments: [
            { name: 'Bappeda', icon: 'fa-map' },
            { name: 'Bagian Pemerintahan', icon: 'fa-landmark' }
        ],
        years: ['2022', '2023', '2024'],
        additionalInfo: 'Kerjasama dengan Pemkab Sorong Selatan merupakan bagian dari upaya pengembangan daerah di wilayah timur Indonesia dengan pendekatan perencanaan berbasis potensi lokal.'
    },
    'pemkab-gunungkidul': {
        name: 'Pemerintah Kabupaten Gunungkidul',
        logo: 'assets/images/partners/pemkab-gunungkidul.png',
        projects: [
            { name: 'Aplikasi Mobile Informasi Wisata', description: 'Pengembangan aplikasi informasi destinasi wisata terintegrasi', year: '2023', department: 'Dinas Pariwisata' },
            { name: 'Perencanaan Kawasan Geo-Heritage', description: 'Masterplan pelestarian dan pengembangan kawasan warisan geologi', year: '2022', department: 'Dinas Pariwisata' },
            { name: 'Pemetaan Potensi Air Tanah', description: 'Identifikasi dan analisis sumber air tanah untuk kebutuhan masyarakat', year: '2021', department: 'Dinas Pariwisata' },
            { name: 'Pengembangan Smart Tourism Village', description: 'Implementasi teknologi digital untuk desa wisata', year: '2024', department: 'Dinas Kominfo' },
            { name: 'Sistem Informasi Geopark', description: 'Pengembangan platform pengelolaan dan promosi kawasan geopark', year: '2023', department: 'Dinas Kominfo' }
        ],
        departments: [
            { name: 'Dinas Pariwisata', icon: 'fa-umbrella-beach' },
            { name: 'Dinas Kominfo', icon: 'fa-mobile-alt' }
        ],
        years: ['2021', '2022', '2023', '2024'],
        additionalInfo: 'Kerjasama dengan Pemkab Gunungkidul berfokus pada pengembangan pariwisata berbasis teknologi dan pelestarian warisan geologi sebagai daya tarik wisata unggulan.'
    }
};
    
    // Function to filter projects
    function filterProjects() {
        if (!currentPartner) return;
        
        const projects = partnerData[currentPartner].projects;
        const projectsContainer = document.getElementById('partner-projects');
        const filterInfoElement = projectsContainer.querySelector('.filter-info') || document.createElement('div');
        
        // Set up filter info element if it doesn't exist
        if (!filterInfoElement.classList.contains('filter-info')) {
            filterInfoElement.className = 'filter-info';
            projectsContainer.prepend(filterInfoElement);
        }
        
        // Update active state in departments
        const departmentElements = document.querySelectorAll('#partner-departments .partner-tag');
        departmentElements.forEach(el => {
            if (el.textContent.trim() === selectedDepartment) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
        
        // Update active state in years
        const yearElements = document.querySelectorAll('#partner-years .timeline-year');
        yearElements.forEach(el => {
            if (el.textContent.trim() === selectedYear) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
        
        // Show/hide filter info text
        if (selectedDepartment || selectedYear) {
            let filterText = 'Menampilkan proyek';
            if (selectedDepartment) filterText += ` di ${selectedDepartment}`;
            if (selectedYear) filterText += ` tahun ${selectedYear}`;
            
            filterInfoElement.innerHTML = `${filterText} <span class="filter-reset">(Reset Filter)</span>`;
            filterInfoElement.classList.add('show');
            
            // Add click handler to reset button
            const resetBtn = filterInfoElement.querySelector('.filter-reset');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    selectedDepartment = '';
                    selectedYear = '';
                    filterProjects();
                });
            }
        } else {
            filterInfoElement.classList.remove('show');
        }
        
        // Filter project items
        const projectItems = document.querySelectorAll('#partner-projects .project-item');
        projectItems.forEach(item => {
            const projectName = item.querySelector('h4').textContent;
            const project = projects.find(p => p.name === projectName);
            
            if (project) {
                const matchesDepartment = !selectedDepartment || project.department === selectedDepartment;
                const matchesYear = !selectedYear || project.year === selectedYear;
                
                if (matchesDepartment && matchesYear) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    }
    
    // Function to open modal with specific partner data
function openPartnerModal(partnerId) {
    const data = partnerData[partnerId];
    if (!data) return;
    
    // Reset filter state
    currentPartner = partnerId;
    selectedDepartment = '';
    selectedYear = '';
    
    // Set modal content
    document.getElementById('modal-partner-logo').src = data.logo;
    document.getElementById('modal-partner-name').textContent = data.name;
    
    // Set projects
    const projectsContainer = document.getElementById('partner-projects');
    projectsContainer.innerHTML = '';
    
    // Add filter info element
    const filterInfo = document.createElement('div');
    filterInfo.className = 'filter-info';
    projectsContainer.appendChild(filterInfo);
    
    data.projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <h4>${project.name}</h4>
            <p>${project.description}</p>
            <div class="project-year">${project.year} - ${project.department}</div>
        `;
        projectsContainer.appendChild(projectItem);
    });
    
    // Set departments with click handlers
    const departmentsContainer = document.getElementById('partner-departments');
    departmentsContainer.innerHTML = '';
    
    data.departments.forEach(dept => {
        const deptTag = document.createElement('div');
        deptTag.className = 'partner-tag';
        deptTag.innerHTML = `<i class="fas ${dept.icon}"></i> ${dept.name}`;
        
        // Add click handler
        deptTag.addEventListener('click', () => {
            if (selectedDepartment === dept.name) {
                // Deselect if already selected
                selectedDepartment = '';
            } else {
                selectedDepartment = dept.name;
            }
            filterProjects();
        });
        
        departmentsContainer.appendChild(deptTag);
    });
    
    // Set years with click handlers
    const yearsContainer = document.getElementById('partner-years');
    yearsContainer.innerHTML = '';
    
    data.years.forEach(year => {
        const yearItem = document.createElement('div');
        yearItem.className = 'timeline-year';
        yearItem.textContent = year;
        // Hapus kode ini untuk menghilangkan pilihan default tahun 2024
        // if (year === '2024') yearItem.classList.add('current-year');
        
        // Add click handler
        yearItem.addEventListener('click', () => {
            if (selectedYear === year) {
                // Deselect if already selected
                selectedYear = '';
            } else {
                selectedYear = year;
            }
            filterProjects();
        });
        
        yearsContainer.appendChild(yearItem);
    });
    
    // Set additional info
    document.getElementById('partner-additional-info').textContent = data.additionalInfo;
    
    // Show modal
    partnerModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}
    
    // Add click event to partner items
    partnerTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const partnerId = trigger.getAttribute('data-partner-id');
            openPartnerModal(partnerId);
        });
    });
    
    // Close modal functions
    function closePartnerModal() {
        partnerModal.classList.remove('show');
        document.body.style.overflow = 'auto';
        // Reset filter state
        currentPartner = '';
        selectedDepartment = '';
        selectedYear = '';
    }
    
    modalClose.addEventListener('click', closePartnerModal);
    modalBackdrop.addEventListener('click', closePartnerModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && partnerModal.classList.contains('show')) {
            closePartnerModal();
        }
    });
}

// Make sure modals are initialized when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, initializing modals');
    initProjectModals();
    initPartnerModals();
    
    // Init animations (simplified)
    initAnimations();
});

// Simple animation initialization
function initAnimations() {
    const animateElements = document.querySelectorAll('.animate, .fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    animateElements.forEach(element => {
        setTimeout(() => {
            element.classList.add('active');
            element.classList.add('visible');
        }, 100);
    });
    
    // For staggered animations
    const staggerContainers = document.querySelectorAll('.stagger-animation');
    staggerContainers.forEach(container => {
        const children = container.children;
        Array.from(children).forEach(child => {
            child.classList.add('visible');
        });
    });
    
    // Hero content animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = 1;
        heroContent.style.transform = 'translateY(0)';
    }
}

// Initial load animations
window.addEventListener('load', function() {
    // Initialize modals
    initProjectModals();
    initPartnerModals();
    
    // Initialize animations
    initAnimations();
    
    // Tambahkan fungsi animasi scroll
    initScrollAnimations();
});

// Contact Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[name="name"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;
        
        // For this demo, we'll just show a success message
        showToast('Pesan Anda berhasil dikirim!', 'success');
        contactForm.reset();
    });
}

// Newsletter Form Submission
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get email address
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // For this demo, we'll just show a success message
        showToast('Anda berhasil berlangganan newsletter!', 'success');
        newsletterForm.reset();
    });
}

// Toast Notification
function showToast(message, type = 'success') {
    // Remove any existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    // Set icon based on type
    let icon = 'check-circle';
    if (type === 'error') {
        icon = 'times-circle';
    }
    
    // Set toast content
    toast.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
    
    // Add toast to body
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        
        // Remove toast from DOM after animation completes
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Language Switcher
const languageSwitcher = document.querySelector('.language-switch');
if (languageSwitcher) {
    const langLinks = languageSwitcher.querySelectorAll('a');
    
    langLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // In a real implementation, you would switch to the appropriate language page
            // For this demo, we'll just toggle the active class
            langLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ANIMASI SCROLL
// Fungsi untuk animasi scroll
function initScrollAnimations() {
    // Pilih semua elemen dengan kelas scroll-animation
    const animatedElements = document.querySelectorAll('.scroll-animation, .scroll-animation-left, .scroll-animation-right');
    
    // Fungsi untuk mengecek apakah elemen dalam viewport
    function checkInView() {
        animatedElements.forEach(element => {
            // Hitung posisi elemen relatif terhadap viewport
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // Jika elemen terlihat di viewport
            if (elementTop < windowHeight - 50 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    }
    
    // Jalankan pengecekan saat halaman dimuat
    checkInView();
    
    // Jalankan pengecekan saat scroll
    window.addEventListener('scroll', checkInView);
}

// Tambahkan ke fungsi window.onload yang sudah ada
window.addEventListener('load', function() {
    // Panggil fungsi yang sudah ada (jika ada)
    if (typeof initProjectModals === 'function') {
        initProjectModals();
    }
    
    if (typeof initAnimations === 'function') {
        initAnimations();
    }
    
    // Tambahkan fungsi animasi scroll
    initScrollAnimations();
});

// Tambahkan juga ke event DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Panggil fungsi-fungsi yang sudah ada (jika ada)
    if (typeof initProjectModals === 'function') {
        initProjectModals();
    }
    
    // Inisialisasi animasi scroll
    initScrollAnimations();
});