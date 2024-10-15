 // Se añade un evento 'click' al boton de busqueda. Cuando el usuario hace clic, se ejecuta esta función
document.getElementById('btnBuscar').addEventListener('click', function () {
       
    // Se obtiene el texto ingresado por el usuario en el input de busqueda y se eliminan espacios innecesarios con el trim()
    const query = document.getElementById('inputBuscar').value.trim();
  
    
      // Si el campo de busqueda está vacío, se muestra un mensaje de alerta
    if (!query) {
        alert('Por favor, ingrese un término de búsqueda.');
       
        return;
    }

    // URL para la solicitud a la API de la NASA
    const url = `https://images-api.nasa.gov/search?q=${query}`;
    
 // Se hace la solicitud HTTP a la API de NASA usando fetch. Cuando la respuestaa es recibida, se convierte a JSON
    fetch(url)
        .then(response => response.json())
        .then(data => {
           
           // Se limpia el contenedor de resultados antes de agregar los nuevos resultados
            const contenedor = document.getElementById('contenedor');
            contenedor.innerHTML = '';
            
             // Si no hay resultados en la búsqueda, se muestra un mensaje indicando que no se encontraron resultados
            if (data.collection.items.length === 0) {
                contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
               
                return;
            }

            //Recorre sobre los resultados de la búsqueda
            data.collection.items.forEach(item => {
                // Se consigue la URL de la imagen. Si no tiene un link, devuelve una cadena vacía
                const image = item.links ? item.links[0].href : '';
                
               // Se obtiene el título de la imagen. Si no hay un título, muestra 'Sin título'
                const title = item.data[0].title || 'Sin título';
                
                // Se obtiene descripción de la imagen. Si no hay descripción, muestra 'Sin descripción'
                const description = item.data[0].description || 'Sin descripción';
                
                // Se obtiene la fecha de creación de la imagen. Si no hay una fecha, muestra 'Fecha desconocida'
                const date = item.data[0].date_created || 'Fecha desconocida';
                

                // Se crea el HTML para cada tarjeta con la imagen y la información correspondiente.
                const resultHTML = `
                    <div class="card">
                        <img src="${image}" class="card-img-top" alt="${title}">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${description}</p>
                            <p class="card-text"><small class="text-muted">Fecha: ${new Date(date).toLocaleDateString()}</small></p>
                        </div>
                    </div>
                `;

                // Añade cada tarjeta al contenedor de resultados.
                contenedor.innerHTML += resultHTML;
            });
        })
         // Si ocurre un error en la solicitud, muestra un mensaje de error en el contenedor.
        .catch(error => {
            console.error('Error al realizar la búsqueda:', error);
            document.getElementById('contenedor').innerHTML = '<p>Hubo un error al realizar la búsqueda.</p>';
            
        });
});
