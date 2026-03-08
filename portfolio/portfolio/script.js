// ===== 1. About Me 버튼 (홈 섹션 내에서 아래로 스크롤) =====
function scrollToAbout() {
    const aboutElement = document.getElementById("about");
    if (aboutElement) {
        // 현재 활성화된 섹션이 home일 때만 스크롤
        aboutElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

// ===== 2. 네비게이션 클릭 시 섹션 전환 =====
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".content-section");

navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        const targetId = this.getAttribute("href");

        if (targetId.startsWith("#")) {
            e.preventDefault();

            // 모든 섹션 비활성화
            sections.forEach(sec => {
                sec.classList.remove("active");
            });

            // 타겟 섹션 활성화
            const target = document.querySelector(targetId);
            if (target) {
                target.classList.add("active");
                // 새 섹션으로 넘어갈 때 항상 맨 위로
                window.scrollTo({ top: 0 }); 
                
                // [효과] 새 섹션이 나타날 때 내부 요소들 애니메이션 재실행
                const reveals = target.querySelectorAll('.reveal');
                reveals.forEach(el => el.classList.remove('show')); 
                setTimeout(() => {
                    reveals.forEach(el => el.classList.add('show'));
                }, 50);
            }
        }
    });
});

// ===== 3. 스크롤 애니메이션 효과 (Intersection Observer) =====
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

// 페이지 로드 시 모든 reveal 요소 감시 시작
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
});