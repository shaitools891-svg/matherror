import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import DarkModeToggle from './DarkModeToggle';
import {
  ArrowLeft,
  Download,
  Play,
  ExternalLink,
  FileText,
  Video,
  BookOpen,
  Monitor,
  Atom,
  FlaskConical,
  Calculator,
  Languages,
  Dna,
  Menu,
  // Subject-specific icons
  Zap,
  Waves,
  Magnet,
  Telescope,
  Beaker,
  TestTube,
  Pi,
  Triangle,
  Square,
  Cpu,
  HardDrive,
  Wifi,
  Book,
  PenTool,
  Type,
  Leaf,
  TreePine,
  Microscope,
  Flower,
  Apple
} from 'lucide-react';
import { studyMaterialsData } from '../data/studyMaterials';
import { SidebarContext } from './LayoutWithSidebar';

const ChapterPage = ({ onToggleSidebar }) => {
  const { subjectId, paperId, chapterId } = useParams();
  const navigate = useNavigate();
  const sidebarContext = React.useContext(SidebarContext);
  const { handleToggleSidebar, sidebarOpen } = sidebarContext || {};

  // Find the subject, paper, and chapter data
  const subject = studyMaterialsData.subjects.find(s => s.id.toString() === subjectId);
  const paper = subject?.papers.find(p => p.id.toString() === paperId);
  const chapter = paper?.chapters.find(c => c.id.toString() === chapterId);

  if (!subject || !paper || !chapter) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Chapter not found</h2>
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 text-gray-900 dark:text-gray-100 relative">

      {/* Background Icons Texture */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, multiplier) =>
            backgroundIcons.map((IconComponent, index) => (
              <div
                key={`${multiplier}-${index}`}
                className="absolute opacity-40 dark:opacity-10"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `rotate(${(index + multiplier * backgroundIcons.length) * 15}deg) scale(${0.4 + ((index + multiplier * backgroundIcons.length) % 6) * 0.1})`,
                }}
              >
                <IconComponent
                  className={`w-6 h-6 md:w-8 md:h-8 ${
                    subjectColor === 'blue' ? 'text-blue-200' :
                    subjectColor === 'purple' ? 'text-purple-200' :
                    subjectColor === 'green' ? 'text-green-200' :
                    subjectColor === 'orange' ? 'text-orange-200' :
                    subjectColor === 'red' ? 'text-red-200' :
                    subjectColor === 'teal' ? 'text-teal-200' :
                    subjectColor === 'emerald' ? 'text-emerald-200' :
                    'text-gray-200'
                  }`}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Header */}
      <div className="relative overflow-hidden z-10">
        <div className="relative bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">

              <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                {/* Controls */}
                <div className="flex items-center gap-2 justify-end lg:justify-start">
                  {!sidebarOpen && (
                    <Button
                      onClick={() => console.log('FAB clicked, handleToggleSidebar:', handleToggleSidebar) || handleToggleSidebar?.()}
                      className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-0"
                      size="sm"
                    >
                      <Menu className="w-4 h-4" />
                    </Button>
                  )}
                  <DarkModeToggle />
                </div>

                {/* Back Button */}
                <Button
                  onClick={() => navigate(`/subject/${subjectId}`)}
                  variant="outline"
                  className="flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to {subject.name}
                </Button>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${
                      subjectColor === 'blue' ? 'from-blue-500 to-blue-600' :
                      subjectColor === 'purple' ? 'from-purple-500 to-purple-600' :
                      subjectColor === 'green' ? 'from-green-500 to-green-600' :
                      subjectColor === 'orange' ? 'from-orange-500 to-orange-600' :
                      subjectColor === 'red' ? 'from-red-500 to-red-600' :
                      subjectColor === 'teal' ? 'from-teal-500 to-teal-600' :
                      subjectColor === 'emerald' ? 'from-emerald-500 to-emerald-600' :
                      'from-gray-500 to-gray-600'
                    } shadow-md`}
                  >
                    <div className="w-7 h-7 text-white">
                      {React.createElement(getIcon(subject.icon), {
                        className: "w-full h-full"
                      })}
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                      {chapter.title}
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {paper.name} • {subject.name}
                    </p>
                  </div>
                </div>

                {/* Statistics */}
                <div className="flex flex-wrap gap-2">
                  <div className="bg-gray-200/50 dark:bg-gray-700/40 rounded-lg px-3 py-1 border border-gray-300/60 dark:border-gray-600/50 backdrop-blur-sm">
                    <div className="flex items-center gap-1">
                      <Download className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{chapter.driveLinks?.length || 0} PDFs</span>
                    </div>
                  </div>
                  <div className="bg-gray-200/50 dark:bg-gray-700/40 rounded-lg px-3 py-1 border border-gray-300/60 dark:border-gray-600/50 backdrop-blur-sm">
                    <div className="flex items-center gap-1">
                      <Video className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{chapter.videoLinks?.length || 0} Videos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Chapter Overview */}
          <Card className="mb-8 border border-gray-200/60 dark:border-gray-700/50 shadow-lg bg-gray-100/40 dark:bg-gray-800/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-gray-100 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
                Chapter Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Subject Information</h4>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p><strong>Subject:</strong> {subject.name}</p>
                    <p><strong>Paper:</strong> {paper.name}</p>
                    <p><strong>Chapter:</strong> {chapter.title}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Available Resources</h4>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p><strong>PDFs:</strong> {chapter.driveLinks?.length || 0}</p>
                    <p><strong>Videos:</strong> {chapter.videoLinks?.length || 0}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resources Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 mb-6">
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
                PDFs ({chapter.driveLinks?.length || 0})
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100 transition-all duration-200 rounded-lg"
              >
                <Video className="w-4 h-4" />
                Videos ({chapter.videoLinks?.length || 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              {/* PDFs Section */}
              {(chapter.driveLinks && chapter.driveLinks.length > 0) && (
                <Card className="border border-gray-200/60 dark:border-gray-700/50 shadow-lg bg-gray-100/40 dark:bg-gray-800/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <Download className="w-5 h-5 text-blue-600" />
                      PDF Materials ({chapter.driveLinks.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {chapter.driveLinks.map((link, index) => (
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
                  </CardContent>
                </Card>
              )}

              {/* Videos Section */}
              {(chapter.videoLinks && chapter.videoLinks.length > 0) && (
                <Card className="border border-gray-200/60 dark:border-gray-700/50 shadow-lg bg-gray-100/40 dark:bg-gray-800/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <Video className="w-5 h-5 text-pink-600" />
                      Video Materials ({chapter.videoLinks.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {chapter.videoLinks.map((link, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start gap-4 hover:scale-[1.02] transition-all duration-300 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700/50 rounded-lg py-4 font-medium"
                          onClick={() => handleLinkClick(link.url, 'Video', {
                            url: link.url,
                            title: link.name,
                            chapter: chapter.title,
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
                  </CardContent>
                </Card>
              )}

              {/* Empty State */}
              {(!chapter.driveLinks || chapter.driveLinks.length === 0) &&
               (!chapter.videoLinks || chapter.videoLinks.length === 0) && (
                <Card className="border border-gray-200/60 dark:border-gray-700/50 shadow-lg bg-gray-100/40 dark:bg-gray-800/40 backdrop-blur-sm">
                  <CardContent className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                      No materials available yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Materials for this chapter are being prepared. Check back soon!
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="pdfs">
              {(chapter.driveLinks && chapter.driveLinks.length > 0) ? (
                <div className="grid gap-4">
                  {chapter.driveLinks.map((link, index) => (
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
              ) : (
                <Card className="border border-gray-200/60 dark:border-gray-700/50 shadow-lg bg-gray-100/40 dark:bg-gray-800/40 backdrop-blur-sm">
                  <CardContent className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
                      <Download className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                      No PDFs available
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      PDF materials for this chapter are being prepared.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="videos">
              {(chapter.videoLinks && chapter.videoLinks.length > 0) ? (
                <div className="grid gap-4">
                  {chapter.videoLinks.map((link, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start gap-4 hover:scale-[1.02] transition-all duration-300 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700/50 rounded-lg py-4 font-medium"
                      onClick={() => handleLinkClick(link.url, 'Video', {
                        url: link.url,
                        title: link.name,
                        chapter: chapter.title,
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
              ) : (
                <Card className="border border-gray-200/60 dark:border-gray-700/50 shadow-lg bg-gray-100/40 dark:bg-gray-800/40 backdrop-blur-sm">
                  <CardContent className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
                      <Video className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                      No videos available
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Video materials for this chapter are being prepared.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;