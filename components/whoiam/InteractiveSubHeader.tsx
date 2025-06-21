import React, { useEffect, useRef, useState } from 'react';

const InteractiveSubHeader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [elementsVisible, setElementsVisible] = useState(0); // 0: none, 1: icon, 2: title, 3: subtitle

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
    const charArray = characters.split('');
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1 + Math.random() * canvas.height; // Start some drops off-screen or further down
    }

    let animationFrameId: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(18, 18, 18, 0.07)'; // Slightly less transparent for faster fade
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FFAA'; // accent-green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    
    // Sequential fade-in for icon and text
    const timers: number[] = []; // Changed NodeJS.Timeout[] to number[]
    timers.push(window.setTimeout(() => setElementsVisible(1), 300));  // Shield icon
    timers.push(window.setTimeout(() => setElementsVisible(2), 600));  // Title
    timers.push(window.setTimeout(() => setElementsVisible(3), 900)); // Subtitle

    return () => {
      cancelAnimationFrame(animationFrameId);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="relative h-[50vh] min-h-[300px] sm:min-h-[350px] flex flex-col items-center justify-center text-center p-4 overflow-hidden rounded-lg shadow-xl border border-gray-700/50">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 opacity-30"></canvas>
      
      <div className="relative z-10 flex flex-col items-center">
        <div 
          className={`transition-all duration-700 ease-out mb-6 ${elementsVisible >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-90'}`}
        >
          <div className="p-4 rounded-full bg-accent-blue/20 animate-pulse shadow-lg">
            <i className="fas fa-shield-alt text-5xl sm:text-6xl text-accent-blue text-glow-blue"></i>
          </div>
        </div>

        <h1 
          className={`text-3xl sm:text-4xl md:text-5xl font-headings font-bold text-accent-green mb-3 transition-all duration-700 ease-out ${elementsVisible >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          style={{ animationDelay: '0.3s' }}
        >
          Crafting Digital Defenses, Byte by Byte
        </h1>
        <p 
          className={`text-md sm:text-lg text-gray-300 max-w-xl transition-all duration-700 ease-out ${elementsVisible >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          style={{ animationDelay: '0.6s' }}
        >
          Welcome to my digital chronicle. Here, skills meet passion, and every challenge is a stepping stone to innovation and robust security solutions.
        </p>
      </div>
    </div>
  );
};

export default InteractiveSubHeader;