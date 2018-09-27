import frenchMessages from 'ra-language-french';

export default {
  ...frenchMessages,
  pos: {
    info: 'Informations',
    images: 'Images',
    search: 'Rechercher',
    no_picture: 'Aucune photo',
    has_been_deleted: 'Supprimé ?',
    configuration: 'Configuration',
    language: 'Langue',
    theme: {
      name: 'Theme',
      light: 'Clair',
      dark: 'Obscur',
    },
    dashboard: {
      welcome: {
        title: 'Admin Cuistot du coin',
        subtitle: 'Bienvenue',
        cta: 'Lien vers le site',
      },
    },
  },
  resources: {
    fields: {
      location: 'Coordonnées',
    },
    workshops: {
      name: 'Atelier |||| Ateliers',
      has_bookings: 'Avec/sans réservation(s)',
      has_been_archived: 'Archivé ?',
      no_picture: 'Aucune image',
      fields: {
        name: 'Nom',
        'cook.id': 'Cuistot',
        'kitchen.id': 'Lieu',
        price: 'Prix',
        duration: 'Durée (minutes)',
        min_gourmet: 'Min. gourmets',
        max_gourmet: 'Max. gourmets',
        description: 'Description',
        date: 'Date',
        kitchen_id: 'Lieu',
        cook_id: 'Cuistot',
      },
      page: {
        delete: 'Supprimer l\'atelier',
      },
    },
    gourmets: {
      name: 'Gourmet |||| Gourmets',
      fields: {
        first_name: 'Prénom',
        last_name: 'Nom',
        email: 'Email',
        phone_number: 'Numéro de téléphone',
        gender: 'Sexe',
        birthdate: 'Date de naissance',
        address: 'Adresse',
        city: 'Ville',
        zip_code: 'Code postal',
      },
      page: {
        delete: 'Supprimer le gourmet',
      },
    },
    cooks: {
      name: 'Cuistot |||| Cuistots',
      fields: {
        'gourmet.id': 'Gourmet',
        is_pro: 'Pro ?',
        confirmed: 'Confirmé ?',
        business_name: 'Nom de la société',
        siren: 'SIREN',
        pro_email: 'Email pro.',
        pro_phone_number: 'Numéro de téléphone pro.',
        legal_first_name: 'Prénom',
        legal_last_name: 'Nom',
        legal_birthdate: 'Date immatriculation',
      },
      page: {
        delete: 'Supprimer le cuistot',
      },
    },
    bookings: {
      name: 'Réservation |||| Réservations',
      fields: {
        'workshop.id': 'Atelier',
        'gourmet.id': 'Gourmet',
        amount: 'Qté',
      },
      page: {
        delete: 'Supprimer la réservation',
      },
    },
    kitchens: {
      name: 'Lieu |||| Lieux',
      fields: {
        name: 'Nom',
        address: 'Adresse',
        city: 'Ville',
        zip_code: 'Code postal',
      },
      page: {
        delete: 'Supprimer le lieu',
      },
    },
    evaluations: {
      name: 'Evaluation |||| Evaluations',
      fields: {
        'cook.id': 'Cuistot',
        'author.id': 'Auteur',
        rating: 'Note',
        comment: 'Commentaires',
      },
      page: {
        delete: 'Supprimer l\'évaluation',
      },
    },
  },
};
