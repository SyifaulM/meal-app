import Navigation from "../components/Navigation";
import Dashboard from "../components/Dashboard";
import React, { Component } from "react";

class DashboardPage extends Component{
    render(){
        return (
            <div className="text-gray-600 font-body">
                <div className="grid md:grid-cols-3 lg:grid-cols-5">
                    <Navigation />
                    <Dashboard />
                </div>
            </div>
        )
    }
}

export default DashboardPage;