window.addEventListener('DOMContentLoaded', () => {
    VANTA.NET({
      el: '#vanta',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.1,
      color: 0x7272b9
    })
    setTimeout(() => {
      const main = document.querySelector('main')
      main.style.opacity = 1
      main.style.filter = 'blur(0)'
    }, 1000)
  })
