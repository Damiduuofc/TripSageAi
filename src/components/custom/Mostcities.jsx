import React from 'react';

function Mostcities() {
  return (
    <div className="mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-3xl font-bold text-left mb-8">Most Visited Cities in the World - Top 3</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
          <a href="https://en.wikipedia.org/wiki/List_of_cities_by_international_visitors " target="_blank">
            <img
              alt="Bangkok"
              src="/Bangkok.jpg"
              className="h-64 w-full object-cover"
            /> </a>
            <div className="bg-white p-6">
              <a href="https://en.wikipedia.org/wiki/List_of_cities_by_international_visitors " target="_blank">
                <h3 className="mt-0.5 text-xl text-gray-900 text-left">Bangkok</h3>
              </a>
            </div>
          </article>
          <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
          <a href="https://en.wikipedia.org/wiki/List_of_cities_by_international_visitors " target="_blank">
            <img
              alt="Paris"
              src="/Paris.jpg"
              className="h-64 w-full object-cover"
              target= ''
            /></a>
            <div className="bg-white p-6">
              <a href="https://en.wikipedia.org/wiki/List_of_cities_by_international_visitors" target="_blank">
                <h3 className="mt-0.5 text-xl text-gray-900 text-left">Paris</h3>
              </a>
            </div>
          </article>
          <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
          <a href="https://en.wikipedia.org/wiki/List_of_cities_by_international_visitors " target="_blank">
            <img
              alt="London"
              src="/London.jpg"
              className="h-64 w-full object-cover"
            /></a>
            <div className="bg-white p-6">
              <a href="https://en.wikipedia.org/wiki/List_of_cities_by_international_visitors"target="_blank">
                <h3 className="mt-0.5 text-xl text-gray-900 text-left">London</h3>
              </a>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default Mostcities;
