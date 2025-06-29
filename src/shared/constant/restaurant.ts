export const FILTERS = [
  { id: 'with_discounts', label: 'Deals' },
  { id: 'free_delivery', label: 'Free Delivery' },
  { id: 'four_star', label: '4+ Stars' },
  { id: 'open_now', label: 'Open Now' },
  { id: 'new', label: 'New' },
  { id: 'collection', label: 'Collection' },
] as const;

export const SORT_SELECT_OPTIONS = [
  { value: 'bestMatch', label: 'Best match' },
  { value: 'reviews', label: 'Customer rating' },
  { value: 'estimatedDeliveryTime', label: 'Nearest first' },
  { value: 'minOrderAmount', label: 'Minimum order' },
  { value: 'deliveryCost', label: 'Delivery fee' },
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