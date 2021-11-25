// Сверстать таблицу 5х5 с любым текстовых содержимым заранее заполненным.
// При клике на любую ячейку таблицы появляется внутри ячейке многострочное
// текстовое поле(textarea) с текстом который был в ячейке(на которую нажали)
// + две кнопки save, cancel
// save -- сохранить в текущей ячейке введенные данные в текстовое поле,
//  cancel -- оставит все без изменений как было раньше до клика.

const table = document.querySelector("#table");

class Action {
    constructor(event, element, target) {
        this.event = event;
        this.element = element;
        this.target = target;
    }

    addEvent() {
        this.element.addEventListener(this.event, e => {
            e.preventDefault();
            const item = e.target.closest(this.target.td);
            if (!item) return;

            const form = item.children.form;
            form.hidden = false;
            form.children.textarea.innerHTML = item.firstChild.innerHTML;

            this.checkDataset(e.target.dataset.action, item, form);
        });
    };

    checkDataset(dataset, td, form) {
        switch (dataset) {
            case this.target.save:
                td.firstChild.innerHTML = form.firstElementChild.value;
                form.hidden = true;
                break;
            case this.target.cancel:
                form.hidden = true;
        }
    }
}

const tableAction = new Action("click", table, { td: "td", save: "save", cancel: "cancel" });
tableAction.addEvent();