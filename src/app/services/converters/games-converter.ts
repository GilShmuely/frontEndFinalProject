import { QueryDocumentSnapshot, SnapshotOptions } from "@angular/fire/firestore";
import { GamePlayed } from "../../../shared/model/game-played";

export const gamesConverter = {
    toFirestore: (game: GamePlayed) => {     
        return {
            categoryID: game.categoryID,
            gameId: game.gameID,
            date: game.date,
            score: game.score,
            secondsLeftInGame: game.secondsLeftInGame,
            secondsPlayed: game.secondsPlayed

        };
    },

    fromFirestore: (
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ) => {
        const data = snapshot.data(options);
        return new GamePlayed(
            data["categoryID"],
            data["gameID"],
            data["date"],
            data["score"],
            data["secondsLeftInGame"],
            data["secondsPlayed"]
        );
    },
};
