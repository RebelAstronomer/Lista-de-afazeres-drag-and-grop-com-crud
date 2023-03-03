/* OBJETO POST */
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
/* OBJETO COLUNA */
class colunm {
    // Specs
    id = '';
    title = '';

    // Passando as informações
    constructor(_id,_title) {
        this.id = _id;
        this.title = _title;
    }
}

/* OBJETO PARA SALVAR OS POSTS */
const post = {
    date : [],
    colunms : [],
    createColumn() {
        // Pegando as divs
        const $main = document.querySelector('.main');
        const id = Date.now();

        // Criando a coluna
        $main.insertAdjacentHTML('afterbegin',
        `
            <div class="main-colunm ${id}" id=mainColunm${id}>
                <div class="main-div">
                    <div class='colunm'>
                        <div id='colunmTitleDiv${id}' class='colunm-title'>
                                <div class='colunm-btn'>
                                    <img src="img/add_icon.svg" alt="add_icon" onclick="post.createPost(${id})" class="div-head-add-button" height=25px>
                                </div>
                                <p id='colunmTitle${id}' onclick='post.activeEditable(${id},"colunmTitle")' onblur='post.saveChange(post.colunms,${id},"colunmTitle")'><strong>Insira um Nome</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        );

        // Salvnado as informações da coluna
        post.colunms.push(new colunm(id,'Insira um nome'));

    },
    // Criando o post
    createPost(myId) {

        // Pegando a tag do forms
        const $container = document.querySelector(`#mainColunm${myId}`);
        const id = Date.now();

        // Criando as tags para o HTML
        $container.insertAdjacentHTML('afterend',
        `
            <!-- BLOCO PRINCIPAL -->
            <div class='main-post-block-toDo' id=${id} draggable="true">
                <!-- BLOCO DE TEXTO -->
                <div class='main-post-block-text'>
                    <div class='block-text main-div-title'>
                        <p id='title${id}' onclick='post.activeEditable(${id},"title")' onblur='post.saveChange(post.date,${id},"title")'><strong>Insira um nome</strong></p>
                        <img class='edit-icon' src="img/edit.svg" alt="edit" height=16px> 
                    </div>
                    <div class='block-text main-div-info'>
                        <p id='info${id}' onclick='post.activeEditable(${id},"info")' onblur='post.saveChange(post.date,${id},"info")'>Descrição</p>
                        <img class='edit-icon' src="img/edit.svg" alt="edit" height=16px> 
                    </div>
                </div>
                <!-- BLOCO DAS DATAS -->
                <div class='main-post-block-date'>
                    <label>Criado em: </label>
                    <input type='date' class='main-div-create-date'></input>
                    <label>Data final: </label>
                    <input id='endDate${id}' type='date' class='main-div-end-date' onblur='post.saveEndDate(${id})'></input>
                </div>
                <!-- BLOCO DOS BOTÕES -->
                <div class='main-post-block-buttons'>
                    <img src="img/delete_icon.svg" alt="delete_icon" onclick="post.deletePost(${id})" class='main-div-delete-button' height=32px>
                    <img id='buttonCheck${id}' src="img/check_box.svg" alt="delete_icon" onclick="post.checkPost(${id})" class='main-div-check-button' height=32px>
                </div>
            </div>
        `
        );
        // Definindo a data de criação
        document.querySelector('.main-div-create-date').valueAsDate = new Date();

        // Salvando os dados
        post.date.push(new postagem(id,'Insira um nome','Descrição',new Date(),'',false));

        
    },
    // Função para checar o afazeres
    checkPost(myId) {
        const $checkButton = document.querySelector(`#buttonCheck${myId}`);
        const $checkButtonImg = document.querySelector(`#buttonCheck${myId}`).src;
        const $mainDiv = document.getElementById(`${myId}`);
        $mainDiv.classList.toggle('main-post-block-done');
        
        // Checando se a imagem é a correta
        if ($checkButtonImg.indexOf('check_box.svg') != -1) {
            $checkButton.src = 'img/check_box_fill.svg';
            
            // Checando o id
            post.date.forEach(element => {
                if (element.id == myId) {
                    element.completed = true;
                    element.completedDate = new Date();
                    
                    // Criando um paragrafo com a data que foi completada
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

    },
    // Deletar os posts
    deletePost(myId) {
        const $postDiv = document.getElementById(`${myId}`);

        // Procurando o index com o id desejado e apagando ela
        for (let index=0; index<post.date.length; index++) {
            if (post.date[index].id == myId) {
                post.date.splice(index,1);
            }
        }

        // Apagando a div
        $postDiv.remove();
    },
    // Função para ativar o modo de edição dos textos
    activeEditable(myId, myClass) {
        const $postDiv = document.getElementById(`${myId}`);
        const $text = document.querySelector(`#${myClass}${myId}`); 

        if ($postDiv.id == myId) {
            $text.contentEditable = 'true';
        }
        
    },
    // Função para salvar as informações editadas no array
    saveChange(array, myId, myClass) {
        const $text = document.querySelector(`#${myClass}${myId}`);

        // Checando qual é o titulo que tem que ser mudado
        array.forEach(element => {
            if (element.id == myId) {
                switch(myClass) {
                    case 'title':
                        element.title = $text.textContent;
                        break;
                    case 'info':
                        element.info = $text.textContent;
                        break;
                    case 'colunmTitle':
                        element.title = $text.textContent;
                        break;
                }
            }
        });
    },
    // Função para salvar a data final para o afazer
    saveEndDate(myId) {
        const $date = document.querySelector(`#endDate${myId}`);
    
        // Checando qual é o titulo que tem que ser mudado
        post.date.forEach(element => {
            if (element.id == myId) {
                element.endDate = $date.valueAsDate;
            }
        });    
    }
}

const $colunm = document.querySelectorAll(".main-colunm");
const $posts = document.querySelectorAll('.main-post-block-toDo');

// Aplicando as propriedades em cada item para serem pegos e soltos
$posts.forEach(item => {
    // Aplicando um evento quando o item é pego, mudando sua class
    item.addEventListener('dragstart', () => {
        item.classList.add('dragging');
    });
    // Aplicando um evento quando o item é solto, fazendo ele voltar ao normal
    item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
    });
});

// Aplicando um listerner para que as coluns detectem dragover
$colunm.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        
        // Checando aonde o item ira ficar
        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        }
    });
});


// Função para pegar o meio do item e retornar
function getDragAfterElement(container, y) {
    const draggbaleElements = [...container.querySelectorAll('.main-post-block-toDo:not(.dragging)')]

    return draggbaleElements.reduce((closest, child) => {

        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return {offset: offset, element: child};
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY}).element;
}