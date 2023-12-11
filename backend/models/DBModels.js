const mongoose = require('mongoose');


const barSchema = mongoose.Schema({
    name: String,
    map: String,
    note: Number,
    twTruncate4: Number,
    prix: Number,
    type: String,
    presentation: String,
    adresse: String,
    gps: String,
    site: String,
    numero: String,
    image: String,
    longitude: Number,
    latitude: Number,

    horaires: {
        lundi: String,
        mardi: String,
        mercredi: String,
        jeudi: String,
        vendredi: String,
        samedi: String,
        dimanche: String,
    },
    activitesEtEquipements: {
        Redifusion_des_matchs: Boolean,
        Billard: Boolean,
        Fletchette: Boolean,
        Pétanque: Boolean,
        eSport: Boolean,
        Babyfoot: Boolean,
        Jeux_de_société: Boolean,
        Karaoke: Boolean,
        Danse: Boolean,
        Wifi: Boolean,
    },
    caracteristiquesEtServices: {
        Dégustation: Boolean,
        Familial: Boolean,
        Lounge: Boolean,
        Irlandais: Boolean,
        Cocktail: Boolean,
        Plage: Boolean,
        Sportif: Boolean,
        Bar_à_thème: Boolean,
        Rooftop: Boolean,
        Tapas: Boolean,
        Thé: Boolean,
        Afterwork: Boolean,
    },
});


const articleSchema = {
    name: 'String',
    description: 'String',
    date: 'Date',
    image: 'String',
    adresse: 'String',
};



const eventSchema = {
    name: 'String',
    description: 'String',
    date: 'Date',
    image: 'String',
    adresse: 'String',
   // bar: {type: mongoose.Schema.Types.ObjectId, ref: 'bars'},
};

const Bar = mongoose.model('bars', barSchema);
const Blog = mongoose.model('blogs', articleSchema);
const Event = mongoose.model('events', eventSchema);

module.exports = { Bar, Blog, Event };
