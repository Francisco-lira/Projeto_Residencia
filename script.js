document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('clientForm');
    const clientList = document.getElementById('clientList');
    const searchQuery = document.getElementById('searchQuery');
    const searchBtn = document.getElementById('searchBtn');

    let clients = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const barber = document.getElementById('barber').value;

        const client = { id: Date.now(), name, phone, email, service, barber };
        clients.push(client);

        renderClients(clients);
        form.reset();
    });

    searchBtn.addEventListener('click', () => {
        console.log("Botão de busca clicado");
        const query = searchQuery.value.toLowerCase();
        console.log("Query:", query);
        const filteredClients = clients.filter(client =>
            client.name.toLowerCase().includes(query) ||
            client.phone.includes(query) ||
            client.email.toLowerCase().includes(query)
        );
        renderClients(filteredClients);
    });

    function renderClients(clientArray) {
        clientList.innerHTML = '';
        clientArray.forEach(client => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${client.name}</td>
                <td>${client.phone}</td>
                <td>${client.email}</td>
                <td>${client.service}</td>
                <td>${client.barber}</td>
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
            if (confirm(`Você deseja editar o cadastro de ${client.name}?`)) {
                document.getElementById('name').value = client.name;
                document.getElementById('phone').value = client.phone;
                document.getElementById('email').value = client.email;
                document.getElementById('service').value = client.service;
                document.getElementById('barber').value = client.barber;

                deleteClient(id);
            }
        }
    };

    window.deleteClient = (id) => {
        const client = clients.find(client => client.id === id);
        if (client) {
            if (confirm(`Você deseja excluir o cadastro de ${client.name}?`)) {
                clients = clients.filter(client => client.id !== id);
                renderClients(clients);
            }
        }
    };
});

