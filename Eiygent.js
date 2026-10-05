const RefreshBtn = document.querySelector('.btn')

RefreshBtn.addEventListener('click', function(event)
 {event.preventDefault()
	RefreshBtn.textContent = `Refreshing...`
	 setTimeout(function(){
	 location.reload()
	 }, 800)
})



const Button = document.querySelector('.btn')

Button.addEventListener('click', function(event) 
	{event.preventDefault()
	Button.textContent = 'Loading...'
	setTimeout(function()
	{location.reload()}, 800)
})

