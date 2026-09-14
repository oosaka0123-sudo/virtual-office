(()=>{
  const q=(s,c=document)=>c.querySelector(s), qa=(s,c=document)=>[...c.querySelectorAll(s)];
  const css=q('link[rel="stylesheet"]')?.getAttribute('href')||'style.css';
  const pre=css.startsWith('../')?'../':'';
  const home=pre==='';
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const path=location.pathname;
  q('.hero')?.classList.add('hero-stage');

  const header=q('header'), nav=q('.nav',header||document);
  if(header&&nav){
    const toggle=document.createElement('button');
    toggle.className='menu-toggle'; toggle.type='button'; toggle.setAttribute('aria-label','メニューを開く');
    toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-controls','site-menu'); toggle.innerHTML='<span></span>';
    header.append(toggle);
    const overlay=document.createElement('div'); overlay.id='site-menu'; overlay.className='menu-overlay'; overlay.inert=true; overlay.setAttribute('aria-hidden','true');
    overlay.innerHTML='<button class="menu-close" type="button" aria-label="メニューを閉じる">×</button><nav>'+qa('a',nav).map((a,i)=>`<a href="${a.getAttribute('href')}"><span>${String(i+1).padStart(2,'0')}</span>${a.textContent}</a>`).join('')+'</nav><div class="menu-meta">ADDRESS / LAYERS OF TRUST</div>';
    document.body.append(overlay);
    const close=q('.menu-close',overlay);
    const setMenu=open=>{
      overlay.classList.toggle('open',open); overlay.inert=!open; overlay.setAttribute('aria-hidden',String(!open));
      toggle.setAttribute('aria-expanded',String(open)); toggle.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');
      document.body.style.overflow=open?'hidden':'';
      if(open) requestAnimationFrame(()=>close.focus()); else toggle.focus();
    };
    toggle.addEventListener('click',()=>setMenu(!overlay.classList.contains('open')));
    close.addEventListener('click',()=>setMenu(false));
    overlay.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open'))setMenu(false)});
  }

  if(home&&!reduce&&!sessionStorage.getItem('vo-opening')){
    const op=document.createElement('div'); op.className='opening';
    op.innerHTML='<img class="opening-visual" src="assets/img/city-fog.jpg" alt=""><div class="opening-copy"><span class="eyebrow">ADDRESS / LAYERS OF TRUST</span><strong>ADDRESS<br>IS TRUST.</strong></div><button class="opening-skip" type="button">Skip</button>';
    document.body.prepend(op);
    const done=()=>{op.classList.add('done');sessionStorage.setItem('vo-opening','1')};
    setTimeout(done,900); q('.opening-skip',op).addEventListener('click',done);
  }
  const revealTargets=qa('.section,.card,.panel,.tablewrap');
  if(reduce) revealTargets.forEach(el=>el.classList.add('visible'));
  else {
    revealTargets.forEach(el=>el.classList.add('reveal'));
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});
    revealTargets.forEach(el=>io.observe(el));
    const visualMap={
      '/compare/':'mail-black.jpg','/registration/':'office-green.jpg','/bank/':'mail-grid.jpg','/mail/':'office-warm.jpg',
      '/legal/':'city-glass.jpg','/purpose/':'city-fog.jpg','/area/':'office-green.jpg','/methodology/':'mail-grid.jpg','/operator/':'office-warm.jpg'
    };
    const first=q('.section');
    if(first){const file=visualMap[Object.keys(visualMap).find(k=>path.includes(k))]||'office-warm.jpg';const v=document.createElement('div');v.className='editorial-visual reveal';v.innerHTML=`<img src="${pre}assets/img/${file}" alt="" loading="lazy" decoding="async">`;first.after(v);io.observe(v)}
  }

  if(!reduce) qa('a[href]').filter(a=>{const x=a.getAttribute('href');return x&&!x.startsWith('#')&&!x.startsWith('http')&&!x.startsWith('mailto')}).forEach(a=>a.addEventListener('click',e=>{
    if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.button!==0)return;
    const wipe=document.createElement('div');wipe.className='page-wipe active';document.body.append(wipe);e.preventDefault();setTimeout(()=>location.href=a.href,260);
  }));
  window.calc=()=>{const n=id=>Number(q(id)?.value||0),out=q('#cResult');if(out)out.textContent=new Intl.NumberFormat('ja-JP',{style:'currency',currency:'JPY',maximumFractionDigits:0}).format(n('#cMonthly')*12+n('#cSetup')+n('#cPost')*12)};

  if(matchMedia('(pointer:fine) and (min-width:901px)').matches&&!reduce){
    const cursor=document.createElement('div');cursor.className='cursor';document.body.append(cursor);
    let x=-50,y=-50,tx=-50,ty=-50; document.addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY},{passive:true});
    const tick=()=>{x+=(tx-x)*.22;y+=(ty-y)*.22;cursor.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%)`;requestAnimationFrame(tick)};tick();
    document.addEventListener('pointerover',e=>{if(e.target.closest('a,button,input'))cursor.classList.add('big')});
    document.addEventListener('pointerout',e=>{if(e.target.closest('a,button,input'))cursor.classList.remove('big')});
  }
})();
