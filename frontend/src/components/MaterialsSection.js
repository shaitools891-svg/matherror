import GlassIcons from '../../reactbits/Components/GlassIcons/GlassIcons.jsx'; // Updated import path assuming 'reactbits' is a sibling of 'components' under 'src'
import React, { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext'; // Path remains the same, assuming 'context' is a sibling of 'components' under 'src'
import { Button } from '../ui/button'; // Updated import path assuming 'ui' is a sibling of 'components' under 'src'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'; // Updated import path
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'; // Updated import path
import { Badge } from '../ui/badge'; // Updated import path
import { Input } from '../ui/input'; // Updated import path
import {
  Monitor,
  Atom,
  FlaskConical,
  Download,
  Play,
  ExternalLink,
  FileText,
  Video,
  Plus,
  Calculator,
  Search,
  X
} from 'lucide-react';

// Import shared data
import { studyMaterialsData } from '../data/studyMaterials'; // Path remains the same, assuming 'data' is a sibling of 'components' under 'src'

const MaterialsSection = () => {
  const { currentTheme } = useTheme();
  const [activeView, setActiveView] = useState('all');
  const [expandedPapers, setExpandedPapers] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // ADDED ARRAY for GlassIcons
  const glassIconItems = [
    {
      icon: <Monitor className="w-8 h-8 text-white" />,
      label: "Physics",
      color: "blue"
    },
    {
      icon: <Atom className="w-8 h-8 text-white" />,
      label: "Chemistry",
      color: "purple"
    },
    {
      icon: <FlaskConical className="w-8 h-8 text-white" />,
      label: "Biology", 
      color: "green"
    },
    {
      icon: <Calculator className="w-8 h-8 text-white" />,
      label: "Math",
      color: "orange"
    }
  ];

  // Use shared data
  const materialsData = studyMaterialsData;

  // Flatten all materials for searching
  const allMaterials = useMemo(() => {
    const flattened = [];
    materialsData.subjects.forEach(subject => {
      subject.papers.forEach(paper => {
        paper.chapters.forEach(chapter => {
          // Add PDF materials
          chapter.driveLinks.forEach(link => {
            flattened.push({
              type: 'pdf',
              subject: subject.name,
              paper: paper.name,
              chapter: chapter.title,
              name: link.name,
              url: link.url,
              subjectId: subject.id,
              paperId: paper.id,
              chapterId: chapter.id
            });
          });
          // Add video materials
          chapter.videoLinks.forEach(link => {
            flattened.push({
              type: 'video',
              subject: subject.name,
              paper: paper.name,
              chapter: chapter.title,
              name: link.name,
              url: link.url,
              subjectId: subject.id,
              paperId: paper.id,
              chapterId: chapter.id
            });
          });
        });
      });
    });
    return flattened;
  }, [materialsData]);

  // Filter materials based on search query
  const filteredMaterials = useMemo(() => {
    if (!searchQuery.trim()) return allMaterials;
    
    const query = searchQuery.toLowerCase();
    return allMaterials.filter(material =>
      material.name.toLowerCase().includes(query) ||
      material.subject.toLowerCase().includes(query) ||
      material.paper.toLowerCase().includes(query) ||
      material.chapter.toLowerCase().includes(query) ||
      material.type.toLowerCase().includes(query)
    );
  }, [searchQuery, allMaterials]);

  const getIcon = (iconName) => {
    const icons = {
      Monitor,
      Atom,
      FlaskConical,
      Calculator
    };
    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : <FileText className="w-5 h-5" />;
  };

  const handleLinkClick = (url, type) => {
    if (!url || url.includes('your-link-here')) {
      // Using a simple alert for now as per the original code's behavior.
      // In a real application, consider a custom modal or toast notification.
      alert(`${type} link is not ready yet. Please reach out to Shakib and notify him.`);
      return;
    }
    window.open(url, '_blank');
  };

  const togglePaperExpansion = (subjectId, paperId) => {
    setExpandedPapers(prev => ({
      ...prev,
      [`${subjectId}-${paperId}`]: !prev[`${subjectId}-${paperId}`]
    }));
  };

  // Expand the paper that contains search results
  const expandPaperWithSearchResults = (subjectId, paperId) => {
    setExpandedPapers(prev => ({
      ...prev,
      [`${subjectId}-${paperId}`]: true
    }));
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  return (
    <section id="materials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100 transition-colors duration-300">
            Study Materials
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
            Access comprehensive notes and video lectures for HSC 26 preparation
          </p>
          
          {/* ADDED GlassIcons COMPONENT */}
          <GlassIcons items={glassIconItems} className="mt-8" />
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search materials by name, subject, chapter, or type..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearching(e.target.value.length > 0);
              }}
              className="pl-10 pr-10 py-3 text-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Found {filteredMaterials.length} result{filteredMaterials.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <Tabs value={activeView} onValueChange={setActiveView} className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg transition-colors duration-300">
              <TabsTrigger 
                value="all" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400 transition-all duration-300"
              >
                <FileText className="w-4 h-4" />
                All
              </TabsTrigger>
              <TabsTrigger 
                value="pdfs" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                PDFs
              </TabsTrigger>
              <TabsTrigger 
                value="videos" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400 transition-all duration-300"
              >
                <Video className="w-4 h-4" />
                Videos
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Search Results View */}
        {isSearching && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Search Results</h3>
            <div className="grid gap-3">
              {filteredMaterials.map((material, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    expandPaperWithSearchResults(material.subjectId, material.paperId);
                    // Scroll to the subject section
                    const element = document.getElementById(`subject-${material.subjectId}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 dark:text-gray-100">{material.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {material.subject} • {material.paper} • {material.chapter}
                      </p>
                    </div>
                    <Badge
                      className={`ml-2 ${
                        material.type === 'pdf'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
                      }`}
                    >
                      {material.type.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
              {filteredMaterials.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No materials found matching your search.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Materials Grid */}
        <div className="grid lg:grid-cols-1 gap-8">
          {materialsData?.subjects.map((subject) => (
            <Card 
              key={subject.id} 
              id={`subject-${subject.id}`}
              className="border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-800/30 transition-all duration-300 bg-white dark:bg-gray-800"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${currentTheme.primary}20` }}
                  >
                    <div style={{ color: currentTheme.primary }}>
                      {getIcon(subject.icon)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300">
                      {subject.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      {subject.fullName}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 transition-colors duration-300"
                  >
                    {subject.papers.length} {subject.papers.length === 1 ? 'Paper' : 'Papers'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {subject.papers.map((paper) => {
                    const isExpanded = expandedPapers[`${subject.id}-${paper.id}`];
                    const totalChapters = paper.chapters.length;
                    const totalPdfs = paper.chapters.reduce((acc, chapter) => acc + chapter.driveLinks.length, 0);
                    const totalVideos = paper.chapters.reduce((acc, chapter) => acc + chapter.videoLinks.length, 0);
                    
                    return (
                      <div 
                        key={paper.id} 
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 transition-colors duration-300"
                      >
                        <div 
                          className="flex justify-between items-center cursor-pointer"
                          onClick={() => togglePaperExpansion(subject.id, paper.id)}
                        >
                          <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100 transition-colors duration-300">
                            {paper.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="outline" 
                              className="mr-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 transition-colors duration-300"
                            >
                              {totalChapters} {totalChapters === 1 ? 'Chapter' : 'Chapters'}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 transition-colors duration-300"
                            >
                              {totalPdfs} PDFs
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className="bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 transition-colors duration-300"
                            >
                              {totalVideos} Videos
                            </Badge>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
                            >
                              {isExpanded ? '▲' : '▼'}
                            </Button>
                          </div>
                        </div>
                        
                        {isExpanded && (
                          <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {paper.chapters.map((chapter) => (
                              <div 
                                key={chapter.id} 
                                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 transition-colors duration-300"
                              >
                                <h5 className="font-semibold mb-3 text-gray-800 dark:text-gray-100 transition-colors duration-300">
                                  {chapter.title}
                                </h5>

                                <div className="space-y-2">
                                  {/* PDF Download Buttons */}
                                  {(activeView === 'all' || activeView === 'pdfs') && (
                                    chapter.driveLinks && chapter.driveLinks.length > 0 ? (
                                      chapter.driveLinks.map((link, index) => (
                                        <Button
                                          key={index}
                                          variant="outline"
                                          size="sm"
                                          className="w-full justify-start gap-2 hover:scale-105 transition-all duration-300 border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/30"
                                          onClick={() => handleLinkClick(link.url, 'PDF')}
                                        >
                                          <Download className="w-4 h-4" />
                                          {link.name}
                                          <ExternalLink className="w-3 h-3 ml-auto" />
                                        </Button>
                                      ))
                                    ) : (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full justify-start gap-2 hover:scale-105 transition-all duration-300 border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                                        onClick={() => handleLinkClick(null, 'PDF')}
                                      >
                                        <Plus className="w-4 h-4" />
                                        Add PDF Link
                                        <ExternalLink className="w-3 h-3 ml-auto" />
                                      </Button>
                                    )
                                  )}

                                  {/* Video Watch Buttons */}
                                  {(activeView === 'all' || activeView === 'videos') && (
                                    chapter.videoLinks && chapter.videoLinks.length > 0 ? (
                                      chapter.videoLinks.map((link, index) => (
                                        <Button
                                          key={index}
                                          variant="outline"
                                          size="sm"
                                          className="w-full justify-start gap-2 hover:scale-105 transition-all duration-300 border-pink-200 text-pink-700 hover:bg-pink-50 dark:border-pink-700 dark:text-pink-300 dark:hover:bg-pink-900/30"
                                          onClick={() => handleLinkClick(link.url, 'Video')}
                                        >
                                          <Play className="w-4 h-4" />
                                          {link.name}
                                          <ExternalLink className="w-3 h-3 ml-auto" />
                                        </Button>
                                      ))
                                    ) : (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full justify-start gap-2 hover:scale-105 transition-all duration-300 border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                                        onClick={() => handleLinkClick(null, 'Video')}
                                      >
                                        <Plus className="w-4 h-4" />
                                        Add Video Link
                                        <ExternalLink className="w-3 h-3 ml-auto" />
                                      </Button>
                                    )
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Help Text */}
        <div className="mt-12 text-center">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl max-w-2xl mx-auto transition-colors duration-300">
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100 transition-colors duration-300">
              Share Your Resources
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              Have a PDF (Google Drive) or YouTube video to add? Contact Shakib.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaterialsSection;
