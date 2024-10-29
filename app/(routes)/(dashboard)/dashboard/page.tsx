"use client";

import React, { useState, useEffect } from "react";

const PageDashboard = () => {
    const [time, setTime] = useState(new Date());

    // Actualizar el tiempo cada segundo
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gray-100 dark:bg-gray-900 border-0">
            <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                ¡Bienvenido Administrador!
            </h1> 
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Gestiona todas tus operaciones desde aquí.
            </p>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-6xl font-bold text-gray-800 dark:text-gray-100">
                    {time.toLocaleTimeString()}
                </h2>
            </div>
        </div>
    );
};

export default PageDashboard;

