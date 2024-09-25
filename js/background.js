(() => {
    'use strict';
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const diameter = 15;
    let width = 0, height = 0, halfWidth = 0, frame, time = 0, destination = 1;
  
    const resize = () => {
      cancelAnimationFrame(frame);
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      halfWidth = width / 2;
      ctx.globalCompositeOperation = 'lighter';
      loop();
    };
  
    const loop = () => {
      frame = requestAnimationFrame(loop);
      time += (destination - time) * 0.1;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < height; i += diameter) {
        for (let j = 0; j < halfWidth; j += diameter) {
          for (let channel = 0; channel < 3; channel++) {
            if (channel === 0) ctx.fillStyle = '#FF0000';
            if (channel === 1) ctx.fillStyle = '#00FF00';
            if (channel === 2) ctx.fillStyle = '#0000FF';
            const index = i * width + j;
            ctx.globalAlpha = Math.tan(index * index - time);
            ctx.fillRect(
              Math.tan(i * j - Math.sin(index + channel / 100) + time) * j + halfWidth - diameter / 2,
              i,
              Math.tan(index + i / j + time + channel / 100) / 2 * diameter / 2,
              Math.tan(index * index - time) * diameter / 2
            );
          }
        }
      }
    };
  
    window.onload = () => {
      ['mousemove', 'touchmove'].forEach(type => {
        window.addEventListener(type, event => {
          event.preventDefault();
          const e = !!event.touches ? event.touches[0] : event;
          destination = (e.pageX / width);
        });
      });
      canvas.style.background = '#000000';
      document.body.appendChild(canvas);
      resize();
      window.onresize = resize;
    };
  })();
  