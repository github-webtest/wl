const world = localStorage.getItem("world");
const token = localStorage.getItem("token");
const lange = localStorage.getItem("language");

async function Upgrade(x) {
    
    const upgradeType = x;

    try {
        const response = await fetch('/upgrade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ world, token, upgradeType, lange })
        });

        const data = await response.json();
        showToast(data.message);

    } catch (err) {
        console.error('Error:', err);
        showToast("Server error.");
    }
}

async function Upgrade_Cancel(x) {
    
    const upgradeType = x;

    try {
        const response = await fetch('/upgrade_cancel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ world, token, upgradeType, lange })
        });

        const data = await response.json();
        showToast(data.message);

    } catch (err) {
        console.error('Error:', err);
        showToast("Server error.");
    }
}

async function Upgrade_Speed_Up(x) {
    
    const upgradeType = x;

    try {
        const response = await fetch('/upgrade_speed_up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ world, token, upgradeType, lange })
        });

        const data = await response.json();
        showToast(data.message);

    } catch (err) {
        console.error('Error:', err);
        showToast("Server error.");
    }
}

async function Produce(x) {
    
    const produceType = x;
	const produceAmout = document.getElementById(x + "_input").value;

    try {
        const response = await fetch('/produce', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ world, token, produceType, produceAmout, lange })
        });

        const data = await response.json();
        showToast(data.message);
		document.getElementById(x + "_input").value = '';

    } catch (err) {
        console.error('Error:', err);
        showToast("Server error.");
    }
}

async function Produce_Cancel(x) {
    
    const produceType = x;

    try {
        const response = await fetch('/produce_cancel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ world, token, produceType, lange })
        });

        const data = await response.json();
        showToast(data.message);

    } catch (err) {
        console.error('Error:', err);
        showToast("Server error.");
    }
}

async function Produce_Speed_Up(x) {
    
    const produceType = x;

    try {
        const response = await fetch('/produce_speed_up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ world, token, produceType, lange })
        });

        const data = await response.json();
        showToast(data.message);

    } catch (err) {
        console.error('Error:', err);
        showToast("Server error.");
    }
}

async function Boost(x) {
    
    const boostType = x;

    try {
        const response = await fetch('/boost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ world, token, boostType, lange })
        });

        const data = await response.json();
        showToast(data.message);

    } catch (err) {
        console.error('Error:', err);
        showToast("Server error.");
    }
}

async function Kick() {
    
    const selected = document.querySelector('input[name="gender"]:checked');
    let kickType = null;

    if (selected) {
       kickType = selected.value;
    } else {
       showToast('Invalid kick Type!');
    }
	
	const kickAmout = document.getElementById("villager_kick_input").value;

    try {
        const response = await fetch('/kick', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ world, token, kickType, kickAmout, lange })
        });

        const data = await response.json();
        showToast(data.message);

    } catch (err) {
        console.error('Error:', err);
        showToast("Server error.");
    }
}