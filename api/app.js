/**
 * Bienvenu du coté serveur de javascript les fonctions ci-dessous
 * devront être complétées pour passer les tests et permettre au
 * client web (front-end) d'accéder à des données.
 */

/**
 * import de la bibliothèque fs et lecture du fichier data.json.
 */
const data = require('./data/data.json');


/**
 * Cette fonction est lancée au démarrage du serveur
 * elle ne prend pas de paramètres et retourne
 * une chaîne de caractères.
 */
function demarrage() {
    return "Ronflex";
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/ représentée par la route '/'.
 * Elle ne prend pas de paramètres
 * Elle retourne un objet javascript au format json.
 */
function home() {
    return data;
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/data représentée par la route '/data'.
 * Elle ne prend pas de paramètres.
 * Elle retourne un objet javascript contenant toutes les données.
 */
function donnees() {
    return {objects: data.objects, communication: data.communication};
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/comms représentée par la route '/comms'
 * Elle ne prend pas de paramètres.
 * Elle retourne un objet javascript contenant une liste
 * de tous les modes de communications de la base de données.
 * Cette liste sera contenu dans la clé communication
 */
function comms() {
    return {communication: data.communication};
}


/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/objects représentée par la route '/objects'
 * Elle ne prend pas de paramètres.
 * Elle retourne un objet javascript contenant une liste
 * de tous les objets de la base de données.
 * Cette liste sera contenue dans la clé objects
 */
function objects() {
    return {objects: data.objects};
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/types représentée par la route '/types'
 * Elle ne prend pas de paramètres.
 * Elle retourne un objet javascript contenant une liste
 * des types existant et leur détail dans la base de données.
 * Cette liste sera contenu dans la clé types
 */
function types() {
    return {types: Object.entries(data.types)};
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/formats représentée par la route '/formats'
 * Elle ne prend pas de paramètres.
 * Elle retourne un objet javascript contenant une liste
 * des formats de donnnées existant et leur détail dans la base de données.
 * Cette liste sera contenu dans la clé formats.
 */
function formats() {
    return {formats: Object.entries(data.data_formats)};
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/objects/serials représentée par la route '/objects/serials'
 * Elle ne prend pas de paramètres.
 * Elle retourne un objet javascript contenant une liste
 * de tous les numéros de série des objets de la base de données.
 * Cette liste sera contenue dans la clé objects
 */
function objects_serials() {
    return {"objects": data.objects.map(obj => obj.serial)};
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/object/serial/<serial> représentée par la route '/object/serial/:serial'
 * Elle prend le serial de l'objet en paramètre.
 * Elle retourne un objet javascript contenant seulement
 * l'objet ayant le serial passé en paramètre.
 */
function get_object_by_serial(serial) {
    return data.objects.find(obj => obj.serial === serial);
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/objects/operator/<operator> représentée par la route '/objects/operator/:operator'
 * Elle prend l'operateur de l'objet en paramètre.
 * Elle retourne un objet javascript contenant une
 * liste des objets ayant l'opérateur passé en paramètre.
 */
function get_objects_by_operator(operator) {
    const r = data.objects.filter(obj => obj.provisionning.operator === operator);
    if (r.length === 0) {
        return undefined;
    }
    return {objects: r};
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/types/comm/<comm> représentée par la route '/types/comm/:comm'
 * Elle prend le mode de communication de l'objet en paramètre.
 * Elle retourne un objet javascript contenant une liste de types
 * ayant pour mode de communication celui passé en paramètre.
 */
function get_types_by_comm(comm) {
    const r = Object.values(data.types).filter(type => type.communication === comm);
    if (r.length === 0) {
        return undefined;
    }
    return {types: r};
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/types/format/<format> représentée par la route '/types/format/:format'
 * Elle prend le format des données en paramètre.
 * Elle retourne un objet javascript contenant une liste de types
 * ayant pour un format de données celui passé en paramètre.
 */
function get_types_by_format(format) {
    return data.data_formats[format] ? {types: Object.values(data.types).filter(type => type.sensors.includes(format))} : undefined;
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/objects/comm/<comm> représentée par la route '/objects/comm/:comm'
 * Elle prend le mode de communication en paramètre.
 * Elle retourne un objet javascript contenant une liste d'objets
 * ayant pour mode de communication celui passé en paramètre.
 */
function filter_objects_by_comm(comm) {
    return data.communication.includes(comm) ? {objects: data.objects.filter(object => data.types[object.type].communication === comm)} : undefined

    // if (data.communication.includes(comm)) {
    //     const types = [];
    //     for (const type_name in data.types) {
    //         if (data.types[type_name].communication === comm) {
    //             types.push(type_name);
    //         }
    //     }
    //
    //     const objects = [];
    //     for (const type of types) {
    //         for (const object of data.objects) {
    //             if (object.type === type) {
    //                 objects.push(object);
    //             }
    //         }
    //     }
    //
    //     return {objects: objects};
    // }
    // return undefined;
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/objects/data_type/<data_type> représentée par la route '/objects/data_type/:data_type'
 * Elle prend le type de donnée renvoyer par un objet en paramètre.
 * Elle retourne un objet javascript contenant une liste d'objets
 * comprenant les noms des capteurs émettant des données
 * du même type que celui passé en paramètre.
 */
function filter_objects_by_data_type(data_type) {

    const formats = Object.keys(data.data_formats).filter(format_name => data.data_formats[format_name].data_type === data_type);
    // const formats = [];
    // for (const format_name in data.data_formats) {
    //     if (data.data_formats[format_name].data_type === data_type) {
    //         formats.push(format_name);
    //     }
    // }

    if (formats.length > 0) {
        const types = Object.keys(data.types).filter(type_name => data.types[type_name].sensors.some(element => formats.includes(element)));
        // const types = [];
        // for (const type_name in data.types) {
        //     if (data.types[type_name].sensors.some(element => formats.includes(element))) {
        //         types.push(type_name);
        //     }
        // }

        const objects = data.objects.filter(object => types.includes(object.type)).map(object => Object.assign({}, object));
        // const objects = [];
        // for (const type of types) {
        //     for (const object of data.objects) {
        //         if (object.type === type) {
        //             objects.push(Object.assign({}, object));  /// sinon je modifiais le data.json en fait!! car je file non pas la valeur de la variable object, mais bien son chemin mémoire... saif avec le assign
        //         }
        //     }
        // }

        const objects_detail = objects.map(object => {
            object["sensors"] = data.types[object.type].sensors;
            return object;
        })

        return {objects: objects_detail};

    }
    return undefined;
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/object/full/<serial> représentée par la route '/object/full/:serial'
 * Elle prend le serial de l'objet en paramètre.
 * Elle retourne un objet javascript contenant seulement
 * l'objet ayant le serial passé en paramètre comprenant toutes les informations possible sur cet objet.
 * Les types de données des sensors et autres informations seront regroupé dans la clé sensors de l'objet.
 */
function get_full_object_by_serial(serial) {
    const object = data.objects.find(object => object.serial === serial);

    if (object) {
        const object_clone = Object.assign({}, object);

        object_clone.sensors = {};
        for (const format of data.types[object_clone.type].sensors) {
            object_clone["sensors"][format] = data.data_formats[format];
        }

        object_clone.communication = data.types[object.type].communication;
        object_clone.default_image = data.types[object.type].default_image;

        return object_clone;
    }

    return undefined;
}

/**
 * À partir de ce commentaire ne rien modifier.
 * le serveur est lancé, ses routes sont définies
 * d'autres opérations sont effectuées afin de pouvoir tester le code.
 */

const express = require('express');
const app = express();
app.use(express.static('public'));

/// TODO question
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

// définitions des routes
app.get('/', route(home));
app.get('/data', route(donnees));
app.get('/objects', route(objects));
app.get('/comms', route(comms));
app.get('/types', route(types));
app.get('/formats', route(formats));
app.get('/objects/serials', route(objects_serials));
app.get('/object/serial/:serial', route(get_object_by_serial));
app.get('/object/full/:serial', route(get_full_object_by_serial));
app.get('/objects/operator/:operator', route(get_objects_by_operator));
app.get('/objects/comm/:comm', route(filter_objects_by_comm));
app.get('/objects/data_type/:data_type', route(filter_objects_by_data_type));
app.get('/types/comm/:comm', route(get_types_by_comm));
app.get('/types/format/:format', route(get_types_by_format));


function route(fun) {
    return function (req, res) {
        if (Object.keys(req.params).length !== 0) {
            res.json(fun(Object.values(req.params)[0]));
        }
        return res.send(fun());
    }
}

const port = process.argv[2] == "-u" ? 5001 : process.argv[2];
app.listen(port, function () {
    console.log(demarrage());
});

module.exports = {
    "demarrage": demarrage,
    "home": home,
    "donnees": donnees,
    "objects": objects,
    "types": types,
    "formats": formats,
    "objects_serials": objects_serials,
    "get_object_by_serial": get_object_by_serial,
    "get_full_object_by_serial": get_full_object_by_serial,
    "get_objects_by_operator": get_objects_by_operator,
    "filter_objects_by_comm": filter_objects_by_comm,
    "filter_objects_by_data_type": filter_objects_by_data_type,
    "get_types_by_comm": get_types_by_comm,
    "get_types_by_format": get_types_by_format,
    "comms": comms
};