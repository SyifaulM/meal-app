import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMeals } from '../store/meals/mealsSlice';
import { Link } from "react-router-dom";

const Dashboard = () => {
    const dispatch = useDispatch();
    const searchResults = useSelector((state: any) => state.meals.searchResults);
    const status = useSelector((state: any) => state.meals.status);
    const error = useSelector((state: any) => state.meals.error);
    const [searchTerm, setSearchTerm] = useState('');

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(6); //total perpage

    const startIdx = (currentPage - 1) * perPage;
    const endIdx = startIdx + perPage;

    useEffect(() => {
        dispatch(searchMeals(searchTerm) as any); 
    }, [dispatch, searchTerm]);

    const handleSearch = () => {
        dispatch(searchMeals(searchTerm) as any); 
    };

    return (
        <main className="bg-gray-100 px-16 py-6 md:col-span-2 lg:col-span-4 min-h-screen">
            <div className="flex justify-center md:justify-end">
            <Link to={`/login`}>
                <div
                    className=" btn text-primaryborder-primary md:border-2 hover:bg-primary hover:text-white transition ease-out duration-500"
                >Log in</div>
            </Link>
                
                <a href="/#"
                    className="btn text-primary border-primary md:border-2 hover:bg-primary hover:text-white transition ease-outduration-500 ml-2"
                >Sign up</a>
            </div>
            <header>
                <h2 className="text-gray-700 text-6xl font-semibold">Recipes</h2>
                <h3 className="text-2xl font-semibold">Search recipes</h3>
            </header>
            <div className="text-center my-1">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 bg-white w-1/2 focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary rounded-lg text-dark text-center"/>
                <button 
                onClick={handleSearch}
                className="hover:opacity-80 hover:shadow-lg transition duration-500 font-bold py-2 px-4 rounded"
                >Search</button>
            </div>
            {status === 'loading' ? (
                <div className="text-center">
                    <div role="status">
                        <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http:www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : status === 'failed' ? (
                <p>Error: {error}</p>
            ) : (
                <div className="">
                    <div className="mt-8 grid lg:grid-cols-3 gap-5">
                        {searchResults.slice(startIdx, endIdx).map((meal: any) => ( 
                                <Link
                                    to={`/meal/${meal.idMeal}`}
                                    key={meal.idMeal}
                                    className="rounded-xl border border-slate-300 overflow-hidden bg-white block group hover:shadow-lg transition-all">    
                                    <div className="card hover:shadow-lg">
                                        <img
                                            src={meal.strMealThumb}
                                            alt={meal.strMeal}
                                            className="w-full h-32 sm:h-48 object-cover"
                                        />
                                        <div className="m-4">
                                            <span className="font-bold">{meal.strMeal}</span>
                                            <span className="block text-gray-500 text-sm">#{meal.strCategory} #{meal.strArea}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="flex justify-center my-10">
                            <button
                                className="btn text-primary border-primary md:border-2 hover:bg-primary hover:text-white transition ease-outduration-500 ml-2"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}>
                                Previous
                            </button>
                            <button
                                className="btn text-primary border-primary md:border-2 hover:bg-primary hover:text-white transition ease-outduration-500 ml-2"
                                disabled={endIdx >= searchResults.length}
                                onClick={() => setCurrentPage(currentPage + 1)}>
                                Next
                            </button>
                        </div>
                    </div>
                )}
        </main>
    
    );
}

export default Dashboard;
