const circle = document.querySelectorAll('.circle')

for(let i = 0; i < circle.length; i++){
    circle[i].addEventListener('animationstart', e => {
        console.log(e)
    })
}