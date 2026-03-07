/* ---------------------------
   PROJECT TABS
----------------------------*/

document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.project-tab-btn');
    const tabPanes = document.querySelectorAll('.project-tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            const activePane = document.getElementById(tabName);
            if (activePane) {
                activePane.classList.add('active');
            }
        });
    });
});
