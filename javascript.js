document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('clientForm');
    const clientList = document.getElementById('clientList');

    let clients = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        const client = { id: Date.now(), name, email, phone };
        clients.push(client);

        renderClients();
        form.reset();
    });

    function renderClients() {
        clientList.innerHTML = '';
        clients.forEach(client => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${client.name}</td>
                <td>${client.email}</td>
                <td>${client.phone}</td>
                <td>
                    <button class="edit" onclick="editClient(${client.id})">Editar</button>
                    <button class="delete" onclick="deleteClient(${client.id})">Excluir</button>
                </td>
            `;

            clientList.appendChild(row);
        });
    }

    window.editClient = (id) => {
        const client = clients.find(client => client.id === id);
        if (client) {
            document.getElementById('name').value = client.name;
            document.getElementById('email').value = client.email;
            document.getElementById('phone').value = client.phone;

            deleteClient(id);
        }
    };

    window.deleteClient = (id) => {
        clients = clients.filter(client => client.id !== id);
        renderClients();
    };
});
