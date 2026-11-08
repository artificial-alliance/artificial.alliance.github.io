(()=>{'use strict';
  const tracks=[{"file":"study-01.mp3","duration":10.434782608695652,"bpm":92,"peaks":[0.073,0.102,0.106,0.111,0.099,0.09,0.089,0.089,0.091,0.092,0.091,0.092,0.107,0.098,0.096,0.102,0.105,0.111,0.123,0.113,0.098,0.085,0.06,0.025,0.075,0.101,0.11,0.121,0.108,0.099,0.091,0.09,0.09,0.091,0.093,0.093,0.107,0.095,0.09,0.088,0.087,0.092,0.108,0.105,0.1,0.093,0.07,0.031,0.076,0.1,0.111,0.126,0.114,0.103,0.102,0.101,0.101,0.102,0.1,0.1,0.111,0.103,0.099,0.101,0.107,0.11,0.117,0.114,0.112,0.114,0.081,0.037,0.077,0.106,0.112,0.123,0.109,0.099,0.092,0.088,0.087,0.087,0.089,0.092,0.107,0.1,0.094,0.095,0.092,0.092,0.111,0.102,0.096,0.09,0.068,0.029]},{"file":"study-02.mp3","duration":8.88888888888889,"bpm":108,"peaks":[0.081,0.094,0.102,0.103,0.096,0.093,0.089,0.084,0.08,0.097,0.086,0.082,0.082,0.083,0.084,0.084,0.083,0.082,0.099,0.088,0.082,0.072,0.055,0.026,0.089,0.093,0.107,0.101,0.099,0.095,0.103,0.091,0.081,0.077,0.079,0.078,0.095,0.086,0.084,0.085,0.085,0.083,0.081,0.077,0.07,0.082,0.051,0.022,0.088,0.094,0.099,0.097,0.093,0.087,0.081,0.078,0.076,0.095,0.083,0.08,0.082,0.082,0.082,0.082,0.08,0.077,0.096,0.08,0.072,0.062,0.047,0.02,0.089,0.091,0.095,0.1,0.099,0.098,0.095,0.091,0.088,0.102,0.089,0.084,0.082,0.082,0.084,0.085,0.086,0.086,0.101,0.087,0.078,0.066,0.048,0.02]},{"file":"study-03.mp3","duration":10.0,"bpm":96,"peaks":[0.07,0.11,0.122,0.119,0.118,0.115,0.108,0.102,0.101,0.096,0.095,0.098,0.102,0.099,0.101,0.112,0.104,0.101,0.099,0.094,0.088,0.079,0.06,0.025,0.075,0.114,0.13,0.133,0.118,0.119,0.108,0.108,0.097,0.097,0.091,0.093,0.091,0.094,0.095,0.11,0.105,0.104,0.101,0.1,0.096,0.082,0.062,0.027,0.078,0.11,0.121,0.119,0.118,0.113,0.108,0.103,0.099,0.097,0.094,0.094,0.098,0.097,0.098,0.113,0.107,0.103,0.103,0.098,0.095,0.083,0.065,0.029,0.077,0.107,0.121,0.128,0.116,0.113,0.109,0.106,0.097,0.095,0.093,0.088,0.09,0.087,0.09,0.103,0.097,0.094,0.094,0.094,0.089,0.083,0.061,0.026]}];
  const meta=[
    {title:'Harmonic',description:'Soft chords, a few notes in the air.',label:'HARMONIC',color:[193,174,255]},
    {title:'Sequence',description:'A small plucked idea, still moving.',label:'SEQUENCE',color:[170,205,255]},
    {title:'Rhythm',description:'Low tones, with some movement underneath.',label:'RHYTHM',color:[195,175,242]}
  ];
  let currentIndex=0;
  const audio=document.getElementById('audio');
  const play=document.getElementById('playButton'),playIcon=document.getElementById('playIcon');
  const seek=document.getElementById('seek'),volume=document.getElementById('volume'),loopButton=document.getElementById('loopButton');
  const waveform=document.getElementById('waveform'),visualCanvas=document.getElementById('visualCanvas'),stage=document.getElementById('visualizer');
  const studyButtons=[...document.querySelectorAll('.study-item')];
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function timeString(t){const n=Math.max(0,Math.floor(Number.isFinite(t)?t:0));return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`}
  function setPlayUI(){
    const playing=!audio.paused;
    playIcon.textContent=playing?'Ⅱ':'▶';
    playIcon.style.transform=playing?'translateX(0)':'translateX(2px)';
    play.setAttribute('aria-label',playing?'Pause '+meta[currentIndex].title:'Play '+meta[currentIndex].title);
    stage.classList.toggle('is-playing',playing);
    document.querySelector('.desk').dataset.state=playing?'playing':(audio.currentTime>0?'paused':'ready');
    document.getElementById('transportAction').innerHTML=playing?'PAUSE<br>STUDY':'PLAY<br>STUDY';
    document.getElementById('playbackStatusText').textContent=playing?'NOW PLAYING':(audio.currentTime>0?'PAUSED':'READY TO PLAY');
    studyButtons.forEach((b,j)=>{
      const active=j===currentIndex;
      b.setAttribute('aria-label',(active&&playing?'Pause ':'Play ')+meta[j].title);
      b.dataset.playing=String(active&&playing);
      const symbol=b.querySelector('i');if(symbol)symbol.textContent=active&&playing?'Ⅱ':'▶';
    });
  }
  function choose(i){
    if(i<0||i>=tracks.length)return;
    audio.pause();currentIndex=i;
    audio.src='../assets/audio/'+tracks[i].file;audio.load();
    document.getElementById('studyTitle').textContent=meta[i].title;
    document.getElementById('studyDescription').textContent=meta[i].description;
    document.getElementById('visualName').textContent=meta[i].label;
    document.getElementById('visualCounter').textContent=`0${i+1} / 03`;
    document.getElementById('selectionNumber').textContent=`0${i+1} / 03`;
    document.getElementById('timeDuration').textContent=timeString(tracks[i].duration);
    document.getElementById('timeCurrent').textContent='0:00';seek.value='0';
    studyButtons.forEach((b,j)=>{b.classList.toggle('active',i===j);b.setAttribute('aria-pressed',String(i===j))});
    setPlayUI();drawWave();drawArt(performance.now()/1000);
  }
  studyButtons.forEach(b=>b.addEventListener('click',async()=>{
    const chosen=Number(b.dataset.study);
    if(chosen===currentIndex&&!audio.paused){audio.pause();return;}
    if(chosen!==currentIndex)choose(chosen);
    try{await audio.play();}catch(e){
      document.getElementById('playbackStatusText').textContent='AUDIO UNAVAILABLE';
      console.warn('Unable to play audio study',e);
    }
  }));
  play.addEventListener('click',async()=>{if(audio.paused){try{await audio.play()}catch(e){console.warn('Audio playback could not start',e)}}else{audio.pause()}setPlayUI()});
  audio.addEventListener('play',setPlayUI);audio.addEventListener('pause',setPlayUI);audio.addEventListener('ended',()=>{if(!audio.loop)setPlayUI()});
  audio.addEventListener('loadedmetadata',()=>{document.getElementById('timeDuration').textContent=timeString(audio.duration||tracks[currentIndex].duration);drawWave()});
  audio.addEventListener('timeupdate',()=>{const d=audio.duration||tracks[currentIndex].duration;seek.value=String(Math.round((audio.currentTime/d)*1000));document.getElementById('timeCurrent').textContent=timeString(audio.currentTime);drawWave()});
  seek.addEventListener('input',()=>{const d=audio.duration||tracks[currentIndex].duration;audio.currentTime=Number(seek.value)/1000*d;document.getElementById('timeCurrent').textContent=timeString(audio.currentTime);drawWave();setPlayUI()});
  volume.addEventListener('input',()=>{audio.volume=Number(volume.value)/100});audio.volume=.8;
  loopButton.addEventListener('click',()=>{audio.loop=!audio.loop;loopButton.setAttribute('aria-pressed',String(audio.loop));loopButton.innerHTML='<span class="loop-icon" aria-hidden="true">↻</span> Loop '+(audio.loop?'on':'off')});
  function resizeCanvas(c){const r=c.getBoundingClientRect(),d=Math.min(2,window.devicePixelRatio||1);const w=Math.max(2,Math.floor(r.width*d)),h=Math.max(2,Math.floor(r.height*d));if(c.width!==w||c.height!==h){c.width=w;c.height=h}const ctx=c.getContext('2d');ctx.setTransform(d,0,0,d,0,0);return {ctx,w:r.width,h:r.height}}
  function drawWave(){const {ctx,w,h}=resizeCanvas(waveform),peaks=tracks[currentIndex].peaks,progress=Number(seek.value)/1000;ctx.clearRect(0,0,w,h);const n=peaks.length,gap=w/n;for(let i=0;i<n;i++){const normalized=Math.min(1,peaks[i]/.55);const barHeight=Math.max(4,Math.min(h-7,(.15+normalized*.8)*h));ctx.fillStyle=i/n<=progress?'#66518c':'#9486a4';ctx.globalAlpha=i/n<=progress?1:.65;ctx.fillRect(i*gap+1,(h-barHeight)/2,Math.max(1,gap-1.7),barHeight)}ctx.globalAlpha=1}
  let ptrX=0,ptrY=0,x=0,y=0;
  stage.addEventListener('pointermove',e=>{if(reduced)return;const r=stage.getBoundingClientRect();ptrX=((e.clientX-r.left)/r.width-.5);ptrY=((e.clientY-r.top)/r.height-.5)});
  stage.addEventListener('pointerleave',()=>{ptrX=0;ptrY=0});
  function drawArt(time){const {ctx,w,h}=resizeCanvas(visualCanvas),peaks=tracks[currentIndex].peaks,[r,g,b]=meta[currentIndex].color;
    ctx.clearRect(0,0,w,h);
    const active=!audio.paused;const phase=active?time*.12:time*.018;
    ctx.save();ctx.translate(x*12,y*12);
    for(let i=0;i<64;i++){
      const off=(i-31.5)/31.5;
      ctx.beginPath();
      for(let j=0;j<135;j++){
        const t=j/134,p=peaks[Math.min(95,Math.floor(t*96))],m=Math.pow(Math.sin(t*Math.PI),.77);
        const xp=w*(-.13+1.29*t)+off*31*Math.cos(t*4.6+phase*.6);
        const yp=h*(.50 + off*.205 + m*(.19*Math.sin(2*Math.PI*t+.40+off*.38+phase)+.035*Math.cos(5.2*Math.PI*t+off*4))*(.85+p*.60)) + off*12*Math.sin(t*5+phase);
        if(j===0)ctx.moveTo(xp,yp);else ctx.lineTo(xp,yp);
      }
      const focus=1-Math.abs(off);ctx.lineWidth=.55+focus*.36;ctx.strokeStyle=`rgba(${r},${g},${b},${.065+focus*.36})`;ctx.stroke();
    }
    // A softly refracted central trajectory: the geometry is the artwork, not a background effect.
    ctx.globalCompositeOperation='screen';ctx.beginPath();for(let j=0;j<180;j++){
      const t=j/179,m=Math.sin(Math.PI*t);const xp=w*(-.13+1.29*t),yp=h*(.5+m*(.19*Math.sin(t*2*Math.PI+.40+phase)));j?ctx.lineTo(xp,yp):ctx.moveTo(xp,yp)
    }ctx.lineWidth=1.7;ctx.strokeStyle=`rgba(${r},${g},${b},.75)`;ctx.shadowColor=`rgba(${r},${g},${b},.48)`;ctx.shadowBlur=18;ctx.stroke();ctx.restore()
  }
  let lastFrame=0;let frame=0;
  function tick(ms){frame=requestAnimationFrame(tick);if(document.hidden)return;if(ms-lastFrame<33)return;lastFrame=ms;if(!reduced){x+=(ptrX-x)*.047;y+=(ptrY-y)*.047;drawArt(ms/1000)}}
  if(!reduced)frame=requestAnimationFrame(tick);
  const ro=new ResizeObserver(()=>{drawWave();drawArt(0)});ro.observe(waveform);ro.observe(visualCanvas);
  const menu=document.getElementById('menu'),links=document.getElementById('navLinks');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Close −':'Menu +';links.classList.toggle('open',open)});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.textContent='Menu +';menu.setAttribute('aria-expanded','false')}));
  const hero=document.querySelector('.hero'),heroImage=document.getElementById('heroImage');let hx=0,hy=0,htx=0,hty=0;hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();htx=(e.clientX-r.left)/r.width-.5;hty=(e.clientY-r.top)/r.height-.5});hero.addEventListener('pointerleave',()=>{htx=0;hty=0});if(!reduced){function parallax(){hx+=(htx-hx)*.036;hy+=(hty-hy)*.036;heroImage.style.transform=`translate3d(${(-hx*18).toFixed(2)}px,${(-hy*16).toFixed(2)}px,0) scale(1.012)`;requestAnimationFrame(parallax)}requestAnimationFrame(parallax)}
  document.addEventListener('visibilitychange',()=>{if(document.hidden){audio.pause();setPlayUI()}});
  choose(0);
})();
