export const FILTERS = [
  { id: 'with_discounts', label: 'Deals' },
  { id: 'free_delivery', label: 'Free Delivery' },
  { id: 'four_star', label: '4+ Stars' },
  { id: 'open_now', label: 'Open Now' },
  { id: 'collection', label: 'Collection' },
  { id: 'new', label: 'New' },
] as const;

export const SORT_SELECT_OPTIONS = [
  { value: 'bestMatch', label: 'Best Match' },
  { value: 'reviews', label: 'Rating (High to Low)' },
  { value: 'estimatedDeliveryTime', label: 'Delivery Time' },
  { value: 'minOrderAmount', label: 'Min Order Amount' },
  { value: 'deliveryCost', label: 'Delivery Cost' },
] as const;

export const POSTCODE = [
  'CT12EH',
  'BS14DJ',
  'L40TH',
  'NE97TY',
  'SW1A1AA',
  'CF118AZ',
  'M160RA',
  'EH11RE',
  'BN11AE',
  'CB74DL',
  'LS27HY',
  'G38AG',
  'PL40DW',
  'B263QJ',
  'DH45QZ',
  'BT71NN',
];

export const PAGE_SIZE = 18