export interface GameType {
    id: number;
    created_at: string;
    updated_at: string;
}

export interface RoundType {
    id: number;
    game_id: number;
    round_number: number;
    created_at: string;
    updated_at: string;
}

export interface AttackType {
    id: number;
    round_id: number;
    resolved: boolean;
    created_at: string;
    updated_at: string;
}

export interface GameStateType {
    game: GameType | null;
    round: RoundType | null;
    attack: AttackType | null;
}
