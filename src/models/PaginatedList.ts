export interface PaginatedList<T> {
    count: number;
    previous: string | null;
    next: string | null;
    items: T[];
}