type CastMember = {
    adult: boolean;
    backdropPath: string | null;
    genreIds: number[];
    id: number;
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    popularity: number;
    posterPath: string | null;
    releaseDate: string | null;
    title: string;
    video: boolean;
    voteAverage: number;
    voteCount: number;
    character: string;
    creditId: string;
    order: number;
};

export default CastMember;