// src/components/SearchMaterials.js
import React, { useState, useEffect, useRef } from 'react';
import { Search, BookOpen, FileText, Download, X, Filter, Book, Video, FileImage } from 'lucide-react';

const SearchMaterials = ({ 
  studyMaterials = [], 
  onItemSelect, 
  className = "",
  placeholder = "Search subjects, papers, PDFs, or content..."
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef(null);

  // Available filters based on your materials
  const filters = [
    { id: 'all', label: 'All Types', count: studyMaterials.length },
    { id: 'pdf', label: 'PDFs', count: studyMaterials.filter(item => item.type?.toLowerCase() === 'pdf').length },
    { id: 'paper', label: 'Papers', count: studyMaterials.filter(item => item.type?.toLowerCase() === 'paper').length },
    { id: 'content', label: 'Notes', count: studyMaterials.filter(item => item.type?.toLowerCase() === 'content' || item.type?.toLowerCase() === 'notes').length },
    { id: 'video', label: 'Videos', count: studyMaterials.filter(item => item.type?.toLowerCase() === 'video').length },
  ];

  // Enhanced search function
  const performSearch = (query, filter = selectedFilter) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    
    setTimeout(() => {
      let filteredMaterials = studyMaterials;
      
      // Apply type filter
      if (filter !== 'all') {
        filteredMaterials = studyMaterials.filter(item => {
          const itemType = item.type?.toLowerCase();
          if (filter === 'content') {
            return itemType === 'content' || itemType === 'notes';
          }
          return itemType === filter.toLowerCase();
        });
      }

      // Apply search query with multiple field matching
      const results = filteredMaterials.filter(item => {
        const searchTerms = query.toLowerCase().split(' ');
        return searchTerms.some(term => 
          item.subject?.toLowerCase().includes(term) ||
          item.title?.toLowerCase().includes(term) ||
          item.description?.toLowerCase().includes(term) ||
          item.tags?.some(tag => tag.toLowerCase().includes(term)) ||
          item.author?.toLowerCase().includes(term) ||
          item.category?.toLowerCase().includes(term) ||
          item.semester?.toLowerCase().includes(term) ||
          item.course?.toLowerCase().includes(term)
        );
      });
      
      // Sort results by relevance
      const sortedResults = results.sort((a, b) => {
        const aScore = calculateRelevanceScore(a, query);
        const bScore = calculateRelevanceScore(b, query);
        return bScore - aScore;
      });
      
      setSearchResults(sortedResults);
      setShowResults(true);
      setIsSearching(false);
    }, 300);
  };

  // Calculate relevance score for sorting
  const calculateRelevanceScore = (item, query) => {
    const queryLower = query.toLowerCase();
    let score = 0;
    
    if (item.title?.toLowerCase().includes(queryLower)) score += 10;
    if (item.subject?.toLowerCase().includes(queryLower)) score += 8;
    if (item.description?.toLowerCase().includes(queryLower)) score += 5;
    if (item.tags?.some(tag => tag.toLowerCase().includes(queryLower))) score += 3;
    
    return score;
  };

  // Debounced search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(searchQuery, selectedFilter);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedFilter, studyMaterials]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  const handleItemClick = (item) => {
    if (onItemSelect) {
      onItemSelect(item);
    } else {
      // Default behavior - scroll to item or open modal
      console.log('Selected item:', item);
      // You can add default behavior here like opening a modal or scrolling to the item
    }
    setShowResults(false);
  };

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-500" />;
      case 'paper':
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'video':
        return <Video className="w-4 h-4 text-purple-500" />;
      case 'image':
        return <FileImage className="w-4 h-4 text-orange-500" />;
      case 'content':
      case 'notes':
        return <Book className="w-4 h-4 text-green-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'paper':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'video':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'image':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'content':
      case 'notes':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const highlightSearchTerm = (text, query) => {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded text-black dark:text-white">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Popular search terms based on your subjects
  const popularSearches = ['Mathematics', 'Physics', 'Computer Science', 'Chemistry', 'Biology', 'Engineering'];

  return (
    <div className={`w-full max-w-4xl mx-auto relative ${className}`} ref={searchRef}>
      {/* Search Input with Filter Button */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery && setShowResults(true)}
          placeholder={placeholder}
          className="block w-full pl-12 pr-24 py-4 border border-gray-300 rounded-xl bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base shadow-sm hover:shadow-md focus:shadow-lg"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3 py-2 mx-1 text-sm rounded-lg transition-colors ${
              selectedFilter !== 'all' 
                ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            title="Filter results"
          >
            <Filter className="w-4 h-4" />
          </button>
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="px-3 py-2 mx-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg transition-colors"
              title="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Dropdown */}
      {showFilters && (
        <div className="absolute z-40 right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
          <div className="py-2">
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide border-b border-gray-100 dark:border-gray-700">
              Filter by Type
            </div>
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  setSelectedFilter(filter.id);
                  setShowFilters(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  selectedFilter === filter.id 
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{filter.label}</span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {filter.count}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600 max-h-[500px] overflow-y-auto">
          {isSearching ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Searching materials...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                {selectedFilter !== 'all' && ` • ${filters.find(f => f.id === selectedFilter)?.label}`}
              </div>
              {searchResults.map((item, index) => (
                <div
                  key={item.id || index}
                  className="px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        {getTypeIcon(item.type)}
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {highlightSearchTerm(item.title || 'Untitled', searchQuery)}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                          {item.type || 'Content'}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-2 text-xs">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                          {highlightSearchTerm(item.subject || 'General', searchQuery)}
                        </span>
                        {item.semester && (
                          <span className="text-gray-500 dark:text-gray-400">
                            Semester {item.semester}
                          </span>
                        )}
                        {item.author && (
                          <span className="text-gray-500 dark:text-gray-400">
                            by {item.author}
                          </span>
                        )}
                      </div>
                      
                      {item.description && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                          {highlightSearchTerm(item.description, searchQuery)}
                        </p>
                      )}
                      
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 4).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md"
                            >
                              {highlightSearchTerm(tag, searchQuery)}
                            </span>
                          ))}
                          {item.tags.length > 4 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                              +{item.tags.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {(item.downloadUrl || item.link || item.url) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const url = item.downloadUrl || item.link || item.url;
                          window.open(url, '_blank');
                        }}
                        className="ml-3 p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                        title="Open/Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="p-8 text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                No results found for "{searchQuery}"
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Try different keywords or check your spelling
              </p>
            </div>
          ) : null}
        </div>
      )}

      {/* Popular Searches */}
      {!searchQuery && !showResults && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => setSearchQuery(term)}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchMaterials;
