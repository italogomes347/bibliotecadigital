const DB={
 get(key,fallback){try{const v=localStorage.getItem('bd_'+key);return v===null?fallback:JSON.parse(v)}catch{return fallback}},
 set(key,value){try{localStorage.setItem('bd_'+key,JSON.stringify(value));return true}catch{return false}},
 remove(key){localStorage.removeItem('bd_'+key)},
 user(){return this.get('session',null)},
 users(){return this.get('users',[])},
 saveUsers(v){this.set('users',v)},
 cart(){return this.get('cart',[])}, saveCart(v){this.set('cart',v)},
 favorites(){return this.get('favorites',[])}, saveFavorites(v){this.set('favorites',v)},
 library(){return this.get('library',{})}, saveLibrary(v){this.set('library',v)},
 orders(){return this.get('orders',[])}, saveOrders(v){this.set('orders',v)},
 reviews(){return this.get('reviews',[])}, saveReviews(v){this.set('reviews',v)},
 customBooks(){return this.get('customBooks',[])}, saveCustomBooks(v){this.set('customBooks',v)},
 settings(){return this.get('settings',{theme:'moderno',dark:false,goal:12})}, saveSettings(v){this.set('settings',v)},
};
function seedUsers(){
  let users=DB.users();
  if(!Array.isArray(users)) users=[];
  let admin=users.find(u=>u.id==='admin-1'||u.username==='adm123'||u.role==='admin');
  if(!admin){admin={id:'admin-1',name:'Administrador',username:'adm123',email:'adm@bibliotecadigital.local',password:'adm123',role:'admin',active:true,createdAt:Date.now()};users.unshift(admin)}
  // Credencial fixa do projeto escolar. Também corrige instalações antigas.
  admin.username='adm123'; admin.password='adm123'; admin.role='admin'; admin.active=true;
  admin.email=admin.email||'adm@bibliotecadigital.local'; admin.name=admin.name||'Administrador';
  let demo=users.find(u=>u.id==='demo-1');
  if(!demo){users.push({id:'demo-1',name:'Leitor Demo',username:'leitor',email:'demo@biblioteca.local',password:'123456',role:'user',active:true,createdAt:Date.now()})}
  else {demo.username=demo.username||'leitor'; demo.active=demo.active!==false;}
  DB.saveUsers(users);
  // Se a sessão antiga ficou inválida após uma atualização, não deixa a tela travar.
  const s=DB.user(); if(s && !users.some(u=>u.id===s.id && u.active!==false)) DB.remove('session');
}
seedUsers();
