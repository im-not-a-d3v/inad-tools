document.addEventListener("DOMContentLoaded", async () => {
    const newVersionContainer = document.getElementById("newVersionContainer");
    const repoOwner = "im-not-a-d3v"; // Tu nombre de usuario en GitHub
    const repoName = "inad-tools"; // El nombre de tu repositorio

    try {
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Depuración: verifica la respuesta completa en la consola

        // Extrae la información de la versión
        const latestVersion = data.tag_name; // La última versión
        const releaseUrl = data.html_url; // Enlace a la versión

        // Comprueba si la versión es diferente a la actual
        const currentVersion = "v1.0.0"; // Cambia esto a la versión actual de tu aplicación
        if (latestVersion !== currentVersion) {
            newVersionContainer.innerHTML = `
                <div role="alert">
                    A new version (${latestVersion}) is available! 
                    <a href="${releaseUrl}" target="_blank" class="alert-link">Download it here!</a>
                </div>
            `;
        }
    } catch (error) {
        console.error("Error fetching version data:", error);
        newVersionContainer.innerHTML = `
            <div role="alert">
                Unable to check for new versions at this time.
            </div>
        `;
    }
});
