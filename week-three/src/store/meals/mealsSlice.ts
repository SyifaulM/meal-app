import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
}

interface MealState {
  randomMeal: Meal | null;
  searchResults: Meal[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: MealState = {
  randomMeal: null,
  searchResults: [],
  status: 'idle',
  error: null,
};

export const searchMeals = createAsyncThunk('meals/searchMeals', async (searchTerm: string) => {
    try{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        const data = await response.json();
        return data.meals;
    } catch (error){
        throw new Error('Error fetching meals.');
    }
});

export const searchMealsById = createAsyncThunk('meals/searchMealsById', async (id: string) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        
        if (data.meals) {
          return data.meals;
        } else {
          throw new Error('Meal not found.');
        }
    } catch (error) {
        throw new Error('Error fetching meal details.');
    }
});

const mealSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchMeals.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchMeals.fulfilled, (state, action) => {
        state.status = 'idle';
        state.searchResults = action.payload;
      })
      .addCase(searchMeals.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(searchMealsById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchMealsById.fulfilled, (state, action) => {
        state.status = 'idle';
        state.searchResults = action.payload;
      })
      .addCase(searchMealsById.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export default mealSlice.reducer;
