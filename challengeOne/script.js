let currMedia;
let userID = "abc123";

async function loadBody() {
    await getNewMedia();
}

async function getNewMedia() {
    document.getElementById('displayCard').style.opacity = 0;
    setTimeout(async() => {
        let response = await fetch('https://api.lib.byu.edu/leaflet/item');
        currMedia = await response.json();
        changeDisplay();
    }, 700);
}

function changeDisplay() {
    document.getElementById('displayImage').src = currMedia.thumbnail;
    document.getElementById('displayTitle').innerHTML = currMedia.title;
    if (currMedia.type === "BOOK") {
        document.getElementById('displayAuthor').innerHTML = currMedia.author;
        document.getElementById('displayAuthor').style.display = 'block';
        document.getElementById('bookIcon').style.display = 'block';
        document.getElementById('filmIcon').style.display = 'none';
    }
    else {
        document.getElementById('filmIcon').style.display = 'block';
        document.getElementById('bookIcon').style.display = 'none';
        document.getElementById('displayAuthor').style.display = 'none';
    }
    document.getElementById('displayDescription').innerHTML = currMedia.description;
    document.getElementById('displayCard').style.opacity = 1;
}

async function sendRating(interested) {
    await axios.post(`https://api.lib.byu.edu/leaflet/users/${userID}/ratings`, {
        itemId: currMedia.id,
        rating: interested
    })
    await getNewMedia();
}
