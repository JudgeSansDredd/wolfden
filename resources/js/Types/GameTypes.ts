export interface GameAPIType {
    id: number;
    created_at: string;
    updated_at: string;
}

export interface RoundAPIType {
    id: number;
    game_id: number;
    round_number: number;
    action_time_ends_at: string;
    team_time_ends_at: string;
    created_at: string;
    updated_at: string;
}

export interface AttackAPIType {
    id: number;
    round_id: number;
    resolved_at: string;
    created_at: string;
    updated_at: string;
}

export interface GameStateAPIType {
    game: GameAPIType | null;
    round: RoundAPIType | null;
    attack: AttackAPIType | null;
}
