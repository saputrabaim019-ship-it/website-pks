// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  // Check if elements exist
  if (!hamburger || !navMenu) {
    console.error('Hamburger atau nav-menu tidak ditemukan!');
    return;
  }
  
  console.log('Elements found:', { hamburger, navMenu, navLinks: navLinks.length });
  
  // Toggle mobile menu
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event bubbling
    console.log('Hamburger clicked!');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Optional: Toggle body scroll
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      console.log('Nav link clicked, closing menu');
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = ''; // Restore scroll
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active')) {
      const isClickInsideMenu = navMenu.contains(e.target);
      const isClickOnHamburger = hamburger.contains(e.target);
      
      if (!isClickInsideMenu && !isClickOnHamburger) {
        console.log('Click outside, closing menu');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
  
  // Close menu on window resize (optional)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// Smooth scrolling for anchor links (tetap seperti semula)
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Add active class to current page in navigation
const currentLocation = location.href;
const menuItems = document.querySelectorAll('.nav-menu a');

menuItems.forEach(item => {
  if (item.href === currentLocation) {
    item.classList.add('active');
  }
});

// Simple dark mode toggle (optional feature)
const darkModeToggle = () => {
  const darkModeBtn = document.createElement('button');
  darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
  darkModeBtn.className = 'dark-mode-toggle';
  darkModeBtn.style.position = 'fixed';
  darkModeBtn.style.bottom = '20px';
  darkModeBtn.style.right = '20px';
  darkModeBtn.style.zIndex = '1000';
  darkModeBtn.style.backgroundColor = 'var(--primary-color)';
  darkModeBtn.style.color = 'white';
  darkModeBtn.style.border = 'none';
  darkModeBtn.style.borderRadius = '50%';
  darkModeBtn.style.width = '50px';
  darkModeBtn.style.height = '50px';
  darkModeBtn.style.cursor = 'pointer';
  darkModeBtn.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
  
  document.body.appendChild(darkModeBtn);
  
  darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('darkMode', 'enabled');
    } else {
      darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('darkMode', 'disabled');
    }
  });
  
  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }
};

// Initialize dark mode toggle (uncomment to enable)
// darkModeToggle();

// Add CSS for dark mode
const darkModeCSS = `
    body.dark-mode {
        --light-color: #1a1a1a;
        --dark-color: #f8f9fa;
        --white: #2d2d2d;
        background-color: #121212;
        color: #e0e0e0;
    }
    
    body.dark-mode header {
        background-color: #2d2d2d;
    }
    
    body.dark-mode .link-card,
    body.dark-mode .feature {
        background-color: #2d2d2d;
        color: #e0e0e0;
    }
    
    body.dark-mode .quick-links,
    body.dark-mode .about {
        background-color: #1a1a1a;
    }
`;

// Add dark mode CSS to head
const style = document.createElement('style');
style.textContent = darkModeCSS;
document.head.appendChild(style);

// Form validation for contact page
const validateForm = () => {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'var(--danger-color)';
          
          // Add error message
          if (!input.nextElementSibling?.classList.contains('error-message')) {
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'Field ini harus diisi';
            errorMsg.style.color = 'var(--danger-color)';
            errorMsg.style.fontSize = '0.85rem';
            errorMsg.style.marginTop = '5px';
            input.parentNode.insertBefore(errorMsg, input.nextSibling);
          }
        } else {
          input.style.borderColor = '';
          const errorMsg = input.nextElementSibling;
          if (errorMsg?.classList.contains('error-message')) {
            errorMsg.remove();
          }
        }
      });
      
      if (isValid) {
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Form berhasil dikirim!';
        successMsg.style.color = 'var(--success-color)';
        successMsg.style.marginTop = '15px';
        successMsg.style.padding = '10px';
        successMsg.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
        successMsg.style.borderRadius = '5px';
        successMsg.style.textAlign = 'center';
        
        form.appendChild(successMsg);
        
        // Reset form after 2 seconds
        setTimeout(() => {
          form.reset();
          successMsg.remove();
        }, 2000);
      }
    });
  });
};

// Initialize form validation
document.addEventListener('DOMContentLoaded', validateForm);

// Counter animation for statistics (if needed)
const animateCounters = () => {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const increment = target / 200;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 10);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
};

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      
      // If element has counter, animate it
      if (entry.target.querySelector('.counter')) {
        animateCounters();
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.feature, .link-card, .section-title');
  animateElements.forEach(el => observer.observe(el));
});

// Current year for footer
document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.querySelector('.current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
// ===== DATA ANGGOTA PKS =====
const anggotaData = [
    // Anggota Senior
    {
        id: 1,
        nama: "Syahrillah Ramadhani",
        jabatan: "Senior",
        divisi: "Komandan(purna) ",
        tingkatan: "senior",
        kelas: "XII A",
        foto: "images/anggota/senior/1.jpg",
        motto: "Disiplin pangkal kesuksesan",
        whatsapp: "081234567890"
    },
    {
        id: 2,
        nama: "Vira Salma",
        jabatan: "Senior",
        divisi: "Wakil Komandan (Purna) ",
        tingkatan: "senior",
        kelas: "XII AK 2",
        foto: "images/anggota/senior/2.jpg",
        motto: "Pantang menyerah",
        whatsapp: "081234567891"
    },
    {
        id: 3,
        nama: "Aliep Nurrohman",
        jabatan: "Senior",
        divisi: "Ketua divisi P3K",
        tingkatan: "senior",
        kelas: "XII TKJ 2",
        foto: "images/anggota/senior/3.jpg",
        motto: "Sehat dan bersih",
        whatsapp: "081234567892"
    },
      {
      id: 4,
      nama: "Raisa",
      jabatan: "Senior",
      divisi: "Ketua Divisi Penindak",
      tingkatan: "senior",
      kelas: "XII MPLB 2",
      foto: "images/anggota/senior/4.jpg",
      motto: "Disiplin waktu",
      whatsapp: "081234567892"
  },
    {
      id: 5,
      nama: "Nadia",
      jabatan: "Senior",
      divisi: "Ketua Divisi Ketertiban",
      tingkatan: "senior",
      kelas: "XII MPLB 2",
      foto: "images/anggota/senior/5.jpg",
      motto: "Gagal bukan akhir",
      whatsapp: "081234567892"
  },
    {
      id: 6,
      nama: "Gilang Juno",
      jabatan: "Senior",
      divisi: "Ketua Divisi Ketertiban",
      tingkatan: "senior",
      kelas: "XII TITL 2",
      foto: "images/anggota/senior/6.jpg",
      motto: "Fokus tujuan",
      whatsapp: "081234567892"
  },
    // Anggota 
    {
        id: 7,
        nama: "Rey Marpiyansyah",
        jabatan: "Anggota Biasa",
        divisi: "Komandan (saat ini)",
        tingkatan: "biasa",
        kelas: "XI TKJ 2",
        foto: "images/anggota/7.jpg",
        motto: "Konsisten dalam tindakan",
        whatsapp: "081234567893"
    },
    {
        id: 8,
        nama: "Evi Amelia",
        jabatan:"Anggota Biasa ",
        divisi: "Wakil Komandan (saat ini) ",
        tingkatan: "biasa",
        kelas: "XI MPLB 1",
        foto: "images/anggota/8.jpg",
        motto: "Hormat dan patuh",
        whatsapp: "081234567894"
    },
    {
        id: 9,
        nama: "Siti Nurohmah",
        jabatan: "Anggota Biasa",
        divisi: "Sekretaris",
        tingkatan: "biasa",
        kelas: "XI MPLB 2",
        foto: "images/anggota/9.jpg",
        motto: "Rapi dan teratur",
        whatsapp: "081234567895"
    },
    {
        id: 10,
        nama: "Soehartia",
        jabatan: "Anggota Biasa",
        divisi: "Bendahara",
        tingkatan: "biasa",
        kelas: "XI MPLB 2",
        foto: "images/anggota/10.jpg",
        motto: "berani berubah",
        whatsapp: "081234567895"
    },
    {
        id: 11,
        nama: "Olipia",
        jabatan: "Anggota Biasa",
        divisi: "Administrasi",
        tingkatan: "biasa",
        kelas: "XI TKJ 3 2",
        foto: "images/anggota/11.jpg",
        motto: "terus maju tanpa ragu",
        whatsapp: "081234567895"
    },
    {
        id: 12,
        nama: "Wahyudin", 
        jabatan: "Anggota Biasa", 
        divisi: "Humas & P3k", 
        tingkatan: "biasa", 
        kelas: "XI TITL 2", 
        foto: "image/anggota/12.jpg", 
        motto: "Usaha tidak menghianati hasil", 
        whatsapp: "082231933025", 
    }, 
    {
        id: 13,
        nama: "Mayla Nabila",
        jabatan: "Anggota Biasa",
        divisi: "Humas & P3k",
        tingkatan: "biasa",
        kelas: "XI TKJ 2",
        foto: "images/anggota/13.jpg",
        motto: "Disiplin kunci keberhasilan", 
        whatsapp: "081234567895"
    },
    {
        id: 14,
        nama: "Aura Nayla Khairinnisa",
        jabatan: "Anggota Biasa",
        divisi: "Administrasi",
        tingkatan: "biasa",
        kelas: "XI MPLB 2",
        foto: "images/anggota/14.jpg",
        motto: "Siap mengabdi",
        whatsapp: "081234567898"
    }, 
       {
       id: 15,
       nama: "Hejefrina Dewi Maharani",
       jabatan: "Anggota Biasa",
       divisi: "Humas & P3k",
       tingkatan: "biasa",
       kelas: "XI MPLB 2",
       foto: "images/anggota/15.jpg",
       motto: "Kerja keras,hasil cerdas",
       whatsapp: "081234567898"
   },
    {
        id: 16,
    nama: "Adelia Gunawan",
    jabatan: "Anggota Biasa",
    divisi: "Penindak & Penertiban",
    tingkatan: "biasa",
    kelas: "XI Ak 2",
    foto: "images/anggota/16.jpg",
    motto: "Jangan takut mencoba",
    whatsapp: "081234567898"
    }, 
       {
       id: 17,
       nama: "Sabila Dewi",
       jabatan: "Anggota Biasa",
       divisi: "Humas & P3k",
       tingkatan: "biasa",
       kelas: "XI Ak 2",
       foto: "images/anggota/17.jpg",
       motto: "Sukses butuh proses",
       whatsapp: "081234567898"
   },
       {
       id: 18,
       nama: "Galang Maulana Putra",
       jabatan: "Anggota Biasa",
       divisi: "Penindak & Penertiban",
       tingkatan: "biasa",
       kelas: "XI TKJ 1",
       foto: "images/anggota/18.jpg",
       motto: "Tetap rendah hati",
       whatsapp: "081234567898"
   },
       {
       id: 19,
       nama: "Uswatun Nurhasanah",
       jabatan: "Anggota Biasa",
       divisi: "Penindak & Penertiban",
       tingkatan: "biasa",
       kelas: "XI Ak 2",
       foto: "images/anggota/19.jpg",
       motto: "Mimpi besar, mulai kecil",
       whatsapp: "081234567898"
   },
      {
       id: 20,
       nama: "Nabila Azahra",
       jabatan: "Anggota Biasa",
       divisi: "Penindak & Penertiban",
       tingkatan: "biasa",
       kelas: "XI MPLB 2",
       foto: "images/anggota/20.jpg",
       motto: "Konsisten lebih penting",
       whatsapp: "081234567898"
   },
      {
       id: 21,
       nama: "Nasya Naya Putri",
       jabatan: "Anggota Biasa",
       divisi: "Administrasi",
       tingkatan: "biasa",
       kelas: "XI MPLB 2",
       foto: "images/anggota/21.jpg",
       motto: "Waktu adalah kesempatan",
       whatsapp: "081234567898"
   },
      {
       id: 22,
       nama: "Maharani Saskia",
       jabatan: "Anggota Biasa",
       divisi: "Penindak & Penertiban",
       tingkatan: "biasa",
       kelas: "XI MPLB 2",
       foto: "images/anggota/22.jpg",
       motto: "Tekun membawa hasil",
       whatsapp: "081234567898"
   },
       {
       id: 23,
       nama: "Panya",
       jabatan: "Anggota Biasa",
       divisi: "Penindak & Penertiban",
       tingkatan: "biasa",
       kelas: "XI MPLB 2",
       foto: "images/anggota/23.jpg",
       motto: "Yakin pasti bisa",
       whatsapp: "081234567898"
   },
      {
       id: 24,
       nama: "Rizky Ramadham",
       jabatan: "Anggota Biasa",
       divisi: "Penindak & Penertiban",
       tingkatan: "biasa",
       kelas: "XI TKJ 2",
       foto: "images/anggota/24.jpg",
       motto: "Jadilah Inspirasi",
       whatsapp: "081234567898"
   },
      {
       id: 25,
       nama: "Baim Saputra",
       jabatan: "Anggota Biasa",
       divisi: "Humas & P3k",
       tingkatan: "biasa",
       kelas: "X IPA 2",
       foto: "images/anggota/25.jpg",
       motto: "Usaha lebih, hasi lebih",
       whatsapp: "081234567898"
   },
       {
       id: 26,
       nama: "Marselia Sopian",
       jabatan: "Anggota Biasa",
       divisi: "Administrasi",
       tingkatan: "biasa",
       kelas: "XI MPLB 2",
       foto: "images/anggota/26.jpg",
       motto: "Berkembang setiap hari",
       whatsapp: "081234567898"
   },
    
    // Anggota Muda
    {
        id: 27,
        nama: "Gea Nur Oktapiani Khorosi",
        jabatan: "Anggota Muda",
        divisi: "Humas & P3k",
        tingkatan: "muda",
        kelas: "X MPLB 1",
        foto: "images/anggota/pks muda/27.jpg",
        motto: "Tetap Semangat",
        whatsapp: "081234567896", 
    },
    {
        id: 28,
        nama: "Nia Ramadhani",
        jabatan: "Anggota Muda",
        divisi: "Administrasi",
        tingkatan: "muda",
        kelas: "X AK 1",
        foto: "images/anggota/pks muda/28.jpg",
        motto: "Semangat berlatih",
        whatsapp: "081234567897", 
    },
    {
        id: 29,
        nama: "Fauzan",
        jabatan: "Anggota Muda",
        divisi: "Penindak & Penertiban",
        tingkatan: "muda",
        kelas: "X AK 2",
        foto: "images/anggota/pks muda/29.jpg",
        motto: "Belajar tanpa batas",
        whatsapp: "081234567898", 
    },
    {
        id: 30,
        nama: "Yulia Avrillina Yunus", 
        jabatan: "Anggota muda", 
        divisi: "Humas & P3k", 
        tingkatan: "muda", 
        kelas: "X MPLB 1", 
        foto: "images/anggota/pks muda/30.jpg", 
        moto: "Hargai proses", 
        whatsapp: "082121933024", 
    }, 
    {
        id: 31,
         nama: "Anggita Bunga Kirani",
        jabatan: "Anggota muda",
        divisi: "Humas & P3k",
        tingkatan: "muda",
        kelas: "X AK 1",
        foto: "images/anggota/pks muda/31.jpg",
        moto: "Bergerak atu tertinggal", 
        whatsapp: "082121933024", 
    }, 
    {
        id: 32,
        nama: "Asy Syfa Ramadhani",
        jabatan: "Anggota Muda",
        divisi: "Penindak & Penertiban",
        tingkatan: "muda",
        kelas: "X AK 2",
        foto: "images/anggota/pks muda/32.jpg",
        motto: "Jangan menunda mimpi",
        whatsapp: "081234567898", 
    },
    {
        id: 33,
        nama: "Dimas Noval Pirdiansyah",
        jabatan: "Anggota Muda",
        divisi: "Penindak & Penertiban",
        tingkatan: "muda",
        kelas: "X TITL 2",
        foto: "images/anggota/pks muda/33.jpg",
        motto: "Sabar itu kuat",
        whatsapp: "081234567898", 
    },
    {
        id: 34,
        nama: "Rifa Al Ghifari",
        jabatan: "Anggota Muda",
        divisi: "Penindak & Penertiban",
        tingkatan: "muda",
        kelas: "X TITL 2",
        foto: "images/anggota/pks muda/34.jpg",
        motto: "Tindakan lebih penting ",
        whatsapp: "081234567898", 
    },
    {
        id: 35,
        nama: "Syarifah Siti Aminah",
        jabatan: "Anggota Muda",
        divisi: "Administrasi",
        tingkatan: "muda",
        kelas: "X AK 2",
        foto: "images/anggota/pks muda/35.jpg",
        motto: "Berpikir positif",
        whatsapp: "081234567898", 
    },
    {
        id: 36,
        nama: "Muhammad Riqki Ramadhan",
        jabatan: "Anggota Muda",
        divisi: "Humas & P3k",
        tingkatan: "muda",
        kelas: "X TKJ 2",
        foto: "images/anggota/pks muda/36.jpg",
        motto: "Percaya pada proses",
        whatsapp: "081234567898", 
    },
    {
        id: 37,
        nama: "Alisya Firmansyah",
        jabatan: "Anggota Muda",
        divisi: "Humas & P3k",
        tingkatan: "muda",
        kelas: "X AK 2",
        foto: "images/anggota/pks muda/37.jpg",
        motto: "Buktikan dengan hasil",
        whatsapp: "081234567898"
   },
   {
        id: 38,
        nama: "Nida Fitriani",
        jabatan: "Anggota Muda",
        divisi: "Humas & P3k",
        tingkatan: "muda",
        kelas: "X AK 2",
        foto: "images/anggota/pks muda/38.jpg",
        motto: "Maju selangkah setiap hari",
        whatsapp: "081234567898"
    }, 
    {
        id: 39,
        nama: "Fazli Fuad",
        jabatan: "Anggota Muda",
        divisi: "Humas & P3k",
        tingkatan: "muda",
        kelas: "X AK 2",
        foto: "images/anggota/pks muda/39.jpg",
        motto: "Belajar dari kesalahan",
        whatsapp: "081234567898"
    },
    
    // Alumni
    {
        id: 40,
        nama: "Rido Awalan",
        jabatan: "Mantan Ketua",
        divisi: "Alumni",
        tingkatan: "alumni",
        kelas: "Alumni 2023",
        foto: "images/anggota/alumni/40.jpg",
        motto: "PKS membentuk karakter",
        whatsapp: "081234567899"
    }, 
      {
        id: 41,
        nama: "Kenia Ul Azizah",
        jabatan: "Mantan Wakil Ketua",
        divisi: "Alumni",
        tingkatan: "alumni",
        kelas: "Alumni 2023",
        foto: "images/anggota/alumni/41.jpg",
        motto: "Sekali pks tetap pks",
        whatsapp: "081234567899"
    },
      {
        id: 42,
        nama: "Alya Bariq",
        jabatan: "Alumni",
        divisi: "Alumni",
        tingkatan: "alumni",
        kelas: "Alumni 2023",
        foto: "images/anggota/alumni/42.jpg",
        motto: "Disiplin selamanya",
        whatsapp: "081234567899"
    },
      {
        id: 43,
        nama: "Monica Putri Eriyanti",
        jabatan: "Alumni",
        divisi: "Alumni",
        tingkatan: "alumni",
        kelas: "Alumni 2023",
        foto: "images/anggota/alumni/43.jpg",
        motto: "Tertib:adalah prinsip",
        whatsapp: "081234567899"
    },
      {
        id: 44,
        nama: "Navisa Rahmawati",
        jabatan: "Alumni",
        divisi: "Alumni",
        tingkatan: "alumni",
        kelas: "Alumni 2023",
        foto: "images/anggota/alumni/44.jpg",
        motto: "Tumbuh dalam disiplin",
        whatsapp: "081234567899"
    },
      {
        id: 45,
        nama: "Sherren Febryna",
        jabatan: "Alumni",
        divisi: "Alumni",
        tingkatan: "alumni",
        kelas: "Alumni 2023",
        foto: "images/anggota/alumni/45.jpg",
        motto: "Pernah bediri untuk aturan",
        whatsapp: "081234567899"
  },
    // Tambahkan data anggota lain sesuai kebutuhan
];

// ===== FUNGSI UNTUK HALAMAN ANGGOTA =====
function renderAnggota(filter = 'all', searchTerm = '') {
    const container = document.getElementById('anggotaContainer');
    if (!container) return;
    
    // Filter data
    let filteredData = anggotaData;
    
    if (filter !== 'all') {
        filteredData = anggotaData.filter(anggota => anggota.tingkatan === filter);
    }
    
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredData = filteredData.filter(anggota => 
            anggota.nama.toLowerCase().includes(term) ||
            anggota.jabatan.toLowerCase().includes(term) ||
            anggota.divisi.toLowerCase().includes(term) ||
            anggota.kelas.toLowerCase().includes(term)
        );
    }
    
    // Render HTML
    container.innerHTML = filteredData.map(anggota => `
        <div class="anggota-card" data-tingkatan="${anggota.tingkatan}">
            <div class="anggota-foto">
                <img src="${anggota.foto}" alt="${anggota.nama}" onerror="this.src='images/anggota/default.jpg'">
            </div>
            <div class="anggota-info">
                <h3>${anggota.nama}</h3>
                <div class="anggota-jabatan">${anggota.jabatan}</div>
                <div class="anggota-detail">
                    <p><i class="fas fa-layer-group"></i> ${anggota.divisi}</p>
                    <p><i class="fas fa-graduation-cap"></i> ${anggota.kelas}</p>
                </div>
                <div class="anggota-motto">
                    <p>"${anggota.motto}"</p>
                </div>
                <span class="anggota-status status-${anggota.tingkatan}">
                    ${anggota.tingkatan.toUpperCase()}
                </span>
            </div>
        </div>
    `).join('');
}

// ===== FILTER DAN SEARCH =====
function setupAnggotaFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchAnggota');
    
    if (!filterButtons.length || !searchInput) return;
    
    // Filter button click
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            const searchTerm = searchInput.value;
            renderAnggota(filter, searchTerm);
        });
    });
    
    // Search input
    searchInput.addEventListener('input', () => {
        const activeFilter = document.querySelector('.filter-btn.active');
        const filter = activeFilter ? activeFilter.dataset.filter : 'all';
        renderAnggota(filter, searchInput.value);
    });
}

// ===== ANIMASI STATISTIK =====
function animateStats() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    // Halaman Anggota
    if (document.getElementById('anggotaContainer')) {
        renderAnggota();
        setupAnggotaFilter();
        animateStats();
    }
    
    // Halaman Struktur - Animasi card
    const strukturCards = document.querySelectorAll('.struktur-item, .divisi-card');
    strukturCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Print button untuk halaman struktur
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> Print Struktur';
    printButton.className = 'print-btn';
    printButton.style.position = 'fixed';
    printButton.style.bottom = '20px';
    printButton.style.right = '80px';
    printButton.style.backgroundColor = 'var(--primary-color)';
    printButton.style.color = 'white';
    printButton.style.border = 'none';
    printButton.style.padding = '10px 20px';
    printButton.style.borderRadius = '5px';
    printButton.style.cursor = 'pointer';
    printButton.style.zIndex = '1000';
    printButton.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    
    printButton.addEventListener('click', () => {
        window.print();
    });
    
    if (document.querySelector('.struktur-diagram')) {
        document.body.appendChild(printButton);
    }
});

// ===== EXPORT DATA ANGGOTA KE CSV =====
function exportToCSV() {
    const headers = ['Nama', 'Jabatan', 'Divisi', 'Tingkatan', 'Kelas', 'Motto', 'WhatsApp'];
    const csvData = [
        headers.join(','),
        ...anggotaData.map(anggota => [
            anggota.nama,
            anggota.jabatan,
            anggota.divisi,
            anggota.tingkatan,
            anggota.kelas,
            anggota.motto,
            anggota.whatsapp
        ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data-anggota-pks.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Tambahkan export button di halaman anggota
function addExportButton() {
    if (!document.getElementById('anggotaContainer')) return;
    
    const exportBtn = document.createElement('button');
    exportBtn.innerHTML = '<i class="fas fa-download"></i> Export Data';
    exportBtn.className = 'export-btn';
    exportBtn.style.backgroundColor = '#28a745';
    exportBtn.style.color = 'white';
    exportBtn.style.border = 'none';
    exportBtn.style.padding = '10px 20px';
    exportBtn.style.borderRadius = '5px';
    exportBtn.style.cursor = 'pointer';
    exportBtn.style.marginTop = '20px';
    exportBtn.style.display = 'block';
    exportBtn.style.marginLeft = 'auto';
    exportBtn.style.marginRight = 'auto';
    
    exportBtn.addEventListener('click', exportToCSV);
    
    const container = document.querySelector('.anggota-section .container');
    if (container) {
        container.appendChild(exportBtn);
    }
}

// Panggil addExportButton saat halaman anggota dimuat
if (document.getElementById('anggotaContainer')) {
    addExportButton();
}
// ===== DATA GALERI FOTO =====
const galeriData = [
    // Latihan Rutin
    {
        id: 1,
        kategori: "latihan",
        judul: "Latihan PBB Dasar",
        deskripsi: "Anggota muda belajar sikap sempurna",
        tanggal: "15 Jan 2023",
        foto: "images/latihan/lat1.jpg",
        likes: 24,
        views: 156
    },
    {
        id: 2,
        kategori: "latihan",
        judul: "Formasi Upacara",
        deskripsi: "Persiapan upacara bendera hari Senin",
        tanggal: "22 Jan 2023",
        foto: "images/latihan/lat2.jpg",
        likes: 31,
        views: 189
    },
    {
        id: 3,
        kategori: "latihan",
        judul: "Latihan Fisik",
        deskripsi: "Senam pagi untuk kebugaran anggota",
        tanggal: "29 Jan 2023",
        foto: "images/latihan/lat3.jpg",
        likes: 19,
        views: 142
    },
    {
        id: 4,
        kategori: "latihan",
        judul: "Pelatihan Baris-berbaris",
        deskripsi: "Instruktur memberikan pengarahan",
        tanggal: "5 Feb 2023",
        foto: "images/latihan/lat4.jpg",
        likes: 42,
        views: 203
    },
    
    // Kegiatan
    {
        id: 5,
        kategori: "kegiatan",
        judul: "Pelantikan Anggota",
        deskripsi: "Upacara pelantikan anggota baru PKS",
        tanggal: "12 Feb 2023",
        foto: "images/kegiatan/keg1.jpg",
        likes: 67,
        views: 287
    },
    {
        id: 6,
        kategori: "kegiatan",
        judul: "Bakti Sosial",
        deskripsi: "Membersihkan lingkungan sekolah",
        tanggal: "19 Feb 2023",
        foto: "images/kegiatan/keg2.jpg",
        likes: 53,
        views: 234
    },
    {
        id: 7,
        kategori: "kegiatan",
        judul: "Seminar Kedisiplinan",
        deskripsi: "Pembicara dari kepolisian setempat",
        tanggal: "26 Feb 2023",
        foto: "images/kegiatan/keg3.jpg",
        likes: 38,
        views: 198
    },
    
    // Random
    {
        id: 8,
        kategori: "random",
        judul: "Break Time",
        deskripsi: "Istirahat setelah latihan",
        tanggal: "8 Jan 2023",
        foto: "images/random/rand1.jpg",
        likes: 45,
        views: 167
    },
    {
        id: 9,
        kategori: "random",
        judul: "Team Building",
        deskripsi: "Kegiatan pengakraban anggota",
        tanggal: "15 Jan 2023",
        foto: "images/random/rand2.jpg",
        likes: 61,
        views: 213
    },
    {
        id: 10,
        kategori: "random",
        judul: "Candid Moment",
        deskripsi: "Potret spontan saat latihan",
        tanggal: "22 Jan 2023",
        foto: "images/random/rand3.jpg",
        likes: 29,
        views: 145
    },
    {
        id: 11,
        kategori: "random",
        judul: "Bersama Pembina",
        deskripsi: "Diskusi informal dengan guru pembina",
        tanggal: "29 Jan 2023",
        foto: "images/random/rand4.jpg",
        likes: 34,
        views: 178
    },
    
    // Upacara
    {
        id: 12,
        kategori: "upacara",
        judul: "Upacara Bendera",
        deskripsi: "Hari Senin yang khidmat",
        tanggal: "9 Jan 2023",
        foto: "images/upacara/up1.jpg",
        likes: 72,
        views: 256
    },
    {
        id: 13,
        kategori: "upacara",
        judul: "Penghormatan Bendera",
        deskripsi: "Detik-detik pengibaran bendera",
        tanggal: "16 Jan 2023",
        foto: "images/upacara/up2.jpg",
        likes: 58,
        views: 221
    },
    {
        id: 14,
        kategori: "upacara",
        judul: "Tim Pengibar Bendera",
        deskripsi: "Anggota PKS bertugas sebagai Paskibra",
        tanggal: "23 Jan 2023",
        foto: "images/upacara/up3.jpg",
        likes: 49,
        views: 194
    }
];

// ===== FUNGSI GALERI =====
let currentFilter = 'all';
let currentSort = 'newest';
let visibleCount = 8;

function renderGaleri() {
    const container = document.getElementById('galeriContainer');
    if (!container) return;
    
    // Filter data
    let filteredData = galeriData;
    
    if (currentFilter !== 'all') {
        filteredData = galeriData.filter(item => item.kategori === currentFilter);
    }
    
    // Sort data
    filteredData.sort((a, b) => {
        switch(currentSort) {
            case 'newest':
                return new Date(b.tanggal) - new Date(a.tanggal);
            case 'oldest':
                return new Date(a.tanggal) - new Date(b.tanggal);
            case 'name':
                return a.judul.localeCompare(b.judul);
            default:
                return 0;
        }
    });
    
    // Limit jumlah yang ditampilkan
    const displayData = filteredData.slice(0, visibleCount);
    
    // Render HTML
    container.innerHTML = displayData.map(item => `
        <div class="galeri-item" data-id="${item.id}" data-kategori="${item.kategori}">
            <img src="${item.foto}" alt="${item.judul}" 
                 onerror="this.src='images/placeholder.jpg'">
            <div class="galeri-info">
                <span class="galeri-category">${getCategoryName(item.kategori)}</span>
                <h4 class="galeri-title">${item.judul}</h4>
                <p class="galeri-date">${item.tanggal}</p>
                <div class="galeri-stats-small">
                    <span><i class="fas fa-heart"></i> ${item.likes}</span>
                    <span><i class="fas fa-eye"></i> ${item.views}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Update stats
    updateGaleriStats(filteredData.length);
    
    // Setup modal click
    setupGaleriModal();
    
    // Tampilkan/tutup load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        if (visibleCount >= filteredData.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }
}

function getCategoryName(kategori) {
    const categories = {
        'latihan': 'Latihan',
        'kegiatan': 'Kegiatan',
        'random': 'Random',
        'upacara': 'Upacara'
    };
    return categories[kategori] || kategori;
}

function updateGaleriStats(total) {
    const totalPhotos = document.getElementById('totalPhotos');
    const latestUpdate = document.getElementById('latestUpdate');
    
    if (totalPhotos) {
        totalPhotos.textContent = total;
    }
    
    if (latestUpdate && galeriData.length > 0) {
        const latest = galeriData.reduce((latest, item) => {
            return new Date(item.tanggal) > new Date(latest.tanggal) ? item : latest;
        });
        latestUpdate.textContent = latest.tanggal.split(' ')[2]; // Ambil tahun saja
    }
}

function setupGaleriFilter() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sortSelect = document.getElementById('sortSelect');
    
    if (!tabBtns.length || !sortSelect) return;
    
    // Tab filter click
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            currentFilter = btn.dataset.filter;
            visibleCount = 8; // Reset ke awal
            renderGaleri();
        });
    });
    
    // Sort select change
    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        renderGaleri();
    });
    
    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleCount += 8;
            renderGaleri();
            
            // Scroll ke posisi yang sesuai
            const lastItem = document.querySelector('.galeri-item:last-child');
            if (lastItem) {
                lastItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }
}

// ===== MODAL GALERI =====
let currentModalIndex = 0;
let filteredGaleriData = [];

function setupGaleriModal() {
    const galeriItems = document.querySelectorAll('.galeri-item');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    
    if (!modal) return;
    
    galeriItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Get current filtered data
            filteredGaleriData = Array.from(galeriItems).map((el, idx) => ({
                element: el,
                index: idx
            }));
            
            // Find clicked item index
            currentModalIndex = index;
            
            // Show modal with image
            const imgSrc = item.querySelector('img').src;
            const title = item.querySelector('.galeri-title').textContent;
            const category = item.querySelector('.galeri-category').textContent;
            
            modal.style.display = 'block';
            modalImg.src = imgSrc;
            modalCaption.innerHTML = `
                <h3>${title}</h3>
                <p><strong>Kategori:</strong> ${category}</p>
                <p><strong>Tanggal:</strong> ${galeriData.find(g => g.foto === imgSrc.split('/').pop())?.tanggal || ''}</p>
            `;
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Navigation
    if (modalPrev) {
        modalPrev.addEventListener('click', () => {
            currentModalIndex = (currentModalIndex - 1 + filteredGaleriData.length) % filteredGaleriData.length;
            updateModalImage();
        });
    }
    
    if (modalNext) {
        modalNext.addEventListener('click', () => {
            currentModalIndex = (currentModalIndex + 1) % filteredGaleriData.length;
            updateModalImage();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                currentModalIndex = (currentModalIndex - 1 + filteredGaleriData.length) % filteredGaleriData.length;
                updateModalImage();
            } else if (e.key === 'ArrowRight') {
                currentModalIndex = (currentModalIndex + 1) % filteredGaleriData.length;
                updateModalImage();
            }
        }
    });
    
    function updateModalImage() {
        const item = filteredGaleriData[currentModalIndex].element;
        const imgSrc = item.querySelector('img').src;
        const title = item.querySelector('.galeri-title').textContent;
        const category = item.querySelector('.galeri-category').textContent;
        
        modalImg.src = imgSrc;
        modalCaption.innerHTML = `
            <h3>${title}</h3>
            <p><strong>Kategori:</strong> ${category}</p>
            <p><strong>Tanggal:</strong> ${galeriData.find(g => g.foto === imgSrc.split('/').pop())?.tanggal || ''}</p>
        `;
    }
}

// ===== CHART DOKUMENTASI =====
function initChart() {
    const ctx = document.getElementById('kehadiranChart');
    if (!ctx) return;
    
    // Destroy existing chart if any
    if (window.kehadiranChartInstance) {
        window.kehadiranChartInstance.destroy();
    }
    
    window.kehadiranChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
            datasets: [
                {
                    label: 'Latihan PBB',
                    data: [85, 82, 88, 87, 85, 83],
                    backgroundColor: '#8B4513',
                    borderColor: '#8B4513',
                    borderWidth: 1
                },
                {
                    label: 'Latihan Teori',
                    data: [78, 76, 79, 81, 78, 80],
                    backgroundColor: '#D2691E',
                    borderColor: '#D2691E',
                    borderWidth: 1
                },
                {
                    label: 'Latihan Fisik',
                    data: [92, 90, 93, 91, 92, 94],
                    backgroundColor: '#FFA500',
                    borderColor: '#FFA500',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Persentase Kehadiran (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Bulan'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Statistik Kehadiran Latihan 2023'
                }
            }
        }
    });
}

// ===== DOWNLOAD HANDLER =====
function setupDownloadButtons() {
    const downloadBtns = document.querySelectorAll('.btn-download, .download-btn');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Simulasi download
            const fileName = btn.closest('.materi-card')?.querySelector('h3')?.textContent || 'document';
            const fileType = btn.textContent.includes('PDF') ? 'pdf' : 
                           btn.textContent.includes('PPT') ? 'ppt' :
                           btn.textContent.includes('DOC') ? 'doc' : 'file';
            
            // Show download notification
            showNotification(`Mengunduh ${fileName}.${fileType}...`, 'success');
            
            // In real implementation, this would link to actual file
            console.log(`Downloading: ${fileName}.${fileType}`);
        });
    });
}

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Style notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.backgroundColor = type === 'success' ? '#28a745' : 
                                       type === 'error' ? '#dc3545' : '#007bff';
    notification.style.color = 'white';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    notification.style.zIndex = '3000';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.gap = '15px';
    notification.style.animation = 'slideIn 0.3s ease';
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.color = 'white';
    closeBtn.style.fontSize = '1.5rem';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.padding = '0';
    closeBtn.style.width = '30px';
    closeBtn.style.height = '30px';
    closeBtn.style.display = 'flex';
    closeBtn.style.alignItems = 'center';
    closeBtn.style.justifyContent = 'center';
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
    
    // Add to body
    document.body.appendChild(notification);
    
    // Add animation styles
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    // Halaman Galeri
    if (document.getElementById('galeriContainer')) {
        renderGaleri();
        setupGaleriFilter();
    }
    
    // Halaman Dokumentasi
    if (document.getElementById('kehadiranChart')) {
        initChart();
        setupDownloadButtons();
    }
    
    // Smooth scroll untuk anchor links di semua halaman
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});
// ===== PROGRAM KERJA - KALENDER =====
function initCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;
    
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'id',
        firstDay: 1, // Senin
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listMonth'
        },
        buttonText: {
            today: 'Hari Ini',
            month: 'Bulan',
            week: 'Minggu',
            list: 'Agenda'
        },
        events: [
            {
                title: 'Latihan PBB',
                start: '2023-01-06',
                end: '2023-01-06',
                color: '#8B4513',
                extendedProps: {
                    description: 'Latihan rutin Peraturan Baris Berbaris',
                    location: 'Lapangan Upacara',
                    time: '15:00-17:00'
                }
            },
            {
                title: 'Rapat Pengurus',
                start: '2023-01-10',
                end: '2023-01-10',
                color: '#007bff',
                extendedProps: {
                    description: 'Rapat evaluasi bulanan',
                    location: 'Ruang PKS',
                    time: '14:00-16:00'
                }
            },
            {
                title: 'Pelantikan Anggota',
                start: '2023-01-15',
                end: '2023-01-15',
                color: '#D2691E',
                extendedProps: {
                    description: 'Upacara pelantikan anggota baru',
                    location: 'Aula Sekolah',
                    time: '07:00-09:00'
                }
            },
            {
                title: 'Latihan Gabungan',
                start: '2023-01-22',
                end: '2023-01-22',
                color: '#8B4513',
                extendedProps: {
                    description: 'Latihan seluruh anggota',
                    location: 'Lapangan Sekolah',
                    time: '15:00-17:00'
                }
            },
            {
                title: 'Evaluasi Bulanan',
                start: '2023-01-28',
                end: '2023-01-28',
                color: '#28a745',
                extendedProps: {
                    description: 'Evaluasi kegiatan Januari',
                    location: 'Ruang Multimedia',
                    time: '13:00-15:00'
                }
            },
            {
                title: 'Bakti Sosial',
                start: '2023-02-05',
                end: '2023-02-05',
                color: '#D2691E',
                extendedProps: {
                    description: 'Membersihkan lingkungan sekolah',
                    location: 'Area Sekolah',
                    time: '08:00-11:00'
                }
            },
            {
                title: 'Seminar Kedisiplinan',
                start: '2023-02-12',
                end: '2023-02-12',
                color: '#ffc107',
                extendedProps: {
                    description: 'Seminar dengan pembicara dari kepolisian',
                    location: 'Ruang Multimedia',
                    time: '09:00-12:00'
                }
            }
        ],
        eventClick: function(info) {
            const event = info.event;
            const modalContent = `
                <div class="event-modal">
                    <h3>${event.title}</h3>
                    <div class="event-details">
                        <p><strong>Deskripsi:</strong> ${event.extendedProps.description}</p>
                        <p><strong>Tanggal:</strong> ${event.start.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p><strong>Waktu:</strong> ${event.extendedProps.time}</p>
                        <p><strong>Lokasi:</strong> ${event.extendedProps.location}</p>
                    </div>
                </div>
            `;
            
            showModal('Detail Kegiatan', modalContent);
        },
        eventMouseEnter: function(info) {
            info.el.style.cursor = 'pointer';
            info.el.style.opacity = '0.9';
        },
        eventMouseLeave: function(info) {
            info.el.style.opacity = '1';
        }
    });
    
    calendar.render();
}

// ===== PROGRAM BULANAN =====
function initMonthTabs() {
    const monthTabs = document.querySelectorAll('.month-tab');
    const monthContents = document.querySelectorAll('.month-program');
    
    if (!monthTabs.length || !monthContents.length) return;
    
    monthTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            monthTabs.forEach(t => t.classList.remove('active'));
            monthContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const monthId = tab.dataset.month;
            const content = document.getElementById(monthId);
            if (content) {
                content.classList.add('active');
            }
        });
    });
}

// ===== FORM KONTAK =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            newsletter: document.getElementById('newsletter').checked,
            timestamp: new Date().toISOString()
        };
        
        // Validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showNotification('Harap isi semua field yang wajib diisi!', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Format email tidak valid!', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Mengirim pesan...', 'info');
        
        setTimeout(() => {
            // Save to localStorage (simulate database)
            const messages = JSON.parse(localStorage.getItem('pks_messages') || '[]');
            messages.push(formData);
            localStorage.setItem('pks_messages', JSON.stringify(messages));
            
            // Show success message
            showNotification('Pesan berhasil dikirim! Kami akan membalas secepatnya.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Log to console (for debugging)
            console.log('Pesan baru:', formData);
        }, 1500);
    });
}

// ===== FAQ TOGGLE =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ===== MODAL UTILITY =====
function showModal(title, content) {
    // Remove existing modal
    const existingModal = document.querySelector('.custom-modal');
    if (existingModal) existingModal.remove();
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-footer">
                <button class="btn-close">Tutup</button>
            </div>
        </div>
    `;
    
    // Add styles
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .custom-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
            }
            
            .modal-content {
                position: relative;
                background: white;
                border-radius: 10px;
                width: 90%;
                max-width: 500px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                animation: slideUp 0.3s;
            }
            
            .modal-header {
                padding: 20px;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h3 {
                color: var(--primary-color);
                margin: 0;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .modal-footer {
                padding: 20px;
                border-top: 1px solid #eee;
                text-align: right;
            }
            
            .btn-close {
                padding: 8px 20px;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: 500;
            }
            
            .event-details p {
                margin-bottom: 10px;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to body
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    const btnClose = modal.querySelector('.btn-close');
    
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s';
        modal.querySelector('.modal-content').style.animation = 'slideDown 0.3s';
        
        // Add exit animations
        if (!document.querySelector('#modal-exit-styles')) {
            const exitStyle = document.createElement('style');
            exitStyle.id = 'modal-exit-styles';
            exitStyle.textContent = `
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                
                @keyframes slideDown {
                    from { transform: translateY(0); opacity: 1; }
                    to { transform: translateY(30px); opacity: 0; }
                }
            `;
            document.head.appendChild(exitStyle);
        }
        
        setTimeout(() => modal.remove(), 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    btnClose.addEventListener('click', closeModal);
    
    // Close on Escape key
    document.addEventListener('keydown', function onEsc(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', onEsc);
        }
    });
}

// ===== PROGRESS ANIMATION =====
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease';
            bar.style.width = width;
        }, 500);
    });
}

// ===== INITIALIZE ALL =====
document.addEventListener('DOMContentLoaded', () => {
    // Program Kerja
    if (document.getElementById('calendar')) {
        initCalendar();
        initMonthTabs();
        
        // Animate progress bars when in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        const progressSection = document.querySelector('.progress-section');
        if (progressSection) observer.observe(progressSection);
    }
    
    // Kontak
    if (document.getElementById('contactForm')) {
        initContactForm();
        initFAQ();
    }
    
    // Download buttons
    setupDownloadButtons();
    
    // Add current year to footer
    const yearElements = document.querySelectorAll('.current-year, .footer-bottom p');
    yearElements.forEach(el => {
        if (el.textContent.includes('2023')) {
            el.textContent = el.textContent.replace('2023', new Date().getFullYear());
        }
    });
});
