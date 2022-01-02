let searchParam = location.search.split("=")[1];

const access_key = '29da_thYdlxUXNnf6eqZBfeaNoQsBlIVBXIFzgtsj7w';
const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}`;
const search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchParam}&per_page=50`;
const gallery = document.querySelector(".gallery");
let allImages; // store all images
let currentImage = 0;

const getImages = () => {
    fetch(random_photo_url)
        .then((res) => res.json())
        .then((data) => {
            allImages = data;
            console.log(data);
            makeImages(allImages);
        });
};

const searchImages = () => {
    fetch(search_photo_url)
        .then((res) => res.json())
        .then((data) => {
            allImages = data.results;
            makeImages(allImages);
        });
};

if (searchParam == "") {
    getImages();
} else {
    searchImages();
}

const makeImages = (data) => {
    console.log(data);
    data.forEach((item, index) => {
        let img = document.createElement("img");
        img.src = item.urls.regular;
        img.className = "gallery-img";

        gallery.appendChild(img);
        img.addEventListener("click", () => {
            currentImage = index;
            showPopup(item);
        });
    });
};

const showPopup = (item) => {
    let popup = document.querySelector(".img-popup");
    const downloadBtn = document.querySelector(".download-btn");
    const closeBtn = document.querySelector(".close-btn");
    const img = document.querySelector(".large-img");

    popup.classList.remove("hide");
    downloadBtn.href = item.links.html;
    img.src = item.urls.regular;

    closeBtn.addEventListener("click", () => {
        popup.classList.add("hide");
    });
};

// control buttons
const preBtn = document.querySelector(".pre-btn");
const nextBtn = document.querySelector(".nxt-btn");

preBtn.addEventListener("click", () => {
    if (currentImage > 0) {
        currentImage--;
        showPopup(allImages[currentImage]);
    }
});

nextBtn.addEventListener("click", () => {
    if (currentImage < allImages.length - 1) {
        currentImage++;
        showPopup(allImages[currentImage]);
    }
});
