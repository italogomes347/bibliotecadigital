const DB={
 get(key,fallback){try{const storageKey='bd_'+key,storage=key==='session'?sessionStorage:localStorage;let v=storage.getItem(storageKey);if(key==='session'&&v===null){v=localStorage.getItem(storageKey);if(v!==null){sessionStorage.setItem(storageKey,v);localStorage.removeItem(storageKey)}}return v===null?fallback:JSON.parse(v)}catch{return fallback}},
 set(key,value){try{const storageKey='bd_'+key,storage=key==='session'?sessionStorage:localStorage,serialized=JSON.stringify(value);if(storage.getItem(storageKey)===serialized)return true;storage.setItem(storageKey,serialized);if(key==='session'){localStorage.removeItem(storageKey);return true}window.dispatchEvent(new CustomEvent('bd:storagechange',{detail:{key:storageKey}}));return true}catch{return false}},
 remove(key){const storageKey='bd_'+key;if(key==='session'){sessionStorage.removeItem(storageKey);localStorage.removeItem(storageKey);return}const existed=localStorage.getItem(storageKey)!==null;localStorage.removeItem(storageKey);if(existed)window.dispatchEvent(new CustomEvent('bd:storagechange',{detail:{key:storageKey}}))},
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
  if(!Array.isArray(users)){users=[];DB.saveUsers(users)}
  const safeUsers=users.filter(user=>user.id!=='demo-1'&&!(user.id==='admin-1'&&user.password===user.username));
  if(safeUsers.length!==users.length)DB.saveUsers(safeUsers);
  const current=DB.user();
  if(current&&!safeUsers.some(user=>user.id===current.id&&user.active!==false&&user.role===current.role))DB.remove('session');
}
seedUsers();
