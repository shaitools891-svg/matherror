import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
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
  BookOpen,
  Languages,
  Dna,
  ArrowLeft
} from 'lucide-react';
import { studyMaterialsData } from '../data/studyMaterials';

const SubjectPage = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('all');
  const [expandedPapers, setExpandedPapers] = useState({});

  // Find the subject data
  const subject = studyMaterialsData.subjects.find(s => s.id.toString() === subjectId);

  if (!subject) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Subject not found</h2>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  // Icon mapping
  const getIcon = (iconName) => {
    const icons = {
      Monitor,
      Atom,
      FlaskConical,
      Calculator,
      BookOpen,
      Languages,
      Dna
    };
    return icons[iconName] || FileText;
  };

  // Color mapping for subjects
  const getSubjectColor = (subjectId) => {
    const colors = {
      1: 'blue',    // Physics
      2: 'purple',  // Chemistry
      3: 'green',   // Mathematics
      4: 'orange',  // ICT
      5: 'red',     // Bangla
      6: 'teal',    // English
      7: 'emerald'  // Biology
    };
    return colors[subjectId] || 'gray';
  };

  const subjectColor = getSubjectColor(subject.id);

  const handleLinkClick = (url, type, videoData = null) => {
    if (type === 'Video' && videoData) {
      window.open(url, '_blank');
      return;
    }

    if (!url || url.includes('your-link-here')) {
      alert(`${type} link is not ready yet. Please reach out to Shakib and notify him.`);
      return;
    }

    if (url.startsWith('/')) {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(url, '_blank');
    }
  };

  const togglePaperExpansion = (paperId) => {
    setExpandedPapers(prev => ({
      ...prev,
      [paperId]: !prev[paperId]
    }));
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, hsl(${subjectColor === 'blue' ? '223, 90%, 50%' : subjectColor === 'purple' ? '283, 90%, 50%' : subjectColor === 'green' ? '123, 90%, 40%' : subjectColor === 'orange' ? '43, 90%, 50%' : subjectColor === 'red' ? '3, 90%, 50%' : '178, 90%, 50%'}, hsl(${subjectColor === 'blue' ? '208, 90%, 50%' : subjectColor === 'purple' ? '268, 90%, 50%' : subjectColor === 'green' ? '108, 90%, 40%' : subjectColor === 'orange' ? '28, 90%, 50%' : subjectColor === 'red' ? '348, 90%, 50%' : '163, 90%, 50%'}))`
                }}
              >
                <div className="w-8 h-8 text-white">
                  {React.createElement(getIcon(subject.icon), {
                    className: "w-full h-full"
                  })}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {subject.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {subject.fullName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* View Toggle */}
        <div className="flex justify-center mb-6">
          <Tabs value={activeView} onValueChange={setActiveView} className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <TabsTrigger
                value="all"
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400"
              >
                <FileText className="w-4 h-4" />
                All
              </TabsTrigger>
              <TabsTrigger
                value="pdfs"
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400"
              >
                <Download className="w-4 h-4" />
                PDFs
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400"
              >
                <Video className="w-4 h-4" />
                Videos
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Papers */}
        <div className="space-y-4">
          {subject.papers.map((paper) => {
            const isExpanded = expandedPapers[paper.id];
            const totalChapters = paper.chapters.length;
            const totalPdfs = paper.chapters.reduce((acc, chapter) => acc + chapter.driveLinks.length, 0);
            const totalVideos = paper.chapters.reduce((acc, chapter) => acc + chapter.videoLinks.length, 0);

            return (
              <Card key={paper.id} className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <CardHeader>
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => togglePaperExpansion(paper.id)}
                  >
                    <CardTitle className="text-xl text-gray-800 dark:text-gray-100">
                      {paper.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        {totalChapters} {totalChapters === 1 ? 'Chapter' : 'Chapters'}
                      </Badge>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        {totalPdfs} PDFs
                      </Badge>
                      <Badge variant="outline" className="bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300">
                        {totalVideos} Videos
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400">
                        {isExpanded ? '▲' : '▼'}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {paper.chapters.map((chapter) => (
                        <div
                          key={chapter.id}
                          className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600"
                        >
                          <h5 className="font-semibold mb-3 text-gray-800 dark:text-gray-100">
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
                                    onClick={() => handleLinkClick(link.url, 'Video', {
                                      url: link.url,
                                      title: link.name,
                                      chapter: chapter.title,
                                      subject: subject.name
                                    })}
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
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl max-w-2xl mx-auto">
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
              Share Your Resources
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Have a PDF (Google Drive) or YouTube video to add? Contact Shakib.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;