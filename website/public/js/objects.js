
/**
 * Fonction à appeler au chargement de la page
 * Cette fonction devra exécuter les actions suivantes :
 *    - charger la liste des objets depuis l'API
 *    - charger les données des objets dans la table
 */
function load_components(){
    console.log("Chargement des données de la page");
    // Ajouter ici le code permettant de charger dynamiquement les éléments de la page
    $.get("http://localhost:5000/objects", function (data, status, xhr){
        // alert("Data: " + Object.keys(data) + "\nStatus: " + status);

        console.log(data);
        for (const obj of data.objects){
            add_line_to_table(obj);
        }

    });
}

function add_line_to_table(obj){
    const $newLine = $('<tr>')
    $('<td>').html(obj.serial).css("fontWeight", "bold").appendTo($newLine);
    $('<td>').append(obj.image ? $('<img>').attr("src", "/images/" + obj.image).css("width", "100%") : '').appendTo($newLine);
    $('<td>').html(obj.description).appendTo($newLine);
    $('<td>').append($('<input>').attr('type', 'checkbox').attr("checked", obj.status)).appendTo($newLine);
    $('<td>').append($('<button>').addClass('btn btn-primary').html("détail")).appendTo($newLine);

    $('#table_body').append($newLine);
}

load_components()

