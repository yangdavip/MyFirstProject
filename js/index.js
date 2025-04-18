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
let loveText = `📝心扬，我希望你每天都能那么爱笑。你笑起来真的很治愈，喜欢看到你开心的样子，我也会特别开心。<br>
🤗我喜欢你分享给我你每天的快乐亦或是烦恼，听你感悟，听你诉说。给我看你拍的照片，告诉我你遇见了哪些有趣的事情，让我了解你的生活。我还想听你关于未来的憧憬，关于内心的探索，也可以是你生活中的琐事。我愿意承受你所有的负面情绪，我会给你安慰，我希望你能变得积极变得更好。<br>
💪当你工作压力大的时候，你要知道还有我一直支持你，你已经很努力了，我可以帮你承担一些事情。在任何一个夜晚里，我都不允许你哭泣。难过的时候希望你能告诉我。<br>
💗我嘴笨，不善言辞。但我有许多的话想对你说。你的漂亮可爱、温柔善良，还有内心的独立和坚强，好想慢慢了解你的所有。不知从什么时候开始，我开始想你，心神不宁，总是无意间想起你。想你在干嘛，想你有没有想起我。我担心过表白会让你认为我轻浮，可当我一个晚上连续梦到你三次，反反复复想起你。我觉得我不能独自忍受这种爱却不说出来的滋味。我还有很多事情要做，我不能内耗。在我认识你之前，我从来不想去关注或参与任何人的生活。但在认识你之后，我希望我能出现在你今后的生活里。我开始期待与你见面，期待与你相处，期待与你经历更多的故事。我希望我能爱你，那会使我对未来更有憧憬付出的更有动力，而不是像现在这样无的放矢，面对你时不知所措。<br>
爱需要时间去证明，但前提是需要有一个身份。我还不确定你的心意。我谨慎，有些克制，我怕靠得太近给你压力，怕爱意表达的过于浓烈让你手足无措。可是我偏偏又很真诚，我藏不住对你的喜欢，忍不住想你。我并不完美，也没有没什么条件，但我足够认真，我有一颗真诚对你的心，我希望成为你重要的人，我愿意用全部温柔去守护你。无论是清晨的阳光，还是夜晚的月亮，我都想第一时间与你分享；无论是雨天还是雪天都想第一时间为你撑起伞，在你的每个重要时刻都有我的出现。<br>
我本以为你就是幸福家庭成长的孩子一样，平平无奇。我没想到你会和我有相似的经历，我虽然不曾见证你的过去，但我能想象到那些难过的日子里你坚强的样子。曾经吃过许多苦也仍然积极乐观向上生长，你也在无人指引的成长路上拥有自己的品格——谦卑认真有责任心。我见过很多女生，但遇见你让我有一种遇见命定之人的感觉，灵魂是如此契合。我本来不相信有运气，是遇见你，让我觉得，缘分真就有巧妙安排的冥冥天意。<br>
如果我是一个强盗，我恨不得现在就跑过去把你抢回来做压寨夫人。但我是一个读书人，我要彬彬有礼谦谦君子，用克制与温柔与你相识，待你以赤诚之心。每个人都见过许多优秀的人，心目中可能有自己的理想型，我不想让你感受到压力，如果你没想好怎么回答，那你就不回应我，慢慢的不再理我。如果你也喜欢我，我希望我们可以在一起。<br>`;
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
