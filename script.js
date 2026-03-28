document.addEventListener('DOMContentLoaded', () => {
    // 语言切换逻辑
    const langBtn = document.getElementById('lang-toggle');
    const htmlTag = document.documentElement;

    // 默认语言
    let currentLang = 'en';

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'en' : 'zh';

        // 更新 html lang 属性
        htmlTag.setAttribute('lang', currentLang === 'zh' ? 'zh-CN' : 'en');

        // 更新所有带 data-zh / data-en 属性的元素
        const elements = document.querySelectorAll('[data-zh]');

        elements.forEach(el => {
            // 添加淡出效果
            el.style.opacity = '0';

            setTimeout(() => {
                if (currentLang === 'zh') {
                    if (el.tagName === 'INPUT') {
                        el.placeholder = el.getAttribute('placeholder').split(' / ')[1]; // 简化处理，实际项目可用 dataset
                        // 重新设置 placeholder (这里简单处理双语 placeholder)
                        if (el.getAttribute('placeholder').includes('/')) {
                            el.placeholder = "邮箱地址";
                        }
                    } else {
                        el.innerText = el.getAttribute('data-zh');
                    }
                } else {
                    if (el.tagName === 'INPUT') {
                        el.placeholder = "Email Address";
                    } else {
                        el.innerText = el.getAttribute('data-en');
                    }
                }
                // 淡入
                el.style.opacity = '1';
            }, 300);
        });

        // 更新按钮状态
        const spans = langBtn.querySelectorAll('span');
        if (currentLang === 'zh') {
            spans[0].classList.add('active');
            spans[0].style.fontWeight = 'bold';
            spans[1].classList.remove('active');
            spans[1].style.fontWeight = 'normal';
        } else {
            spans[0].classList.remove('active');
            spans[0].style.fontWeight = 'normal';
            spans[1].classList.add('active');
            spans[1].style.fontWeight = 'bold';
        }
    });

    // 修复输入框 placeholder 的初始显示
    const input = document.querySelector('input[type="email"]');
    if (input) input.placeholder = "邮箱地址";


    // 滚动动画 (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // 只触发一次
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(el => observer.observe(el));
});
