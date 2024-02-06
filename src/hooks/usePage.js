
export const usePage = (data, search) => {

    const filterEmployes = () => {

        if (!search) {
            return []; // Devuelve un objeto vacío si search está vacío
        }

        const filtered = data.filter(person => {
            const id = `${person.personalId}`;
            const nameComplete = `${person.firstName} ${person.secondName} ${person.firstLastName} ${person.secondLastName}`;
            const charge = `${person.charge}`;
            const email = `${person.email}`;

            return id.toLowerCase().includes(search.toLowerCase()) || nameComplete.toLowerCase().includes(search.toLowerCase()) || charge.toLowerCase().includes(search.toLowerCase()) || email.toLowerCase().includes(search.toLowerCase());
        });

        return filtered
    }


    const filterClients = () => {
        const filtered = data.filter(client => {

            const id = `${client.proyectId}`;
            const nameProject = `${client.projectName}`;
            const nameClient = `${client.clientName}`;
            const state = `${client.isActive}`;

            return id.toLowerCase().includes(search.toLowerCase()) || nameProject.toLowerCase().includes(search.toLowerCase()) || nameClient.toLowerCase().includes(search.toLowerCase())
        });

        return filtered
    }

    return {
        filterEmployes,
        filterClients
    }
}