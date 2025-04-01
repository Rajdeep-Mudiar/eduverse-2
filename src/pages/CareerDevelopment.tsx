
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Briefcase, FileText, GraduationCap } from "lucide-react";
import { toast } from "sonner";

const CareerDevelopment = () => {
  const [resumeType, setResumeType] = useState("professional");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState("");

  const handleGenerateResume = () => {
    setGenerating(true);
    // Simulate API call delay
    setTimeout(() => {
      setGenerating(false);
      setResult(`# Professional Resume\n\n## John Doe\nSoftware Engineer | AI Specialist | Data Analyst\n\n## Summary\nA dedicated software professional with 5+ years of experience in AI and machine learning solutions. Proven track record of delivering high-quality products and driving innovation.\n\n## Skills\n- AI/ML Development\n- Full Stack Web Development\n- Data Analysis\n- Project Management\n\n## Experience\n### Senior Developer - Tech Innovations Inc.\n*2020 - Present*\n- Led development of AI-powered recommendation engine\n- Improved system efficiency by 35%\n- Mentored junior team members\n\n### Software Engineer - DataCorp\n*2018 - 2020*\n- Developed data processing pipelines\n- Implemented machine learning models\n- Collaborated with cross-functional teams`);
      toast.success("Resume generated successfully!");
    }, 2000);
  };

  const careerPaths = [
    { title: "AI & Machine Learning Engineer", description: "Build intelligent systems and algorithms" },
    { title: "Full Stack Developer", description: "Create web applications from front to back" },
    { title: "Data Scientist", description: "Analyze and interpret complex data" },
    { title: "UX/UI Designer", description: "Design user-centered digital experiences" },
    { title: "DevOps Engineer", description: "Streamline development and deployment" },
    { title: "Cybersecurity Specialist", description: "Protect systems and data from threats" }
  ];

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Career & Skill Development</h1>

      <Tabs defaultValue="resume" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="resume">
            <FileText className="mr-2 h-4 w-4" /> AI Resume Builder
          </TabsTrigger>
          <TabsTrigger value="career">
            <Briefcase className="mr-2 h-4 w-4" /> Career Guidance
          </TabsTrigger>
          <TabsTrigger value="skills">
            <GraduationCap className="mr-2 h-4 w-4" /> Skill Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resume">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Resume Builder</CardTitle>
                <CardDescription>Generate a professional resume in seconds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Resume Type</label>
                  <Select defaultValue={resumeType} onValueChange={setResumeType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select resume type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Experience</label>
                  <Textarea 
                    placeholder="Briefly describe your work experience, skills, and education..." 
                    className="min-h-[150px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Experience Level</label>
                    <Select defaultValue="mid">
                      <SelectTrigger>
                        <SelectValue placeholder="Experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                        <SelectItem value="executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Industry</label>
                    <Select defaultValue="tech">
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="health">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleGenerateResume}
                  disabled={generating}
                >
                  {generating ? "Generating..." : "Generate Resume"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Results</CardTitle>
                <CardDescription>Your AI-generated resume</CardDescription>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="prose dark:prose-invert max-w-none">
                    <pre className="rounded-md bg-gray-100 dark:bg-gray-800 p-4 overflow-auto text-sm">
                      {result}
                    </pre>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center p-12 text-gray-500 border border-dashed rounded-md">
                    Generated resume will appear here
                  </div>
                )}
              </CardContent>
              <CardFooter className="justify-between">
                {result && (
                  <>
                    <Button variant="outline" onClick={() => toast.success("Resume copied to clipboard!")}>
                      Copy
                    </Button>
                    <Button onClick={() => toast.success("Resume downloaded successfully!")}>
                      Download PDF
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="career">
          <Card>
            <CardHeader>
              <CardTitle>Career Path Recommendations</CardTitle>
              <CardDescription>
                Based on your skills and learning patterns, we recommend these career paths
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {careerPaths.map((path, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{path.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{path.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">
                        Explore Path
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Looking for a specific career path? Search here:
                </p>
                <div className="flex gap-2">
                  <Input placeholder="Enter job title or skill..." className="flex-1" />
                  <Button>Search</Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skill Gap Analysis</CardTitle>
              <CardDescription>
                See how your current skills match industry requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Your Top Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {["JavaScript", "React", "TypeScript", "UI/UX", "Data Analysis", "Problem Solving"].map((skill) => (
                      <Badge key={skill} variant="secondary" className="py-1.5">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Recommended Skills to Develop</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "AI/ML", "AWS", "GraphQL", "System Design", "Python"].map((skill) => (
                      <Badge key={skill} variant="outline" className="py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors cursor-pointer">
                        + {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="font-medium mb-4">Skill Match for Popular Roles</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Front-End Developer</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Full Stack Developer</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: "68%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Data Scientist</span>
                        <span className="font-medium">42%</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className="h-2 rounded-full bg-yellow-500" style={{ width: "42%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Personalized Learning Path</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CareerDevelopment;
