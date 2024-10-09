// Seleção dos elementos do DOM
const tituloInput = document.getElementById('titulo');
const descricaoInput = document.getElementById('descricao');
const statusSelect = document.getElementById('status');
const adicionarButton = document.getElementById('adicionar');
const tarefasLista = document.getElementById('tarefas-lista');

// Função para buscar as tarefas armazenadas no localStorage
function buscarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    return tarefas;
}

// Função para renderizar a lista de tarefas
function renderizarTarefas() {
    const tarefas = buscarTarefas();
    tarefasLista.innerHTML = '';

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${tarefa.titulo}</strong><br>
                <p>${tarefa.descricao}</p>
                <small>Status: ${tarefa.status}</small>
            </div>
            <div>
                <button onclick="editarTarefa(${index})">Editar</button>
                <button onclick="deletarTarefa(${index})">Deletar</button>
            </div>
        `;
        tarefasLista.appendChild(li);
    });
}

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
    const titulo = tituloInput.value;
    const descricao = descricaoInput.value;
    const status = statusSelect.value;

    if (titulo === '' || descricao === '') {
        alert('Título e descrição são obrigatórios!');
        return;
    }

    const tarefas = buscarTarefas();
    tarefas.push({ titulo, descricao, status });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    tituloInput.value = '';
    descricaoInput.value = '';
    statusSelect.value = 'pendente';
    renderizarTarefas();
}

// Função para editar uma tarefa
function editarTarefa(index) {
    const tarefas = buscarTarefas();
    const tarefa = tarefas[index];

    tituloInput.value = tarefa.titulo;
    descricaoInput.value = tarefa.descricao;
    statusSelect.value = tarefa.status;

    // Remover a tarefa do armazenamento antes de editar
    tarefas.splice(index, 1);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    renderizarTarefas();
}

// Função para deletar uma tarefa
function deletarTarefa(index) {
    const tarefas = buscarTarefas();
    tarefas.splice(index, 1);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    renderizarTarefas();
}

// Adicionar o evento de clique ao botão
adicionarButton.addEventListener('click', adicionarTarefa);

// Renderizar as tarefas ao carregar a página
renderizarTarefas();