
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Code, Rocket, Book, Play } from "lucide-react";
import { toast } from "sonner";

const CodingLabs = () => {
  const [code, setCode] = useState(`function fibonacci(n) {\n  // Base cases\n  if (n <= 0) return 0;\n  if (n === 1) return 1;\n  \n  // Initialize variables\n  let a = 0;\n  let b = 1;\n  let temp;\n  \n  // Calculate fibonacci\n  for (let i = 2; i <= n; i++) {\n    temp = a + b;\n    a = b;\n    b = temp;\n  }\n  \n  return b;\n}`);
  
  const [output, setOutput] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  
  const handleRunCode = () => {
    setIsRunning(true);
    setOutput("");
    
    // Simulate code execution delay
    setTimeout(() => {
      setIsRunning(false);
      setOutput("fibonacci(10) = 55\nfibonacci(20) = 6765\nfibonacci(30) = 832040\n\nExecution complete in 0.03s");
      toast.success("Code executed successfully!");
    }, 1500);
  };
  
  const handleExplainCode = () => {
    setExplanation(`This is an efficient implementation of the Fibonacci sequence using an iterative approach:

1. **Base Cases**:
   - If n ≤ 0, return 0
   - If n = 1, return 1

2. **Iterative Calculation**:
   - Initialize variables: a = 0, b = 1
   - In each iteration, calculate the next Fibonacci number by adding a + b
   - Update a to be the previous b, and b to be the newly calculated sum
   - Repeat until we reach the nth number

3. **Performance**:
   - Time Complexity: O(n) - linear time
   - Space Complexity: O(1) - constant space

This implementation is more efficient than a recursive approach which would have O(2^n) time complexity.`);
    
    toast.success("Code explanation generated!");
  };
  
  const projects = [
    { 
      title: "Web Dashboard", 
      difficulty: "Intermediate", 
      description: "Build a responsive dashboard with React and Tailwind CSS" 
    },
    { 
      title: "AI Chat Bot", 
      difficulty: "Advanced", 
      description: "Create a conversational AI using modern NLP techniques" 
    },
    { 
      title: "Data Visualization", 
      difficulty: "Intermediate", 
      description: "Visualize complex datasets using D3.js and SVG" 
    },
    { 
      title: "RESTful API", 
      difficulty: "Beginner", 
      description: "Develop a simple API with Node.js and Express" 
    },
    { 
      title: "Image Recognition", 
      difficulty: "Advanced", 
      description: "Build an app that can identify objects in images" 
    },
    { 
      title: "E-commerce Store", 
      difficulty: "Intermediate", 
      description: "Create a full-featured online store with payment processing" 
    }
  ];

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Coding & AI Labs</h1>
      
      <Tabs defaultValue="code-editor" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="code-editor">
            <Code className="mr-2 h-4 w-4" /> Code Editor
          </TabsTrigger>
          <TabsTrigger value="projects">
            <Rocket className="mr-2 h-4 w-4" /> Projects
          </TabsTrigger>
          <TabsTrigger value="tutorials">
            <Book className="mr-2 h-4 w-4" /> Tutorials
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="code-editor">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Code Editor</span>
                    <div className="flex items-center space-x-2">
                      <Select defaultValue="javascript">
                        <SelectTrigger className="w-[140px] h-8">
                          <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="java">Java</SelectItem>
                          <SelectItem value="csharp">C#</SelectItem>
                          <SelectItem value="typescript">TypeScript</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardTitle>
                  <CardDescription>Write, test, and debug your code</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="min-h-[400px] font-mono text-sm p-4 bg-gray-950 text-gray-100"
                    />
                    <div className="absolute bottom-4 right-4 flex space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2 text-gray-400 hover:text-white hover:bg-gray-800"
                        onClick={() => toast.success("Code formatting applied")}
                      >
                        Format
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2 text-gray-400 hover:text-white hover:bg-gray-800"
                        onClick={() => toast.success("Code saved!")}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <Button 
                      variant="outline" 
                      onClick={handleExplainCode}
                    >
                      Explain Code
                    </Button>
                    <Button 
                      onClick={handleRunCode} 
                      disabled={isRunning}
                      className="flex items-center"
                    >
                      {isRunning ? "Running..." : (
                        <>
                          <Play className="mr-2 h-4 w-4" /> Run Code
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Output</CardTitle>
                  <CardDescription>Code execution results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-950 text-gray-100 rounded-md p-4 font-mono text-sm min-h-[200px]">
                    {output || "// Output will appear here when you run your code"}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>AI Code Explanation</CardTitle>
                  <CardDescription>Understanding what your code does</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md p-4 bg-purple-50 dark:bg-purple-900/20 text-sm min-h-[200px] prose dark:prose-invert max-w-none">
                    {explanation ? (
                      <div dangerouslySetInnerHTML={{ __html: explanation.replace(/\n\n/g, '<br/><br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ) : (
                      "Click 'Explain Code' to get an AI-powered explanation of your code"
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Hands-On Projects</CardTitle>
              <CardDescription>
                Learn by building real-world applications with AI assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <Badge
                          variant={project.difficulty === "Beginner" ? "outline" : 
                                 project.difficulty === "Intermediate" ? "secondary" : "default"}
                          className="text-xs"
                        >
                          {project.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{project.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">
                        Start Project
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tutorials">
          <Card>
            <CardHeader>
              <CardTitle>Guided Tutorials</CardTitle>
              <CardDescription>
                Step-by-step learning paths with interactive coding examples
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Introduction to React</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Learn the fundamentals of React including components, state, and props
                          </p>
                          <div className="flex items-center mt-2">
                            <Badge variant="outline" className="mr-2">Beginner</Badge>
                            <span className="text-xs text-gray-500">12 Lessons</span>
                          </div>
                        </div>
                        <Button size="sm">Start</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Building a REST API</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Create and deploy a backend API with Node.js and Express
                          </p>
                          <div className="flex items-center mt-2">
                            <Badge variant="outline" className="mr-2">Intermediate</Badge>
                            <span className="text-xs text-gray-500">8 Lessons</span>
                          </div>
                        </div>
                        <Button size="sm">Start</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">AI with TensorFlow.js</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Build machine learning models that run in the browser
                          </p>
                          <div className="flex items-center mt-2">
                            <Badge variant="outline" className="mr-2">Advanced</Badge>
                            <span className="text-xs text-gray-500">15 Lessons</span>
                          </div>
                        </div>
                        <Button size="sm">Start</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Full Stack TypeScript</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Build end-to-end type-safe applications with TypeScript
                          </p>
                          <div className="flex items-center mt-2">
                            <Badge variant="outline" className="mr-2">Intermediate</Badge>
                            <span className="text-xs text-gray-500">10 Lessons</span>
                          </div>
                        </div>
                        <Button size="sm">Start</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodingLabs;
