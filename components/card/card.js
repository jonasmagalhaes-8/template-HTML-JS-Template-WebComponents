const template = await fetch('components/card/card-template.html')
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return doc.querySelector('template');
    });

class MyCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.onClick;
    }

    async connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const card = this.shadowRoot.querySelector('.card');
        this.shadowRoot.querySelector('.title').textContent = this.getAttribute('title') || 'Sem título';
        this.shadowRoot.querySelector('.content').textContent = this.getAttribute('content') || 'Sem conteúdo';

        // Sempre que clicar, chama a função definida ou faz fallback
        card.addEventListener('click', (e) => {
            if (this.onClick) this.onClick(e);
        });
    }
}

customElements.define('my-card', MyCard);
