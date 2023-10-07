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
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed')
  headerMenuEls.reverse().forEach((el, idx)=>{
    el.style.transitionDelay = idx * .4 / headerMenuEls.length + 's'
  })
  seacrhDelayEls.forEach((el, idx)=>{
    el.style.transitionDelay = idx * .4 / seacrhDelayEls.length + 's'
  })
}
const hideSearch = () =>{
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  headerMenuEls.reverse().forEach((el, idx)=>{
    el.style.transitionDelay = idx * .4 / headerMenuEls.length + 's'
  })
  seacrhDelayEls.forEach((el, idx)=>{
    el.style.transitionDelay = idx * .4 / seacrhDelayEls.length + 's'
  })
}
searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchShadowEl.addEventListener('click', hideSearch)