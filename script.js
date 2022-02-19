

var buttons = document.querySelectorAll(".tab");
var main = document.querySelector('#main');
console.log(buttons);

Array.from(buttons).forEach(function(button){
    button.addEventListener('click', function(e) {
            let id=e.target.id;
            e.target.classList.add('switch-on');
            let num=id[1];
            let name='#block-'+num;
            let block = document.querySelector(name);
    	    block.style.display = 'block';
            Array.from(buttons).forEach(function(button){
                if (id != button.id){
                    button.classList.remove('switch-on');
                    let other_block = document.querySelector('#block-'+button.id[1]);
    	            other_block.style.display = 'none';
                }
            })
            
    })
});



