import { Injectable } from '@angular/core';
import { categories } from '../shared/data/categories';
import { GamePlayed } from '../shared/model/game-played';
import { Firestore, addDoc, doc, getDoc } from '@angular/fire/firestore';
import { gamesConverter } from '../app/services/converters/games-converter';
import { collection, query, orderBy, limit, getDocs } from '@angular/fire/firestore';
import { categoriesConverter } from '../app/services/converters/categories-converter';
import { Category } from '../shared/model/category';
import { CategoriesService } from '../app/services/categories.service';
@Injectable({
  providedIn: 'root'
})
export class GamePointsService {
  private GamePlayed: GamePlayed[];
  private gameID = 0;


  constructor(private firestoreService: Firestore
    , categoryService: CategoriesService) {
    this.GamePlayed = [];
    this.loadGamesFromFirestore();
  }

  getGamePlayed() {
    return this.GamePlayed;
  }
  private async loadGamesFromFirestore() {
    const q = query(collection(this.firestoreService, 'games').withConverter(gamesConverter), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    this.GamePlayed = querySnapshot.docs.map(doc => doc.data());
  }


  async addGamePlayed(newGame: GamePlayed) {
    await addDoc(collection(this.firestoreService, 'games').withConverter(gamesConverter), newGame);
  }

  private saveGames() {
    localStorage.setItem('gamePlayed', JSON.stringify(this.GamePlayed));
  }

  loadGames() {
    const games = localStorage.getItem('gamePlayed');
    this.GamePlayed = games ? JSON.parse(games) : [];
  }
  async getLatestGame() {
    const q = query(collection(this.firestoreService, 'GamePlayed'), orderBy('createdAt', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // Return the first (and only) document in the query snapshot
      return querySnapshot.docs[0].data();
    } else {
      return null;
    }
  }

  async getTotalGamesPlayed(): Promise<number> {
    const gameCollection = collection(this.firestoreService, 'games').withConverter(gamesConverter);
    const gamesSnapshot = await getDocs(gameCollection);
    return gamesSnapshot.size;
  }
  async getTotalPoints(): Promise<number> {
    const gameCollection = collection(this.firestoreService, 'games').withConverter(gamesConverter);
    const gamesSnapshot = await getDocs(gameCollection);
    let totalPoints = 0;
    gamesSnapshot.forEach(doc => {
      totalPoints += doc.data().score;
    });
    return totalPoints;
  }
  /*getAllCategoryIDs(): number[] {
    return null
  }*/
  async getMostFrequentCategory(): Promise<string> {
    const gamesCollection = collection(this.firestoreService, 'games').withConverter(gamesConverter);
    const gamesSnapshot = await getDocs(gamesCollection);

    const categoryCounts: { [key: string]: number } = {};

    gamesSnapshot.forEach(doc => {
      const data = doc.data() as GamePlayed;
      if (categoryCounts[data.categoryID]) {
        categoryCounts[data.categoryID]++;
      } else {
        categoryCounts[data.categoryID] = 1;
      }
    });

    let mostFrequentCategory = '';
    let maxCount = 0;

    for (const categoryID in categoryCounts) {
      if (categoryCounts[categoryID] > maxCount) {
        maxCount = categoryCounts[categoryID];
        mostFrequentCategory = categoryID;
      }
    }
    const mostFrequentCategoryName = await this.getCategoryNameById(mostFrequentCategory);
    return mostFrequentCategoryName;
  }

  async getCategoryNameById(categoryId: string): Promise<string> {
    const categoryDocRef = doc(this.firestoreService, 'categories', categoryId).withConverter(categoriesConverter);
    const categoryDoc = await getDoc(categoryDocRef);
    if (categoryDoc.exists()) {
      const category = categoryDoc.data() as Category;
      return category.name;
    } else {
      throw new Error('Category not found');
    }
  }

  async getUniqueCategoryCount(): Promise<number> {
    const gamesCollection = collection(this.firestoreService, 'games').withConverter(gamesConverter);
    const gamesSnapshot = await getDocs(gamesCollection);

    const categorySet = new Set<string>();

    gamesSnapshot.forEach(doc => {
      const data = doc.data() as GamePlayed;
      categorySet.add(data.categoryID);
    });

    return categorySet.size;
  }

  async getAverageGameTime(): Promise<number> {
    const gamesCollection = collection(this.firestoreService, 'games').withConverter(gamesConverter);
    const gamesSnapshot = await getDocs(gamesCollection);

    let totalGameTime = 0;
    let validGamesCount = 0;
    gamesSnapshot.forEach(doc => {
      const data = doc.data() as GamePlayed;

      if (data.secondsPlayed !== undefined && !isNaN(data.secondsPlayed)) {
        totalGameTime += data.secondsPlayed;
        validGamesCount++;
      }
    });
    if (validGamesCount === 0) {
      return 0;
    }
    const averageGameTime = Math.floor((totalGameTime / validGamesCount)/60);
    
    return averageGameTime;
  }

  async getTotalGameTime(): Promise<number> {
    const gamesCollection = collection(this.firestoreService, 'games').withConverter(gamesConverter);
    const gamesSnapshot = await getDocs(gamesCollection);
  
    let totalGameTime = 0;
    gamesSnapshot.forEach(doc => {
      const data = doc.data() as GamePlayed;
      if (data.secondsPlayed !== undefined && !isNaN(data.secondsPlayed)) {
        totalGameTime += data.secondsPlayed;
      }
    });
    const totalGameTimeInHours = totalGameTime/3600;
    const totalGameTimeInHoursRounded = parseFloat(totalGameTimeInHours.toFixed(1));
    return totalGameTimeInHoursRounded;
  }

  async getPercentageOfGamesCompletedOnTime(): Promise<number> {
    const gamesCollection = collection(this.firestoreService, 'games').withConverter(gamesConverter);
    const gamesSnapshot = await getDocs(gamesCollection);

    let gamesCompletedOnTime = 0;
    gamesSnapshot.forEach(doc => {
      const data = doc.data() as GamePlayed;
      if (data.secondsLeftInGame > 0) {
        gamesCompletedOnTime++;
      }
    });

    const percentage = (gamesCompletedOnTime / gamesSnapshot.size) * 100;
    return Number(percentage.toFixed(0));

  }
}





