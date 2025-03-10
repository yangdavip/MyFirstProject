/*
  Johan Karlsson, 2019
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/

class Particle {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.angle = Math.random() * Math.PI * 2;
    }
  
    move() {
      let zoom = 70;
      let stepSize = 0.5;
      let x = Math.floor(this.x);
      let y = Math.floor(this.y);
      let index = y * w + x;
      let isInside = index < imageBuffer.length && imageBuffer[index];
      if (isInside) {
        // This is cheating in the name of performance.
        // In a real flow field the strength varies over
        // the area of the field. Here we hard code it.
        // The visual result is acceptable
        //let strength = simplex.noise3D(this.x / zoom, this.y / zoom, ticker) * 4;
        let strength = 1;
        let xn = simplex.noise3D(this.x / zoom, this.y / zoom, ticker + 4000) * strength;
        let yn = simplex.noise3D(this.x / zoom, this.y / zoom, ticker + 8000) * strength;
        this.x += xn;
        this.y += yn;
      } else {
        this.angle += (Math.random() - 0.5) * 0.5;
        this.x += Math.cos(this.angle) * stepSize;
        this.y += Math.sin(this.angle) * stepSize;
      }
  
      if (this.x < 0) this.x = w;
      if (this.x > w) this.x = 0;
      if (this.y < 0) this.y = h;
      if (this.y > h) this.y = 0;
    }
  
    draw() {
      ctx.fillRect(this.x, this.y, 1, 1);
    }}
  
  
  let canvas;
  let ctx;
  let w, h;
  let imageBuffer;
  let particles;
  let ticker;
  let simplex;
  
  let textOpacity = 0;
let showText = false;
let loveText = `💗心扬，我希望你每天都能那么爱笑。只是看到你开心样子我就会特别开心。<br>
            💪当你工作压力大的时候，希望你会偷个懒，没有人会指责什么，也没有资格说什么，大家都是上班打工的，你已经很努力了。<br>
            🤗每天都在期待你的分享和倾诉，我愿意承受你所有的负面情绪，我会给你安慰，我希望这样你能变得更积极更好起来。<br>
            🌹在任何一个夜晚我都不允许你哭泣。我不想看到一朵即将绽放的玫瑰，在没有焕发娇艳的色彩前枯萎下去。<br>
            📝我嘴笨，不善言辞，不善表达情绪，是个沉默寡言的人。但我有许多的话想对你说。<br>当我觉得可能爱上你的时候，我会内耗自己，会想自己有什么值得你喜欢的地方，我不够高不够帅也不够有钱，我唯一能拿出的就是真心，我会给予爱，这是我最珍贵的东西。所以我怕失去，怕不被珍惜。<br><br>
3月9日笔，爱需要时间去证明，但前提需要有一个身份。我还不确定你的心意，我知道，偶尔分享生活那不是喜欢，会倾诉过去不是喜欢，日常的问候也不是喜欢。那些并不意味着你期待每一个闲暇的时光中有我。每个人都见过许许多多优秀的人，心目中有自己的理想型。因此如果你拒绝了我，我会坦然接受，我知道那是现在的我配不上你。我会仍然感谢在暗淡的日子里你像一束光突然照进来，你的漂亮可爱、你的温柔善良，你的独立且坚强，都令我动心，你满足我对妻子所有的幻想。<br>
我谨慎，有些克制，我怕靠得太近给你压力，怕爱意来的过于浓烈让你手足无措。可是我偏偏又很真诚，我藏不住对你的喜欢，忍不住想你，忍不住想爱你。<br>
              我担心过早的表白会让你觉得我这个人轻浮，但当我一个晚上连续梦到你三次，我觉得不能独自承受这种有爱不能说出来的滋味。我还有很多事情要做，我不能内耗。我本来不相信运气，但遇见你，让我觉得或许是有些缘分在冥冥天意的安排之中。<br>`;
console.log(loveText);
function setup() {
    ticker = 0;
    simplex = new SimplexNoise();
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    reset();
    window.addEventListener("resize", reset);
    
    // 在5秒后开始显示文字
    setTimeout(() => {
        showText = true;
    }, 5000);
  }
  
  function setupParticles() {
    particles = [];
    let nrOfParticles = w * h / 40;
    for (let i = 0; i < nrOfParticles; i++) {
      particles.push(new Particle());
    }
  }
  
  function reset() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    storeHeartInBuffer();
    setupParticles();
    ctx.fillRect(0, 0, w, h);
  }
  
  function draw() {
    requestAnimationFrame(draw);
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "red";
    particles.forEach(p => {
      p.move();
      p.draw();
    });
    ticker += 0.014;

    // 渐现文字
    if (showText) {
        if (textOpacity < 1) {
            textOpacity += 0.005;
        }
        const textContainer = document.querySelector('.text-content');
        textContainer.style.opacity = textOpacity;
        textContainer.innerHTML = loveText;
    }
  }
  
  function storeHeartInBuffer() {
    ctx.beginPath();
    for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
      let r = Math.min(w, h) * 0.025;
      let x = r * 16 * Math.pow(Math.sin(angle), 3);
      let y = -r * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
      ctx.lineTo(w / 2 + x, h * 0.45 + y);
    }
    ctx.stroke();
    ctx.fill();
  
    let image = ctx.getImageData(0, 0, w, h);
    imageBuffer = new Uint32Array(image.data.buffer);
  }
  
  setup();
  draw();
