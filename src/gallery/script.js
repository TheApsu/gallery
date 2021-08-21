const addNewGalery = document.querySelector('.zona-arrastre');
const btnConfirm = document.getElementById('confirm');
const btnCancel = document.getElementById('cancel');
const imageSelected = document.querySelector('.images-selected');
let fragment = document.createDocumentFragment();
let galeryImg;
let imgObject = [
    
    news = [],

    industrieURL = 
    [
        "https://www.engie.com/sites/default/files/assets/images/2021-02/Header_industrie.jpg",
        "https://www.inray.de/wp-content/uploads/2020/08/Industrie1.0-zu-4.0_inrayblau_1000x670px.png",
    ],

    bridges = [],

    torreEifel = [],

    granCanon = [],

    catsURL = 
    [
        "https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,g=0.5x0.5,f=auto/b5bd34054bc849159d949d50021d8926.png",
        "https://www.purina-latam.com/sites/g/files/auxxlc391/files/styles/social_share_large/public/purina-10-datos-curiosos-sobre-los-gatos.png?itok=88pMyzkl",
        "https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/59c4f5655bafe82c692a7052/gato-marron_0.jpg",
        "https://www.lavanguardia.com/files/og_thumbnail/uploads/2019/04/02/5fa523c44bc98.jpeg"
    ],
];

const addGalleryChild = (title, srcImg) => {
    //adding divs

    const divContainerGalery = document.createElement('DIV');
    const divContainerImg = document.createElement('DIV');
    const divImg = document.createElement('DIV');
    const img = document.createElement('IMG');
    const divImgTitle = document.createElement('DIV');
    const spanTitle = document.createElement('SPAN');

    //adding class

    divContainerImg.classList.add('container__galery-img');
    divContainerGalery.classList.add('container__galery');
    divImg.classList.add('image');
    img.classList.add('image-pic');
    divImgTitle.classList.add('title-img');

    //adding content

    img.src = srcImg;
    spanTitle.textContent = title;

    //Adding childs

    divContainerGalery.appendChild(divContainerImg);
    divContainerImg.appendChild(divImg);
    divImg.appendChild(img);
    divContainerImg.appendChild(divImgTitle);
    divImgTitle.appendChild(spanTitle);

    divContainerGalery.id = imgObject.length - 1;
    document.querySelector('.container').appendChild(divContainerGalery);
    dataLenght(imgObject.length)
}

//Boton para agregar a la galeria

btnConfirm.addEventListener('click', () => {
    const titleGallery = document.getElementById('title-img').value;
    const imagePreview = document.getElementById('img-preview').src;

    if(titleGallery.length <= 0) alert('Debes ingresar un titulo a la galeria');
    else {
        imgObject.push([])
        addGalleryChild(titleGallery, imagePreview); //Llamando a la funcion para que añada la galeria al dom
        document.querySelector('.create-gallery').style.display = 'none';
    };
});

btnCancel.addEventListener('click', () => {
    document.querySelector('.create-gallery').style.display = 'none';
});

const loadImage = imgURL => {
    document.getElementById('img-preview').src = imgURL;
    document.querySelector('.create-gallery').style.display = 'block';
};

const FR = (ar, node) => {

    const FR = new FileReader();
    FR.readAsDataURL(ar);
    FR.addEventListener('load', e => {
        const url = URL.createObjectURL(ar);
        if(node != undefined){
            return imgObject[node.id].push(url);
        };
        loadImage(url);
    });
};

const changeColor = (node, codeHex) => {
    node.style.borderColor = codeHex;
};

const changeOpacity = (node, opacity) => {
    node.style.opacity = opacity;
};

addNewGalery.addEventListener('dragover', e => {
    e.preventDefault();
    changeColor(e.srcElement, '#ccc');
});

addNewGalery.addEventListener('dragleave', e => {
    e.preventDefault();
    changeColor(e.srcElement, '#000');
});

addNewGalery.addEventListener('drop', e => {
    changeColor(e.srcElement, '#000');
    e.preventDefault();
    FR(e.dataTransfer.files[0]);
});


const dataLenght = imgDataLength => {
    galeryImg = document.querySelectorAll('.container__galery');
    for(let i = 0; i < imgDataLength; i++){
        galeryImg[i].addEventListener('click', () => {
            FuncURL(galeryImg[i].id);
            document.getElementById('back-to-galery').style.visibility = 'visible'; //BTN regresar
            document.querySelector('.container').style.display = 'none';
            document.querySelector('.zona-arrastre').style.display = 'none';
        });
        galeryImg[i].addEventListener('dragover', e => {
            e.preventDefault();
            changeOpacity(e.srcElement, '.5');
        });
        galeryImg[i].addEventListener('dragleave', e => {
            e.preventDefault();
            changeOpacity(e.srcElement, '1');
        });
        galeryImg[i].addEventListener('drop', e => {
            e.preventDefault();
            changeOpacity(e.srcElement, '1');
            FR(e.dataTransfer.files[0], e.path[3]);
        });
    };
};

dataLenght(imgObject.length)

document.getElementById('back-to-galery').addEventListener('click', e => {
    document.querySelector('.container').style.display = 'grid';
    imageSelected.style.display = 'none';
    imageSelected.innerHTML = "";
    e.target.style.visibility = 'hidden';
    document.querySelector('.zona-arrastre').style.display = 'block';
});

const FuncURL = key => { 
    let img = imgObject[parseInt(key)];
    console.log(img.length);
    if(img.length < 1){
        imageSelected.style.display = 'flex';
        let span = document.createElement('SPAN');
        span.textContent = 'No hay imagenes en esta galeria';
        span.classList.add('no-img');
        imageSelected.appendChild(span);
    }else {
        imageSelected.style.display = 'grid';
        for(u of img){          
            let img = document.createElement('IMG');
            img.classList.add('cat-img');
            img.src = u;
            console.log(u);
            fragment.appendChild(img); 
        };
    };
    document.querySelector('.images-selected').appendChild(fragment);
};