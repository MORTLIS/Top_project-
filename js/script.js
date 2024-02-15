document.querySelectorAll('.scroll-lead-form').forEach((elem) => {
    elem.onclick = () => {
        const div = document.getElementById('lead-form-section');
        const input = document.getElementById('lead-form-name');

        if (div) {
            div.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
        if (input) {
            input.focus();
        }
        return false;
    }
})

