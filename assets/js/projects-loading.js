/* ---------------------------
   PROJECTS LOADING
----------------------------*/

function initializeProjectTabs(projectsData) {
    const tabButtons = document.querySelectorAll('.project-tab-btn');
    const tabPanes = document.querySelectorAll('.project-tab-pane');
    const tabContent = document.querySelector('.project-tab-content');
    const loadedTabs = new Set();

    function loadTabContent(tabName) {
        if (!loadedTabs.has(tabName)) {
            const iframe = document.querySelector(`#${tabName} iframe`);
            if (iframe && iframe.dataset.src) {
                const spinner = iframe.parentElement.querySelector('.spinner');
                if (spinner) {
                    spinner.style.display = 'flex';  // Show spinner before loading
                }
                iframe.src = iframe.dataset.src;
                loadedTabs.add(tabName);
            }
        }
    }

    function unloadTabContent(tabName) {
        const iframe = document.querySelector(`#${tabName} iframe`);
        if (iframe) {
            iframe.src = '';
            loadedTabs.delete(tabName);  // Remove from loaded set so it reloads next time
        }
    }

    function updateIframeHeights() {
        const container = document.querySelector('.container');
        const currentWidth = container ? container.offsetWidth : window.innerWidth - 40;

        // Update all iframes with responsive heights
        projectsData.forEach(project => {
            const iframe = document.querySelector(`#${project.id} iframe`);
            if (iframe) {
                const aspectRatio = project.height / project.baseWidth;
                const newHeight = Math.round(currentWidth * aspectRatio);
                iframe.style.height = newHeight + 'px';
            }
        });

        updateContentHeight();
    }

    function updateContentHeight() {
        const activePane = document.querySelector('.project-tab-pane.active');
        if (activePane && tabContent) {
            const height = activePane.offsetHeight;
            tabContent.style.minHeight = (height + 80) + 'px';
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            // Unload all other tabs and remove active class
            tabButtons.forEach(btn => {
                if (btn !== this) {
                    const otherTabName = btn.getAttribute('data-tab');
                    unloadTabContent(otherTabName);
                }
                btn.classList.remove('active');
            });
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Load and activate current tab
            this.classList.add('active');
            const activePane = document.getElementById(tabName);
            if (activePane) {
                activePane.classList.add('active');
                loadTabContent(tabName);
                setTimeout(updateContentHeight, 50);
                setTimeout(updateContentHeight, 200);
                setTimeout(updateContentHeight, 500);
            }
        });
    });

    // Load first tab on page load
    loadTabContent(loadedTabs.size === 0 ? projectsData[0].id : Array.from(loadedTabs)[0]);

    // Initial height on page load
    updateIframeHeights();

    // Update on window resize
    window.addEventListener('resize', updateIframeHeights);
}

document.addEventListener('DOMContentLoaded', function() {
    fetch("assets/data/projects.json")
        .then(res => res.json())
        .then(projects => {
            const tabsContainer = document.querySelector('.project-tabs');
            const contentContainer = document.querySelector('.project-tab-content');

            // Create tab buttons
            projects.forEach((project, index) => {
                const button = document.createElement('button');
                button.className = `project-tab-btn ${index === 0 ? 'active' : ''}`;
                button.setAttribute('data-tab', project.id);
                button.setAttribute('data-i18n', project.titleKey);
                button.textContent = project.titleKey;
                tabsContainer.appendChild(button);
            });

            // Create tab panes
            projects.forEach((project, index) => {
                const pane = document.createElement('div');
                pane.id = project.id;
                pane.className = `project-tab-pane ${index === 0 ? 'active' : ''}`;

                const description = document.createElement('p');
                description.setAttribute('data-i18n', project.descKey);
                description.textContent = project.descKey;
                pane.appendChild(description);

                const iframeWrapper = document.createElement('div');
                iframeWrapper.className = 'iframe-wrapper';

                // Create spinner
                const spinner = document.createElement('div');
                spinner.className = 'spinner';
                spinner.innerHTML = `
                    <div class="spinner-circle"></div>
                    <div class="spinner-text">Loading...</div>
                `;
                spinner.style.display = 'none';  // Hidden by default
                iframeWrapper.appendChild(spinner);

                const iframe = document.createElement('iframe');
                iframe.dataset.src = project.url;  // Store URL but don't load yet
                iframe.style.width = '100%';
                iframe.style.height = project.height + 'px';
                iframe.style.border = 'none';
                iframe.dataset.spinner = spinner;  // Reference to spinner

                // Show spinner when iframe loads, hide after content loads
                iframe.addEventListener('load', function() {
                    spinner.style.display = 'none';
                });

                iframeWrapper.appendChild(iframe);
                pane.appendChild(iframeWrapper);

                contentContainer.appendChild(pane);
            });

            // Initialize tab functionality now that elements exist
            initializeProjectTabs(projects);

            // Apply localization to newly created elements
            const savedLang = localStorage.getItem("lang") || "en";
            fetch(`assets/locales/${savedLang}.json`)
                .then(res => res.json())
                .then(dict => {
                    const newElements = document.querySelectorAll('.project-tab-btn[data-i18n], .project-tab-pane p[data-i18n]');
                    newElements.forEach(el => {
                        const key = el.getAttribute("data-i18n");
                        const parts = key.split(".");
                        let value = dict;

                        parts.forEach(p => value = value?.[p]);

                        if (value) el.innerHTML = value.replace(/\n/g, "<br>");
                    });
                });
        })
        .catch(error => console.error('Error loading projects:', error));
});
