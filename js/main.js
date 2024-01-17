import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'
// 장바구니!
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

const showBasket = () =>{
  basketEl.classList.add('show')
}
const hideBasket = () =>{
  basketEl.classList.remove('show')
}
basketStarterEl.addEventListener('click', function(event){
  event.stopPropagation()
  if(basketEl.classList.contains('show')){
    //hide
    hideBasket()
  }else{
    //show
    showBasket()
  }
})
basketEl.addEventListener('click', function(event){
  event.stopPropagation()
})
window.addEventListener('click', function(){
  hideBasket()
})

// 검색!
const headerEl = document.querySelector('header')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const seacrhDelayEls = [...searchWrapEl.querySelectorAll('li')]

console.log(seacrhDelayEls)
const showSearch = () =>{
  stopScroll()
  headerEl.classList.add('searching')

  headerMenuEls.reverse().forEach((el, idx)=>{
    el.style.transitionDelay = idx * .4 / headerMenuEls.length + 's'
  })
  seacrhDelayEls.forEach((el, idx)=>{
    el.style.transitionDelay = idx * .4 / seacrhDelayEls.length + 's'
  })
  setTimeout(()=>{
    searchInputEl.focus()
  }, 600)
}
const hideSearch = () =>{
  playScroll()
  headerEl.classList.remove('searching')

  headerMenuEls.reverse().forEach((el, idx)=>{
    el.style.transitionDelay = idx * .4 / headerMenuEls.length + 's'
  })
  seacrhDelayEls.forEach((el, idx)=>{
    el.style.transitionDelay = idx * .4 / seacrhDelayEls.length + 's'
  })
  searchInputEl.value=''
}

function playScroll(){
  document.documentElement.classList.remove('fixed')
  
}
function stopScroll(){
  document.documentElement.classList.add('fixed')

  
}
searchStarterEl.addEventListener('click', showSearch)
//텍스트 필드로의 이벤트 버블링을 막는다!!
searchCloserEl.addEventListener('click', function(event){
  event.stopPropagation()
  hideSearch()
})
searchShadowEl.addEventListener('click', hideSearch)


// 헤더 메뉴 토글
const menuStarterEl = document.querySelector('header .menu-starter')
menuStarterEl.addEventListener('click', function(){
  if(headerEl.classList.contains('menuing')){
    headerEl.classList.remove('menuing')
    searchInputEl.value=''
    playScroll()
  }
  else{
    headerEl.classList.add('menuing')
    stopScroll()
  }
})

// 헤더 검색!! (mobile)
const searchTextFieldEl = document.querySelector('header .textfield')
const searchCancelEl = document.querySelector('header .search-canceler')
searchTextFieldEl.addEventListener('click', function(){
  headerEl.classList.add('searching-mobile')
  searchInputEl.focus()
})
searchCancelEl.addEventListener('click', ()=>{
  headerEl.classList.remove('searching-mobile')
})

window.addEventListener('resize', function(){
  if(window.innerWidth <= 740){
    headerEl.classList.remove('searching')
  }else{
    headerEl.classList.remove('searching-mobile')
  }
})

const navEl = document.querySelector('nav')
const navShadowEl = navEl.querySelector('.shadow')
const  navMenuToggleEl = navEl.querySelector('.menu-toggler')

navMenuToggleEl.addEventListener('click', ()=>{
  if(navEl.classList.contains('menuing')){
    hideMenu()
  }else{
    showMenu()
  }
})

navEl.addEventListener('click', (event)=>{
  event.stopPropagation()
})

navShadowEl.addEventListener('click', hideMenu)
window.addEventListener('click', hideMenu)

function showMenu(){
  navEl.classList.add('menuing')
}

function hideMenu(){
  navEl.classList.remove('menuing')
}
//요소의 가시성 관찰
const io = new IntersectionObserver(function (entries){
  entries.forEach(function(entry){
    if(!entry.isIntersecting){
      return
    }
    entry.target.classList.add('show')
  })
})
const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function(el){
  io.observe(el)
})

// 비디오 재생!
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function(){
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})
pauseBtn.addEventListener('click', function(){
  video.pause()
  pauseBtn.classList.add('hide')
  playBtn.classList.remove('hide')

})

// 당신에게 맞는 iPad/는??
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach((iPad)=>{
  const itemEl = document.createElement('div')
  itemEl.classList.add('item');

  let colorList = ''
  iPad.colors.forEach((color)=>{
    colorList += /*html*/`<li style="background-color: ${color}"></li>`
  })
  itemEl.innerHTML = /*html*/`
    <div class=thumbnail>
      <img src="${iPad.thumbnail}" alt="${iPad.name}">
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${iPad.name}</h3>
    <p class="tagline">${iPad.tagline}</p>
    <p class="price">₩${iPad.price.toLocaleString('en-US')}</p>
    <button class="btn">구입하기</button>
    <a href="${iPad.url}" class="link">더 알아보기</a>
  `
  
  itemsEl.append(itemEl)
})

const naviEl = document.querySelector('footer .navigations')
navigations.forEach(function (nav){
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  console.log(nav)
  nav.maps.forEach(map => {
    mapList += /* html */`
      <li>
        <a href="${map.url}">${map.name}</a>

      </li>
    `
  });
  mapEl.innerHTML = /* html */`
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

naviEl.append(mapEl)
})

const yearEl = document.querySelector('span.this-year')
yearEl.textContent = new Date().getFullYear()

// <p class="price">₩${iPad.price.toLocaleString('en-US')}</p>
 