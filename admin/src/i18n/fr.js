import frenchMessages from 'ra-language-french';

export default {
  ...frenchMessages,
  pos: {
    search: 'Rechercher',
    configuration: 'Configuration',
    language: 'Langue',
    theme: {
      name: 'Theme',
      light: 'Clair',
      dark: 'Obscur',
    },
    dashboard: {
      monthly_revenue: 'CA à 30 jours',
      new_orders: 'Nouvelles commandes',
      pending_reviews: 'Commentaires à modérer',
      new_customers: 'Nouveaux clients',
      pending_orders: 'Commandes à traiter',
      order: {
        items:
          'par %{customer_name}, un poster |||| par %{customer_name}, %{nb_items} posters',
      },
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
      fields: {
        name: 'Nom',
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
        business_name: 'Nom de la société',
        siren: 'SIREN',
        pro_email: 'Email pro.',
        legal_first_name: 'Prénom (représentant légal)',
        legal_last_name: 'Nom (représentant légal)',
        legal_birthdate: 'Date de naissance (représentant légal)',
      },
      page: {
        delete: 'Supprimer le cuistot',
      },
    },
    bookings: {
      name: 'Réservation |||| Réservations',
      fields: {
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
        rating: 'Note',
        comment: 'Commentaires',
      },
      page: {
        delete: 'Supprimer l\'évaluation',
      },
    },
  },
};
