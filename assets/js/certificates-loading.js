/* ---------------------------
   CERTIFICATES LOADING
----------------------------*/
const certContainer = document.getElementById("cert-list");

fetch("assets/certificates/certificates.json")
    .then(res => res.json())
    .then(data => {

        Object.keys(data).forEach(category => {

            // Bloque de categoría
            const categoryBlock = document.createElement("div");
            categoryBlock.className = "cert-category";

            // Título de categoría
            const h3 = document.createElement("h3");
            h3.textContent = category;
            categoryBlock.appendChild(h3);

            // Grid de certificados
            const grid = document.createElement("div");
            grid.className = "cert-category-grid";
            categoryBlock.appendChild(grid);

            // Certificados
            data[category].forEach(cert => {

                const wrapper = document.createElement("div");
                wrapper.className = "cert-item";

                // Título arriba
                const title = document.createElement("a");
                title.href = "assets/certificates/" + cert.file;
                title.target = "_blank";
                title.textContent = cert.title;
                title.className = "cert-title";
                wrapper.appendChild(title);

                // Imagen izquierda (convertida en enlace)
                const imgLink = document.createElement("a");
                imgLink.href = "assets/certificates/" + cert.file;
                imgLink.target = "_blank";

                const img = document.createElement("img");
                img.src = "assets/certificates/" + cert.preview;
                img.alt = cert.title;
                img.className = "cert-image";

                imgLink.appendChild(img);
                wrapper.appendChild(imgLink);

                // Verificación debajo de la imagen
                if (cert.url) {
                    const verify = document.createElement("a");
                    verify.href = cert.url;
                    verify.target = "_blank";
                    verify.textContent = "Verificar certificado";
                    verify.className = "cert-verify";
                    wrapper.appendChild(verify);
                }

                // Descripción derecha
                const desc = document.createElement("p");
                desc.textContent = cert.description;
                desc.className = "cert-description";
                wrapper.appendChild(desc);

                grid.appendChild(wrapper);
            });

            certContainer.appendChild(categoryBlock);
        });
    });