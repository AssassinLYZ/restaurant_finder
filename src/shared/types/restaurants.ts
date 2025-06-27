export interface GeoPoint {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

export interface BusinessAddress {
  city: string; // City name
  firstLine: string; // Primary address line
  postalCode: string; // Postal/ZIP code
  location: GeoPoint; // Geographic coordinates
}

export interface EstablishmentRating {
  count: number; // Total number of ratings
  starRating: number; // Average star rating (1-5)
  userRating: number | null; // Current user's rating (nullable)
}

export interface RestaurantPromotion {
  description: string; // Offer description
  offerType: string; // Type of offer
}

export interface CuisineType {
  name: string; // Display name
  uniqueName: string; // System identifier
}

export interface ServiceAvailabilityDetail {
  isOpen: boolean; // Currently open for service
  canPreOrder: boolean; // Accepts pre-orders
  isTemporarilyOffline: boolean; // Temporary closure

  nextAvailability?: {
    // Next opening time (optional)
    from: string;
  };

  etaMinutes?: {
    // Estimated time ranges (optional)
    rangeLower?: number; // Minimum estimated minutes
    rangeUpper?: number; // Maximum estimated minutes
    approximate?: number; // Approximate midpoint
  };
}

export interface ServiceAvailability {
  delivery?: ServiceAvailabilityDetail; // Delivery service status
  collection?: ServiceAvailabilityDetail; // Pickup service status
}

export interface Restaurant {
  id: string; // Unique identifier
  name: string; // Business name
  uniqueName: string; // System identifier

  address: BusinessAddress; // Location information
  rating: EstablishmentRating; // Customer ratings

  isNew: boolean; // Newly added flag
  driveDistanceMeters: number; // Distance in meters

  openingTimeLocal: string; // Local opening hours
  deliveryOpeningTimeLocal: string; // Delivery hours

  deliveryEtaMinutes: {
    // Delivery time estimate
    rangeLower: number;
    rangeUpper: number;
  };

  isCollection: boolean; // Offers pickup
  isDelivery: boolean; // Offers delivery

  isOpenNowForCollection: boolean; // Currently available for pickup
  isOpenNowForDelivery: boolean; // Currently available for delivery
  isOpenNowForPreorder: boolean; // Accepting pre-orders

  isTemporarilyOffline: boolean; // Temporary shutdown

  deliveryCost: number; // Delivery fee amount
  minimumDeliveryValue: number; // Minimum order value

  defaultDisplayRank: number; // Default sorting position
  isTemporaryBoost: boolean; // Temporary promotion flag
  isPremier: boolean; // Premium establishment

  logoUrl: string; // Logo image URL
  isTestRestaurant: boolean; // Testing flag

  deals: RestaurantPromotion[]; // Active promotions
  tags: unknown[]; // Categorical tags
  cuisines: CuisineType[]; // Cuisine offerings

  availability: ServiceAvailability; // Current service status

  description?: string; // Optional description
}

export interface SearchMetadata {
  canonicalName: string; // Standardized name
  district: string; // Administrative district
  postalCode: string; // Primary postal code
  area: string; // Neighborhood area

  location: GeoPoint; // Central coordinates

  cuisineDetails: Array<{
    // Cuisine statistics
    name: string;
    uniqueName: string;
    count: number;
  }>;

  resultCount: number; // Total matches found
  searchedTerms: string | null; // Original search query

  tagDetails: Array<{
    // Tag information
    displayName: string;
    key: string;
    priority: number;
  }>;

  deliveryArea: string; // Service coverage area
}

export interface DeliveryFeeTier {
  minimumAmount: number; // Minimum order value
  fee: number; // Fee amount
}

export interface DeliveryFeeStructure {
  restaurants: Record<
    // Per-restaurant fees
    string,
    {
      restaurantId: string; // Establishment ID
      minimumOrderValue: number; // Minimum order
      bands: DeliveryFeeTier[]; // Fee tiers
    }
  >;
}

export interface PromotedListings {
  filteredSearchPromotedLimit: number; // Maximum promoted results
  rankedIds: string[]; // Priority-sorted IDs

  restaurants: Record<
    // Promotion details
    string,
    {
      restaurantId: string; // Establishment ID
      defaultPromoted: boolean; // Auto-promotion flag
    }
  >;
}

export interface SearchFilterOption {
  displayName: string; // User-facing name
  imageName: string; // Associated image
  group: string; // Category grouping
  restaurantIds: string[]; // Matching establishments
}

export type SearchFilters = Record<string, SearchFilterOption>;

export interface InterfaceComponent {
  type: string; // Component type
  id: string; // Unique identifier
  title: string; // Display title

  contents: Array<{
    // Child elements
    type: string;
    id: string;
    title: string;
  }>;
}

export type InterfaceLayout = Record<string, InterfaceComponent>;

export interface TrackingList {
  trackingId: string; // Analytics identifier
}

export interface TrackingLists {
  [key: string]: TrackingList;
}

export interface FilterComponent {
  type: 'filter';
  id: string;
  title: string;
}

export interface ListSection {
  type: 'list';
  id: string;
  title: string;
  contents: FilterComponent[];
}

export interface RestaurantSearchResponse {
  metaData?: SearchMetadata; // Contextual metadata
  restaurants: Restaurant[]; // Matching establishments

  deliveryFees?: DeliveryFeeStructure; // Fee information
  promotedPlacement?: PromotedListings; // Featured results

  filters: SearchFilters; // Available filters
  layout: {
    // UI configuration
    'search-refine-filters': ListSection;
    'search-filter-carousel': ListSection;
  };

  enrichedLists: TrackingLists; // Analytics tracking
}
