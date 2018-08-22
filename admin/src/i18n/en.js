import englishMessages from 'ra-language-english';

export default {
  ...englishMessages,
  pos: {
    search: 'Search',
    configuration: 'Configuration',
    language: 'Language',
    theme: {
      name: 'Theme',
      light: 'Light',
      dark: 'Dark',
    },
    dashboard: {
      monthly_revenue: 'Monthly Revenue',
      new_orders: 'New Orders',
      pending_reviews: 'Pending Reviews',
      new_customers: 'New Customers',
      pending_orders: 'Pending Orders',
      order: {
        items:
          'by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items',
      },
      welcome: {
        title: 'Cuistot du coin Admin',
        subtitle: 'Welcome',
        cta: 'Go to the website',
      },
    },
  },
  resources: {
    fields: {
      location: 'location',
    },
    workshops: {
      name: 'Workshop |||| Workshops',
      fields: {
        name: 'Name',
        price: 'Price',
        duration: 'Duration (minutes)',
        min_gourmet: 'Min. gourmets count',
        max_gourmet: 'Max. gourmets count',
        description: 'Description',
        date: 'Date',
        kitchen_id: 'Location',
        cook_id: 'Cook',
      },
      page: {
        delete: 'Delete the workshop',
      },
    },
    gourmets: {
      name: 'Gourmet |||| Gourmets',
      fields: {
        first_name: 'First name',
        last_name: 'Last name',
      },
      page: {
        delete: 'Delete the gourmet',
      },
    },
  },
};
