
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Flame, Trophy, Award, Medal, Users } from "lucide-react";
import { motion } from "framer-motion";

const leaderboardData = [
  {
    id: 1,
    name: "Alice Johnson",
    points: 5280,
    streak: 15,
    avatarUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Bob Williams",
    points: 4950,
    streak: 12,
    avatarUrl: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Charlie Brown",
    points: 4720,
    streak: 10,
    avatarUrl: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Diana Miller",
    points: 4590,
    streak: 8,
    avatarUrl: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Ethan Davis",
    points: 4360,
    streak: 7,
    avatarUrl: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "Finn Taylor",
    points: 4130,
    streak: 5,
    avatarUrl: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 7,
    name: "Grace Moore",
    points: 3900,
    streak: 4,
    avatarUrl: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 8,
    name: "Henry Wilson",
    points: 3670,
    streak: 3,
    avatarUrl: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 9,
    name: "Ivy Garcia",
    points: 3440,
    streak: 2,
    avatarUrl: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 10,
    name: "Jack Rodriguez",
    points: 3210,
    streak: 1,
    avatarUrl: "https://i.pravatar.cc/150?img=10",
  },
];

const LeaderboardPage = () => {
  const topThree = leaderboardData.slice(0, 3);
  const restOfLeaderboard = leaderboardData.slice(3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const hoverScale = {
    scale: 1.03,
    transition: { type: "spring", stiffness: 300 }
  };

  return (
    <motion.div 
      className="container mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-3xl font-bold mb-6 bg-gradient-main text-transparent bg-clip-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Leaderboard & Achievements
      </motion.h1>

      <Tabs defaultValue="global" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="global">Global Leaderboard</TabsTrigger>
          <TabsTrigger value="friends">Friends Leaderboard</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        <TabsContent value="global">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>See who's leading the pack in EduVerse!</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                  variants={containerVariants}
                >
                  {topThree.map((user, index) => (
                    <motion.div key={user.id} variants={itemVariants} whileHover={hoverScale}>
                      <Card className="text-center overflow-hidden border-2 backdrop-blur-sm bg-white/5 dark:bg-black/5">
                        <CardHeader className={index === 0 ? "bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30" : 
                                            index === 1 ? "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800/30 dark:to-gray-700/30" :
                                            "bg-gradient-to-r from-orange-100 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30"}>
                          <CardTitle>
                            <div className="relative">
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.3 + index * 0.1 }}
                              >
                                <Avatar className="mx-auto h-16 w-16 ring-2 ring-white dark:ring-gray-800 shadow-lg">
                                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              </motion.div>
                              {index === 0 && (
                                <motion.div
                                  initial={{ scale: 0, rotate: -30 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
                                >
                                  <Award className="absolute top-0 right-0 h-6 w-6 text-amber-500" />
                                </motion.div>
                              )}
                              {index === 1 && (
                                <motion.div
                                  initial={{ scale: 0, rotate: -30 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
                                >
                                  <Trophy className="absolute top-0 right-0 h-6 w-6 text-gray-500" />
                                </motion.div>
                              )}
                              {index === 2 && (
                                <motion.div
                                  initial={{ scale: 0, rotate: -30 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
                                >
                                  <Medal className="absolute top-0 right-0 h-6 w-6 text-orange-400" />
                                </motion.div>
                              )}
                            </div>
                            <motion.div 
                              className="mt-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.7 + index * 0.1 }}
                            >
                              {user.name}
                            </motion.div>
                          </CardTitle>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                          >
                            <CardDescription>
                              <div className="flex justify-between items-center mt-2">
                                <span className="flex items-center">
                                  <Trophy className="h-4 w-4 mr-1 text-purple-500" /> 
                                  {user.points} pts
                                </span>
                                <span className="flex items-center">
                                  <Flame className="h-4 w-4 mr-1 text-orange-500" /> 
                                  {user.streak} days
                                </span>
                              </div>
                            </CardDescription>
                          </motion.div>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div 
                  className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rank
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Points
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Streak
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {restOfLeaderboard.map((user, index) => (
                        <motion.tr 
                          key={user.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 + index * 0.05 }}
                          whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-gray-100">{index + 4}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={user.avatarUrl} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-gray-100">{user.points}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-gray-100">{user.streak}</div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="friends">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Friends Leaderboard</CardTitle>
                <CardDescription>Compete with your friends and see who's on top!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                  >
                    <Users className="mx-auto h-12 w-12 mb-4 text-gray-400 opacity-70" />
                  </motion.div>
                  <motion.p
                    className="text-lg text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Invite friends to start competing!
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-6"
                  >
                    <button className="bg-primary text-white rounded-md px-4 py-2 hover:opacity-90 transition-all flex items-center mx-auto">
                      <Users className="h-4 w-4 mr-2" /> Invite Friends
                    </button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="achievements">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>Track your progress and celebrate your milestones.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                  >
                    <Award className="mx-auto h-12 w-12 mb-4 text-gray-400 opacity-70" />
                  </motion.div>
                  <motion.p
                    className="text-lg text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    No achievements yet. Keep learning to unlock new achievements!
                  </motion.p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={hoverScale}
        >
          <Card className="overflow-hidden backdrop-blur-sm bg-white/5 dark:bg-black/5 border-2">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30">
              <CardTitle>Global Ranking</CardTitle>
              <CardDescription>See where you stand among all learners in EduVerse.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 1 }}
                >
                  <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                    <AvatarImage src="https://i.pravatar.cc/150?img=11" alt="Your Avatar" />
                    <AvatarFallback>YA</AvatarFallback>
                  </Avatar>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <h3 className="text-lg font-semibold">Your Name</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Points: 3500 | Rank: <span className="text-primary font-medium">45</span>
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          whileHover={hoverScale}
        >
          <Card className="overflow-hidden backdrop-blur-sm bg-white/5 dark:bg-black/5 border-2">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30">
              <CardTitle>Community Badges</CardTitle>
              <CardDescription>Earn badges for participating in community activities.</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div 
                className="flex flex-wrap gap-2"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 hover:from-green-500 hover:to-emerald-600 transition-all cursor-pointer">Active Learner</Badge>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Badge className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-3 py-1 hover:from-blue-500 hover:to-indigo-600 transition-all cursor-pointer">Quiz Master</Badge>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-3 py-1 hover:from-purple-500 hover:to-pink-600 transition-all cursor-pointer">Top Contributor</Badge>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        whileHover={hoverScale}
      >
        <Card className="mb-8 overflow-hidden border-2 backdrop-blur-sm bg-white/5 dark:bg-black/5">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30">
            <CardTitle>Your Learning Streak</CardTitle>
            <CardDescription>Keep your daily learning streak going to earn extra points!</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <motion.div 
                className="h-14 w-14 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center"
                initial={{ rotate: -30 }}
                animate={{ rotate: 0 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              >
                <Flame className="h-7 w-7 text-amber-500" />
              </motion.div>
              <div>
                <motion.h3 
                  className="text-lg font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  10 Days
                </motion.h3>
                <motion.p 
                  className="text-sm text-gray-500 dark:text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  Current Streak
                </motion.p>
                <motion.div
                  className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  <motion.div 
                    className="bg-amber-500 h-1.5 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "40%" }}
                    transition={{ delay: 1.8, duration: 1, type: "spring" }}
                  ></motion.div>
                </motion.div>
                <motion.p 
                  className="text-xs text-gray-500 dark:text-gray-400 mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  15 more days to unlock "Dedicated Learner" badge
                </motion.p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default LeaderboardPage;
