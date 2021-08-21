document.getElementById('btn-url').addEventListener('click', e => {
    window.location.replace(e.path[0].children[0].href)
})
