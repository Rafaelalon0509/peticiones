document.getElementById("fetchDataBtn").addEventListener("click", fetchData);

function fetchData() {
    const url = "https://jsonplaceholder.typicode.com/users";
    const resultDiv = document.getElementById("result");

    resultDiv.textContent = "Cargando datos...";

    // Obtenemos el número del usuario ingresado (puede venir de un input)
    const userId = parseInt(document.getElementById("userIdInput").value);

    if (isNaN(userId) || userId < 1 || userId > 10) {
        resultDiv.textContent = "Por favor, ingrese un número de usuario válido (1-10).";
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.json(); // Convertir la respuesta a JSON
        })
        .then(data => {
            // Filtramos el usuario con el ID proporcionado
            const user = data.find(u => u.id === userId);

            if (user) {
                // Construimos un objeto con los campos requeridos
                const filteredData = {
                    nombre: user.name,
                    email: user.email,
                    telefono: user.phone,
                    direccion: `${user.address.street}, ${user.address.city}`,
                    compañia: user.company.name
                };

                // Mostrar los detalles del usuario filtrado
                resultDiv.textContent = JSON.stringify(filteredData, null, 2);
            } else {
                resultDiv.textContent = "Usuario no encontrado.";
            }
        })
        .catch(error => {
            resultDiv.textContent = `Error: ${error.message}`;
        });
}

