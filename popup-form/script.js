const exit_block = document.querySelector('.lead-catcher');
document.addEventListener('mouseleave', function(e){
    if (e.clientY < 10) {
        exit_block.style.display='block';
    }   
});

function isNameValid(name){
    const name_exp = /[\p{L}\s]/gu;
    let name_match = name.match(name_exp);
    if ((name_match !== null) && (name_match.length === name.length) && (name.length > 1)){
        return true;}
    else{return false;}
}

function isTelValid(tel){
    const tel_exp = /[\+\-\d\s]/g;
    let tel_match = tel.match(tel_exp);
    if ((tel_match !== null) && (tel_match.length == tel.length) && (tel_match.length >= 5)){
        return true;
    }
    else{return false}
}

exit_block.addEventListener('click', async function(e) {
    if (this.style.display==='block'){
        if (e.target.className=='lead-catcher__close') {
            this.remove();
        }
        else if (e.target.className=='lead-catcher__submit'){
            e.preventDefault();
            const form = document.forms.client_contacts;
            form.elements.name.addEventListener('change',function(e){
                form.elements.name.style.outline='none';
            })
            form.elements.tel.addEventListener('change',function(e){
                form.elements.tel.style.outline='none';
            })
            if (isNameValid(form.elements.name.value)){
                if (isTelValid(form.elements.tel.value)){
                    try{
                        let response = await fetch('http://localhost/lead-catcher/server.php', {
                            method: 'POST',
                            body: new FormData(form)
                        });
                        let result = await response.text();
                        if (response.ok && result !== 'Error'){
                            this.innerHTML='<h2>Ваша заявка находится в обработке. С вами свяжется наш оператор.</h2>';
                            setTimeout(() => this.remove(), 2000);
                        }
                        else{
                            alert("Some error has occurred");
                        }
                    }catch(ex){
                        alert("Server is not availible", ex);
                    }                    
                }
                else{
                    form.elements.tel.style.outline='2px solid red';
                }
            }
            else{
                form.elements.name.style.outline='2px solid red';
            }
        }
    }   
});