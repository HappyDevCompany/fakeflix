export interface Movie {
  adult: boolean;
  backdrop_path: String | null;
  belongs_to_collection: Collection | null;
  budget: Number;
  genres: Genre[];
  homepage: String | null;
  id: Number;
  imdb_id: String | null;
  original_language: String;
  original_title: String;
  overview: String;
  popularity: Number;
  poster_path: String | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: String;
  revenue: Number;
  runtime: Number;
  spoken_languages: SpokenLanguage[];
  status: String;
  tagline: String;
  title: String;
  video: boolean;
  vote_average: Number;
  vote_count: Number;
}

export interface MovieVideo {
  id: Number;
  name: "Five Nights At Freddy's - Bande annonce 2 VF [Au cinéma le 8 novembre]";
  iso_639_1: String;
  iso_3166_1: String;
  key: String;
  site: String;
  size: Number;
  type: String;
  official: Boolean;
  published_at: String;
}

export interface ActorCredit {
  adult: Boolean; // Indique si le crédit est lié à un contenu pour adultes
  gender: Number; // Genre de la personne (par exemple, 1 pour femme, 2 pour homme)
  id: Number; // Identifiant unique de la personne
  known_for_department: String; // Département dans lequel la personne est connue (par exemple, "Acting" pour jouer)
  name: String; // Nom de la personne
  original_name: String; // Nom original de la personne
  popularity: Number; // Popularité de la personne
  profile_path: String | null; // Chemin de l'image du profil de la personne
  cast_id: Number; // Identifiant du casting
  character: String; // Personnage joué par la personne
  credit_id: String; // Identifiant unique du crédit
  order: Number; // Ordre du crédit
}

export interface MovieImage {
  aspect_ratio: Number; // Ratio d'aspect de l'image ou de la vidéo
  height: Number; // Hauteur de l'image ou de la vidéo
  iso_639_1: String | null; // Code de langue de l'image ou de la vidéo (peut être nul)
  file_path: String; // Chemin du fichier de l'image ou de la vidéo
  vote_average: Number; // Note moyenne de l'image ou de la vidéo
  vote_count: Number; // Nombre de votes
  width: Number; // Largeur de l'image ou de la vidéo
}

interface Collection {
  id: Number;
  name: String;
  poster_path: String | null;
  backdrop_path: String | null;
}

export interface Genre {
  id: Number;
  name: String;
}

interface ProductionCompany {
  id: Number;
  logo_path: String | null;
  name: String;
  origin_country: String;
}

interface ProductionCountry {
  iso_3166_1: String;
  name: String;
}

interface SpokenLanguage {
  english_name: String;
  iso_639_1: String;
  name: String;
}
