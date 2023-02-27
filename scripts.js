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
    constructor(_id, _title, _infor, _craetionDate, _endDate, _completed) {
        this.id = _id;
        this.title = _title;
        this.info = _infor;
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
                    <label contenteditable class='main-div-title' onKeyPress='addTitle(event)'><strong>Insira um nome</strong></label>
                    <div contenteditable class='main-div-info' onKeyPress='addInfo(event)'>Descrição</div>
                </div>
                <!-- BLOCO DAS DATAS -->
                <div class='main-post-block-date'>
                    <label>Criado em: </label>
                    <input type='date' class='main-div-create-date'></input>
                    <label>Data final: </label>
                    <input type='date' class='main-div-end-date'></input>
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
        post.date.push(new postagem(id,'','',new Date(),'',false));

        
    }
}

// Função para checar o afazeres
function checkPost(myId) {
    const $checkButtonImg = document.querySelector(`#buttonCheck${myId}`);

    if ($checkButtonImg.src == 'http://127.0.0.1:5500/Projetos/ListaDeAfazeresCrud/Lista-de-afazeres-CRUD/img/check_box.svg') {
        // Mudando a imagem
        $checkButtonImg.src = 'img/check_box_fill.svg';

        // Checando o id
        post.date.forEach(element => {
            if (element.id == myId) {
                element.completed = true;
                
                // Postrando a data que foi completada
                let $mainDiv = document.querySelector('.main-post-block-buttons').parentNode;
                let compDate = document.createElement('p');
                let actualDate = new Date();
                compDate.className = 'completed-date-para';
                compDate.innerHTML = ` Completado em: ${actualDate.toLocaleDateString()}`;
                $mainDiv.appendChild(compDate);
            }
        });

    } else {
        // Mudando a imagem
        $checkButtonImg.src = 'img/check_box.svg';

        // Checando o id
        post.date.forEach(element => {
            if (element.id == myId) {
                element.completed = false;

                let $compDate = document.querySelector('.completed-date-para');
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

// Salvando o titulo
function addTitle(event) {
    if(event.key == 'Enter') {
        // Pegando as informações necessárias
        const $input = document.querySelector('.main-div-title');
        const id = $input.parentNode.id;

        // Checando qual é o titulo que tem que ser mudado
        post.date.forEach(element => {
            if (element.id == id) {
                element.title = $input.value;
            }
        });
    }
}

// Salvando as informações
function addInfo(event) {
    if(event.key == 'Enter') {
        // Pegando as informações necessárias
        const $input = document.querySelector('.main-div-info');
        const id = $input.parentNode.id;

        // Checando qual é o titulo que tem que ser mudado
        post.date.forEach(element => {
            if (element.id == id) {
                element.info = $input.value;
            }
        });
    }
}
