type CrewMember = {
    creditId: string;
    department: string;
    job: string;
    genreIds: number[];
    adult: boolean;
    backdropPath: string | null;
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
};

export default CrewMember;