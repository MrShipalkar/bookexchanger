import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <main>
                <h1>Dashboard</h1>
                <p>Welcome to the BookExchanger Dashboard!</p>
                {/* Add dashboard-specific components here */}
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;
