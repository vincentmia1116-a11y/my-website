document.addEventListener("DOMContentLoaded", () => {
    
    // Initialize Lenis for Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    // Integrated Lenis requestAnimationFrame with GSAP ticker
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger with Lenis
    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        
        lenis.on('scroll', ScrollTrigger.update);
        
        gsap.ticker.add((time)=>{
          lenis.raf(time * 1000)
        });
        
        gsap.ticker.lagSmoothing(0)
    }

    // -- GSAP Animations --
    
    // 1. Hero Reveal Animation (Intense & Impactful)
    const heroTl = gsap.timeline({ defaults: { ease: "expo.out", duration: 2 }});
    heroTl.from(".hero-bg", { scale: 1.5, duration: 2.5, filter: "brightness(0) grayscale(100%)", ease: "power2.out" })
          .from(".hero-title", { 
              scale: 5,               /* 画面を覆うほど巨大なサイズから */
              opacity: 0, 
              rotationX: 90,          /* 3D的に倒れた状態から起き上がる */
              y: -200,                /* 上から降ってくる */
              letterSpacing: "0.5em", /* 文字の間隔が広がった状態からギュッと締まる */
              duration: 2, 
              ease: "elastic.out(1, 0.4)" /* ドスンとバウンドする激しい動き */
          }, "-=2.0")
          .from(".hero-subtitle", { 
              scale: 1.5, 
              opacity: 0, 
              rotationZ: 10,          /* 斜めに傾いた状態から */
              y: 100, 
              letterSpacing: "1em",   /* 文字全体が大きく広がった状態からスッと集まる */
              duration: 1.5, 
              ease: "power4.out" 
          }, "-=1.7");
          
    // 2. Hero Background Parallax
    gsap.to(".hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // 3. Section Titles Reveal (Dynamic)
    gsap.utils.toArray(".section-title").forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
            },
            y: 80,
            opacity: 0,
            scale: 1.3, /* 少し大きい状態から */
            letterSpacing: "0.4em", /* 文字が広がった状態から引き締まる */
            rotationX: -60, /* 奥から起き上がるような3D回転 */
            transformOrigin: "top center",
            duration: 1.5,
            ease: "back.out(2)" /* 最終的に「ビヨン」と少し弾んで定位置に収まる */
        });
    });

    // 4. About Image Parallax & Text Reveal
    gsap.from(".about-image", {
        scrollTrigger: {
            trigger: ".about-grid",
            start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });
    
    gsap.to(".about-image img", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
            trigger: ".about-image",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.from(".about-text p", {
        scrollTrigger: {
            trigger: ".about-text",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2
    });

    // 5. Works Text List Reveal & Scatter
    const workItems = gsap.utils.toArray(".works-item");
    workItems.forEach((item) => {
        // Random horizontal margin between 0% and 50%
        const randomMargin = Math.random() * 50;
        item.style.paddingLeft = `${randomMargin}%`;
    });

    gsap.from(workItems, {
        scrollTrigger: {
            trigger: ".works-list",
            start: "top 80%",
        },
        x: () => gsap.utils.random(-80, 80), // Slide in from random x
        y: () => gsap.utils.random(50, 100), // Slide up from random y
        rotationZ: () => gsap.utils.random(-8, 8), // Start with random rotation
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.1
    });

    // Editorial Gallery Parallax
    gsap.to(".gallery-text", {
        yPercent: -15, /* テキストは少しだけパララックス（被りを防止） */
        ease: "none",
        scrollTrigger: {
            trigger: ".editorial-gallery",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });
    gsap.to(".item-left", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
            trigger: ".editorial-gallery",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });
    gsap.to(".item-right", {
        yPercent: -50, // 右の大きい画像をより早く動かす（奥行きの演出）
        ease: "none",
        scrollTrigger: {
            trigger: ".editorial-gallery",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });

    // 6. Pricing Reveal
    gsap.from(".pricing-desc, .pdf-container", {
        scrollTrigger: {
            trigger: ".pricing",
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2
    });

    // 7. Contact Reveal
    gsap.from(".contact-desc, .contact-form", {
        scrollTrigger: {
            trigger: ".contact",
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2
    });

    console.log("Main JS Loaded, GSAP and Lenis Initialized.");
});
