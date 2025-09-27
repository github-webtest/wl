async function checkTime() {
    try {
        const response = await fetch("/check-time", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            showToast('Server error.');
            return;
        }

        const json = await response.json();

        sessionStorage.setItem("time", json.serverTime);

    } catch (err) {
        showToast('Server error.');
    }
}

setInterval(async () => {
    await checkTime();
}, 500);