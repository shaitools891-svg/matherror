import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog';
import DarkModeToggle from './DarkModeToggle';
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
  ArrowLeft,
  BarChart3,
  Clock,
  CheckCircle,
  TrendingUp,
  // Biology icons
  Leaf,
  TreePine,
  Microscope,
  Flower,
  Apple,
  // Physics icons
  Zap,
  Waves,
  Magnet,
  Telescope,
  // Chemistry icons
  Beaker,
  TestTube,
  // Mathematics icons
  Pi,
  Triangle,
  Square,
  // ICT icons
  Cpu,
  HardDrive,
  Wifi,
  // English icons
  Book,
  PenTool,
  // Bangla icons
  Type
} from 'lucide-react';
import { studyMaterialsData } from '../data/studyMaterials';

const SubjectPage = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('all');
  const [expandedPapers, setExpandedPapers] = useState({});
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Subject-specific background icons
  const getSubjectBackgroundIcons = (subjectId) => {
    const iconSets = {
      1: [Zap, Waves, Magnet, Telescope], // Physics
      2: [Beaker, TestTube, FlaskConical, Atom], // Chemistry
      3: [Pi, Triangle, Square, Calculator], // Mathematics
      4: [Cpu, HardDrive, Wifi, Monitor], // ICT
      5: [Type, BookOpen, PenTool], // Bangla
      6: [Book, PenTool, Languages], // English
      7: [Leaf, TreePine, Microscope, Flower, Apple] // Biology
    };
    return iconSets[subjectId] || [BookOpen];
  };

  const backgroundIcons = getSubjectBackgroundIcons(subject.id);

  // Calculate statistics
  const totalPapers = subject.papers.length;
  const totalChapters = subject.papers.reduce((acc, paper) => acc + paper.chapters.length, 0);
  const totalPdfs = subject.papers.reduce((acc, paper) =>
    acc + paper.chapters.reduce((chapterAcc, chapter) => chapterAcc + chapter.driveLinks.length, 0), 0);
  const totalVideos = subject.papers.reduce((acc, paper) =>
    acc + paper.chapters.reduce((chapterAcc, chapter) => chapterAcc + chapter.videoLinks.length, 0), 0);
  const completionPercentage = Math.round(((totalPdfs + totalVideos) / (totalChapters * 2)) * 100) || 0;

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

  const handleChapterClick = (chapter, paperName) => {
    setSelectedChapter({ ...chapter, paperName });
    setIsModalOpen(true);
  };

  const closeChapterModal = () => {
    setSelectedChapter(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="relative bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 self-start"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>

              <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Theme Toggle */}
                <div className="flex justify-end lg:justify-start">
                  <DarkModeToggle />
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-100 dark:bg-gray-700"
                  >
                    <div className="w-10 h-10 text-gray-600 dark:text-gray-300">
                      {React.createElement(getIcon(subject.icon), {
                        className: "w-full h-full"
                      })}
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                      {subject.name}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      {subject.fullName}
                    </p>
                  </div>
                </div>

                {/* Statistics Cards */}
                <div className="flex flex-wrap gap-3">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-2 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{totalPapers} Papers</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-2 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{totalChapters} Chapters</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-2 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{totalPdfs} PDFs</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-2 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{totalVideos} Videos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Content Completion</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <Tabs value={activeView} onValueChange={setActiveView} className="w-full max-w-lg">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700">
              <TabsTrigger
                value="all"
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100 transition-all duration-200 rounded-lg"
              >
                <FileText className="w-4 h-4" />
                All Resources
              </TabsTrigger>
              <TabsTrigger
                value="pdfs"
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100 transition-all duration-200 rounded-lg"
              >
                <Download className="w-4 h-4" />
                PDFs ({totalPdfs})
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100 transition-all duration-200 rounded-lg"
              >
                <Video className="w-4 h-4" />
                Videos ({totalVideos})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Papers */}
        <div className="space-y-6">
          {subject.papers.map((paper, paperIndex) => {
            const isExpanded = expandedPapers[paper.id];
            const totalChapters = paper.chapters.length;
            const totalPdfs = paper.chapters.reduce((acc, chapter) => acc + chapter.driveLinks.length, 0);
            const totalVideos = paper.chapters.reduce((acc, chapter) => acc + chapter.videoLinks.length, 0);

            return (
              <Card key={paper.id} className="group border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardHeader className="relative">
                  <div
                    className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 cursor-pointer group-hover:bg-gray-50/50 dark:group-hover:bg-gray-700/50 transition-colors duration-200 p-4 rounded-lg"
                    onClick={() => togglePaperExpansion(paper.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg shadow-lg">
                        {paperIndex + 1}
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                          {paper.name}
                        </CardTitle>
                        <p className="text-gray-700 dark:text-gray-400 mt-1">
                          {totalChapters} chapters • {totalPdfs} PDFs • {totalVideos} videos
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700 px-3 py-1">
                          <BookOpen className="w-3 h-3 mr-1" />
                          {totalChapters} {totalChapters === 1 ? 'Chapter' : 'Chapters'}
                        </Badge>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700 px-3 py-1">
                          <Download className="w-3 h-3 mr-1" />
                          {totalPdfs} PDFs
                        </Badge>
                        <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-700 px-3 py-1">
                          <Video className="w-3 h-3 mr-1" />
                          {totalVideos} Videos
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full w-8 h-8 p-0 transition-all duration-200">
                        <span className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="relative">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {paper.chapters.map((chapter, chapterIndex) => (
                        <Card
                          key={chapter.id}
                          className="group cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800"
                          onClick={() => handleChapterClick(chapter, paper.name)}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <h5 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                                {chapter.title}
                              </h5>
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-bold flex items-center justify-center shadow-md flex-shrink-0 ml-2">
                                {chapterIndex + 1}
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <Download className="w-4 h-4" />
                                <span>{chapter.driveLinks?.length || 0} PDFs</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Video className="w-4 h-4" />
                                <span>{chapter.videoLinks?.length || 0} Videos</span>
                              </div>
                            </div>

                            <div className="mt-4 text-xs text-gray-500 dark:text-gray-500 text-center">
                              Click to view materials
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Help Text */}
        <div className="mt-12 text-center">
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-3xl max-w-3xl mx-auto border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
              Help Us Grow This Resource Library
            </h3>
            <p className="text-gray-700 dark:text-gray-400 mb-6 leading-relaxed">
              Have study materials, PDFs, or educational videos to share? Your contributions help thousands of HSC 2026 students succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gray-800 hover:bg-gray-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 py-3">
                <Plus className="w-4 h-4 mr-2" />
                Contribute Resources
              </Button>
              <Button variant="outline" className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl px-6 py-3">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Statistics
              </Button>
            </div>
          </div>
        </div>

        {/* Chapter Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl">
            <DialogHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
              <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {selectedChapter?.title}
              </DialogTitle>
              <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                {selectedChapter?.paperName} • {subject.name}
              </p>
            </DialogHeader>

            <div className="px-6 py-4 max-h-[calc(90vh-120px)] overflow-y-auto">
              <div className="space-y-6">
                {/* PDFs Section */}
                {(selectedChapter?.driveLinks && selectedChapter.driveLinks.length > 0) && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <Download className="w-5 h-5 text-blue-600" />
                      PDF Materials ({selectedChapter.driveLinks.length})
                    </h3>
                    <div className="grid gap-3">
                      {selectedChapter.driveLinks.map((link, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start gap-4 hover:scale-[1.02] transition-all duration-300 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700/50 rounded-lg py-4 font-medium"
                          onClick={() => handleLinkClick(link.url, 'PDF')}
                        >
                          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Download className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="flex-1 text-left">{link.name}</span>
                          <ExternalLink className="w-5 h-5 opacity-60" />
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Videos Section */}
                {(selectedChapter?.videoLinks && selectedChapter.videoLinks.length > 0) && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <Video className="w-5 h-5 text-pink-600" />
                      Video Materials ({selectedChapter.videoLinks.length})
                    </h3>
                    <div className="grid gap-3">
                      {selectedChapter.videoLinks.map((link, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start gap-4 hover:scale-[1.02] transition-all duration-300 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700/50 rounded-lg py-4 font-medium"
                          onClick={() => handleLinkClick(link.url, 'Video', {
                            url: link.url,
                            title: link.name,
                            chapter: selectedChapter.title,
                            subject: subject.name
                          })}
                        >
                          <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                            <Play className="w-5 h-5 text-pink-600" />
                          </div>
                          <span className="flex-1 text-left">{link.name}</span>
                          <ExternalLink className="w-5 h-5 opacity-60" />
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {(!selectedChapter?.driveLinks || selectedChapter.driveLinks.length === 0) &&
                 (!selectedChapter?.videoLinks || selectedChapter.videoLinks.length === 0) && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                      No materials available yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Materials for this chapter are being prepared. Check back soon!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SubjectPage;