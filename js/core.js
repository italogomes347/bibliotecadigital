const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const uid=p=>`${p||'id'}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(window._toast);window._toast=setTimeout(()=>el.classList.remove('show'),2600)}
function price(book){return Number((book.preco ?? (12.9+(book.id%12)*2.5)).toFixed(2))}
function bookById(id){return allBooks().find(b=>String(b.id)===String(id))}
function allBooks(){return [...LIVROS,...DB.customBooks()].map(b=>({...b,preco:b.preco??price(b)}))}
function stars(r){return '★'.repeat(Math.round(r))+'☆'.repeat(5-Math.round(r))}
function coverClass(id){return ['cover-a','cover-b','cover-c','cover-d','cover-e'][Number(id)%5]||'cover-a'}
function initials(name){return String(name||'U').split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase()}

function avatarMarkup(user, cls='avatar-image'){
  const name = user?.name || 'Usuário';
  if(user?.avatar){
    return `<img class="${cls}" src="${user.avatar}" alt="Foto de ${esc(name)}">`;
  }
  return `<span class="avatar-initials">${esc(initials(name))}</span>`;
}
function moneyBR(value){ return Number(value||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }
function money(value){ return moneyBR(value); }
