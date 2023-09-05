import DetailMeal from "../components/DetailPage";
import Navigation from "../components/Navigation";
import React, { Component } from "react";

class DetailMealPage extends Component{
    render(){
        return (
            <div className="text-gray-600 font-body">
                <div className="grid md:grid-cols-3 lg:grid-cols-5">
                    <Navigation />
                    <DetailMeal />
                </div>
            </div>
        )
    }
}

export default DetailMealPage;