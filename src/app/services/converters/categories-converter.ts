import { QueryDocumentSnapshot, SnapshotOptions } from "@angular/fire/firestore";
import { Category } from "../../../shared/model/category";
import { TranslatedWord } from "../../../shared/model/translated-word";

export const categoriesConverter = {
    toFirestore: (category: Category) => {
        return {
            id: category.id,
            name: category.name,
            origin: category.origin,
            target: category.target,
            lastUpdate: category.lastUpdate,
            words: category.words.map(word => word.toPlainObject()) // Convert to plain objects
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        return new Category(
            snapshot.id,
            data["name"],
            data["origin"],
            data["target"],
            data["lastUpdate"],
            (data["words"] || []).map((word: any) => TranslatedWord.fromPlainObject(word)));
    }
};
