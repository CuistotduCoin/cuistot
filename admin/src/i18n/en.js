import englishMessages from 'ra-language-english';

export default {
  ...englishMessages,
  pos: {
    info: 'Information',
    images: 'Pictures',
    search: 'Search',
    no_picture: 'No picture',
    has_been_deleted: 'Deleted ?',
    configuration: 'Configuration',
    language: 'Language',
    theme: {
      name: 'Theme',
      light: 'Light',
      dark: 'Dark',
    },
    dashboard: {
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
      has_bookings: 'With/without booking(s)',
      has_been_archived: 'Archived ?',
      no_picture: 'No picture',
      fields: {
        name: 'Name',
        'cook.id': 'Cook',
        'kitchen.id': 'Kitchen',
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
        email: 'Email',
        phone_number: 'Phone number',
        gender: 'Gender',
        birthdate: 'Birthdate',
        address: 'Address',
        city: 'City',
        zip_code: 'Zip code',
      },
      page: {
        delete: 'Delete the gourmet',
      },
    },
    cooks: {
      name: 'Cook |||| Cooks',
      fields: {
        'gourmet.id': 'Gourmet',
        is_pro: 'Pro ?',
        confirmed: 'Confirmed ?',
        business_name: 'Company name',
        siren: 'SIREN',
        pro_email: 'Business email',
        pro_phone_number: 'Business phone number',
        legal_first_name: 'Last name',
        legal_last_name: 'First name',
        legal_birthdate: 'Registration date',
      },
      page: {
        delete: 'Delete the cook',
      },
    },
    bookings: {
      name: 'Booking |||| Bookings',
      fields: {
        'workshop.id': 'Workshop',
        'gourmet.id': 'Gourmet',
        amount: 'Amount',
      },
      page: {
        delete: 'Delete the booking',
      },
    },
    kitchens: {
      name: 'Kitchen |||| Kitchens',
      fields: {
        name: 'Name',
        address: 'Address',
        city: 'City',
        zip_code: 'Zip code',
      },
      page: {
        delete: 'Delete the kitchen',
      },
    },
    evaluations: {
      name: 'Evaluation |||| Evaluations',
      fields: {
        'cook.id': 'Cook',
        'author.id': 'Author',
        rating: 'Rating',
        comment: 'Comment',
      },
      page: {
        delete: 'Delete the evaluation',
      },
    },
  },
};
