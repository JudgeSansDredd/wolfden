export interface GameType {
    id: number;
    attacking: boolean;
    created_at: string;
    updated_at: string;
}

export type UpdateGameType = Partial<GameType>;
