const menuItems = JSON.parse(localStorage.getItem("menuItems"))

const adminMenu = document.getElementById("admin-menu");


function renderAdminMenu() {
    adminMenu.innerHTML = ""; 
    menuItems.forEach((item, index) => {
        adminMenu.innerHTML += `
            <div class="menu-item-admin">
                <h3>Item ${index + 1}</h3>
                <label>Nome:</label>
                <input type="text" value="${item.name}" data-index="${index}" data-field="name">
                
                <label>Descrição:</label>
                <textarea data-index="${index}" data-field="description">${item.description}</textarea>
                
                <label>Preço:</label>
                <input type="text" value="${item.price}" data-index="${index}" data-field="price">
                
                <label>URL da Imagem:</label>
                <input type="text" value="${item.image}" data-index="${index}" data-field="image">
            </div>
        `;
    });
}


adminMenu.addEventListener("input", (e) => {
    const index = e.target.getAttribute("data-index");
    const field = e.target.getAttribute("data-field");
    menuItems[index][field] = e.target.value;
});


document.addEventListener("DOMContentLoaded", function() {
  renderAdminMenu();  
});


const saveButton = document.getElementById("save-button");

saveButton.addEventListener("click", () => {
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
    alert("Alterações salvas com sucesso!");
});
