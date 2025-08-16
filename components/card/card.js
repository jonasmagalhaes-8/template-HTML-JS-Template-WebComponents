class MyCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.onClick = null;
    }

    async connectedCallback() {
        const template = await fetch('components/card/card-template.html');
        const conteudoTemplate = await template.text();
        const div = document.createElement('div');
        div.innerHTML = conteudoTemplate;

        const componente = div.querySelector('template');
        this.shadowRoot.appendChild(componente.content.cloneNode(true));

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
