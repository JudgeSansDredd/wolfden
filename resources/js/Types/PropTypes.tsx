import { GameType } from "./GameTypes";

interface RequiredPageProps {
    roundNumber: number;
}

export type DashboardProps = RequiredPageProps;
export type ControlPanelProps = RequiredPageProps;
export interface StartNewGameProps extends RequiredPageProps {
    game: GameType;
}
