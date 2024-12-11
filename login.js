
const users = JSON.parse(localStorage.getItem("users")) || [];


function showPopup(message, type, duration = 5000) {
    const popupContainer = document.getElementById("popup-container");


    const popup = document.createElement("div");
    popup.classList.add("popup", type);


    popup.textContent = message;


    const closeButton = document.createElement("button");
    closeButton.classList.add("close-btn");
    closeButton.innerHTML = "&times;";
    closeButton.onclick = () => popup.remove();


    popup.appendChild(closeButton);


    popupContainer.appendChild(popup);


    if (duration) {
        setTimeout(() => {
            popup.remove();
        }, duration);
    }
}


function showConfirmationPopup(message, onConfirm, onCancel) {
    const popupContainer = document.getElementById("popup-container");


    const popup = document.createElement("div");
    popup.classList.add("popup", "confirm");


    const messageDiv = document.createElement("p");
    messageDiv.textContent = message;
    popup.appendChild(messageDiv);


    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Sim";
    confirmButton.classList.add("confirm-btn");
    confirmButton.onclick = () => {
        if (onConfirm) onConfirm();
        popup.remove();
    };


    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Não";
    cancelButton.classList.add("cancel-btn");
    cancelButton.onclick = () => {
        if (onCancel) onCancel();
        popup.remove();
    };


    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.appendChild(confirmButton);
    buttonContainer.appendChild(cancelButton);

    popup.appendChild(buttonContainer);


    popupContainer.appendChild(popup);
}


function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;
    return regex.test(password);
}


function sanitizeInput(input) {
    const temp = document.createElement("div");
    temp.textContent = input;
    return temp.innerHTML;
}


document.getElementById("register-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const username = sanitizeInput(document.getElementById("register-username").value.trim());
    const email = sanitizeInput(document.getElementById("register-email").value.trim());
    const password = sanitizeInput(document.getElementById("register-password").value.trim());


    if (!username || !email || !password) {
        showPopup("Todos os campos devem ser preenchidos.", "error");
        return;
    }


    if (users.some((user) => user.username === username)) {
        showPopup("Usuário já existe!", "error");
        return;
    }


    if (users.some((user) => user.email === email)) {
        showPopup("Email já cadastrado!", "error");
        return;
    }


    if (!validatePassword(password)) {
        showPopup(
            "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos especiais.",
            "error"
        );
        return;
    }


    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    showPopup("Usuário cadastrado com sucesso!", "success");


    document.getElementById("register-form").reset();
});


document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const username = sanitizeInput(document.getElementById("login-username").value.trim());
    const password = sanitizeInput(document.getElementById("login-password").value.trim());


    if (!username || !password) {
        showPopup("Todos os campos devem ser preenchidos.", "error");
        return;
    }


    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
        showPopup("Login realizado com sucesso!", "success");
        setTimeout(() => {
            window.location.href = 'control.html';
        }, 1500);
    } else {
        showPopup("Credenciais inválidas.", "error");
    }
});


const deleteBtn = document.getElementById("delete-btn");
if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
        showConfirmationPopup(
            "Tem certeza que deseja excluir sua conta?",
            () => {
                console.log("Conta excluída.");
                showPopup("Conta excluída com sucesso!", "success");
            },
            () => {
                console.log("Ação cancelada.");
                showPopup("Ação cancelada.", "warning");
            }
        );
    });
}
