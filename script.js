// ============================================
// وظائف التفاعل الأساسية
// ============================================

// 1. التبديل بين القائمة والهاتف
const menuBtn = document.querySelector('.menu-btn');
const navList = document.getElementById('navList');

menuBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// إغلاق القائمة عند النقر على رابط
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});

// 2. زر الاستكشاف
const exploreBtn = document.getElementById('exploreBtn');
exploreBtn.addEventListener('click', () => {
    document.getElementById('highlights').scrollIntoView({ behavior: 'smooth' });
    showToast('🏜️ مرحباً بك في عرعر!');
});

// 3. دالة عرض الرسائل
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        background: linear-gradient(135deg, #8b4513, #d4a574);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideUp 0.3s ease;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 4. تأثير الظهور عند التمرير
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.highlight-card, .attraction-item, .event-card, .footer-item, .timeline-content').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// 5. تأثير العد التصاعدي للإحصائيات
function animateStats() {
    const stats = document.querySelectorAll('.stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue);
                
                if (!isNaN(numericValue)) {
                    let current = 0;
                    const increment = numericValue / 50;
                    
                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= numericValue) {
                            target.textContent = finalValue;
                            clearInterval(counter);
                        } else {
                            target.textContent = Math.floor(current) + (finalValue.includes('+') ? '+' : '');
                        }
                    }, 30);
                }
                
                target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// 6. تأثير التمرير السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 7. تأثيرات Hover على البطاقات
document.querySelectorAll('.highlight-card, .attraction-item, .event-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
    });
});

// 8. تأثير عند تحريك الماوس على الصور
document.querySelectorAll('.attraction-item img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.15) rotate(2deg)';
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// 9. معالج تغيير حجم النافذة
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navList.classList.remove('active');
    }
});

// 10. تأثير التمرير على شريط التنقل
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.top-nav');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
    }
});

// 11. إضافة تأثيرات CSS ديناميكية
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideDown {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(20px);
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// 12. تفعيل الجاذبيات عند النقر
document.querySelectorAll('.attraction-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        const title = item.querySelector('.attraction-info h3').textContent;
        showToast(`🏛️ ${title} - اضغط لمعرفة المزيد`);
    });
});

// 13. تفعيل الفعاليات عند النقر
document.querySelectorAll('.event-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        showToast(`📢 ${title} - تابع معنا للمزيد`);
    });
});

// 14. تتبع الأداء
function trackPageLoad() {
    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`⏱️ وقت تحميل الصفحة: ${loadTime}ms`);
    });
}

// 15. معالج الأخطاء
window.addEventListener('error', (event) => {
    console.error('❌ خطأ:', event.error);
});

// 16. رسالة ترحيب في وحدة التحكم
console.log('%c🏜️ مرحباً بك في عرعر 🏜️', 'color: #8b4513; font-size: 18px; font-weight: bold;');
console.log('%cعاصمة الحدود الشمالية', 'color: #d4a574; font-size: 16px; font-style: italic;');
console.log('%c✨ استمتع برحلة فريدة في المدينة الخضراء ✨', 'color: #ff6b9d; font-size: 14px;');

// 17. تأثير إضافي: تغيير اللون عند التمرير على الخط الزمني
document.querySelectorAll('.timeline-marker').forEach(marker => {
    marker.addEventListener('mouseenter', function() {
        this.style.background = '#ff6b9d';
        this.style.boxShadow = '0 0 20px rgba(255, 107, 157, 0.5)';
    });
    
    marker.addEventListener('mouseleave', function() {
        this.style.background = '#ff6b9d';
        this.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
    });
});

// 18. تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
    addDynamicStyles();
    observeElements();
    animateStats();
    trackPageLoad();
});

// 19. تأثير إضافي: تفاعل عند التمرير على الإحصائيات
document.querySelectorAll('.stat-box').forEach(box => {
    box.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    box.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 20. وظيفة إضافية: عرض معلومات عند تحميل الصفحة
window.addEventListener('load', () => {
    showToast('🌟 أهلاً وسهلاً في عرعر!');
});
