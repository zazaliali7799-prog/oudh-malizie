document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Buka menu');nav.classList.remove('open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Tutup menu':'Buka menu');nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});
window.matchMedia('(min-width:761px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}
const dialog=document.querySelector('.lightbox');
const galleryPhotos=[...document.querySelectorAll('.gallery-item')];
let activePhotos=[];
let activePhotoIndex=0;
function showImage(button){
  const source=button.querySelector('img');
  const fullSource=button.dataset.full||source.src;
  dialog.querySelector('img').src=fullSource;
  dialog.querySelector('img').alt=source.alt;
  dialog.querySelector('p').textContent=button.dataset.caption;
  dialog.querySelector('.lightbox-original').href=fullSource;
  const navigation=dialog.querySelector('.lightbox-navigation');
  navigation.hidden=activePhotos.length<2;
  dialog.querySelector('.lightbox-position').textContent=activePhotos.length?`${activePhotoIndex+1} / ${activePhotos.length}`:'';
}
document.querySelectorAll('.gallery-item, .certificate-button').forEach(button=>button.addEventListener('click',()=>{
  activePhotos=button.classList.contains('gallery-item')?galleryPhotos.filter(photo=>!photo.hidden):[];
  activePhotoIndex=activePhotos.indexOf(button);
  showImage(button);
  dialog.showModal();
  document.body.classList.add('locked');
}));
function changePhoto(direction){if(activePhotos.length<2)return;activePhotoIndex=(activePhotoIndex+direction+activePhotos.length)%activePhotos.length;showImage(activePhotos[activePhotoIndex]);}
dialog.querySelector('.lightbox-prev').addEventListener('click',()=>changePhoto(-1));
dialog.querySelector('.lightbox-next').addEventListener('click',()=>changePhoto(1));
dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();changePhoto(-1);}if(event.key==='ArrowRight'){event.preventDefault();changePhoto(1);}});
document.querySelectorAll('.gallery-filter').forEach(filter=>filter.addEventListener('click',()=>{
  document.querySelectorAll('.gallery-filter').forEach(button=>{const selected=button===filter;button.classList.toggle('active',selected);button.setAttribute('aria-pressed',String(selected));});
  galleryPhotos.forEach(photo=>{photo.hidden=filter.dataset.filter!=='all'&&photo.dataset.category!==filter.dataset.filter;});
  const count=galleryPhotos.filter(photo=>!photo.hidden).length;
  document.querySelector('.gallery-result').textContent=`Memaparkan ${count} daripada ${galleryPhotos.length} gambar`;
}));
function closeGallery(){dialog.close();}
dialog.querySelector('button').addEventListener('click',closeGallery);
dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)closeGallery();}});
dialog.addEventListener('close',()=>document.body.classList.remove('locked'));
document.querySelector('#year').textContent=new Date().getFullYear();
