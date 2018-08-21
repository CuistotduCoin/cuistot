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
    workshops: {
      name: 'Atelier |||| Ateliers',
      fields: {
        name: 'Nom',
        price: 'Prix',
        duration: 'Durée',
        min_gourmet: 'Nb. gourmets min.',
        max_gourmet: 'Nb. gourmets max.',
        description: 'Description',
        date: 'Date',
        kitchen_id: 'Lieu',
        cook_id: 'Cuistot',
      },
      page: {
        delete: 'Supprimer l\'atelier',
      },
    },
  },
};
