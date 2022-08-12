interface GameType {
    id: number;
    created_at: string;
    updated_at: string;
}

interface RoundType {
    id: number;
    game_id: number;
    created_at: string;
    updated_at: string;
}

interface WolfAttackType {
    id: number;
    round_id: number;
    resolved: boolean;
    created_at: string;
    updated_at: string;
}

export type UpdateGameType = Partial<GameType>;
