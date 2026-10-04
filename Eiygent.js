const RefreshBtn = document.querySelector('.btn')

RefreshBtn.addEventListener('click', function(event)
 {event.preventDefault()
	RefreshBtn.textContent = `Refreshing...`
	 setTimeout(function(){
	 location.reload()
	 }, 800)
})

