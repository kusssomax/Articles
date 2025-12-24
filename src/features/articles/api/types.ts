export interface Author {
    name: string;
    socials?: null;
}

export interface ILaunch {
    launch_id: string;
    provider: string;
}

export interface IEvent {
    event_id: number;
    provider: string;
}

export interface IArticle {
    id: number;
    title: string;
    authors: Author[];
    url: string;
    image_url: string;
    news_site: string;
    summary: string;
    published_at: string; 
    updated_at: string;   
    featured: boolean;
    launches: ILaunch[];
    events: IEvent[];
}

export interface IArticlesResponse {
    count: number;
    next: string | null;     
    previous: string | null;
    results: IArticle[];
}