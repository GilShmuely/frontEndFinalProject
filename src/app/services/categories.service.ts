import { categories } from './../../shared/data/categories';
import { Injectable, Query } from '@angular/core';
import { Category } from '../../shared/model/category';
import { DocumentSnapshot, Firestore, QuerySnapshot, addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { categoriesConverter } from './converters/categories-converter';
import { Language } from '../../shared/model/language';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly CATEGORIES_KEY = 'categories';
  private readonly NEXT_ID_KEY = 'nextId';
  constructor(private firestoreService: Firestore) { }

  private getCategories(): Map<number, Category> {
    let categoriesString = localStorage.getItem(this.CATEGORIES_KEY);

    if (!categoriesString) {
      return new Map<number, Category>();
    } else {
      return new Map<number, Category>(JSON.parse(categoriesString));
    }
  }

  private getNextId(): number {
    let nextIdString = localStorage.getItem(this.NEXT_ID_KEY);

    return nextIdString ? parseInt(nextIdString) : 0;
  }

  private setCategories(list: Map<number, Category>): void {
    localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(Array.from(list)));
  }

  private setNextId(id: number): void {
    localStorage.setItem(this.NEXT_ID_KEY, id.toString());
  }

  async list(): Promise<Category[]> {
    const collectionConnection = collection(
      this.firestoreService,
      'categories'
    ).withConverter(categoriesConverter);

    const querySnapshot: QuerySnapshot<Category> = await getDocs(collectionConnection);

    const result: Category[] = [];

    querySnapshot.docs.forEach((docSnap: DocumentSnapshot<Category>) => {
      const data = docSnap.data();
      if (data) {
        result.push(data);
      }
    });
    return result;
  }

  async get(id: string): Promise<Category | undefined> {
    const categoryDocRef = doc(this.firestoreService, 'categories', id).withConverter(categoriesConverter);
    return (await getDoc(categoryDocRef)).data();
  }

  async delete(id: string) {
    const categoryDocReft = doc(this.firestoreService, 'categories', id).withConverter(categoriesConverter);
    return deleteDoc(categoryDocReft);
  }

  async update(category: Category): Promise<void> {
    const categoryDocRef = doc(this.firestoreService, 'categories', category.id).withConverter(categoriesConverter);
    return await setDoc(categoryDocRef, category);
  }

  async add(category: Category) {
    try {
      await addDoc(collection(this.firestoreService, 'categories').withConverter(categoriesConverter), category);
    } catch (error) {
      console.error("Error adding category: ", error);
    }
  }
}
