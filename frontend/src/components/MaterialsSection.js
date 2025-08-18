import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import {
    Monitor,
    Atom,
    FlaskConical,
    Download,
    Play,
    ExternalLink,
    FileText,
    Video,
    Plus
} from 'lucide-react';

const MaterialsSection = () => {
    const { currentTheme } = useTheme();
    const [activeView, setActiveView] = useState('all');
    const [materialsData, setMaterialsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await fetch('https://matherror-backend.onrender.com/api/materials');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMaterialsData(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMaterials();
    }, []);

    const getIcon = (iconName) => {
        const icons = {
            Monitor,
            Atom,
            FlaskConical
        };
        const IconComponent = icons[iconName];
        return IconComponent ? <IconComponent className="w-5 h-5" /> : <FileText className="w-5 h-5" />;
    };

    const handleLinkClick = (url, type) => {
        if (!url) {
            alert(`${type} link is not ready yet. Please reach out to Shakib and notify him.`);
            return;
        }
        window.open(url, '_blank');
    };

    if (loading) {
        return (
            <section id="materials" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <p>Loading materials...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="materials" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <p>Error loading materials: {error}</p>
                </div>
            </section>
        );
    }

    return (
        <section id="materials" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: currentTheme.text }}>
                        Study Materials
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Access comprehensive notes and video lectures for HSC 26 preparation
                    </p>
                </div>

                {/* View Toggle */}
                <div className="flex justify-center mb-8">
                    <Tabs value={activeView} onValueChange={setActiveView} className="w-full max-w-md">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="all" className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                All
                            </TabsTrigger>
                            <TabsTrigger value="pdfs" className="flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                PDFs
                            </TabsTrigger>
                            <TabsTrigger value="videos" className="flex items-center gap-2">
                                <Video className="w-4 h-4" />
                                Videos
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Materials Grid */}
                <div className="grid lg:grid-cols-1 gap-8">
                    {materialsData?.subjects.map((subject) => (
                        <Card key={subject.id} className="border border-gray-200 hover:shadow-md transition-shadow">
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
                                        <h3 className="text-xl font-bold" style={{ color: currentTheme.text }}>
                                            {subject.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">{subject.fullName}</p>
                                    </div>
                                    <Badge
                                        variant="secondary"
                                        style={{
                                            backgroundColor: `${currentTheme.primary}10`,
                                            color: currentTheme.primary
                                        }}
                                    >
                                        {subject.chapters.length} Chapters
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {subject.chapters.map((chapter) => (
                                        <div key={chapter.id} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                                            <h4 className="font-semibold mb-3 text-gray-800">
                                                {chapter.title}
                                            </h4>

                                            <div className="space-y-2">
                                                {/* PDF Download Buttons */}
                                                {(activeView === 'all' || activeView === 'pdfs') && (
                                                    chapter.driveLinks && chapter.driveLinks.length > 0 ? (
                                                        chapter.driveLinks.map((link, index) => (
                                                            <Button
                                                                key={index}
                                                                variant="outline"
                                                                size="sm"
                                                                className="w-full justify-start gap-2 hover:scale-105 transition-transform"
                                                                onClick={() => handleLinkClick(link.url, 'PDF')}
                                                                style={{
                                                                    borderColor: currentTheme.primary,
                                                                    color: currentTheme.primary
                                                                }}
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
                                                            className="w-full justify-start gap-2 hover:scale-105 transition-transform"
                                                            onClick={() => handleLinkClick(null, 'PDF')}
                                                            style={{
                                                                borderColor: '#d1d5db',
                                                                color: '#6b7280'
                                                            }}
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
                                                                className="w-full justify-start gap-2 hover:scale-105 transition-transform"
                                                                onClick={() => handleLinkClick(link.url, 'Video')}
                                                                style={{
                                                                    borderColor: currentTheme.accent,
                                                                    color: currentTheme.accent
                                                                }}
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
                                                            className="w-full justify-start gap-2 hover:scale-105 transition-transform"
                                                            onClick={() => handleLinkClick(null, 'Video')}
                                                            style={{
                                                                borderColor: '#d1d5db',
                                                                color: '#6b7280'
                                                            }}
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
                        </Card>
                    ))}
                </div>
                {/* Help Text */}
                <div className="mt-12 text-center">
                    <div className="bg-gray-50 p-6 rounded-xl max-w-2xl mx-auto">
                        <h3 className="font-semibold mb-2" style={{ color: currentTheme.text }}>
                            Share Your Resources
                        </h3>
                        <p className="text-sm text-gray-600">
                            Have a PDF (Google Drive) or YouTube video to add? Contact us or follow the steps below to submit your materials.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MaterialsSection;
