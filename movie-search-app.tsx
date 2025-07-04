"use client"

import { useState } from "react"
import { Search, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample movie data
const sampleMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genre: "Action",
    poster: "https://i.pinimg.com/736x/83/9a/04/839a046d5787aa573073ae170a07ed4a.jpg",
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    genre: "Sci-Fi",
    poster: "https://i.pinimg.com/736x/0b/e1/da/0be1dafba6a85a2b21dbb27102fd4d3b.jpg",
  },
  {
    id: 3,
    title: "Pulp Fiction",
    year: 1994,
    rating: 8.9,
    genre: "Crime",
    poster: "https://i.pinimg.com/736x/f0/01/3c/f0013ca4a05245afde43e0eaa7d1a2ce.jpg",
  },
  {
    id: 4,
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    genre: "Drama",
    poster: "https://i.pinimg.com/736x/08/6f/fe/086ffeccab22baa2b4d49ab8787f9b90.jpg",
  },
  {
    id: 5,
    title: "Interstellar",
    year: 2014,
    rating: 8.6,
    genre: "Sci-Fi",
    poster: "https://i.pinimg.com/736x/01/01/c6/0101c6179012640f9fd8ecad12ebc33b.jpg",
  },
  {
    id: 6,
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    genre: "Crime",
    poster: "https://i.pinimg.com/736x/3a/2d/34/3a2d34f0a80d0a462ed5b953df963a3e.jpg",
  },
  {
    id: 7,
    title: "Forrest Gump",
    year: 1994,
    rating: 8.8,
    genre: "Drama",
    poster: "https://i.pinimg.com/736x/02/6b/0d/026b0d4dab1abe1c5f4460d6a45ae2ab.jpg",
  },
  {
    id: 8,
    title: "The Matrix",
    year: 1999,
    rating: 8.7,
    genre: "Sci-Fi",
    poster: "https://i.pinimg.com/736x/71/c8/32/71c832f7f031f94ced540a6563f8ced1.jpg",
  },
]

export default function MovieSearchApp() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredMovies, setFilteredMovies] = useState(sampleMovies)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredMovies(sampleMovies)
    } else {
      const filtered = sampleMovies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          movie.genre.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredMovies(filtered)
    }
  }

  const renderStars = (rating: number) => {
    const stars = Math.round(rating / 2) // Convert 10-point scale to 5-star scale
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Movie<span className="text-purple-400">Search</span>
          </h1>
          <p className="text-slate-300 text-lg">Discover your next favorite movie</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for movies, genres..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/20 focus:border-purple-400 transition-all duration-300"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-300 text-center">
            {filteredMovies.length} movie{filteredMovies.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <Card
              key={movie.id}
              className="group bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Movie Poster */}
                <div className="relative overflow-hidden">
                  <img
                    src={movie.poster || "/placeholder.svg"}
                    alt={movie.title}
                    className="w-full h-64 sm:h-72 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Badge className="absolute top-3 right-3 bg-purple-600 hover:bg-purple-700">{movie.genre}</Badge>
                </div>

                {/* Movie Info */}
                <div className="p-4">
                  <h3 className="text-white font-semibold text-lg mb-1 line-clamp-1">{movie.title}</h3>
                  <p className="text-slate-400 text-sm mb-3">{movie.year}</p>

                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">{renderStars(movie.rating)}</div>
                    <span className="text-white font-medium">{movie.rating}/10</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-white text-xl mb-2">No movies found</h3>
            <p className="text-slate-400">Try searching with different keywords</p>
          </div>
        )}
      </div>
    </div>
  )
}
