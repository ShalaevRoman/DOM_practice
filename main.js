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

            const form = item.children[1];
            console.dir(e.target)
            form.hidden = false;
            form.children.textarea.innerText = item.firstChild.innerHTML;
            this.setCaretToPos(form.children.textarea, item.firstChild.innerText.length)
            this.checkDataset(e.target.dataset.action, item, form);
        });
    };

    checkDataset(dataset, td, form) {
        switch (dataset) {
            case this.target.save:
                td.firstChild.innerHTML = form.firstElementChild.value;
                // form.firstElementChild.value = '';
                form.hidden = true;
                break;
            case this.target.cancel:
                form.hidden = true;
                // form.firstElementChild.value = '';
                break;
        }
    }

    setSelectionRange(input, selectionStart, selectionEnd) {
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(selectionStart, selectionEnd);
        } else if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', selectionEnd);
            range.moveStart('character', selectionStart);
            range.select();
        }
    }

    setCaretToPos(input, pos) {
        this.setSelectionRange(input, pos, pos);
    }

};

const tableAction = new Action("click", table, { td: "td", save: "save", cancel: "cancel" });
tableAction.addEvent();