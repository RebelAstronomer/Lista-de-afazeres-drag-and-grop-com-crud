/* OBJETO PARA OS POSTS */
class postagem {
    // Specs
    id = 0;
    title = '';
    info = '';
    craetionDate = '';
    endDate = '';
    completed = false;

    // Passando as informações
    constructor(_id, _title, _info, _craetionDate, _endDate, _completed) {
        this.id = _id;
        this.title = _title;
        this.info = _info;
        this.craetionDate = _craetionDate;
        this.endDate = _endDate;
        this.completed = _completed;
        this.completedDate = 0;
    }
}

/* OBJETO PARA OS POSTS */
const post = {
    date : [],
    createPost() {

        // Pegando a tag do forms
        const $forms = document.querySelector('.main-forms');
        const id = Date.now();

        // Criando as tags para o HTML
        $forms.insertAdjacentHTML('afterbegin',
        `
            <!-- BLOCO PRINCIPAL -->
            <div class='main-post-block' id=${id}>
                <!-- BLOCO DE TEXTO -->
                <div class='main-post-block-text'>
                    <div class='block-text main-div-title'>
                        <p id='title${id}' onclick='activeEditable(${id},"title")' onblur='saveChange(${id},"title")'><strong>Insira um nome</strong></p>
                        <img class='edit-icon' src="img/edit.svg" alt="edit" height=16px> 
                    </div>
                    <div class='block-text main-div-info'>
                        <p id='info${id}' onclick='activeEditable(${id},"info")' onblur='saveChange(${id},"info")'>Descrição</p>
                        <img class='edit-icon' src="img/edit.svg" alt="edit" height=16px> 
                    </div>
                </div>
                <!-- BLOCO DAS DATAS -->
                <div class='main-post-block-date'>
                    <label>Criado em: </label>
                    <input type='date' class='main-div-create-date'></input>
                    <label>Data final: </label>
                    <input id='endDate${id}' type='date' class='main-div-end-date' onblur='saveEndDate(${id})'></input>
                </div>
                <!-- BLOCO DOS BOTÕES -->
                <div class='main-post-block-buttons'>
                    <img src="img/delete_icon.svg" alt="delete_icon" onclick="deletePost(${id})" class='main-div-delete-button' height=32px>
                    <img id='buttonCheck${id}' src="img/check_box.svg" alt="delete_icon" onclick="checkPost(${id})" class='main-div-check-button' height=32px>
                </div>
            </div>
        `
        );
        // Definindo a data de criação
        document.querySelector('.main-div-create-date').valueAsDate = new Date();

        // Salvando os dados
        post.date.push(new postagem(id,'Insira um nome','Descrição',new Date(),'',false));

        
    }
}

// Função para checar o afazeres
function checkPost(myId) {
    const $checkButton = document.querySelector(`#buttonCheck${myId}`);
    const $checkButtonImg = document.querySelector(`#buttonCheck${myId}`).src;
    
    if ($checkButtonImg.indexOf('check_box.svg') != -1) {
        $checkButton.src = 'img/check_box_fill.svg';

        // Checando o id
        post.date.forEach(element => {
            if (element.id == myId) {
                element.completed = true;
                element.completedDate = new Date();
                
                // Criando um paragrafo com a data que foi completada
                let $mainDiv = document.getElementById(`${myId}`);
                let compDate = document.createElement('p');
                let actualDate = new Date();
                compDate.className = 'completed-date-para';
                compDate.id = `completeDate${myId}`;
                compDate.innerHTML = ` Completado em: ${actualDate.toLocaleDateString()}`;
                $mainDiv.appendChild(compDate);
            }
        });
    } else {
        // Mudando a imagem
        $checkButton.src = 'img/check_box.svg';

        // Checando o id
        post.date.forEach(element => {
            if (element.id == myId) {
                element.completed = false;
                element.completedDate = 0;

                // Deletando o paragrafro com a data da checagem
                let $compDate = document.querySelector(`#completeDate${myId}`);
                if ($compDate != '') {
                    $compDate.remove();
                }
            }
        });
    }

}

// Deletar os posts
function deletePost(myId) {
    const $postDiv = document.getElementById(`${myId}`);

    // Procurando o index com o id desejado e apagando ela
    for (let index=0; index<post.date.length; index++) {
        if (post.date[index].id == myId) {
            post.date.splice(index,1);
        }
    }

    // Apagando a div
    $postDiv.remove();
}

// Função para ativar o modo de edição dos textos
function activeEditable(myId, myClass) {
    const $postDiv = document.getElementById(`${myId}`);
    const $text = document.querySelector(`#${myClass}${myId}`); 

    if ($postDiv.id == myId) {
        $text.contentEditable = 'true';
    } else {
        console.log('não foi titulo');
    }
    
}

// Função para salvar as informações editadas no array
function saveChange(myId, myClass) {
    const $text = document.querySelector(`#${myClass}${myId}`);

    // Checando qual é o titulo que tem que ser mudado
    post.date.forEach(element => {
        if (element.id == myId) {
            if (myClass == 'title') {
                element.title = $text.textContent;
            } else if (myClass == 'info') {
                element.info = $text.textContent;
            }
        }
    });
}

// Função para salvar a data final para o afazer
function saveEndDate(myId) {
    const $date = document.querySelector(`#endDate${myId}`);

    // Checando qual é o titulo que tem que ser mudado
    post.date.forEach(element => {
        if (element.id == myId) {
            element.endDate = $date.valueAsDate;
        }
    });    
}
