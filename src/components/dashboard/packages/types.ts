export interface PackageMedia {
  images?: string[];
  videos?: string[];
}

export interface PackageFeature {
  title: string;
  description?: string;
}

export interface Package {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  media: PackageMedia | null;
  features: PackageFeature[] | null;
  created_at?: string | null;
  updated_at?: string | null;
  profile_id: string;
}

export interface PackageFormData {
  title: string;
  description: string | null;
  price: number | null;
  media: PackageMedia | null;
  features: PackageFeature[] | null;
}

export interface PackageListProps {
  packages: Package[];
  isLoading: boolean;
}

export interface PackageHeaderProps {
  onCreateClick: () => void;
}
