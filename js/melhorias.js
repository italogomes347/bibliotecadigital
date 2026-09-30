(function(){
  const oldRender=window.renderPage;
  const oldHome=window.home;
  const oldActivity=window.activityPage;
  const get=(k,d)=>DB.get(k,d), set=(k,v)=>DB.set(k,v);
  DB.readDays=()=>get('readDays',{}); DB.saveReadDays=v=>set('readDays',v);
  DB.lists=()=>get('readingLists',[]); DB.saveLists=v=>set('readingLists',v);
  DB.searchHistory=()=>get('searchHistory',[]); DB.saveSearchHistory=v=>set('searchHistory',v);

  function rememberSearch(q){q=String(q||'').trim();if(!q)return;const a=DB.searchHistory().filter(x=>x.toLowerCase()!==q.toLowerCase());a.unshift(q);DB.saveSearchHistory(a.slice(0,8));}
  function streak(){const d=DB.readDays(),keys=Object.keys(d).filter(k=>d[k]);if(!keys.length)return 0;let n=0,day=new Date();day.setHours(0,0,0,0);for(;;){const k=day.toISOString().slice(0,10);if(!d[k])break;n++;day.setDate(day.getDate()-1)}return n}
  function markReadDay(){const d=DB.readDays(),k=new Date().toISOString().slice(0,10);d[k]=true;DB.saveReadDays(d)}
  function goalStats(){const goal=Number(DB.settings().goal||12);const done=Object.values(DB.library()).filter(x=>Number(x.progress||0)>=100).length;return {goal,done,pct:Math.min(100,Math.round(done/goal*100))}}
  function recommendations(){const books=allBooks(),fav=DB.favorites().map(String),lib=DB.library(),views=DB.activity().filter(x=>x.type==='view').map(x=>String(x.data?.bookId||''));const ids=[...new Set([...fav,...views])];const genres=books.filter(b=>ids.includes(String(b.id))).map(b=>b.genero);const score=b=>(fav.includes(String(b.id))?5:0)+(genres.includes(b.genero)?3:0)+(views.includes(String(b.id))?1:0)+(b.avaliacao||0)/10;return books.filter(b=>!fav.includes(String(b.id))).sort((a,b)=>score(b)-score(a)).slice(0,6)}
  function recentViews(){const ids=[];DB.activity().filter(x=>x.type==='view'&&x.userId===session()?.id).forEach(x=>{const id=String(x.data?.bookId||'');if(id&&!ids.includes(id))ids.push(id)});return ids.map(bookById).filter(Boolean).slice(0,6)}
  function homeV15(){
    const base=oldHome(); const rec=recommendations(),recent=recentViews(),g=goalStats();
    const extra=`<section class="section v15-dashboard"><div class="section-head"><div><span class="badge">Sua leitura</span><h2>Continue sua jornada</h2><p>Acompanhe sua meta e volte rapidamente ao que estava lendo.</p></div><button class="btn" data-page-link="atividade">Ver atividade</button></div><div class="v15-dashboard-grid"><div class="panel v15-goal"><div><small>Meta anual</small><strong>${g.done} / ${g.goal} livros</strong></div><div class="v15-progress"><i style="width:${g.pct}%"></i></div><span>${g.pct}% concluído · 🔥 ${streak()} dias de sequência</span></div><div class="panel v15-quick"><button data-page-link="minha">📖 Minha biblioteca</button><button data-page-link="wishlist">♡ Lista de desejos</button><button data-page-link="conquistas">🏆 Conquistas</button><button data-page-link="autores">✎ Autores</button></div></div></section>`;
    const recSection=rec.length?`<section class="section"><div class="section-head"><div><span class="badge">Personalizado</span><h2>Recomendados para você</h2><p>Selecionados a partir dos seus interesses e histórico.</p></div></div><div class="book-grid">${rec.map(bookCard).join('')}</div></section>`:'';
    const recentSection=recent.length?`<section class="section"><div class="section-head"><div><h2>Vistos recentemente</h2><p>Continue de onde você parou.</p></div></div><div class="book-grid">${recent.map(bookCard).join('')}</div></section>`:'';
    return base+extra+recSection+recentSection;
  }
  window.home=homeV15;

  function activityV15(){
    const a=DB.activity().filter(x=>x.userId===session().id).slice(0,50),g=goalStats(),s=streak();
    return `<section class="section ultimate-page"><div class="section-head"><div><span class="badge">Minha jornada</span><h1>Minha atividade</h1><p>Um resumo simples da sua rotina de leitura.</p></div></div><div class="ultimate-kpis"><div><b>${g.done}</b><span>Livros concluídos</span></div><div><b>${g.goal}</b><span>Meta anual</span></div><div><b>${s}</b><span>Dias seguidos</span></div><div><b>${a.filter(x=>x.type==='view').length}</b><span>Livros visitados</span></div></div><div class="panel v15-goal-panel"><div class="section-head"><div><h2>Meta de leitura</h2><p>${g.done} de ${g.goal} livros concluídos.</p></div><strong>${g.pct}%</strong></div><div class="v15-progress"><i style="width:${g.pct}%"></i></div></div><div class="panel"><h2>Histórico recente</h2>${a.map(x=>`<div class="activity-row"><span>${({view:'👀',cart:'🛒',read:'📖',review:'⭐',wishlist:'♡',order:'📦'})[x.type]||'•'}</span><div><b>${activityTextV15(x)}</b><small>${new Date(x.date).toLocaleString('pt-BR')}</small></div></div>`).join('')||'<div class="empty"><strong>Nenhuma atividade ainda</strong>Explore o catálogo para começar.</div>'}</div></section>`;
  }
  function activityTextV15(x){const b=x.data?.bookId?bookById(x.data.bookId):null;const t=b?esc(b.titulo):'um livro';return ({view:`Você visualizou ${t}`,cart:`Você adicionou ${t} ao carrinho`,read:`Você registrou leitura de ${t}`,review:'Você publicou uma avaliação',wishlist:'Você atualizou sua lista de desejos',order:'Você realizou um pedido'}[x.type]||'Você realizou uma ação')}
  function readingListPage(){const lists=DB.lists(),w=DB.wishlist();return `<section class="section"><div class="section-head"><div><span class="badge">Organização</span><h1>Minhas listas</h1><p>Crie listas personalizadas além da lista de desejos.</p></div><button class="btn btn-primary" id="newList">+ Nova lista</button></div><div class="list-grid">${lists.map(l=>`<div class="panel custom-list"><div><h3>${esc(l.name)}</h3><small>${(l.bookIds||[]).length} livro(s)</small></div><button class="btn btn-danger" data-list-delete="${l.id}">Excluir</button></div>`).join('')||'<div class="empty"><strong>Nenhuma lista personalizada</strong>Crie uma para organizar suas leituras.</div>'}</div></section>`}
  function listModal(){const name=prompt('Nome da nova lista:');if(!name?.trim())return;const lists=DB.lists();lists.push({id:uid('list'),name:name.trim(),bookIds:[]});DB.saveLists(lists);renderPage('listas');toast('Lista criada')}
  function bindV15(){
    $$('#content [data-page-link]').forEach(b=>b.onclick=()=>renderPage(b.dataset.pageLink));
    $('#newList')?.addEventListener('click',listModal);
    $$('[data-list-delete]').forEach(b=>b.onclick=()=>{if(confirm('Excluir esta lista?')){DB.saveLists(DB.lists().filter(x=>x.id!==b.dataset.listDelete));renderPage('listas')}});
    $$('#heroSearch').forEach(f=>f.addEventListener('submit',()=>rememberSearch(new FormData(f).get('q'))));
  }
  const currentRender=window.renderPage;
  window.renderPage=function(page){if(page==='atividade'){state.page=page;$('#crumb').innerHTML='Biblioteca / <b>Minha atividade</b>';$('#content').innerHTML=activityV15();bindPage();bindV15();return}if(page==='listas'){state.page=page;$('#crumb').innerHTML='Biblioteca / <b>Minhas listas</b>';$('#content').innerHTML=readingListPage();bindPage();bindV15();return}currentRender(page);setTimeout(bindV15,0)};
  pages.listas='Minhas listas';
  const nav=document.querySelector('.sidebar nav');if(nav&&!nav.querySelector('[data-page="listas"]'))nav.insertAdjacentHTML('beforeend','<button class="nav" data-page="listas">☷ <span>Minhas listas</span></button>');
  nav?.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>renderPage(b.dataset.page));
  document.querySelector('.footer-links')?.insertAdjacentHTML('beforeend','<div><b>Organizar</b><button data-page-link="listas">Minhas listas</button><button data-page-link="atividade">Minha atividade</button></div>');
  document.querySelectorAll('.footer-links [data-page-link]').forEach(b=>b.onclick=()=>renderPage(b.dataset.pageLink));
  const oldReader=window.reader; if(oldReader){window.reader=function(id){markReadDay();return oldReader(id)}}
  const s=DB.settings();if(!get('simpleDesignApplied',false)){s.theme='moderno';DB.saveSettings(s);set('simpleDesignApplied',true);try{applySettings()}catch{}}
})();
