const rows = 500, cols = 500;
const chunkSize = 20;
const chunkWidth = 80 * chunkSize;
const chunkHeight = 80 * chunkSize;
const map = document.getElementById("map");
const viewport = document.getElementById("viewport");
const zoomWrapper = document.getElementById("zoomWrapper");
let mapplayer_id = "";
const tileSize = 80;
let currentScale = 1;
const minScale = 0.5;
const maxScale = 2;
let lastDist = null;

const loadedChunks = new Set();

let mapDataCondition = [];

function loadChunk(cx, cy) {
    const key = `${cx}_${cy}`;
    if (loadedChunks.has(key)) return;
    loadedChunks.add(key);

    const chunk = document.createElement("div");
    chunk.className = "map_chunk";
    chunk.style.left = (cx * chunkWidth) + "px";
    chunk.style.top = (cy * chunkHeight) + "px";
    chunk.id = `chunk_x${cx}_y${cy}`;

    for (let y = 1; y <= chunkSize; y++) {
        for (let x = 1; x <= chunkSize; x++) {
            const globalX = cx * chunkSize + x;
            const globalY = cy * chunkSize + y;
            if (globalX > cols || globalY > rows) continue;
            
            const map_ids = Math.floor(((globalY - 1) * 500) + globalX);
            const mapItem = mapData.find(item => item.id === map_ids); // mevcut default mapData

            const bs = document.createElement("div");
            bs.className = "map_b_s" + ` m_img${mapItem ? Number(mapItem.img) : 0}`;
            bs.id = `bs_x${globalX}_y${globalY}`;

            const s = document.createElement("div");
            s.className = "map_s";
            s.id = `s_x${globalX}_y${globalY}`;

            const t = document.createElement("div");
            t.className = "map_t";
            t.id = `t_x${globalX}_y${globalY}`;
            t.innerText = ``;

            const conditionItem = mapDataCondition.find(item => item.x === globalX && item.y === globalY);
            if (conditionItem) {
                bs.className = "map_b_s m_img0";
                s.style.backgroundImage = `url('images/${conditionItem.build}.png')`;
                t.style.display = "inline-block";
                t.innerText = conditionItem.lord_name;
            }

            bs.appendChild(s);
            bs.appendChild(t);
            chunk.appendChild(bs);
        }
    }

    map.appendChild(chunk);
}

function updateVisibleChunks() {
    const viewLeft = viewport.scrollLeft / currentScale;
    const viewTop = viewport.scrollTop / currentScale;
    const viewRight = (viewport.scrollLeft + viewport.clientWidth) / currentScale;
    const viewBottom = (viewport.scrollTop + viewport.clientHeight) / currentScale;

    const startChunkX = Math.floor(viewLeft / chunkWidth);
    const endChunkX = Math.floor(viewRight / chunkWidth);
    const startChunkY = Math.floor(viewTop / chunkHeight);
    const endChunkY = Math.floor(viewBottom / chunkHeight);

    for (let cy = startChunkY; cy <= endChunkY; cy++) {
        for (let cx = startChunkX; cx <= endChunkX; cx++) {
            if (cx >= 0 && cy >= 0 && cx < Math.ceil(cols / chunkSize) && cy < Math.ceil(rows / chunkSize)) {
                loadChunk(cx, cy);
            }
        }
    }
}

viewport.addEventListener("scroll", updateVisibleChunks);

function centerOnTile(x, y) {
    const tileX = (x - 1) * 80;
    const tileY = (y - 1) * 80;

    const centerX = tileX * currentScale - (viewport.clientWidth / 2) + (80 * currentScale / 2);
    const centerY = tileY * currentScale - (viewport.clientHeight / 2) + (80 * currentScale / 2);

    viewport.scrollLeft = centerX;
    viewport.scrollTop = centerY;

    updateVisibleChunks();
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get(param));
}

window.onload = () => {
    const x = getQueryParam("x");
    const y = getQueryParam("y");

    const world = localStorage.getItem("world");
	
    if (world) {
        fetch("/get_map_data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ world })
        })
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                mapDataCondition = json.data;
            }
            centerOnTile(x, y);
        })
        .catch(err => console.error(err));
		
    } else {
        centerOnTile(x, y);
    }
};

/* arrow */

const returnBtn = document.getElementById("returnBtn");
const arrow = returnBtn.querySelector(".arrow");
const distanceDiv = returnBtn.querySelector(".distance");

const castleX = localStorage.getItem("x");
const castleY = localStorage.getItem("y");

function getCastlePixel() {
    return {
        x: (castleX - 1) * 80 + 40,
        y: (castleY - 1) * 80 + 40
    };
}

function isCastleVisible() {
    const { x, y } = getCastlePixel();

    const castleLeft = x * currentScale;
    const castleTop = y * currentScale;
    const castleRight = castleLeft + tileSize * currentScale;
    const castleBottom = castleTop + tileSize * currentScale;

    const viewLeft = viewport.scrollLeft;
    const viewTop = viewport.scrollTop;
    const viewRight = viewLeft + viewport.clientWidth;
    const viewBottom = viewTop + viewport.clientHeight;

    const visibleHorizontally = castleRight >= viewLeft && castleLeft <= viewRight;
    const visibleVertically = castleBottom >= viewTop && castleTop <= viewBottom;

    return visibleHorizontally && visibleVertically;
}

function formatDistanceTime(distanceM) {
    let totalSeconds = distanceM * 30;

    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    let result = "";
    if (hours > 0) {
        result += String(hours).padStart(2, '0') + ":" + String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');
    } else if (minutes > 0) {
        result += String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');
    } else {
        result += String(seconds);
    }

    return result;
}

function updateReturnBtn() {
    const { x: castlePx, y: castlePy } = getCastlePixel();

    const centerX = viewport.scrollLeft + viewport.clientWidth / 2;
    const centerY = viewport.scrollTop + viewport.clientHeight / 2;

    const dx = castlePx * currentScale - centerX;
    const dy = castlePy * currentScale - centerY;
    const distanceM = Math.max(Math.round(Math.max(Math.abs(dx), Math.abs(dy)) / 80), 1);

    if (distanceM > 4) {
        returnBtn.style.display = "flex";
        distanceDiv.innerText = formatDistanceTime(distanceM);

        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        arrow.style.transform = `rotate(${angle}deg)`;
    } else {
        returnBtn.style.display = "none";
    }
}

returnBtn.addEventListener("click", () => {
    centerOnTile(castleX, castleY);
    updateReturnBtn();
});

viewport.addEventListener("scroll", updateReturnBtn);
window.addEventListener("resize", updateReturnBtn);
window.addEventListener("load", updateReturnBtn);

function loopReturnBtn() {
    updateReturnBtn();
    requestAnimationFrame(loopReturnBtn);
}

requestAnimationFrame(loopReturnBtn);

/* mini map */

const miniMapSize = 115; // mini map kutusu boyutu

function getZoomScale() {
    const style = window.getComputedStyle(zoomWrapper);
    const transform = style.transform || style.webkitTransform;
    if (transform && transform !== 'none') {
        const match = transform.match(/matrix\(([^)]+)\)/);
        if (match) {
            const values = match[1].split(', ');
            return parseFloat(values[0]); // scaleX
        }
    }
    return 1;
}

function updateMiniMapMarkers() {
    const maxPos = 105;
    const maxPos2 = 103;

    const scale = getZoomScale();
    const mapWidth = cols * tileSize * scale;
    const mapHeight = rows * tileSize * scale;

    const scrollX = viewport.scrollLeft;
    const scrollY = viewport.scrollTop;

    const scrollRatioX = scrollX / (mapWidth - viewport.clientWidth);
    const scrollRatioY = scrollY / (mapHeight - viewport.clientHeight);

    const whiteMarker = document.getElementById("mini_map_marker");
    let whiteX = scrollRatioX * maxPos;
    let whiteY = scrollRatioY * maxPos2;

    whiteX = Math.max(0, Math.min(whiteX, maxPos));
    whiteY = Math.max(0, Math.min(whiteY, maxPos2));

    whiteMarker.style.left = whiteX + "px";
    whiteMarker.style.top = whiteY + "px";

    // --- Dinamik boyut hesaplama ---
    const visibleRatioX = viewport.clientWidth / mapWidth;
    const visibleRatioY = viewport.clientHeight / mapHeight;

    const baseWidth = 4;  // minimum width
    const baseHeight = 6; // minimum height

    const calculatedWidth = Math.max(baseWidth, visibleRatioX * maxPos);
    const calculatedHeight = Math.max(baseHeight, visibleRatioY * maxPos2);

    whiteMarker.style.width = calculatedWidth + "px";
    whiteMarker.style.height = calculatedHeight + "px";

    const castleMarker = document.getElementById("mini_map_castle");
    const castleX = parseInt(localStorage.getItem("x"));
    const castleY = parseInt(localStorage.getItem("y"));

    let castleMiniX = ((castleX - 1) / cols) * maxPos;
    let castleMiniY = ((castleY - 1) / rows) * maxPos2;

    castleMiniX = Math.max(0, Math.min(castleMiniX, maxPos));
    castleMiniY = Math.max(0, Math.min(castleMiniY, maxPos2));

    castleMarker.style.left = castleMiniX + "px";
    castleMarker.style.top = castleMiniY + "px";
}

viewport.addEventListener('scroll', updateMiniMapMarkers);
window.addEventListener('resize', updateMiniMapMarkers);
updateMiniMapMarkers();

/* zoom */

viewport.addEventListener("wheel", (e) => {
    e.preventDefault();

    const scaleFactor = 0.1;
    let newScale = currentScale - e.deltaY * scaleFactor / 100;
    newScale = Math.max(minScale, Math.min(maxScale, newScale));

    const rect = viewport.getBoundingClientRect();
    const offsetX = e.clientX - rect.left + viewport.scrollLeft;
    const offsetY = e.clientY - rect.top + viewport.scrollTop;

    const dx = offsetX * (newScale / currentScale - 1);
    const dy = offsetY * (newScale / currentScale - 1);

    currentScale = newScale;
    zoomWrapper.style.transform = `scale(${currentScale})`;

    viewport.scrollLeft += dx;
    viewport.scrollTop += dy;

    updateVisibleChunks();
    updateReturnBtn();
    updateMiniMapMarkers();
}, { passive: false });