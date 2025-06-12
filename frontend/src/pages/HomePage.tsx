
import { ArrowUp, GitBranch, Clock, Users, Skull, TrendingUp, MessageCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HomePage = () => {
  const trendingProjects = [
    {
      id: 1,
      title: "SocialSync",
      description: "A unified dashboard to manage all your social media accounts. Built the auth system and half the UI before realizing Buffer exists.",
      author: "sarah_codes",
      upvotes: 247,
      comments: 23,
      techStack: ["React", "Node.js", "MongoDB", "OAuth"],
      timeAgo: "2 days ago",
      reason: "Found out Buffer already does this better"
    },
    {
      id: 2,
      title: "DevHabits",
      description: "Habit tracking app specifically for developers. Track coding streaks, commit patterns, and learning goals. Got stuck on the analytics dashboard.",
      author: "codemaster99",
      upvotes: 189,
      comments: 31,
      techStack: ["Vue.js", "Firebase", "Chart.js"],
      timeAgo: "5 days ago",
      reason: "Analytics got too complex, lost motivation"
    },
    {
      id: 3,
      title: "LocalFirst Notes",
      description: "Privacy-focused note-taking app with local-first architecture and P2P sync. Spent 3 months on the sync algorithm alone.",
      author: "privacy_dev",
      upvotes: 156,
      comments: 18,
      techStack: ["Svelte", "WebRTC", "IndexedDB"],
      timeAgo: "1 week ago",
      reason: "P2P sync was harder than expected"
    },
    {
      id: 4,
      title: "CodeSnippetManager",
      description: "AI-powered code snippet manager with smart tagging and search. Built the core features but couldn't nail the AI part.",
      author: "ai_enthusiast",
      upvotes: 134,
      comments: 12,
      techStack: ["Python", "FastAPI", "PostgreSQL", "OpenAI"],
      timeAgo: "3 weeks ago",
      reason: "AI integration was too expensive to maintain"
    }
  ];

  const stats = [
    { label: "Abandoned Projects", value: "1,247", icon: Skull },
    { label: "Developers", value: "856", icon: Users },
    { label: "Upvotes Given", value: "12.5K", icon: ArrowUp },
    { label: "Stories Shared", value: "3.2K", icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Skull className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">killedinlocalhost</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-slate-300 hover:text-slate-600">
                Browse Graves
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Share Your Project
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 mb-4">
              The Graveyard of Ambitious Ideas
            </Badge>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Where <span className="text-purple-400">Dead Projects</span> Tell Their Stories
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            A place where you can post about your highly ambitious project you were willing to bet your life on and then all of a sudden you left it in the middle. Share your localhost graveyard and connect with fellow developers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3">
              <Skull className="mr-2 h-5 w-5" />
              Submit Your Dead Project
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-slate-600 hover:text-white hover:bg-slate-800 text-lg px-8 py-3">
              Explore the Graveyard
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <stat.icon className="h-8 w-8 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Graves Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-purple-400 mr-3" />
              <h2 className="text-4xl font-bold text-white">Trending Graves</h2>
            </div>
            <p className="text-xl text-slate-400">The most upvoted abandoned projects this week</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {trendingProjects.map((project) => (
              <Card key={project.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:transform hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-white mb-2 flex items-center">
                        <GitBranch className="h-5 w-5 text-purple-400 mr-2" />
                        {project.title}
                      </CardTitle>
                      <div className="flex items-center text-sm text-slate-400 mb-3">
                        <span>by {project.author}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{project.timeAgo}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center ml-4">
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-purple-400 p-2">
                        <ArrowUp className="h-5 w-5" />
                      </Button>
                      <span className="text-sm font-semibold text-slate-300">{project.upvotes}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="mb-4">
                    <Badge variant="destructive" className="bg-red-900/30 text-red-300 border-red-800 text-xs">
                      💀 {project.reason}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white p-0">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {project.comments} comments
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 p-0">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" className="border-slate-600 text-slate-600 hover:text-white hover:bg-slate-800">
              View All Abandoned Projects
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Honor Your Abandoned Projects?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of developers sharing their localhost graveyards. Your abandoned project might inspire someone else to pick up where you left off.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3">
            <Skull className="mr-2 h-5 w-5" />
            Share Your Story
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Skull className="h-6 w-6 text-purple-400" />
              <span className="text-xl font-bold text-white">killedinlocalhost</span>
            </div>
            <div className="flex items-center space-x-6 text-slate-400">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Guidelines</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500">
            <p>© 2024 killedinlocalhost. Built by Anukiran Ghosh 💀</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;