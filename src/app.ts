interface App {
    inputElement: HTMLInputElement;
    btnAddTarefa: HTMLButtonElement;
    tarefasContainer: HTMLDivElement;

    lidarAddTarefa(): void;
    lidarDeleteTarefa(tarefaConteudo: HTMLParagraphElement): void;
    tarefaConcluir(tarefaConteudo: HTMLParagraphElement): void;
    iniciar(): void;
}

const app: App = {
    inputElement: document.querySelector(".new-task-input") as HTMLInputElement,
    btnAddTarefa: document.querySelector(".new-task-button") as HTMLButtonElement,
    tarefasContainer: document.querySelector(".tasks-container") as HTMLDivElement,
    lidarAddTarefa() {
        const tarefaItemContainer = document.createElement("div")
        tarefaItemContainer.classList.add("task-item")

        const tarefaConteudo = document.createElement("p")
        tarefaConteudo.innerText = this.inputElement.value

        const deleteItem = document.createElement("i")
        deleteItem.classList.add("lni")
        deleteItem.classList.add("lni-trash-can")

        tarefaItemContainer.appendChild(tarefaConteudo)
        tarefaItemContainer.appendChild(deleteItem)


        deleteItem.addEventListener("click", () => this.lidarDeleteTarefa(tarefaConteudo))
        tarefaConteudo.addEventListener("click", () => this.tarefaConcluir(tarefaConteudo))

        this.tarefasContainer.appendChild(tarefaItemContainer)
        this.inputElement.value = ""
    },
    lidarDeleteTarefa(tarefaConteudo) {
        const tarefas = this.tarefasContainer.childNodes

        for (const tarefaItem of tarefas) {
            
            const isSameNode = tarefaItem.firstChild != null && tarefaItem.firstChild.isSameNode(tarefaConteudo)
            if (isSameNode) { 
                return tarefaItem.remove()
            }
        }
    },
    tarefaConcluir(tarefaConteudo) {
        const tarefas = this.tarefasContainer.childNodes
        for(const tarefaItem of tarefas) {
            
            const isSameNode = tarefaItem.firstChild != null && tarefaItem.firstChild.isSameNode(tarefaConteudo)
            if(isSameNode) {
                tarefaConteudo.classList.add("completed")
            }
        }
    },
    iniciar() {
        this.btnAddTarefa.addEventListener("click", () => this.lidarAddTarefa())
    }
}

app.iniciar()