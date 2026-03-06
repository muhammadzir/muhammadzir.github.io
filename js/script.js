(() => {

const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", e=>{
cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";
});

const sections=document.querySelectorAll("section");

function showSection(id){
sections.forEach(sec=>{
sec.style.display="none";
sec.style.opacity=0;
sec.style.transform="translateY(50px)";
});

const target=document.querySelector(id);

target.style.display="block";

setTimeout(()=>{
target.style.opacity=1;
target.style.transform="translateY(0)";
},50);
}

const bottomButtons=document.querySelectorAll('.bottom-bar button');

bottomButtons.forEach(btn=>{
btn.addEventListener('click',()=>{

bottomButtons.forEach(b=>b.classList.remove('active'));

btn.classList.add('active');

if(btn.dataset.target==="#blog"){
window.location.href="https://muhammadzir.github.io/blog/";
}else{
showSection(btn.dataset.target);
}

});
});

document.querySelector('.bottom-bar button[data-target="#hero"]').classList.add('active');

showSection("#hero");

const blocks=document.querySelectorAll(".bg-block");

window.addEventListener("scroll",()=>{

const sc=window.scrollY;

blocks.forEach((b,i)=>{
b.style.transform=`translateY(${sc*(.05*(i+1))}px) rotate(${15*(i+1)}deg)`
});

});

const cards=document.querySelectorAll(".card.magnetic");

cards.forEach(card=>{

card.addEventListener("mousemove",e=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left-rect.width/2;

const y=e.clientY-rect.top-rect.height/2;

card.style.transform=`rotateX(${-y/10}deg) rotateY(${x/10}deg) translateZ(0)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});

const typingText="Hobi rebahan\nSambil scroll fesnuk sampe bosen.";

let idx=0;

(function type(){

const t=document.getElementById("typing-text");

if(idx<typingText.length){

t.textContent+=typingText[idx];

idx++;

setTimeout(type,50);

}

})();

document.getElementById("year").textContent=new Date().getFullYear();

const floatingShapes=document.querySelectorAll('.floating-shape, .floating-icon');

setInterval(()=>{

floatingShapes.forEach(shape=>{

const x=(Math.random()-0.5)*20;

const y=(Math.random()-0.5)*20;

const r=(Math.random()-0.5)*10;

shape.style.transform=`translate(${x}px,${y}px) rotate(${r}deg)`;

});

},4000);

const blogGrid=document.getElementById("blog-grid");

fetch('/blog/posts.json')

.then(res=>res.json())

.then(posts=>{

posts.forEach(p=>{

const card=document.createElement('div');

card.className='card magnetic';

card.innerHTML=`
<h3>${p.title}</h3>
<p>${p.excerpt}</p>
<a href="${p.url}" target="_blank">Read More →</a>
`;

blogGrid.appendChild(card);

});

})

.catch(err=>console.error("Error loading posts.json:",err));

})();
