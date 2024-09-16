import React, { useState, useEffect } from 'react'

function Image(props) {
    const handleSearch = (e) => {
        e.preventDefault();
        props.setTerm(e.target.elements.searchTerm.value);
    }

    return (
        <div>
            {/* Center the search bar */}
            <div className="flex justify-center mb-4">
                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                    <input
                        type="text"
                        name="searchTerm"
                        placeholder="Search for images..."
                        className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Search
                    </button>
                </form>
            </div>

            {/* Grid container for the images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {props.images.map((image, i) => (
                    <div key={i} className="border p-4 rounded shadow-lg">
                        {/* Make image clickable and open in a new tab */}
                        <a href={image.webformatURL} target="_blank" rel="noopener noreferrer">
                            <img
                                className="h-40 w-full object-cover rounded"
                                src={image.webformatURL}
                                alt={image.tags}
                            />
                        </a>
                        <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                            {image.tags}
                        </figcaption>
                        <ul className="flex justify-center space-x-4 mt-4 text-sm text-gray-600">
                            <li>
                                <span className="font-bold">Downloads:</span> {image.downloads}
                            </li>
                            <li>
                                <span className="font-bold">User:</span> {image.user}
                            </li>
                            <li>
                                <span className="font-bold">Likes:</span> {image.likes}
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Image;
