import { Category } from "../model/category";
import { Language } from "../model/language";
import { TranslatedWord } from "../model/translated-word";
const firstOfMarch = new Date(new Date().getFullYear(), 2, 1);

let animalsCategory =
    new Category("1", "Animals", Language.English, Language.Hebrew, firstOfMarch);
animalsCategory.words.push(new TranslatedWord("dog", "כלב"));
animalsCategory.words.push(new TranslatedWord("cat", "חתול"));
animalsCategory.words.push(new TranslatedWord("snake", "נחש"));
animalsCategory.words.push(new TranslatedWord("fish", "דג"));

let peopleCategory =
    new Category("2", "People", Language.English, Language.Hebrew, new Date());
peopleCategory.words.push(new TranslatedWord("woman", "אישה"));
peopleCategory.words.push(new TranslatedWord("boy", "ילד"));
peopleCategory.words.push(new TranslatedWord("girl", "ילדה"));
peopleCategory.words.push(new TranslatedWord("baby", "תינוק"));
peopleCategory.words.push(new TranslatedWord("dad", "אבא"));

let placesCategory =
    new Category("3", "Places", Language.English, Language.Hebrew, new Date());
placesCategory.words.push(new TranslatedWord("forest", "יער"));
placesCategory.words.push(new TranslatedWord("school", "בית ספר"));
placesCategory.words.push(new TranslatedWord("classroom", "כיתה"));
placesCategory.words.push(new TranslatedWord("town", "עיר"));
placesCategory.words.push(new TranslatedWord("hotel", "מלון"));
placesCategory.words.push(new TranslatedWord("hospital", "בית חולים"));

export var categories = [animalsCategory, peopleCategory, placesCategory];