export type DrfPage<S> = {
    count: number,
    next: number | null,
    previous: number | null,
    results: S[]
}

export type ValidationError = {
    error: boolean,
    helperText?: string
}